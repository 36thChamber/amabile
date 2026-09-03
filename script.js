const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");
const year = document.querySelector("[data-year]");
const whatsappNumber = "5551999596080";

year.textContent = new Date().getFullYear();

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menu.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 24),
  { passive: true },
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const message = `Oi, Fernanda! Vim pelo site e gostaria de conhecer as opções de ${product}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
});

const lightbox = document.querySelector("[data-lightbox-dialog]");
const lightboxImage = document.querySelector("[data-lightbox-image]");

document.querySelectorAll("[data-lightbox]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const sourceImage = link.querySelector("img");
    lightboxImage.src = link.href;
    lightboxImage.alt = sourceImage.alt;
    lightbox.showModal();
  });
});

function closeLightbox() {
  lightbox.close();
  lightboxImage.src = "";
}

document.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
