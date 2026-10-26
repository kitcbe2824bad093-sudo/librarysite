/**
 * Knowledge Hub Library - Shelf Page Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  syncTheme();
  updateGlobalBadge();
  renderShelfPage();

  const themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      toggleGlobalTheme();
    });
  }
});

function renderShelfPage() {
  const container = document.getElementById("shelfContainer");
  const receiptCard = document.getElementById("digitalReceiptCard");
  const countHeader = document.getElementById("activeCountHeader");
  const borrowedSet = getBorrowedBookIds();
  const borrowedBooks = BOOKS.filter(b => borrowedSet.has(b.id));

  if (countHeader) {
    countHeader.textContent = `${borrowedBooks.length} Volume${borrowedBooks.length === 1 ? '' : 's'}`;
  }

  updateGlobalBadge();

  if (borrowedBooks.length === 0) {
    if (receiptCard) receiptCard.style.display = "none";
    container.innerHTML = `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 70px 20px; text-align: center; box-shadow: var(--shadow-sm);">
        <div style="font-size: 4rem; margin-bottom: 16px; opacity: 0.6;">📚</div>
        <h2 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 8px;">Your Borrowed Shelf is Empty</h2>
        <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 24px;">
          You haven't checked out any books yet. Explore our curated collections across programming, sciences, history, and fiction.
        </p>
        <a href="index.html#books" class="btn-borrow" style="display: inline-flex; padding: 12px 28px; font-size: 0.95rem;">
          🔍 Browse Book Catalog
        </a>
      </div>
    `;
    return;
  }

  if (receiptCard) receiptCard.style.display = "block";

  // Compute 14 days due date
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  const formattedDueDate = dueDate.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  container.innerHTML = borrowedBooks.map(book => `
    <article class="shelf-row-card">
      <div class="mini-cover" style="background: ${book.theme.gradient};">
        <span style="font-size: 0.55rem; text-transform: uppercase; background: rgba(0,0,0,0.3); padding: 1px 4px; border-radius: 2px;">${escapeHTML(book.category)}</span>
        <div class="cover-icon">${book.icon}</div>
        <div class="cover-name">${escapeHTML(book.title)}</div>
      </div>

      <div class="shelf-item-details">
        <span class="book-category-tag" style="margin-bottom: 4px; display: inline-block;">${escapeHTML(book.category)}</span>
        <h3>${escapeHTML(book.title)}</h3>
        <p>By ${escapeHTML(book.author)} · Shelf: <strong>${escapeHTML(book.shelf)}</strong></p>

        <div class="loan-chips">
          <span class="loan-chip due">
            ● Due Date: <strong>${formattedDueDate}</strong> (14 Days Remaining)
          </span>
          <span class="loan-chip">
            ISBN: ${book.isbn}
          </span>
          <span class="loan-chip">
            Renewals Left: 2
          </span>
        </div>
      </div>

      <div class="shelf-actions-col">
        <a href="book-details.html?id=${book.id}" class="btn-view-details">
          Next Page: Details →
        </a>
        <button class="btn-return-full" onclick="returnFromShelf('${book.id}')">
          ✕ Return to Library
        </button>
      </div>
    </article>
  `).join("");
}

function returnFromShelf(bookId) {
  const book = getBookById(bookId);
  if (!book) return;

  const borrowedSet = getBorrowedBookIds();
  borrowedSet.delete(bookId);
  saveBorrowedBookIds(borrowedSet);

  showToast(`"${book.title}" returned to catalog successfully!`, "info");
  renderShelfPage();
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
