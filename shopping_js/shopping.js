/**
 * EcoSteps - Sustainable Shopping Guide Interactive Logic
 */

const ecoProducts = [
  {
    id: "water-bottle",
    title: "Reusable Water Bottle",
    category: "reusable",
    image: "image/waterbottle.png",
    subtitle: "Durable stainless steel insulation for daily hydration",
    badge: "BPA-Free Steel",
    annualImpact: "Eliminates ~167 single-use plastic bottles/yr",
    swapFor: "Replaces disposable PET bottled water",
    materials: "Food-grade 18/8 Stainless Steel, double-wall vacuum insulated",
    lifespan: "10+ years with daily use",
    ecoPoints: "+50 EcoScore",
    details: "By choosing a reusable bottle, you prevent toxic chemical leaching, save approximately $250 annually on bottled drinks, and prevent non-biodegradable plastics from polluting marine habitats."
  },
  {
    id: "cloth-bag",
    title: "Cloth Grocery Bag",
    category: "reusable",
    image: "image/grocery_bag.png",
    subtitle: "Heavy-duty organic cotton tote for market shopping",
    badge: "Organic Cotton",
    annualImpact: "Replaces ~450 plastic grocery sacks/yr",
    swapFor: "Replaces single-use LDPE shopping bags",
    materials: "100% GOTS-Certified Organic Unbleached Cotton canvas",
    lifespan: "Machine washable, 5+ years lifetime",
    ecoPoints: "+40 EcoScore",
    details: "Traditional plastic bags take upwards of 500 years to break down into harmful microplastics. A single sturdy canvas tote can carry twice the weight of standard checkout bags without tearing."
  },
  {
    id: "solar-powerbank",
    title: "Solar Power Bank",
    category: "solar",
    image: "image/solar_powerbank.png",
    subtitle: "Harness clean solar energy on the move",
    badge: "Clean Solar Energy",
    annualImpact: "Zero grid power needed for mobile charging",
    swapFor: "Replaces non-renewable wall power while outdoors",
    materials: "High-efficiency monocrystalline solar cells, rugged shock-resistant casing",
    lifespan: "500+ recharge cycles",
    ecoPoints: "+65 EcoScore",
    details: "Equipped with dual USB ports and rugged IP65 water resistance, this power bank absorbs sun rays to keep your communication devices active anywhere without drawing fossil fuel generated electricity."
  },
  {
    id: "metal-straw",
    title: "Metal Straw Set",
    category: "reusable",
    image: "image/straw.png",
    subtitle: "Travel-ready stainless straws with cleaning brush",
    badge: "Zero Waste",
    annualImpact: "Prevents ~580 single-use straws over lifetime",
    swapFor: "Replaces plastic drinking straws",
    materials: "Surgical-grade 304 stainless steel + silicone soft-touch tips",
    lifespan: "Indefinite / Lifetime durability",
    ecoPoints: "+35 EcoScore",
    details: "Plastic straws rank among the top 10 most common marine debris items. This compact travel kit includes straight and bent straws with a plant-fiber bristle brush for effortless hygiene on the go."
  },
  {
    id: "recycled-notebook",
    title: "Eco-Friendly Notebook",
    category: "study",
    image: "image/notebook.png",
    subtitle: "Smooth writing paper crafted without felling trees",
    badge: "100% Recycled",
    annualImpact: "Conserves 32 Liters of water vs virgin paper",
    swapFor: "Replaces bleached virgin tree-pulp paper",
    materials: "Post-consumer recycled paper, bound with non-toxic soy-based ink",
    lifespan: "Archival grade, fully recyclable at end-of-life",
    ecoPoints: "+45 EcoScore",
    details: "Using recycled post-consumer waste paper saves mature forest trees, cuts manufacturing water consumption by 60%, and drastically reduces bleaching chemicals discharged into regional rivers."
  },
  {
    id: "led-bulb",
    title: "High-Efficiency LED Bulb",
    category: "home",
    image: "image/bulb.png",
    subtitle: "85% lower electricity use than traditional bulbs",
    badge: "Energy Star",
    annualImpact: "Saves ~45 kWh & $14/year per fixture",
    swapFor: "Replaces 60W incandescent & halogen bulbs",
    materials: "Solid-state semiconductors, shatterproof thermal polycarbonate",
    lifespan: "Up to 25,000 operational hours (approx. 15 yrs)",
    ecoPoints: "+60 EcoScore",
    details: "LED lighting generates pure light with almost zero wasted infrared heat. Swapping just 5 high-use household bulbs prevents nearly 150 kg of annual greenhouse gas emissions."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("shoppingProductGrid");
  const searchInput = document.getElementById("shoppingSearchInput");
  const filterPills = document.querySelectorAll(".shopping-filter-pill");
  const checklistCounter = document.getElementById("checklistCount");

  // Load saved checklist from localStorage
  const checklistKey = "ecosteps_user_kit";
  let userKit = JSON.parse(localStorage.getItem(checklistKey) || "[]");

  function updateChecklistBadge() {
    if (checklistCounter) {
      checklistCounter.innerText = userKit.length.toString();
    }
  }

  function renderProducts(items) {
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div style="font-size: 3rem;">🛍️</div>
          <h4 class="mt-2 font-weight-bold">No matching products found</h4>
          <p class="text-muted">Try clearing your search query or selecting "All Products".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(p => {
      const isOwned = userKit.includes(p.id);
      return `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="eco-card product-item-card h-100" data-id="${p.id}">
            <div class="product-image-wrap p-4 text-center" style="background: #f8fafc; border-bottom: 1px solid var(--border-light);">
              <span class="badge-eco badge-eco-green position-absolute top-3 start-3" style="top: 15px; left: 15px;">
                ${p.badge}
              </span>
              <img src="${p.image}" alt="${p.title}" class="img-fluid" style="max-height: 140px; object-fit: contain; transition: transform 0.3s ease;">
            </div>
            <div class="card-body p-4 d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted small text-uppercase" style="letter-spacing: 0.05em; font-weight: 700;">${p.category}</span>
                <span class="badge-eco badge-eco-blue">${p.ecoPoints}</span>
              </div>
              <h3 class="h5 mb-2 font-weight-bold">${p.title}</h3>
              <p class="text-muted small mb-3">${p.subtitle}</p>
              
              <div class="eco-impact-highlight p-2 mb-3 rounded" style="background: #ecfdf5; border-left: 3px solid var(--primary); font-size: 0.82rem; color: #065f46; font-weight: 600;">
                🌱 ${p.annualImpact}
              </div>

              <div class="mt-auto pt-3 border-top d-flex gap-2 justify-content-between align-items-center">
                <button class="btn btn-sm btn-eco-primary btn-quick-view flex-grow-1" data-id="${p.id}">
                  Eco Breakdown
                </button>
                <button class="btn btn-sm ${isOwned ? 'btn-success' : 'btn-outline-secondary'} btn-toggle-kit" data-id="${p.id}" title="${isOwned ? 'In Your Eco Kit' : 'Add to Eco Kit'}">
                  ${isOwned ? '✓ In My Kit' : '+ I Use This'}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Attach click events
    container.querySelectorAll(".btn-quick-view").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const pid = e.currentTarget.getAttribute("data-id");
        openProductModal(pid);
      });
    });

    container.querySelectorAll(".btn-toggle-kit").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const pid = e.currentTarget.getAttribute("data-id");
        toggleItemInKit(pid);
      });
    });
  }

  function toggleItemInKit(productId) {
    const idx = userKit.indexOf(productId);
    const prod = ecoProducts.find(p => p.id === productId);
    if (idx > -1) {
      userKit.splice(idx, 1);
      window.showToast(`Removed "${prod?.title || 'Item'}" from your Eco Kit.`);
    } else {
      userKit.push(productId);
      window.showToast(`🎉 Added "${prod?.title || 'Item'}" to your Sustainable Kit!`);
    }
    localStorage.setItem(checklistKey, JSON.stringify(userKit));
    updateChecklistBadge();
    applyCurrentFilters();
  }

  function openProductModal(productId) {
    const prod = ecoProducts.find(p => p.id === productId);
    if (!prod) return;

    let modalEl = document.getElementById("ecoProductModal");
    if (!modalEl) {
      const modalMarkup = `
        <div class="modal fade" id="ecoProductModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content" style="border-radius: var(--radius-lg); border: none; overflow: hidden;">
              <div class="modal-header text-white" style="background: var(--primary-gradient);">
                <h5 class="modal-title font-weight-bold" id="modalProdTitle">Product Details</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body p-4" id="modalProdBody">
                <!-- Content inserted dynamically -->
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalMarkup);
      modalEl = document.getElementById("ecoProductModal");
    }

    const isOwned = userKit.includes(prod.id);
    const modalBody = document.getElementById("modalProdBody");
    modalBody.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-5 text-center p-3" style="background: #f8fafc; border-radius: var(--radius-md);">
          <img src="${prod.image}" alt="${prod.title}" class="img-fluid mb-3" style="max-height: 180px; object-fit: contain;">
          <div class="badge-eco badge-eco-green mb-2">${prod.badge}</div>
          <p class="text-muted small mb-0">Expected Lifespan: <strong>${prod.lifespan}</strong></p>
        </div>
        <div class="col-md-7">
          <h4 class="font-weight-bold mb-2">${prod.title}</h4>
          <p class="text-muted small">${prod.details}</p>
          
          <div class="mb-3">
            <div class="small text-muted font-weight-bold">MATERIALS & CONSTRUCTION:</div>
            <div class="small text-dark">${prod.materials}</div>
          </div>

          <div class="mb-3">
            <div class="small text-muted font-weight-bold">SUSTAINABLE SWAP:</div>
            <div class="small text-success font-weight-bold">${prod.swapFor}</div>
          </div>

          <div class="p-3 rounded mb-3" style="background: #f0fdf4; border: 1px solid #bbf7d0;">
            <div class="small font-weight-bold text-success mb-1">🌍 Measurable Impact:</div>
            <div class="small text-dark">${prod.annualImpact}</div>
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-eco-primary btn-sm flex-grow-1" id="modalKitActionBtn">
              ${isOwned ? '✓ In Your Eco Kit' : '+ Add to My Eco Kit'}
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modalProdTitle").innerText = prod.title;

    const modalKitBtn = document.getElementById("modalKitActionBtn");
    modalKitBtn.addEventListener("click", () => {
      toggleItemInKit(prod.id);
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) bsModal.hide();
    });

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  let activeCategory = "all";
  let searchQuery = "";

  function applyCurrentFilters() {
    const filtered = ecoProducts.filter(p => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery) ||
                          p.subtitle.toLowerCase().includes(searchQuery) ||
                          p.materials.toLowerCase().includes(searchQuery) ||
                          p.annualImpact.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    renderProducts(filtered);
  }

  // Filter pill clicks
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "all";
      applyCurrentFilters();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyCurrentFilters();
    });
  }

  // Initial render
  updateChecklistBadge();
  renderProducts(ecoProducts);
});
