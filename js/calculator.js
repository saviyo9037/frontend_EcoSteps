/**
 * EcoSteps - Interactive Eco Impact Calculator
 */

document.addEventListener("DOMContentLoaded", () => {
  const bottleSlider = document.getElementById("sliderBottles");
  const showerSlider = document.getElementById("sliderShower");
  const bulbSlider = document.getElementById("sliderBulbs");
  const compostSlider = document.getElementById("sliderCompost");

  if (!bottleSlider || !showerSlider || !bulbSlider || !compostSlider) return;

  function updateCalculator() {
    const bottles = parseInt(bottleSlider.value, 10);
    const showerMins = parseInt(showerSlider.value, 10);
    const bulbs = parseInt(bulbSlider.value, 10);
    const compostKg = parseInt(compostSlider.value, 10);

    // Display current values next to labels
    document.getElementById("valBottles").innerText = `${bottles} / day`;
    document.getElementById("valShower").innerText = `${showerMins} mins`;
    document.getElementById("valBulbs").innerText = `${bulbs} bulbs`;
    document.getElementById("valCompost").innerText = `${compostKg} kg / wk`;

    // Calculations (Annualized)
    // 1. Plastic bottles: 365 * bottles * 0.083 kg CO2, $1.50 per bottle
    const co2Bottles = bottles * 365 * 0.083;
    const savingsBottles = bottles * 365 * 1.5;

    // 2. Shower: showerMins * 365 * 9.5 Liters water; water heating: 0.045 kg CO2/min; $0.03/min
    const waterSavedLiters = showerMins * 365 * 9.5;
    const co2Shower = showerMins * 365 * 0.045;
    const savingsShower = showerMins * 365 * 0.035;

    // 3. LED Bulbs: bulbs * 35 kg CO2/year, $9.00/year electricity
    const co2Bulbs = bulbs * 35;
    const savingsBulbs = bulbs * 9.0;

    // 4. Compost: compostKg * 52 weeks * 0.65 kg CO2e
    const co2Compost = compostKg * 52 * 0.65;

    // Totals
    const totalCO2 = Math.round(co2Bottles + co2Shower + co2Bulbs + co2Compost);
    const totalSavings = Math.round(savingsBottles + savingsShower + savingsBulbs);
    const treesEquivalent = (totalCO2 / 21).toFixed(1); // 1 mature tree absorbs ~21kg CO2/year

    // Update DOM
    const resultCO2 = document.getElementById("resultCO2");
    const resultSavings = document.getElementById("resultSavings");
    const resultWater = document.getElementById("resultWater");
    const resultTrees = document.getElementById("resultTrees");

    if (resultCO2) resultCO2.innerText = `${totalCO2.toLocaleString()} kg`;
    if (resultSavings) resultSavings.innerText = `$${totalSavings.toLocaleString()}`;
    if (resultWater) resultWater.innerText = `${Math.round(waterSavedLiters).toLocaleString()} L`;
    if (resultTrees) resultTrees.innerText = `${treesEquivalent} trees`;
  }

  // Bind input events for live recalculation
  [bottleSlider, showerSlider, bulbSlider, compostSlider].forEach(slider => {
    slider.addEventListener("input", updateCalculator);
  });

  // Initial calculation run
  updateCalculator();
});
