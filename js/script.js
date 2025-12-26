document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  const images = [
    "/assests/main-bottle.svg",
    "/assests/thumb1.jpg",
    "/assests/thumb2.jpg",
    "/assests/thumb3.jpg",
    "/assests/thumb4.jpg",
    "/assests/thumb1.jpg",
    "/assests/thumb2.jpg",
    "/assests/thumb3.jpg",
  ];

  let currentIndex = 0;

  const mainImage = document.getElementById("mainImage");
  const dots = document.querySelectorAll(".dot");
  const thumbs = document.querySelectorAll(".thumb");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  function updateGallery(index) {
    if (!mainImage || index === currentIndex) return;

    mainImage.classList.add("is-exiting");

    setTimeout(() => {
      currentIndex = index;
      mainImage.src = images[index];

      mainImage.classList.remove("is-exiting");
      mainImage.classList.add("is-entering");

      requestAnimationFrame(() => {
        mainImage.classList.remove("is-entering");
      });

      dots.forEach((d) => d.classList.remove("active"));
      thumbs.forEach((t) => t.classList.remove("active"));

      dots[index]?.classList.add("active");
      thumbs[index]?.classList.add("active");
    }, 180);
  }

  prevBtn &&
    (prevBtn.onclick = () =>
      updateGallery((currentIndex - 1 + images.length) % images.length));

  nextBtn &&
    (nextBtn.onclick = () => updateGallery((currentIndex + 1) % images.length));

  dots.forEach(
    (d) => (d.onclick = () => updateGallery(Number(d.dataset.index)))
  );

  thumbs.forEach(
    (t) => (t.onclick = () => updateGallery(Number(t.dataset.index)))
  );

  updateGallery(0);

  const state = {
    selectedPlan: "single",

    single: {
      fragrance1: "original",
      purchase: "every30",
    },

    double: {
      fragrance1: "original",
      fragrance2: "lily",
      purchase: "every30",
    },
  };

  const addToCartBtn = document.getElementById("addToCartBtn");

  function getActivePlanCard() {
    return document.querySelector(
      `.plan-card[data-plan="${state.selectedPlan}"]`
    );
  }

  function getCartPath() {
    const plan = state.selectedPlan;
    const planState = state[plan];

    if (plan === "single") {
      return `${plan}-${planState.fragrance1}-${planState.purchase}`;
    }

    return `${plan}-${planState.fragrance1}+${planState.fragrance2}-${planState.purchase}`;
  }

  function syncRadios() {
    const card = getActivePlanCard();
    if (!card) return;

    const plan = state.selectedPlan;
    const planState = state[plan];

    // Fragrance radios (1 or 2 groups)
    card.querySelectorAll(".fragrance-grid").forEach((grid) => {
      const group = grid.dataset.fragranceGroup || "1";
      const value = planState[`fragrance${group}`];

      grid.querySelectorAll(".fragrance-item").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.fragrance === value);
      });
    });

    card.querySelectorAll(".included-card").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.purchase === planState.purchase
      );
    });
  }

  document.querySelectorAll("[data-plan-header]").forEach((header) => {
    header.addEventListener("click", () => {
      const card = header.closest(".plan-card");
      if (!card) return;

      state.selectedPlan = card.dataset.plan;

      document
        .querySelectorAll(".plan-card")
        .forEach((c) => c.classList.remove("active"));

      card.classList.add("active");

      syncRadios();
    });
  });

  document.querySelectorAll(".fragrance-grid").forEach((grid) => {
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".fragrance-item");
      if (!btn) return;

      const card = btn.closest(".plan-card");
      if (!card || !card.classList.contains("active")) return;

      const plan = card.dataset.plan;
      const group = grid.dataset.fragranceGroup || "1";

      state[plan][`fragrance${group}`] = btn.dataset.fragrance;

      syncRadios();
    });
  });

  document.querySelectorAll(".included-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".plan-card");
      if (!card) return;

      const plan = card.dataset.plan;
      state.selectedPlan = plan;
      state[plan].purchase = btn.dataset.purchase;

      syncRadios();
    });
  });

  if (addToCartBtn) {
    addToCartBtn.setAttribute("href", "javascript:void(0)");

    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const cartPath = getCartPath();
      const newUrl = `${window.location.pathname}?cart=${cartPath}`;

      window.history.pushState(null, "", newUrl);

      console.log("Added to cart:", cartPath);
    });
  }

  syncRadios();

  const items = document.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove("active");
          i.querySelector(".icon").textContent = "+";
        }
      });

      const isActive = item.classList.contains("active");
      item.classList.toggle("active");
      item.querySelector(".icon").textContent = isActive ? "+" : "−";
    });
  });
});
