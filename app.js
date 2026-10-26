/**
 * Knowledge Hub Library - Main Interactive Script
 * Features: Live search, category filtering, next-page navigation to book-details.html & shelf.html
 */

// State Management
const state = {
  searchQuery: "",
  selectedCategory: "All",
  sortBy: "popular"
};

// DOM Elements
const dom = {
  booksGrid: document.getElementById("booksGrid"),
  catalogCount: document.getElementById("catalogCount"),
  searchInput: document.getElementById("searchInput"),
  searchClearBtn: document.getElementById("searchClearBtn"),
  categoryPills: document.querySelectorAll(".category-pill"),
  sortSelect: document.getElementById("sortSelect"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  toastContainer: document.getElementById("toastContainer"),
  libraryStatusChip: document.getElementById("libraryStatusChip"),
  contactForm: document.getElementById("contactForm"),
  backToTopBtn: document.getElementById("backToTopBtn"),
  mobileToggleBtn: document.getElementById("mobileToggleBtn"),
  navLinks: document.getElementById("navLinks")
};

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  syncTheme();
  updateLibraryStatus();
  updateGlobalBadge();
  renderBooks();
  setupEventListeners();
});

// ==========================================================================
// Rendering & Filtering
// ==========================================================================

function getFilteredBooks() {
  return BOOKS.filter((book) => {
    // Category match
    const categoryMatch = state.selectedCategory === "All" || book.category.toLowerCase() === state.selectedCategory.toLowerCase();

    // Search query match across title, author, category, synopsis, and shelf
    const query = state.searchQuery.trim().toLowerCase();
    const searchMatch = !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.synopsis.toLowerCase().includes(query) ||
      book.shelf.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  }).sort((a, b) => {
    if (state.sortBy === "title-asc") return a.title.localeCompare(b.title);
    if (state.sortBy === "title-desc") return b.title.localeCompare(a.title);
    if (state.sortBy === "rating") return b.rating - a.rating;
    if (state.sortBy === "newest") return b.year - a.year;
    // Default: popular (by review count & rating)
    return (b.rating * b.reviews) - (a.rating * a.reviews);
  });
}

function renderBooks() {
  const books = getFilteredBooks();
  const borrowedSet = getBorrowedBookIds();
  
  if (dom.catalogCount) {
    dom.catalogCount.textContent = `Showing ${books.length} of ${BOOKS.length} books`;
  }

  if (books.length === 0) {
    dom.booksGrid.innerHTML = `
      <div class="catalog-empty">
        <div class="empty-icon">🔍</div>
        <h3>No books found matching your criteria</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">
          Try adjusting your search terms or clearing the category filter.
        </p>
        <button class="btn-borrow" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  dom.booksGrid.innerHTML = books.map((book) => {
    const isBorrowed = borrowedSet.has(book.id);
    const availableCopies = isBorrowed ? book.copiesAvailable - 1 : book.copiesAvailable;
    
    let availClass = "avail-in-stock";
    let availText = `${availableCopies} Copies Available`;
    if (availableCopies <= 0) {
      availClass = "avail-out-stock";
      availText = "Currently Checked Out";
    } else if (availableCopies <= 2) {
      availClass = "avail-low-stock";
      availText = `Only ${availableCopies} Left`;
    }

    return `
      <article class="book-card" data-id="${book.id}">
        <!-- Clicking cover navigates to the next page (book-details.html) -->
        <a href="book-details.html?id=${book.id}" class="book-cover-container" title="Open ${escapeHTML(book.title)} in next page">
          <div class="book-cover" style="background: ${book.theme.gradient};">
            <span class="cover-badge">${escapeHTML(book.category)}</span>
            <div class="cover-center-icon">${book.icon}</div>
            <div>
              <div class="cover-title">${escapeHTML(book.title)}</div>
              <div class="cover-author">${escapeHTML(book.author)}</div>
            </div>
          </div>
        </a>

        <div class="book-details">
          <div class="book-meta-top">
            <span class="book-category-tag">${escapeHTML(book.category)}</span>
            <div class="book-rating" title="${book.reviews} member ratings">
              ★ ${book.rating.toFixed(1)}
            </div>
          </div>

          <!-- Clicking title opens next page -->
          <h3 class="book-title">
            <a href="book-details.html?id=${book.id}" style="color: inherit;" title="View volume details in next page">
              ${escapeHTML(book.title)}
            </a>
          </h3>
          <p class="book-author">By ${escapeHTML(book.author)}</p>

          <div class="book-availability ${availClass}">
            <span class="avail-dot"></span>
            <span>${availText}</span>
          </div>

          <div class="book-actions">
            <button class="btn-borrow ${isBorrowed ? 'borrowed' : ''}" 
                    onclick="handleQuickBorrow('${book.id}')"
                    aria-label="${isBorrowed ? 'Return book' : 'Borrow book'}">
              ${isBorrowed ? '✓ On Shelf' : '📖 Borrow'}
            </button>
            <a href="book-details.html?id=${book.id}" 
               class="btn-quickview" 
               title="Open full volume details on next page"
               aria-label="Open full details for ${escapeHTML(book.title)}">
              Details →
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Quick Borrow handler from homepage card
function handleQuickBorrow(bookId) {
  const book = getBookById(bookId);
  if (!book) return;

  const borrowedSet = getBorrowedBookIds();
  if (borrowedSet.has(bookId)) {
    borrowedSet.delete(bookId);
    saveBorrowedBookIds(borrowedSet);
    showToast(`"${book.title}" returned from your shelf`, "info");
  } else {
    borrowedSet.add(bookId);
    saveBorrowedBookIds(borrowedSet);
    showToast(`"${book.title}" added to your Borrowed Shelf! 📚`, "success");
  }

  updateGlobalBadge();
  renderBooks();
}

// ==========================================================================
// Real-Time Library Schedule Calculator
// ==========================================================================

function updateLibraryStatus() {
  if (!dom.libraryStatusChip) return;

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  // Mon - Sat: 9:00 AM (540m) to 6:00 PM (1080m)
  const isSunday = day === 0;
  const isOpen = !isSunday && timeInMinutes >= 540 && timeInMinutes < 1080;

  if (isOpen) {
    dom.libraryStatusChip.innerHTML = `
      <span class="status-pulse"></span>
      <span>Open Now · Closes at 6:00 PM</span>
    `;
    dom.libraryStatusChip.style.background = "rgba(25, 135, 84, 0.2)";
    dom.libraryStatusChip.style.color = "#55efc4";
  } else {
    dom.libraryStatusChip.innerHTML = `
      <span style="width: 7px; height: 7px; background-color: #f39c12; border-radius: 50%;"></span>
      <span>Closed Now · Opens Mon–Sat 9:00 AM</span>
    `;
    dom.libraryStatusChip.style.background = "rgba(243, 156, 18, 0.2)";
    dom.libraryStatusChip.style.color = "#f39c12";
  }
}

// ==========================================================================
// Toast Notification Utility
// ==========================================================================

function showToast(message, type = "success") {
  if (!dom.toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${escapeHTML(message)}</span>
  `;

  dom.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Event Listeners & Interactions
// ==========================================================================

function setupEventListeners() {
  // Live Search with keyboard focus
  if (dom.searchInput) {
    dom.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (dom.searchClearBtn) {
        dom.searchClearBtn.style.display = state.searchQuery ? "block" : "none";
      }
      renderBooks();
    });

    window.addEventListener("keydown", (e) => {
      if ((e.key === "/" || (e.ctrlKey && e.key.toLowerCase() === "k")) && document.activeElement !== dom.searchInput) {
        e.preventDefault();
        dom.searchInput.focus();
        dom.searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  // Clear Search Button
  if (dom.searchClearBtn) {
    dom.searchClearBtn.addEventListener("click", () => {
      dom.searchInput.value = "";
      state.searchQuery = "";
      dom.searchClearBtn.style.display = "none";
      renderBooks();
      dom.searchInput.focus();
    });
  }

  // Category Pills
  dom.categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      dom.categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.selectedCategory = pill.dataset.category;
      renderBooks();
    });
  });

  // Sort Selector
  if (dom.sortSelect) {
    dom.sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderBooks();
    });
  }

  // Theme Toggle
  if (dom.themeToggleBtn) {
    dom.themeToggleBtn.addEventListener("click", () => {
      toggleGlobalTheme();
    });
  }

  // Mobile Navigation Toggle
  if (dom.mobileToggleBtn && dom.navLinks) {
    dom.mobileToggleBtn.addEventListener("click", () => {
      dom.navLinks.classList.toggle("open");
    });
    dom.navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => dom.navLinks.classList.remove("open"));
    });
  }

  // Back to Top Button
  if (dom.backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        dom.backToTopBtn.classList.add("visible");
      } else {
        dom.backToTopBtn.classList.remove("visible");
      }
    });

    dom.backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact Form Submission
  if (dom.contactForm) {
    dom.contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      showToast(`Thank you, ${name}! Your inquiry has been dispatched to the library desk.`, "success");
      dom.contactForm.reset();
    });
  }
}

// Global category selector helper for category cards section
window.selectCategoryFromShowcase = function(category) {
  state.selectedCategory = category;
  dom.categoryPills.forEach(pill => {
    if (pill.dataset.category.toLowerCase() === category.toLowerCase()) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  const booksSection = document.getElementById("books");
  if (booksSection) {
    booksSection.scrollIntoView({ behavior: "smooth" });
  }
  renderBooks();
};

window.resetFilters = function() {
  state.searchQuery = "";
  state.selectedCategory = "All";
  if (dom.searchInput) dom.searchInput.value = "";
  if (dom.searchClearBtn) dom.searchClearBtn.style.display = "none";
  dom.categoryPills.forEach(p => {
    if (p.dataset.category === "All") p.classList.add("active");
    else p.classList.remove("active");
  });
  renderBooks();
};

window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`, "success");
  });
};
