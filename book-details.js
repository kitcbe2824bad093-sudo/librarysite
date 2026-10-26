/**
 * Knowledge Hub Library - Book Details Page Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  syncTheme();
  updateGlobalBadge();

  // Parse URL query parameter: ?id=xxx
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id") || "java-prog";
  const book = getBookById(bookId);

  const themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      toggleGlobalTheme();
    });
  }

  if (!book) {
    renderNotFound();
    return;
  }

  renderBookDetails(book);
  renderRelatedBooks(book);
});

function renderBookDetails(book) {
  // Update Title & Breadcrumbs
  document.getElementById("pageTitle").textContent = `${book.title} | Knowledge Hub Library`;
  document.getElementById("breadcrumbCategory").textContent = book.category;
  document.getElementById("breadcrumbTitle").textContent = book.title;

  const borrowedSet = getBorrowedBookIds();
  const isBorrowed = borrowedSet.has(book.id);
  const availableCopies = isBorrowed ? book.copiesAvailable - 1 : book.copiesAvailable;

  const detailsContainer = document.getElementById("detailsCard");
  detailsContainer.innerHTML = `
    <!-- Left Column: Visual Cover & Location -->
    <div class="details-cover-col">
      <div class="large-book-cover" style="background: ${book.theme.gradient};">
        <span class="cover-badge">${escapeHTML(book.category)}</span>
        <div class="cover-center-icon" style="font-size: 3.5rem;">${book.icon}</div>
        <div>
          <div class="cover-title" style="font-size: 1.25rem;">${escapeHTML(book.title)}</div>
          <div class="cover-author" style="font-size: 0.85rem; opacity: 0.9;">By ${escapeHTML(book.author)}</div>
        </div>
      </div>

      <div class="shelf-location-chip">
        <small style="text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Library Shelf Address</small>
        <strong>${escapeHTML(book.shelf)}</strong>
      </div>

      <div style="width: 100%; text-align: center;">
        <span class="status-badge" style="background: ${availableCopies > 0 ? 'rgba(25, 135, 84, 0.15)' : 'rgba(220, 53, 69, 0.15)'}; color: ${availableCopies > 0 ? 'var(--success)' : 'var(--danger)'}; padding: 6px 14px; font-size: 0.82rem;">
          ● ${availableCopies > 0 ? `${availableCopies} Copies Available in Stacks` : 'All Copies Checked Out'}
        </span>
      </div>
    </div>

    <!-- Right Column: Specs, Synopsis, Tabs & Actions -->
    <div class="details-main-col">
      <div class="details-meta-header">
        <span class="book-category-tag">${escapeHTML(book.category)}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);">First Published: ${book.year}</span>
      </div>

      <h1 class="details-title">${escapeHTML(book.title)}</h1>
      <p class="details-author">Authored by <strong>${escapeHTML(book.author)}</strong></p>

      <!-- Specifications Grid -->
      <div class="quick-specs-grid">
        <div class="spec-item">
          <small>Rating</small>
          <span>★ ${book.rating.toFixed(2)} (${book.reviews.toLocaleString()})</span>
        </div>
        <div class="spec-item">
          <small>Length</small>
          <span>${book.pages} Pages</span>
        </div>
        <div class="spec-item">
          <small>ISBN-13</small>
          <span>${book.isbn}</span>
        </div>
        <div class="spec-item">
          <small>Circulation</small>
          <span>14-Day Loan</span>
        </div>
      </div>

      <!-- Tabbed Panels -->
      <div class="details-tabs-header" role="tablist">
        <button class="tab-btn active" onclick="switchTab(this, 'tabOverview')">Overview &amp; Synopsis</button>
        <button class="tab-btn" onclick="switchTab(this, 'tabChapters')">Table of Contents</button>
        <button class="tab-btn" onclick="switchTab(this, 'tabSample')">Read Sample Excerpt</button>
        <button class="tab-btn" onclick="switchTab(this, 'tabCirculation')">Borrowing Rules</button>
      </div>

      <!-- Tab 1: Overview -->
      <div id="tabOverview" class="tab-panel active">
        <p>${escapeHTML(book.synopsis)}</p>
        <p style="margin-top: 14px; font-size: 0.95rem; color: var(--text-muted);">
          Available for physical checkout at the front desk or electronic reservation through the Knowledge Hub Member Portal.
        </p>
      </div>

      <!-- Tab 2: Chapters -->
      <div id="tabChapters" class="tab-panel">
        <ul class="chapter-list">
          ${(book.chapters || []).map(ch => `
            <li class="chapter-item">📖 ${escapeHTML(ch)}</li>
          `).join("")}
        </ul>
      </div>

      <!-- Tab 3: Sample Excerpt -->
      <div id="tabSample" class="tab-panel">
        <div class="sample-box">
          ${escapeHTML(book.sampleExcerpt || book.synopsis)}
        </div>
      </div>

      <!-- Tab 4: Circulation Rules -->
      <div id="tabCirculation" class="tab-panel">
        <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-muted); font-size: 0.95rem;">
          <li><strong>Loan Duration:</strong> Standard 14-day checkout with up to 2 online renewals.</li>
          <li><strong>Desk Pickup:</strong> Reserved books are held at the Gandhipuram Desk for 48 hours.</li>
          <li><strong>Member Perks:</strong> Zero late fees for students with valid institutional identification.</li>
          <li><strong>Return Chute:</strong> 24/7 automated return drop box available outside main entrance.</li>
        </ul>
      </div>

      <!-- Actions Bar -->
      <div class="actions-bar">
        <button id="detailsBorrowBtn" class="btn-large-borrow ${isBorrowed ? 'borrowed' : ''}" onclick="toggleDetailsBorrow('${book.id}')">
          <span>${isBorrowed ? '✓ On Your Borrowed Shelf (Click to Return)' : '📖 Borrow This Volume Now'}</span>
        </button>

        <a href="shelf.html" class="btn-secondary">
          📑 View My Reading Pass
        </a>

        <button class="btn-secondary" onclick="copyCitation('${book.id}')">
          📋 Copy MLA Citation
        </button>
      </div>
    </div>
  `;
}

function switchTab(btn, tabId) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

  btn.classList.add("active");
  const panel = document.getElementById(tabId);
  if (panel) panel.classList.add("active");
}

function toggleDetailsBorrow(bookId) {
  const book = getBookById(bookId);
  if (!book) return;

  const borrowedSet = getBorrowedBookIds();
  const btn = document.getElementById("detailsBorrowBtn");

  if (borrowedSet.has(bookId)) {
    borrowedSet.delete(bookId);
    saveBorrowedBookIds(borrowedSet);
    showToast(`"${book.title}" returned from your shelf`, "info");
    if (btn) {
      btn.classList.remove("borrowed");
      btn.innerHTML = `<span>📖 Borrow This Volume Now</span>`;
    }
  } else {
    borrowedSet.add(bookId);
    saveBorrowedBookIds(borrowedSet);
    showToast(`"${book.title}" checked out successfully! 📚`, "success");
    if (btn) {
      btn.classList.add("borrowed");
      btn.innerHTML = `<span>✓ On Your Borrowed Shelf (Click to Return)</span>`;
    }
  }

  updateGlobalBadge();
}

function copyCitation(bookId) {
  const book = getBookById(bookId);
  if (!book) return;
  const citation = `${book.author}. ${book.title}. Coimbatore: Knowledge Hub Library Publishing, ${book.year}. Print.`;
  navigator.clipboard.writeText(citation).then(() => {
    showToast("MLA citation copied to clipboard!", "success");
  });
}

function renderRelatedBooks(currentBook) {
  const relatedGrid = document.getElementById("relatedBooksGrid");
  if (!relatedGrid) return;

  // Find 3 books in same category, or highest rated
  const related = BOOKS
    .filter(b => b.id !== currentBook.id)
    .sort((a, b) => {
      const aSameCat = a.category === currentBook.category ? 1 : 0;
      const bSameCat = b.category === currentBook.category ? 1 : 0;
      return bSameCat - aSameCat || b.rating - a.rating;
    })
    .slice(0, 3);

  relatedGrid.innerHTML = related.map(book => `
    <article class="book-card" style="cursor: pointer;" onclick="window.location.href='book-details.html?id=${book.id}'">
      <div class="book-cover-container">
        <div class="book-cover" style="background: ${book.theme.gradient};">
          <span class="cover-badge">${escapeHTML(book.category)}</span>
          <div class="cover-center-icon">${book.icon}</div>
          <div>
            <div class="cover-title">${escapeHTML(book.title)}</div>
            <div class="cover-author">${escapeHTML(book.author)}</div>
          </div>
        </div>
      </div>

      <div class="book-details">
        <div class="book-meta-top">
          <span class="book-category-tag">${escapeHTML(book.category)}</span>
          <div class="book-rating">★ ${book.rating.toFixed(1)}</div>
        </div>
        <h3 class="book-title">${escapeHTML(book.title)}</h3>
        <p class="book-author">By ${escapeHTML(book.author)}</p>
        <div class="book-actions" style="margin-top: 14px;">
          <a href="book-details.html?id=${book.id}" class="btn-borrow" style="width: 100%; text-align: center;">
            View Next Page →
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderNotFound() {
  const container = document.getElementById("detailsCard");
  container.innerHTML = `
    <div style="text-align: center; padding: 60px 20px; grid-column: 1 / -1;">
      <div style="font-size: 3.5rem; margin-bottom: 16px;">📚</div>
      <h2 style="font-family: var(--font-serif); margin-bottom: 12px;">Volume Not Found</h2>
      <p style="color: var(--text-muted); margin-bottom: 24px;">
        The book you requested could not be located in the current catalog index.
      </p>
      <a href="index.html#books" class="btn-large-borrow" style="display: inline-flex; width: auto;">
        ← Return to Main Catalog
      </a>
    </div>
  `;
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
