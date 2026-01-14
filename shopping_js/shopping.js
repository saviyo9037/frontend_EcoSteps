




const echo = {
  "reusable water bottle": "Made from BPA-free materials. Cuts down on plastic waste.",
  "cloth grocery bag": "Reusable and washable. Reduces plastic bag use.",
  "solar power bank": "Uses solar energy to charge your device. Saves electricity.",
  "metal straw set": "Durable and reusable. Reduces single-use plastic.",
  "eco-friendly notebook": "Made from recycled paper. Tree-friendly.",
  "led bulb": "Energy-efficient and long-lasting. Reduces power use."
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h2").innerText.trim().toLowerCase();
      const info = echo[title];
      const exinfo = card.querySelector(".eco-info");
      if (exinfo) {

        exinfo.remove();
        return;


      }

      const para = document.createElement("p");

      para.className = "eco-info text-muted mt-2";
      
      para.innerText = info || "More eco information";
      card.querySelector(".card-body").appendChild(para);
    });
  });
});

