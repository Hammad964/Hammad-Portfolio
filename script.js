const projects = [
  {
    title: "AKD-IML",
    platform: "ios",
    category: "Investment & Fintech",
    summary: "A production investment management app I designed and developed end-to-end for secure investor access, fund discovery, portfolio monitoring and transaction workflows.",
    tech: ["Swift", "UIKit", "MVVM", "URLSession", "async/await", "Face ID", "Keychain"],
    highlights: [
      "Designed and developed the iOS application end-to-end, covering public fund information and authenticated investor experiences.",
      "Implemented login, OTP and Face ID / biometric verification with Keychain storage, encryption, SSL pinning and jailbreak detection.",
      "Built investment, redemption, conversion, portfolio, chart, WebView and PDF/report workflows backed by REST APIs."
    ],
    storeUrl: "https://apps.apple.com/us/app/akdiml/id6738114412",
    screenshots: [
      { src: "assets/projects/akd-iml/login.webp", alt: "AKD-IML investor login screen" },
      { src: "assets/projects/akd-iml/otp.webp", alt: "AKD-IML OTP verification screen" },
      { src: "assets/projects/akd-iml/products.webp", alt: "AKD-IML products screen" },
      { src: "assets/projects/akd-iml/investment-products.webp", alt: "AKD-IML investment products screen" },
      { src: "assets/projects/akd-iml/fund-prices.webp", alt: "AKD-IML fund prices screen" },
      { src: "assets/projects/akd-iml/redemption.webp", alt: "AKD-IML redemption workflow screen" }
    ],
    colors: ["#173f7e", "#7d1820"]
  },
  {
    title: "ABL Funds",
    platform: "ios",
    category: "Mutual Funds & Fintech",
    summary: "A live mutual funds application I designed and developed end-to-end for secure investor access, fund discovery, investments, redemptions, transfers and reporting.",
    tech: ["Swift", "UIKit", "MVVM", "async/await", "MapKit", "Security"],
    highlights: [
      "Designed and developed the production iOS application end-to-end, including login and registration, fund information, investment, redemption, fund-to-fund transfer and reporting workflows.",
      "Implemented secure networking and data handling with SSL pinning, encryption, Keychain storage, biometric authentication and jailbreak detection.",
      "Integrated REST APIs, 1Link / Raast investment flows, MapKit / branch-location features, Firebase / FCM, WebView and PDF functionality."
    ],
    storeUrl: "https://apps.apple.com/pk/app/abl-funds/id1071609981",
    screenshots: [
      { src: "assets/projects/abl-funds/login.webp", alt: "ABL Funds login screen" },
      { src: "assets/projects/abl-funds/invest-modes.webp", alt: "ABL Funds investment mode selection with 1Link and Raast" },
      { src: "assets/projects/abl-funds/invest-1link.webp", alt: "ABL Funds Invest Via 1Link screen" },
      { src: "assets/projects/abl-funds/redeem.webp", alt: "ABL Funds online redemption options screen" },
      { src: "assets/projects/abl-funds/fund-transfer.webp", alt: "ABL Funds fund-to-fund transfer screen" },
      { src: "assets/projects/abl-funds/reports.webp", alt: "ABL Funds reports screen" }
    ],
    colors: ["#0f4a91", "#ff641f"]
  }
];

const grid = document.getElementById("projectsGrid");
const projectFilters = document.getElementById("projectFilters");
const projectModal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

function platformLabel(platform) {
  return platform === "ios" ? "iOS" : platform === "android" ? "Android" : "Mobile";
}

function renderFilters() {
  const availablePlatforms = [...new Set(projects.map(project => project.platform))];
  const filters = ["all", ...availablePlatforms];
  projectFilters.innerHTML = filters.map((filter, index) => `
    <button class="filter-btn ${index === 0 ? "active" : ""}" data-filter="${filter}" type="button">
      ${filter === "all" ? "All" : platformLabel(filter)}
    </button>
  `).join("");

  projectFilters.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      projectFilters.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      renderProjects(button.dataset.filter);
    });
  });
}

function projectVisual(project) {
  if (project.screenshots?.length) {
    const shot = project.screenshots[0];
    return `
      <div class="project-art project-art-real">
        <div class="project-phone-frame">
          <span class="project-phone-notch" aria-hidden="true"></span>
          <img src="${shot.src}" alt="${shot.alt}" loading="lazy" />
        </div>
      </div>`;
  }

  const [a, b] = project.colors || ["#26375f", "#121827"];
  return `
    <div class="project-art" aria-hidden="true">
      <div class="device-mini" style="--project-a:${a};--project-b:${b}">
        <div class="device-mini-screen">
          <span>${platformLabel(project.platform)}</span>
          <strong>${project.title}</strong>
          <span>${project.category}</span>
        </div>
      </div>
    </div>`;
}

function projectCard(project, index) {
  return `
    <article class="project-card reveal" data-platform="${project.platform}">
      <div>
        <div class="project-meta">
          <span class="project-platform">${platformLabel(project.platform)}</span>
          <span>${project.category}</span>
        </div>
        <h3>${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <div class="project-tags">${project.tech.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="project-actions">
          <button class="link-btn" type="button" data-project-index="${index}">View case details →</button>
          ${project.storeUrl ? `<a class="link-btn" href="${project.storeUrl}" target="_blank" rel="noopener">View on App Store ↗</a>` : ""}
        </div>
      </div>
      ${projectVisual(project)}
    </article>`;
}

function renderProjects(filter = "all") {
  const visible = projects.filter(project => filter === "all" || project.platform === filter);
  grid.innerHTML = visible.map(project => projectCard(project, projects.indexOf(project))).join("");
  bindProjectButtons();
  observeReveals();
}

function renderGallery(project) {
  if (!project.screenshots?.length) return "";

  return `
    <div class="project-gallery-wrap">
      <p class="modal-section-title">Selected app screens</p>
      <div class="project-gallery" aria-label="${project.title} screenshots">
        ${project.screenshots.map((shot, index) => `
          <button class="gallery-shot" type="button" data-gallery-index="${index}" aria-label="Open screenshot ${index + 1}">
            <img src="${shot.src}" alt="${shot.alt}" loading="lazy" />
          </button>
        `).join("")}
      </div>
    </div>`;
}

function bindProjectButtons() {
  document.querySelectorAll("[data-project-index]").forEach(button => {
    button.addEventListener("click", () => openProject(Number(button.dataset.projectIndex)));
  });
}

function openProject(index) {
  const project = projects[index];
  modalContent.innerHTML = `
    <div class="modal-project-head">
      <p class="section-label">${platformLabel(project.platform)} · ${project.category}</p>
      <h2 id="modalTitle">${project.title}</h2>
      <p>${project.summary}</p>
    </div>
    <div class="project-tags">${project.tech.map(t => `<span>${t}</span>`).join("")}</div>
    <ul class="modal-list">${project.highlights.map(h => `<li>${h}</li>`).join("")}</ul>
    ${renderGallery(project)}
    ${project.storeUrl ? `<a class="btn btn-primary modal-store-btn" href="${project.storeUrl}" target="_blank" rel="noopener">View on App Store ↗</a>` : ""}
  `;

  if (project.screenshots?.length) {
    modalContent.querySelectorAll("[data-gallery-index]").forEach(button => {
      button.addEventListener("click", () => openScreenshot(project, Number(button.dataset.galleryIndex)));
    });
  }

  projectModal.showModal();
}

function openScreenshot(project, index) {
  const shot = project.screenshots[index];
  const lightbox = document.createElement("dialog");
  lightbox.className = "screenshot-lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close screenshot">×</button>
    <img src="${shot.src}" alt="${shot.alt}" />
  `;
  document.body.appendChild(lightbox);
  const close = () => {
    lightbox.close();
    lightbox.remove();
  };
  lightbox.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox.addEventListener("click", event => { if (event.target === lightbox) close(); });
  lightbox.addEventListener("close", () => lightbox.remove(), { once: true });
  lightbox.showModal();
}

modalClose.addEventListener("click", () => projectModal.close());
projectModal.addEventListener("click", event => { if (event.target === projectModal) projectModal.close(); });

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  mobileMenu.hidden = expanded;
});
mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}));

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("portfolio-theme", next);
});

const copyEmail = document.getElementById("copyEmail");
copyEmail.addEventListener("click", async () => {
  const email = "hk959125@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    copyEmail.textContent = "Email copied ✓";
    setTimeout(() => copyEmail.textContent = "Copy email", 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
  }
  document.querySelectorAll(".reveal:not(.in-view)").forEach(el => revealObserver.observe(el));
}

renderFilters();
renderProjects();
observeReveals();
