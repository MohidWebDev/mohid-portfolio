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
