/* ==========================================================================
   Sudahkah Negeri Ini Merdeka?
   Data-driven rendering + interactions (Vanilla JS, ES6+)
   Edit ARTICLE_DATA below to change any text on the page.
   ========================================================================== */

const ARTICLE_DATA = {
  title: "Sudahkah Negeri Ini Merdeka?",
  subtitle: "Sebuah Analisis Kritis Perspektif Sosial, Ekonomi, dan Kebebasan.",
  meta: {
    author: "TIm Riset Editorial",
    date: "Agustus 2026"
    // readTime is no longer hardcoded — it's calculated automatically by
    // calculateReadTime() below, based on the word count of bodyParagraphs.
  },
  heroQuote: "Kemerdekaan bukan sekadar hilangnya penjajah, tapi hadirnya keadilan sosial bagi seluruh rakyat.",
  overview: {
    title: "Tentang Tulisan Ini",
    summary: "Tulisan ini mengajak pembaca menimbang ulang makna kemerdekaan — merangkai pencapaian yang telah diraih dengan kesenjangan yang masih dirasakan, lalu mengajak pembaca menyuarakan pandangannya sendiri di akhir tulisan."
  },
  tableOfContents: [
    { label: "Argumen Utama", description: "Membaca ulang makna kemerdekaan", target: "#analisis" },
    { label: "Dua Sisi Perspektif", description: "Pencapaian & tantangan berdampingan", target: "#perspektif" },
    { label: "Refleksi", description: "Merenungkan ulang pertanyaan besar", target: "#refleksi" },
    { label: "Jajak Pendapat", description: "Suarakan pandanganmu", target: "#jajak" },
    { label: "Metodologi & Sumber", description: "Rujukan data yang digunakan", target: "#metodologi" }
  ],
  bodyParagraphs: [
    "Setiap bulan Agustus, kita merayakan kemerdekaan dengan bendera, lomba, dan pidato kebangsaan. Namun di balik seremoni tahunan itu, ada pertanyaan yang jarang benar-benar kita jawab dengan jujur: merdeka menurut siapa, dan merdeka dari apa saja?",
    "Kemerdekaan formal telah kita genggam selama puluhan tahun. Wilayah berdaulat, bendera berkibar, dan meja diplomasi diisi oleh delegasi bangsa sendiri. Tetapi kemerdekaan yang dirasakan warga di ruang kelas yang bocor, di pasar yang harga-harganya melonjak, atau di linimasa yang dibungkam, sering kali terasa berbeda dari kemerdekaan yang dirayakan di atas panggung.",
    "Pertanyaannya bukan untuk menafikan pencapaian yang telah diraih, melainkan untuk menajamkan refleksi: apakah kemerdekaan berhenti pada seremoni, atau terus diperjuangkan setiap hari dalam bentuk keadilan yang bisa dirasakan?"
  ],
  perspectives: {
    sideA: {
      title: "Pencapaian & Kemerdekaan Fisik",
      points: [
        "Kedaulatan wilayah yang terjaga dari ujung barat hingga timur nusantara.",
        "Pembangunan infrastruktur yang kian merata hingga ke daerah tertinggal.",
        "Akses pendidikan yang semakin meluas bagi generasi muda di berbagai pelosok.",
        "Stabilitas politik yang memungkinkan pergantian kekuasaan secara damai."
      ]
    },
    sideB: {
      title: "Tantangan Realita & Kesenjangan",
      points: [
        "Kesenjangan ekonomi yang masih lebar antara kota besar dan daerah.",
        "Kebebasan berpendapat di ruang digital yang kian dibayangi ancaman hukum.",
        "Keadilan hukum yang belum merata bagi seluruh lapisan masyarakat.",
        "Ketergantungan pada sumber daya alam tanpa hilirisasi yang berkeadilan."
      ]
    }
  },
  reflection: {
    title: "Merenungkan Ulang",
    paragraphs: [
      "Merefleksikan kemerdekaan bukan berarti mengingkari apa yang telah dicapai, juga bukan berarti berpuas diri terhadapnya. Ada ruang di antara rasa syukur dan rasa gelisah — ruang tempat kritik dan apresiasi bisa hidup berdampingan, saling menajamkan, bukan saling meniadakan.",
      "Barangkali pertanyaan \"sudahkah negeri ini merdeka?\" tidak pernah dimaksudkan untuk dijawab sekali dan selesai. Ia adalah pertanyaan yang layak diajukan ulang setiap tahun, oleh setiap generasi, dengan standar keadilan yang terus bergerak maju — sebab kemerdekaan sejati bukan titik akhir, melainkan proses yang terus-menerus diperjuangkan."
    ]
  },
  poll: {
    question: "Menurut pandanganmu, apakah kita sudah sepenuhnya merdeka?",
    description: "Suarakan pendapatmu dan lihat bagaimana pembaca lain menjawab pertanyaan ini.",
    options: [
      { id: "sudah", label: "Sudah", baseVotes: 184 },
      { id: "belum", label: "Belum", baseVotes: 612 }
    ]
  },
  footer: {
    note: "Sebuah proyek tulisan reflektif independen tentang makna kemerdekaan di masa kini. Dibuat untuk mendorong dialog, bukan menyimpulkan jawaban tunggal."
  },
  sources: [
    {
      title: "UNCLOS / Hukum Laut Internasional",
      description: "Kedaulatan & Teritorial",
      url: "https://www.un.org/depts/los/index.htm"
    },
    {
      title: "Kementerian PUPR & Bappenas",
      description: "Infrastruktur & Pemerataan Pembangunan",
      url: "https://www.pu.go.id"
    },
    {
      title: "BPS — Badan Pusat Statistik",
      description: "Rasio Gini & Ketimpangan Ekonomi",
      url: "https://www.bps.go.id"
    },
    {
      title: "SAFEnet & Komnas HAM",
      description: "Kebebasan Berpendapat & Ruang Digital",
      url: "https://safenet.or.id"
    }
  ]
};

/* ==========================================================================
   Reading time
   ========================================================================== */

const WORDS_PER_MINUTE = 200;

/**
 * Counts total words across all body paragraphs and converts that into a
 * rounded-up "X Menit Baca" label at the given reading speed.
 */
function calculateReadTime(paragraphs, wpm = WORDS_PER_MINUTE) {
  const totalWords = paragraphs
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(totalWords / wpm));
  return `${minutes} Menit Baca`;
}

/* ==========================================================================
   Storage keys for the poll (persists the reader's vote across visits)
   ========================================================================== */

const POLL_COUNTS_KEY = "merdeka_poll_counts";
const POLL_VOTED_KEY = "merdeka_poll_voted";

/* ==========================================================================
   Bootstrap / init
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  document.title = ARTICLE_DATA.title;

  renderHero(ARTICLE_DATA);
  renderOverview(ARTICLE_DATA.overview, ARTICLE_DATA.tableOfContents);
  renderCoreArgument(ARTICLE_DATA);
  renderPerspectives(ARTICLE_DATA.perspectives);
  renderReflection(ARTICLE_DATA.reflection);
  renderPoll(ARTICLE_DATA.poll);
  renderSources(ARTICLE_DATA.sources);
  renderFooter(ARTICLE_DATA.footer);

  initThemeToggle();
  initReadingProgress();
  initRevealOnScroll();
  initBackToTop();
  initNavActiveState();
  initNavbarScrollEffect();
});

/* ==========================================================================
   Hero
   ========================================================================== */

function renderHero(data) {
  document.getElementById("heroTitle").textContent = data.title;
  document.getElementById("heroSubtitle").textContent = data.subtitle;
  document.getElementById("heroAuthor").textContent = data.meta.author;
  document.getElementById("heroDate").textContent = data.meta.date;

  // Reading time is computed from the actual article word count, not hardcoded.
  document.getElementById("heroReadTime").textContent = calculateReadTime(data.bodyParagraphs);

  const initial = data.meta.author.trim().charAt(0).toUpperCase() || "P";
  document.getElementById("heroAuthorInitial").textContent = initial;
}

/* ==========================================================================
   Section 1 — Core argument article + pull-quote
   ========================================================================== */

function renderCoreArgument(data) {
  const container = document.getElementById("articleBody");
  const fragment = document.createDocumentFragment();

  data.bodyParagraphs.forEach((text, index) => {
    const p = document.createElement("p");
    p.textContent = text;
    p.classList.add("reveal");
    if (index === 0) {
      p.classList.add("has-dropcap");
    }
    fragment.appendChild(p);

    // Insert the styled pull-quote right after the first paragraph
    if (index === 0 && data.heroQuote) {
      const quote = document.createElement("blockquote");
      quote.className = "pull-quote reveal";
      const quoteText = document.createElement("p");
      quoteText.textContent = data.heroQuote;
      quote.appendChild(quoteText);
      fragment.appendChild(quote);
    }
  });

  container.appendChild(fragment);
}

/* ==========================================================================
   Beranda — overview summary + table of contents
   ========================================================================== */

function renderOverview(overview, tocItems) {
  document.getElementById("overviewTitle").textContent = overview.title;
  document.getElementById("overviewSummary").textContent = overview.summary;

  const list = document.getElementById("tocList");
  tocItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "toc-list__item";

    const link = document.createElement("a");
    link.className = "toc-list__link";
    link.href = item.target;

    link.innerHTML = `
      <span class="toc-list__text">
        <span class="toc-list__label">${item.label}</span>
        <span class="toc-list__desc">${item.description}</span>
      </span>
      <svg class="toc-list__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    li.appendChild(link);
    list.appendChild(li);
  });
}

/* ==========================================================================
   Section 2 — Dual perspective (desktop columns + mobile pills/tabs)
   ========================================================================== */

function renderPerspectives(perspectives) {
  const { sideA, sideB } = perspectives;

  // --- Desktop columns ---
  document.getElementById("perspectiveTitleA").textContent = sideA.title;
  document.getElementById("perspectiveTitleB").textContent = sideB.title;
  document.getElementById("perspectiveListA").appendChild(buildPointsList(sideA.points));
  document.getElementById("perspectiveListB").appendChild(buildPointsList(sideB.points));

  // --- Mobile pills + tab panes ---
  const pillsContainer = document.getElementById("perspectivePillTabs");
  const tabContentContainer = document.getElementById("perspectiveTabContent");

  const sides = [
    { key: "sideA", data: sideA },
    { key: "sideB", data: sideB }
  ];

  sides.forEach((side, index) => {
    const isActive = index === 0;

    // Pill nav item
    const li = document.createElement("li");
    li.className = "nav-item";
    li.setAttribute("role", "presentation");

    const button = document.createElement("button");
    button.className = `nav-link${isActive ? " active" : ""}`;
    button.id = `pill-${side.key}`;
    button.setAttribute("data-bs-toggle", "pill");
    button.setAttribute("data-bs-target", `#pane-${side.key}`);
    button.setAttribute("type", "button");
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", `pane-${side.key}`);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
    button.textContent = side.data.title;

    li.appendChild(button);
    pillsContainer.appendChild(li);

    // Tab pane
    const pane = document.createElement("div");
    pane.className = `tab-pane fade${isActive ? " show active" : ""}`;
    pane.id = `pane-${side.key}`;
    pane.setAttribute("role", "tabpanel");
    pane.setAttribute("aria-labelledby", `pill-${side.key}`);
    pane.appendChild(buildPointsList(side.data.points));

    tabContentContainer.appendChild(pane);
  });
}

function buildPointsList(points) {
  const ul = document.createElement("ul");
  ul.className = "perspective-col__list";
  points.forEach((pointText) => {
    const li = document.createElement("li");
    li.textContent = pointText;
    ul.appendChild(li);
  });
  return ul;
}

/* ==========================================================================
   Refleksi — closing reflective passage
   ========================================================================== */

function renderReflection(reflection) {
  document.getElementById("reflectionTitle").textContent = reflection.title;

  const body = document.getElementById("reflectionBody");
  reflection.paragraphs.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    body.appendChild(p);
  });
}

/* ==========================================================================
   Section 3 — Poll
   ========================================================================== */

function renderPoll(pollData) {
  document.getElementById("pollQuestion").textContent = pollData.question;
  document.getElementById("pollDescription").textContent = pollData.description;

  const optionsContainer = document.getElementById("pollOptions");
  pollData.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "poll-option-btn";
    btn.textContent = option.label;
    btn.dataset.optionId = option.id;
    btn.addEventListener("click", () => handleVote(pollData, option.id));
    optionsContainer.appendChild(btn);
  });

  // If the reader already voted on a previous visit, jump straight to results
  const previousVote = localStorage.getItem(POLL_VOTED_KEY);
  if (previousVote) {
    showPollResults(pollData, previousVote);
  }
}

function handleVote(pollData, chosenOptionId) {
  if (localStorage.getItem(POLL_VOTED_KEY)) return; // already voted

  localStorage.setItem(POLL_VOTED_KEY, chosenOptionId);

  const counts = getPollCounts(pollData);
  counts[chosenOptionId] = (counts[chosenOptionId] || 0) + 1;
  localStorage.setItem(POLL_COUNTS_KEY, JSON.stringify(counts));

  showPollResults(pollData, chosenOptionId);
}

function getPollCounts(pollData) {
  const stored = localStorage.getItem(POLL_COUNTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // fall through to defaults if storage is corrupted
    }
  }
  const defaults = {};
  pollData.options.forEach((option) => {
    defaults[option.id] = option.baseVotes;
  });
  return defaults;
}

function showPollResults(pollData, votedId) {
  const optionsEl = document.getElementById("pollOptions");
  const resultsEl = document.getElementById("pollResults");
  const totalEl = document.getElementById("pollTotal");

  optionsEl.classList.add("d-none");
  resultsEl.classList.remove("d-none");
  resultsEl.innerHTML = "";

  const counts = getPollCounts(pollData);
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0) || 1;

  pollData.options.forEach((option) => {
    const votes = counts[option.id] || 0;
    const pct = Math.round((votes / total) * 100);

    const row = document.createElement("div");
    row.className = `poll-result-row${option.id === votedId ? " poll-result-row--voted" : ""}`;

    const label = document.createElement("div");
    label.className = "poll-result-row__label";
    label.innerHTML = `<span>${option.label}</span><span class="pct">${pct}%</span>`;

    const track = document.createElement("div");
    track.className = "poll-bar-track";

    const fill = document.createElement("div");
    fill.className = "poll-bar-fill";
    fill.style.width = "0%";

    track.appendChild(fill);
    row.appendChild(label);
    row.appendChild(track);
    resultsEl.appendChild(row);

    // Animate the bar in on next frame so the CSS transition actually runs
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = `${pct}%`;
      });
    });
  });

  totalEl.textContent = `${total.toLocaleString("id-ID")} pembaca telah menyuarakan pendapatnya.`;
}

/* ==========================================================================
   Sources & methodology
   ========================================================================== */

const EXTERNAL_LINK_ICON_SVG = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

function renderSources(sources) {
  const grid = document.getElementById("sourcesGrid");

  sources.forEach((source, index) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";

    const card = document.createElement("a");
    card.className = "source-card reveal";
    card.href = source.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `${source.title} (tautan eksternal, tab baru)`);

    card.innerHTML = `
      <div class="source-card__top">
        <span class="source-card__index">${String(index + 1).padStart(2, "0")}</span>
        <span class="source-card__icon">${EXTERNAL_LINK_ICON_SVG}</span>
      </div>
      <p class="source-card__title">${source.title}</p>
      <p class="source-card__desc">${source.description}</p>
    `;

    col.appendChild(card);
    grid.appendChild(col);
  });
}

/* ==========================================================================
   Footer
   ========================================================================== */

function renderFooter(footerData) {
  document.getElementById("footerNote").textContent = footerData.note;
  const year = new Date().getFullYear();
  document.getElementById("footerCopyright").textContent =
    `© ${year} Sudahkah Negeri Ini Merdeka?. Seluruh tulisan untuk tujuan refleksi publik.`;
}

/* ==========================================================================
   Theme toggle (light / dark)
   The initial theme is already applied by the inline script in <head>
   (to avoid a flash of the wrong theme). This just wires up the button.
   ========================================================================== */

const THEME_STORAGE_KEY = "merdeka_theme";

function initThemeToggle() {
  const toggleButton = document.getElementById("themeToggle");
  const root = document.documentElement;

  const syncAriaState = () => {
    toggleButton.setAttribute("aria-pressed", root.getAttribute("data-theme") === "dark" ? "true" : "false");
  };

  syncAriaState();

  toggleButton.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    syncAriaState();
  });
}

/* ==========================================================================
   Navbar scroll effect (always sticky, adds shadow on scroll)
   ========================================================================== */

function initNavbarScrollEffect() {
  const navbar = document.querySelector(".site-navbar");
  if (!navbar) return;

  const update = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("site-navbar--scrolled");
    } else {
      navbar.classList.remove("site-navbar--scrolled");
    }
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ==========================================================================
   Reading progress bar
   ========================================================================== */

function initReadingProgress() {
  const fill = document.getElementById("readingProgressFill");

  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ==========================================================================
   Scroll reveal (IntersectionObserver)
   ========================================================================== */

function initRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   Back to top button
   ========================================================================== */

function initBackToTop() {
  const button = document.getElementById("backToTop");

  const toggleVisibility = () => {
    if (window.scrollY > 640) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   Navbar active-link state while scrolling
   ========================================================================== */

function initNavActiveState() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-navbar__links .nav-link");

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
}