/**
 * Knowledge Hub Library - Shared Data & Core Utility Service
 */

const BOOKS = [
  {
    id: "java-prog",
    title: "Java Programming",
    author: "James Gosling",
    category: "Programming",
    rating: 4.8,
    reviews: 1420,
    year: 2022,
    pages: 720,
    isbn: "978-0134685991",
    shelf: "Floor 2 · Shelf P-102",
    copiesAvailable: 4,
    totalCopies: 6,
    icon: "☕",
    theme: {
      gradient: "linear-gradient(135deg, #b07219, #e76f51)",
      accent: "#f4a261"
    },
    synopsis: "The definitive guide to Java architecture, object-oriented concepts, multithreading, and enterprise backend design by the original father of the Java programming language. Includes modern modular systems, lambdas, streams, and robust design patterns for scalable systems.",
    chapters: [
      "1. Introduction to the Java Virtual Machine & Architecture",
      "2. Object-Oriented Principles & Type Systems",
      "3. Generics, Collections & Modern Functional Streams",
      "4. Multithreading, Concurrency & Virtual Threads",
      "5. Enterprise Reliability & JVM Performance Tuning"
    ],
    sampleExcerpt: "Java was conceived with a strong conviction: simplicity, security, and developer productivity through write-once-run-anywhere portability. Understanding how bytecode interacts with the execution runtime remains fundamental to building resilient enterprise systems."
  },
  {
    id: "python-basics",
    title: "Python Basics",
    author: "Eric Matthes",
    category: "Programming",
    rating: 4.9,
    reviews: 2150,
    year: 2023,
    pages: 560,
    isbn: "978-1593279288",
    shelf: "Floor 2 · Shelf P-105",
    copiesAvailable: 7,
    totalCopies: 8,
    icon: "🐍",
    theme: {
      gradient: "linear-gradient(135deg, #1f4068, #162447)",
      accent: "#4fc3f7"
    },
    synopsis: "A hands-on, project-based introduction to programming with Python. Covers foundational syntax, algorithms, data structures, and real-world web/data science applications with crystal-clear code examples and guided practices.",
    chapters: [
      "1. Variables, Data Types & List Slices",
      "2. Dictionaries, User Input & Control Flow",
      "3. Functions, Modules & Object Classes",
      "4. File Handling & Testing Methodologies",
      "5. Building Interactive Visualizations & Web Apps"
    ],
    sampleExcerpt: "Python's philosophy prizes clarity and readability above clever brevity. In this guide, you will transition seamlessly from writing your first print statement to architecting data-driven applications."
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    rating: 4.7,
    reviews: 3200,
    year: 2020,
    pages: 464,
    isbn: "978-0132350884",
    shelf: "Floor 2 · Shelf P-108",
    copiesAvailable: 2,
    totalCopies: 5,
    icon: "💻",
    theme: {
      gradient: "linear-gradient(135deg, #0d3b66, #001e3d)",
      accent: "#00b4d8"
    },
    synopsis: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Master software craftsmanship, refactoring, meaningful naming, and SOLID design.",
    chapters: [
      "1. Meaningful Names & Function Boundaries",
      "2. Comments: The Good, The Bad & The Redundant",
      "3. Formatting, Objects & Data Structures",
      "4. Error Handling & Unit Testing Rigor",
      "5. Smells, Heuristics & Refactoring to Perfection"
    ],
    sampleExcerpt: "Writing clean code is like painting a picture or performing surgery. Knowing what clean code looks like is entirely different from having the discipline and craftsmanship to produce it continuously."
  },
  {
    id: "wings-of-fire",
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    category: "Biography",
    rating: 4.95,
    reviews: 5890,
    year: 1999,
    pages: 180,
    isbn: "978-8173711466",
    shelf: "Floor 1 · Shelf B-204",
    copiesAvailable: 5,
    totalCopies: 9,
    icon: "🚀",
    theme: {
      gradient: "linear-gradient(135deg, #c0392b, #8e44ad)",
      accent: "#f39c12"
    },
    synopsis: "An inspirational autobiography of Dr. A.P.J. Abdul Kalam, from his humble childhood in Rameswaram to becoming India's Missile Man and 11th President. A testament to perseverance, visionary leadership, and scientific integrity.",
    chapters: [
      "1. Orientation: Childhood in Rameswaram",
      "2. Creation: Aeronautical Engineering at MIT Chennai",
      "3. Propitiation: The Rocket Launching Station at Thumba",
      "4. Contemplation: SLV-3, Agni & Prithvi Missile Missions",
      "5. Emulation: Guiding the Youth of Modern India"
    ],
    sampleExcerpt: "Dreams are not those which you see while sleeping, but are those that do not let you sleep. If you want to shine like a sun, first burn like a sun."
  },
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    rating: 4.6,
    reviews: 4320,
    year: 2017,
    pages: 336,
    isbn: "978-1612680194",
    shelf: "Floor 1 · Shelf F-310",
    copiesAvailable: 3,
    totalCopies: 6,
    icon: "💰",
    theme: {
      gradient: "linear-gradient(135deg, #512b58, #2c003e)",
      accent: "#d4a34b"
    },
    synopsis: "What the rich teach their kids about money that the poor and middle class do not! Explodes the myth that you need to earn a high income to become rich and teaches financial literacy, assets vs liabilities, and cashflow independence.",
    chapters: [
      "1. The Rich Don't Work for Money",
      "2. Why Teach Financial Literacy? Assets vs Liabilities",
      "3. Mind Your Own Business & Corporation Advantages",
      "4. The History of Taxes and the Power of Capital",
      "5. Overcoming Obstacles & Taking Decisive Action"
    ],
    sampleExcerpt: "Most people work for money, but the wealthy make money work for them. The single most powerful asset we all have is our mind. If trained well, it can create enormous wealth."
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    rating: 4.85,
    reviews: 2980,
    year: 2021,
    pages: 256,
    isbn: "978-9390166268",
    shelf: "Floor 1 · Shelf F-314",
    copiesAvailable: 6,
    totalCopies: 8,
    icon: "📈",
    theme: {
      gradient: "linear-gradient(135deg, #1b4d3e, #0e2a22)",
      accent: "#64dfdf"
    },
    synopsis: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know. It's about how you behave. Behavioral economics unpacked with gripping storytelling.",
    chapters: [
      "1. No One's Crazy: Different Perspectives on Risk",
      "2. Luck & Risk: The Inseparable Forces",
      "3. Never Enough: Knowing When to Stop Moving the Goalposts",
      "4. Compounding Magic: The True Driver of Growth",
      "5. Freedom: The Highest Dividend Money Pays"
    ],
    sampleExcerpt: "Controlling your time is the highest dividend money pays. The ability to do what you want, when you want, with who you want, for as long as you want, is priceless."
  },
  {
    id: "brief-history-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    rating: 4.8,
    reviews: 3120,
    year: 1998,
    pages: 256,
    isbn: "978-0553380163",
    shelf: "Floor 3 · Shelf S-401",
    copiesAvailable: 3,
    totalCopies: 4,
    icon: "🌌",
    theme: {
      gradient: "linear-gradient(135deg, #101820, #2b3a4a)",
      accent: "#a0c4ff"
    },
    synopsis: "A landmark volume in science writing by one of the greatest minds of our time, exploring black holes, expanding space, the arrow of time, and the grand unification of physics.",
    chapters: [
      "1. Our Picture of the Universe",
      "2. Space and Time: Relativity Explained",
      "3. The Expanding Universe & Big Bang",
      "4. Black Holes Ain't So Black: Hawking Radiation",
      "5. The Origin and Fate of the Cosmic Continuum"
    ],
    sampleExcerpt: "Even if there is only one possible unified theory, it is just a set of rules and equations. What is it that breathes fire into the equations and makes a universe for them to describe?"
  },
  {
    id: "gene-history",
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    category: "Science",
    rating: 4.75,
    reviews: 1850,
    year: 2016,
    pages: 608,
    isbn: "978-1476733524",
    shelf: "Floor 3 · Shelf S-412",
    copiesAvailable: 1,
    totalCopies: 3,
    icon: "🧬",
    theme: {
      gradient: "linear-gradient(135deg, #134e5e, #71b280)",
      accent: "#a8ff78"
    },
    synopsis: "The Pulitzer Prize-winning author weaves science, social history, and personal narrative into a gripping biography of the gene—the fundamental unit of hereditary information.",
    chapters: [
      "1. The Missing Piece: Mendel and Darwin's Puzzle",
      "2. The Geometry of Life: Watson, Crick, and the Double Helix",
      "3. The Code Decoded: Transcription & Translation",
      "4. The Human Genome Project & Epigenetics",
      "5. The Post-Genome Era: CRISPR and the Future of Man"
    ],
    sampleExcerpt: "Three profoundly destabilizing scientific ideas ricocheted through the twentieth century: the atom, the byte, and the gene. Of these, the gene is the most intimate and personal."
  },
  {
    id: "sapiens",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    rating: 4.88,
    reviews: 6400,
    year: 2015,
    pages: 464,
    isbn: "978-0062316097",
    shelf: "Floor 2 · Shelf H-502",
    copiesAvailable: 4,
    totalCopies: 7,
    icon: "🏺",
    theme: {
      gradient: "linear-gradient(135deg, #87431d, #290001)",
      accent: "#f4a261"
    },
    synopsis: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution, exploring how biology and history have defined us.",
    chapters: [
      "1. The Cognitive Revolution: Fiction as Glue",
      "2. The Agricultural Revolution: History's Biggest Fraud?",
      "3. The Unification of Humankind: Money, Empires & Religion",
      "4. The Scientific Revolution: The Discovery of Ignorance",
      "5. The End of Homo Sapiens: Cyborgs and Immortality"
    ],
    sampleExcerpt: "You could never convince a monkey to give you a banana by promising him limitless bananas after death in monkey heaven. Only Sapiens can believe in such fictions, which enables large-scale cooperation."
  },
  {
    id: "india-after-gandhi",
    title: "India After Gandhi",
    author: "Ramachandra Guha",
    category: "History",
    rating: 4.82,
    reviews: 1450,
    year: 2008,
    pages: 912,
    isbn: "978-0060958589",
    shelf: "Floor 2 · Shelf H-510",
    copiesAvailable: 2,
    totalCopies: 4,
    icon: "📜",
    theme: {
      gradient: "linear-gradient(135deg, #4a2c11, #1a0f05)",
      accent: "#e9c46a"
    },
    synopsis: "A magisterial history of the world's largest and most astonishing democracy, tracing its conflicts, triumphs, and transformations since 1947.",
    chapters: [
      "1. Freedom and Paroxysm: The Birth of a Republic",
      "2. The Integration of Princely States by Sardar Patel",
      "3. The First General Election & Democratic Foundations",
      "4. Wars, State Reorganization & Cultural Pluralism",
      "5. Economic Modernization & Emerging Horizons"
    ],
    sampleExcerpt: "India is an unnatural nation. In geography, language, religion, and ethnicity, it possesses none of the orthodox markers of nationhood, yet its unity survives through pluralism."
  },
  {
    id: "to-kill-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    rating: 4.9,
    reviews: 7800,
    year: 2006,
    pages: 336,
    isbn: "978-0061120084",
    shelf: "Floor 3 · Shelf F-601",
    copiesAvailable: 5,
    totalCopies: 8,
    icon: "🕊️",
    theme: {
      gradient: "linear-gradient(135deg, #2b580c, #639a67)",
      accent: "#d8ebb5"
    },
    synopsis: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Compassionate, dramatic, and deeply moving.",
    chapters: [
      "1. The Radley House & Childhood in Maycomb",
      "2. Scout's School Days & The Secret Knot-Hole",
      "3. Atticus Finch Takes the Case",
      "4. The Courthouse Trial of Tom Robinson",
      "5. The Autumn Vigil & The Gift of Boo Radley"
    ],
    sampleExcerpt: "You never really understand a person until you consider things from his point of view... until you climb into his skin and walk around in it."
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "General Knowledge",
    rating: 4.92,
    reviews: 8200,
    year: 2018,
    pages: 320,
    isbn: "978-0735211292",
    shelf: "Floor 1 · Shelf G-101",
    copiesAvailable: 8,
    totalCopies: 10,
    icon: "⚡",
    theme: {
      gradient: "linear-gradient(135deg, #d35400, #c0392b)",
      accent: "#f1c40f"
    },
    synopsis: "An easy and proven way to build good habits and break bad ones. Learn the tiny changes that yield remarkable compounding results over time.",
    chapters: [
      "1. The Surprising Power of Atomic Habits (1% Better Every Day)",
      "2. How Your Habits Shape Your Identity & Vice Versa",
      "3. The 1st Law: Make It Obvious",
      "4. The 2nd & 3rd Laws: Make It Attractive & Make It Easy",
      "5. The 4th Law: Make It Satisfying"
    ],
    sampleExcerpt: "You do not rise to the level of your goals. You fall to the level of your systems. Habits are the compound interest of self-improvement."
  }
];

// Shared Storage Helpers
function getBorrowedBookIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem("knowledge_hub_borrowed") || "[]"));
  } catch (e) {
    return new Set();
  }
}

function saveBorrowedBookIds(borrowedSet) {
  localStorage.setItem("knowledge_hub_borrowed", JSON.stringify(Array.from(borrowedSet)));
}

function getBookById(id) {
  return BOOKS.find(b => b.id === id);
}

function syncTheme() {
  const saved = localStorage.getItem("knowledge_hub_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  const themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) {
    themeToggle.textContent = saved === "dark" ? "☀️" : "🌙";
  }
}

function toggleGlobalTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("knowledge_hub_theme", next);
  const themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) {
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  }
}

function updateGlobalBadge() {
  const badge = document.getElementById("borrowBadge");
  if (!badge) return;
  const count = getBorrowedBookIds().size;
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
