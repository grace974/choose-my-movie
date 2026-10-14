
/* =========================================================
   CHOOSE MY MOVIE
   script.js
   ========================================================= */

/* =========================================================
   MOBILE MENU
   ========================================================= */

const mobileMenuButton =
  document.getElementById("mobileMenuButton");

const mobileMenu =
  document.getElementById("mobileMenu");

if (mobileMenuButton && mobileMenu) {

  mobileMenuButton.addEventListener("click", () => {

    const isOpen =
      mobileMenu.classList.toggle("open");

    mobileMenuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    mobileMenuButton.textContent =
      isOpen ? "×" : "☰";

  });

  // Close menu after clicking a navigation link

  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        mobileMenuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        mobileMenuButton.textContent = "☰";

      });

    });

}

/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const faqItems =
  document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");

  if (!question || !answer) return;

  question.addEventListener("click", () => {

    const isOpen =
      item.classList.contains("open");

    // Close all other FAQ items

    faqItems.forEach((otherItem) => {

      if (otherItem !== item) {

        otherItem.classList.remove("open");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

      }

    });

    // Toggle selected item

    if (isOpen) {

      item.classList.remove("open");

      question.setAttribute(
        "aria-expanded",
        "false"
      );

      answer.style.maxHeight = null;

    } else {

      item.classList.add("open");

      question.setAttribute(
        "aria-expanded",
        "true"
      );

      answer.style.maxHeight =
        answer.scrollHeight + "px";

    }

  });

});

/* =========================================================
   DEMO MOVIE PICKER
   ========================================================= */

const demoPicker =
  document.getElementById("demoPicker");

const pickerResult =
  document.getElementById("pickerResult");

const demoMovies = [

  {
    title: "The Grand Budapest Hotel",
    details: "Comedy · 1h 39m"
  },

  {
    title: "Everything Everywhere All at Once",
    details: "Mind-Bending · 2h 19m"
  },

  {
    title: "Knives Out",
    details: "Mystery · 2h 10m"
  },

  {
    title: "Palm Springs",
    details: "Romance · 1h 30m"
  },

  {
    title: "Get Out",
    details: "Thriller · 1h 44m"
  },

  {
    title: "The Truman Show",
    details: "Mind-Bending · 1h 43m"
  },

  {
    title: "School of Rock",
    details: "Comedy · 1h 49m"
  },

  {
    title: "About Time",
    details: "Romance · 2h 3m"
  }

];

function getRandomMovie() {

  const randomIndex =
    Math.floor(
      Math.random() * demoMovies.length
    );

  return demoMovies[randomIndex];

}

if (demoPicker && pickerResult) {

  demoPicker.addEventListener("click", () => {

    demoPicker.disabled = true;

    pickerResult.classList.remove("show");

    pickerResult.textContent =
      "Finding your movie...";

    setTimeout(() => {

      const movie =
        getRandomMovie();

      pickerResult.innerHTML =
        `<strong>${movie.title}</strong> · ${movie.details}`;

      pickerResult.classList.add("show");

      demoPicker.disabled = false;

    }, 700);

  });

}

/* =========================================================
   SMOOTH ANCHOR NAVIGATION
   ========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {

        return;

      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

/* =========================================================
   CHECKOUT BUTTON
   =========================================================

   IMPORTANT:

   The HTML currently contains:

       https://buy.stripe.com/

   Replace that placeholder with your real Stripe
   Checkout URL once you create your payment setup.

   For a production application, it is better to create
   Stripe Checkout Sessions server-side rather than
   exposing payment/session creation logic in this file.
   ========================================================= */

const checkoutButton =
  document.getElementById("checkoutButton");

if (checkoutButton) {

  checkoutButton.addEventListener("click", (event) => {

    const checkoutUrl =
      checkoutButton.getAttribute("href");

    if (
      !checkoutUrl ||
      checkoutUrl === "https://buy.stripe.com/"
    ) {

      event.preventDefault();

      alert(
        "Checkout is not connected yet. Add your Stripe Checkout URL before launching."
      );

    }

  });

}

/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

const navbar =
  document.querySelector(".navbar");

function updateNavbar() {

  if (!navbar) return;

  if (window.scrollY > 30) {

    navbar.style.background =
      "rgba(9, 9, 13, 0.72)";

    navbar.style.backdropFilter =
      "blur(18px)";

    navbar.style.webkitBackdropFilter =
      "blur(18px)";

    navbar.style.borderBottom =
      "1px solid rgba(255, 255, 255, 0.05)";

  } else {

    navbar.style.background =
      "transparent";

    navbar.style.backdropFilter =
      "none";

    navbar.style.webkitBackdropFilter =
      "none";

    navbar.style.borderBottom =
      "none";

  }

}

window.addEventListener(
  "scroll",
  updateNavbar,
  {
    passive: true
  }
);

updateNavbar();

/* =========================================================
   SIMPLE REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".problem-card, .feature-card, .theme-card, .step, .pricing-card, .faq-item"
  );

if (
  "IntersectionObserver" in window &&
  revealElements.length
) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.08
      }
    );

  revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(18px)";

    element.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

  });

}

/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElements =
  document.querySelectorAll(
    "[data-current-year]"
  );

yearElements.forEach((element) => {

  element.textContent =
    new Date().getFullYear();

});

/* =========================================================
   KEYBOARD ACCESSIBILITY FOR FAQ
   ========================================================= */

faqItems.forEach((item) => {

  const question =
    item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        question.click();

      }

    }
  );

});

/* =========================================================
   CONSOLE BRANDING
   ========================================================= */

console.log(
  "%cChoose My Movie",
  "font-size: 20px; font-weight: bold; color: #ff6b4a;"
);

console.log(
  "%cStop scrolling. Start watching.",
  "font-size: 12px; color: #a7a4ad;"
);


/* =========================================================
   THEME SELECTOR
   ========================================================= */

   const themeCards = document.querySelectorAll(".theme-card");

   const validThemes = [
     "dark",
     "pastel",
     "matcha",
     "y2k",
     "sunset",
     "espresso",
     "cyber",
     "cloud"
   ];
   
   function applyTheme(theme) {
     if (!validThemes.includes(theme)) {
       theme = "dark";
     }
   
     // This is the important line: apply the theme to the page.
     document.body.dataset.theme = theme;
   
     // Update the selected theme card.
     themeCards.forEach((card) => {
       const isSelected = card.dataset.theme === theme;
   
       card.classList.toggle("active", isSelected);
       card.setAttribute("aria-pressed", String(isSelected));
     });
   
     // Remember the theme for the next visit.
     try {
       localStorage.setItem("chooseMyMovieTheme", theme);
     } catch (error) {
       console.warn("Could not save theme preference.");
     }
   }
   
   // Listen for clicks on every theme card.
   themeCards.forEach((card) => {
     card.addEventListener("click", () => {
       applyTheme(card.dataset.theme);
     });
   });
   
  
// Always open the website in Dark Cinema.
applyTheme("dark");

   