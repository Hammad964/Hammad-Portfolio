const projects = [
  {
    title: "Youniform",
    platform: "android",
    category: "E-commerce",
    summary: "Android e-commerce application supporting product discovery, cart, checkout, authentication and order-related workflows.",
    tech: ["Kotlin", "Retrofit", "Firebase OTP", "Stripe", "Easypaisa"],
    highlights: [
      "Built product browsing, cart, checkout, authentication and order workflows.",
      "Integrated Stripe and Easypaisa payment solutions for checkout flows.",
      "Implemented Firebase OTP, Retrofit-based REST communication and WebView functionality."
    ],
    featured: true,
    storeUrl: "",
    screenshot: "",
    colors: ["#1f6b52", "#0b1712"]
  },
  {
    title: "Froffer",
    platform: "android",
    category: "Engagement",
    summary: "Android engagement application with dynamic API-driven experiences, push notifications and payment-related workflows.",
    tech: ["Kotlin", "Retrofit", "Firebase / FCM", "Teller Payment Gateway"],
    highlights: [
      "Developed user-facing Android features and integrated REST APIs.",
      "Implemented Firebase Cloud Messaging for push notifications and engagement.",
      "Integrated Teller payment gateway functionality and payment processing flows."
    ],
    featured: true,
    storeUrl: "",
    screenshot: "",
    colors: ["#523f7d", "#151028"]
  },
  {
    title: "ABL Funds",
    platform: "ios",
    category: "Fintech",
    summary: "Production mutual funds application supporting portfolio monitoring, fund information and secure investment-related services.",
    tech: ["Swift", "UIKit", "MVVM", "async/await", "MapKit", "Security"],
    highlights: [
      "Developed investment and portfolio features with Swift, UIKit, MVVM and REST APIs.",
      "Implemented SSL pinning, encryption, Keychain secure storage and jailbreak detection.",
      "Worked with MapKit, biometrics, WebView, PDF functionality and Firebase / FCM integrations."
    ],
    featured: true,
    storeUrl: "https://apps.apple.com/pk/app/abl-funds/id1071609981",
    screenshot: "",
    colors: ["#24436e", "#111b2e"]
  },
  {
    title: "AKD-IML",
    platform: "ios",
    category: "Investment",
    summary: "Financial investment application with secure authentication, portfolio experiences, reports and investment-related workflows.",
    tech: ["Swift", "UIKit", "MVVM", "Biometrics", "Security", "Charts"],
    highlights: [
      "Implemented Face ID / biometric verification, OTP flows and Keychain storage.",
      "Built security-sensitive functionality with encryption, SSL pinning and jailbreak detection.",
      "Developed charts, WebView and PDF/report experiences with REST integrations."
    ],
    featured: true,
    storeUrl: "https://apps.apple.com/pk/app/akdiml/id6738114412",
    screenshot: "",
    colors: ["#683b49", "#1f1016"]
  }
];

const grid = document.getElementById("projectsGrid");
const projectModal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const filterButtons = [...document.querySelectorAll(".filter-btn")];

function platformLabel(platform) {
  return platform === "ios" ? "iOS" : platform === "android" ? "Android" : "Mobile";
}

function projectCard(project, index) {
  const [a, b] = project.colors || ["#26375f", "#121827"];
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
          ${project.storeUrl ? `<a class="link-btn" href="${project.storeUrl}" target="_blank" rel="noopener">View store ↗</a>` : ""}
        </div>
      </div>
      <div class="project-art" aria-hidden="true">
        <div class="device-mini" style="--project-a:${a};--project-b:${b}">
          <div class="device-mini-screen">
            <span>${platformLabel(project.platform)}</span>
            <strong>${project.title}</strong>
            <span>${project.category}</span>
          </div>
        </div>
      </div>
    </article>`;
}

function renderProjects(filter = "all") {
  const visible = projects.filter(p => filter === "all" || p.platform === filter);
  grid.innerHTML = visible.map(project => projectCard(project, projects.indexOf(project))).join("");
  bindProjectButtons();
  observeReveals();
}

function bindProjectButtons() {
  document.querySelectorAll("[data-project-index]").forEach(button => {
    button.addEventListener("click", () => openProject(Number(button.dataset.projectIndex)));
  });
}

function openProject(index) {
  const p = projects[index];
  modalContent.innerHTML = `
    <div class="modal-project-head">
      <p class="section-label">${platformLabel(p.platform)} · ${p.category}</p>
      <h2 id="modalTitle">${p.title}</h2>
      <p>${p.summary}</p>
    </div>
    <div class="project-tags">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
    <ul class="modal-list">${p.highlights.map(h => `<li>${h}</li>`).join("")}</ul>
    ${p.storeUrl ? `<a class="btn btn-primary" href="${p.storeUrl}" target="_blank" rel="noopener">Open store listing ↗</a>` : ""}
  `;
  projectModal.showModal();
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

modalClose.addEventListener("click", () => projectModal.close());
projectModal.addEventListener("click", e => { if (e.target === projectModal) projectModal.close(); });

const archiveModal = document.getElementById("archiveModal");
document.getElementById("showArchive").addEventListener("click", () => archiveModal.showModal());
document.getElementById("archiveClose").addEventListener("click", () => archiveModal.close());
archiveModal.addEventListener("click", e => { if (e.target === archiveModal) archiveModal.close(); });

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

renderProjects();
observeReveals();
