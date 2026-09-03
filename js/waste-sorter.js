/**
 * EcoSteps - Smart "What Goes Where?" Waste Sorter
 */

const wasteDatabase = [
  {
    name: "Plastic Bottle (PET)",
    keywords: ["water bottle", "soda bottle", "beverage container", "pet"],
    bin: "Blue / Yellow Recyclable Bin",
    category: "Plastic",
    badge: "badge-eco-green",
    status: "100% Recyclable",
    prep: "Empty liquid, quick rinse, squash flat, and replace cap so it stays in the sorting process.",
    icon: "🧴"
  },
  {
    name: "Cardboard Pizza Box",
    keywords: ["pizza", "box", "greasy box", "takeout box"],
    bin: "Split: Lid (Recycling) / Base (Compost or Trash)",
    category: "Paper / Compost",
    badge: "badge-eco-amber",
    status: "Special Preparation",
    prep: "Tear off clean lid for paper recycling. If base is greasy or covered in cheese, compost it or put in general waste.",
    icon: "🍕"
  },
  {
    name: "Banana Peel & Fruit Scraps",
    keywords: ["food waste", "fruit", "vegetable", "peel", "leftover", "compost"],
    bin: "Green Organic / Compost Bin",
    category: "Bio-Waste",
    badge: "badge-eco-green",
    status: "100% Compostable",
    prep: "Remove stickers, plastic tags, or twist-ties. Add directly to household compost or curbside green bin.",
    icon: "🍌"
  },
  {
    name: "Lithium & Alkaline Batteries",
    keywords: ["battery", "aa", "aaa", "cell", "lithium", "powerbank"],
    bin: "Authorized E-Waste / Battery Drop-Off",
    category: "Hazardous E-Waste",
    badge: "badge-eco-purple",
    status: "Never In Household Bins (Fire Hazard!)",
    prep: "Tape terminal ends with clear tape to prevent short circuits. Drop off at collection bins in supermarkets/hardware stores.",
    icon: "🔋"
  },
  {
    name: "Aluminum Drink Can",
    keywords: ["coke can", "beer can", "tin", "aluminum", "can"],
    bin: "Dry Recyclable Bin",
    category: "Metal",
    badge: "badge-eco-green",
    status: "Infinitely Recyclable",
    prep: "Rinse out remaining liquid. Leave pull tab attached. Ready for recycling with 95% less energy than new aluminum.",
    icon: "🥫"
  },
  {
    name: "Old Smartphone / Laptop",
    keywords: ["phone", "electronics", "laptop", "charger", "gadget", "tablet", "e-waste"],
    bin: "Certified E-Waste Recycling Center",
    category: "E-Waste",
    badge: "badge-eco-purple",
    status: "Precious Metals Recovery",
    prep: "Factory reset and wipe personal data. Keep chargers together. Donate if functioning or hand to e-waste recyclers.",
    icon: "📱"
  },
  {
    name: "Glass Jar & Bottles",
    keywords: ["jam jar", "pasta sauce", "glass container", "wine bottle"],
    bin: "Glass Recycling Station",
    category: "Glass",
    badge: "badge-eco-green",
    status: "100% Recyclable",
    prep: "Rinse clean. Metal lids can usually be recycled separately with metals. No need to scrape labels completely.",
    icon: "🫙"
  },
  {
    name: "Plastic Grocery Bags & Film",
    keywords: ["plastic bag", "polythene", "shrink wrap", "bubble wrap"],
    bin: "Store Soft Plastic Drop-Off (Not Curbside)",
    category: "Soft Plastics",
    badge: "badge-eco-amber",
    status: "Store Drop-Off Only",
    prep: "Do NOT place loose in curbside bins (tangles sorting machines). Return to store collection bins or reuse as trash liners.",
    icon: "🛍️"
  },
  {
    name: "Broken Ceramics / Mug",
    keywords: ["broken mug", "plate", "ceramic", "porcelain", "flower pot"],
    bin: "General Landfill Waste",
    category: "Non-Recyclable",
    badge: "badge-eco-amber",
    status: "Non-Recyclable Glass",
    prep: "Ceramics melt at a different temperature than bottle glass and contaminate batches. Wrap securely and dispose in general trash.",
    icon: "☕"
  },
  {
    name: "Coffee Grounds & Paper Filters",
    keywords: ["coffee", "espresso", "filter paper"],
    bin: "Green Organic / Compost Bin",
    category: "Bio-Waste",
    badge: "badge-eco-green",
    status: "Compostable & Soil Enricher",
    prep: "Both unbleached filter papers and grounds decompose rapidly and add rich nitrogen to garden soil.",
    icon: "☕"
  },
  {
    name: "Styrofoam / Polystyrene Packaging",
    keywords: ["styrofoam", "thermocol", "packing peanuts", "foam"],
    bin: "General Waste (or Specialized Depot)",
    category: "Polystyrene",
    badge: "badge-eco-amber",
    status: "Non-Curbside",
    prep: "Rarely accepted in standard curbside bins. Break down into general waste unless a local EPS drop-off facility exists.",
    icon: "📦"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("wasteSearchInput");
  const resultsContainer = document.getElementById("wasteSearchResults");
  const defaultList = document.getElementById("wasteDefaultList");

  if (!searchInput || !resultsContainer) return;

  function renderWasteResults(items) {
    if (items.length === 0) {
      resultsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <div style="font-size: 3rem;">🔍</div>
          <h4 class="mt-2">Item not found in quick lookup</h4>
          <p class="text-muted">Tip: When in doubt, avoid contaminating your clean recycling bin. Search another keyword like "plastic", "food", or "battery".</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = items.map(item => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="eco-card p-4 h-100" style="border-top: 4px solid var(--primary);">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <span style="font-size: 2.2rem;">${item.icon}</span>
            <span class="badge-eco ${item.badge}">${item.status}</span>
          </div>
          <h4 class="h5 font-weight-bold mb-1">${item.name}</h4>
          <div class="text-primary font-weight-bold mb-2 small" style="color: var(--primary) !important;">
            <strong>Target Bin:</strong> ${item.bin}
          </div>
          <p class="text-muted small mb-0 mt-auto" style="line-height: 1.5;">
            <strong>How to prep:</strong> ${item.prep}
          </p>
        </div>
      </div>
    `).join("");
  }

  // Render initial items
  renderWasteResults(wasteDatabase.slice(0, 6));

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      renderWasteResults(wasteDatabase.slice(0, 6));
      return;
    }

    const matched = wasteDatabase.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.bin.toLowerCase().includes(query) ||
      item.keywords.some(k => k.toLowerCase().includes(query))
    );

    renderWasteResults(matched);
  });
});
