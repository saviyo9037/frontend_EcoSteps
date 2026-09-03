/**
 * EcoSteps - Global Interactive Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollTop();
  initEcoStreak();
  initNewsletter();
  highlightActiveNav();
});

// Highlight active page link in the navbar
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "EcoSteps.html";
  const navLinks = document.querySelectorAll(".eco-navbar .nav-link");
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPath = href.split("/").pop();
    if (linkPath === currentPath || (currentPath === "" && linkPath === "EcoSteps.html")) {
      link.classList.add("active");
      if (link.parentElement) {
        link.parentElement.classList.add("active");
      }
    }
  });
}

// Scroll to Top Logic
function initScrollTop() {
  let scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) {
    scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollTopBtn";
    scrollBtn.innerHTML = "↑";
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(scrollBtn);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Daily Eco Action & Streak Management
function initEcoStreak() {
  const streakKey = "ecosteps_streak_count";
  const lastActiveKey = "ecosteps_last_active_date";

  let streak = parseInt(localStorage.getItem(streakKey) || "3", 10);
  
  // Render pill in navbar if present
  const streakPills = document.querySelectorAll(".nav-streak-pill");
  streakPills.forEach(pill => {
    pill.innerHTML = `🔥 <span>${streak} Day Streak</span>`;
    pill.addEventListener("click", () => {
      showToast(`Awesome! You're on a ${streak}-day sustainability streak! 🌿`);
    });
  });

  // Action challenge button
  const completeActionBtn = document.getElementById("completeActionBtn");
  if (completeActionBtn) {
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem(lastActiveKey);

    if (lastActive === today) {
      completeActionBtn.innerHTML = "✅ Action Completed Today!";
      completeActionBtn.disabled = true;
      completeActionBtn.classList.remove("btn-eco-primary");
      completeActionBtn.classList.add("btn-secondary");
    }

    completeActionBtn.addEventListener("click", () => {
      streak += 1;
      localStorage.setItem(streakKey, streak.toString());
      localStorage.setItem(lastActiveKey, today);
      
      streakPills.forEach(pill => {
        pill.innerHTML = `🔥 <span>${streak} Day Streak</span>`;
      });

      completeActionBtn.innerHTML = "🎉 Completed for Today!";
      completeActionBtn.disabled = true;
      completeActionBtn.classList.remove("btn-eco-primary");
      completeActionBtn.classList.add("btn-secondary");

      showToast("🌱 Incredible! +1 to your Eco Streak. Keep making everyday differences!");
    });
  }
}

// Newsletter subscription feedback
function initNewsletter() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        showToast(`🌱 Thank you! Eco tips dispatched to ${input.value}`);
        input.value = "";
      }
    });
  });
}

// Toast notification helper
function showToast(message, duration = 3500) {
  let toast = document.querySelector(".eco-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "eco-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, duration);
}

// Global exposure
window.showToast = showToast;
