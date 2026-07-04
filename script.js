const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll("[data-filter]");
const publications = document.querySelectorAll(".publication-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });

    publications.forEach((publication) => {
      const visible = filter === "all" || publication.dataset.status === filter;
      publication.hidden = !visible;
    });
  });
});

const bibtex = {
  hu2026poisoning: `@inproceedings{hu2026poisoning,
  author    = {Hu, Yiting and Duan, Lingjie},
  title     = {Theory of Continual Learning Against Data Poisoning Attacks},
  booktitle = {International Conference on Machine Learning (ICML)},
  year      = {2026},
  url       = {https://icml.cc/virtual/2026/poster/65304}
}`,
  hu2026unlearning: `@inproceedings{hu2026unlearning,
  author    = {Hu, Yiting and Duan, Lingjie and Zhang, Qian},
  title     = {The Forgetting-Retention Dilemma: Certified Unlearning Theory in Continual Learning},
  booktitle = {International Conference on Machine Learning (ICML)},
  year      = {2026},
  url       = {https://icml.cc/virtual/2026/poster/60494}
}`,
  hu2025truthful: `@inproceedings{hu2025truthful,
  author    = {Hu, Yiting and Duan, Lingjie},
  title     = {Truthful Mechanisms for Linear Bandit Games with Private Contexts},
  booktitle = {International Conference on Autonomous Agents and Multiagent Systems (AAMAS)},
  year      = {2025},
  eprint    = {2501.03865},
  eprinttype = {arXiv},
  url       = {https://arxiv.org/abs/2501.03865}
}`,
  hu2026communicationrestriction: `@unpublished{hu2026communicationrestriction,
  author    = {Hu, Yiting and Duan, Lingjie},
  title     = {Human-in-the-Loop Learning Through Communication Restriction},
  note      = {Manuscript under review; earlier version: arXiv:2509.09574},
  year      = {2026},
  eprint    = {2509.09574},
  eprinttype = {arXiv},
  url       = {https://arxiv.org/abs/2509.09574}
}`
};

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const key = button.dataset.copy;
    const original = button.textContent;

    try {
      await navigator.clipboard.writeText(bibtex[key]);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Unavailable";
    }

    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  });
});
