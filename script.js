document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal using IntersectionObserver
const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealObserver.unobserve(entry.target); // animate once, not every scroll
      }
    });
  },
  {
    threshold: 0.15, // triggers when 15% of the section is visible
  },
);

sections.forEach((section) => revealObserver.observe(section));

// Hero is visible on load, reveal it immediately
document.getElementById("hero").classList.add("reveal");

// Highlight active nav link based on scroll position
const navLinks = document.querySelectorAll("nav ul li a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`,
          );
        });
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "-80px 0px -20% 0px",
  },
);

sections.forEach((section) => navObserver.observe(section));

// Fallback: if scrolled to (or near) bottom of page, force-activate the last section's nav link
window.addEventListener("scroll", () => {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
  if (scrolledToBottom) {
    const lastSection = sections[sections.length - 1];
    const id = lastSection.getAttribute("id");
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navLinksList = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinksList.classList.toggle("show");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close dropdown when a nav link is clicked
navLinksList.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksList.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Close dropdown when clicking outside of it
document.addEventListener("click", (event) => {
  const isClickInsideNav = event.target.closest("nav");
  if (!isClickInsideNav && navLinksList.classList.contains("show")) {
    navLinksList.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});
