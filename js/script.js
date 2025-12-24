document.addEventListener("DOMContentLoaded", () => {

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

  function updateGallery(index) {
    if (index === currentIndex) return;

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

  document.querySelector(".prev-btn").onclick = () =>
    updateGallery((currentIndex - 1 + images.length) % images.length);

  document.querySelector(".next-btn").onclick = () =>
    updateGallery((currentIndex + 1) % images.length);

  dots.forEach((d) => (d.onclick = () => updateGallery(+d.dataset.index)));
  thumbs.forEach((t) => (t.onclick = () => updateGallery(+t.dataset.index)));

  updateGallery(0);


  const state = {
    single: { fragrance: "original", purchase: "every30" },
    double: { fragrance: "original2", purchase: "every30" },
  };

  let selectedPlan = "single";
  const addToCartBtn = document.getElementById("addToCartBtn");

  function syncRadios() {
    const card = document.querySelector(
      `.plan-card[data-plan="${selectedPlan}"]`
    );

    card
      .querySelectorAll(".fragrance-item")
      .forEach((b) =>
        b.classList.toggle(
          "active",
          b.dataset.fragrance === state[selectedPlan].fragrance
        )
      );

    card
      .querySelectorAll(".included-card")
      .forEach((b) =>
        b.classList.toggle(
          "active",
          b.dataset.purchase === state[selectedPlan].purchase
        )
      );
  }

  function updateAddToCart() {
    const { fragrance, purchase } = state[selectedPlan];
    addToCartBtn.href = `/cart/${selectedPlan}-${fragrance}-${purchase}`;
  }


  document.querySelectorAll("[data-plan-header]").forEach((h) => {
    h.onclick = () => {
      const card = h.closest(".plan-card");
      selectedPlan = card.dataset.plan;

      document
        .querySelectorAll(".plan-card")
        .forEach((c) => c.classList.remove("active"));

      card.classList.add("active");
      syncRadios();
      updateAddToCart();
    };
  });


  document.querySelectorAll(".fragrance-item").forEach((b) => {
    b.onclick = () => {
      const plan = b.closest(".plan-card").dataset.plan;
      state[plan].fragrance = b.dataset.fragrance;
      selectedPlan = plan;
      syncRadios();
      updateAddToCart();
    };
  });

  document.querySelectorAll(".included-card").forEach((b) => {
    b.onclick = () => {
      const plan = b.closest(".plan-card").dataset.plan;
      state[plan].purchase = b.dataset.purchase;
      selectedPlan = plan;
      syncRadios();
      updateAddToCart();
    };
  });

  syncRadios();
  updateAddToCart();
});
