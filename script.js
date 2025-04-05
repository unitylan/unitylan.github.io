// Use window.onscroll to trigger stickyNavbar
window.onscroll = function() {
    stickyNavbar();
};

function stickyNavbar() {
    const navbar = document.getElementById("navbar");
    const headings = document.querySelectorAll('#navbar-heading, #home-heading, #About-heading, #contact-heading');
    
    if (window.pageYOffset > 50) {
        // Change navbar background and shadow
        navbar.classList.add("bg-white", "shadow-md");
        navbar.classList.remove("bg-transparent");

        // Change heading text color to black
        headings.forEach(function(heading) {
            heading.classList.add("text-black");
            heading.classList.remove("text-white");
        });
    } else {
        // Restore navbar transparency and remove shadow
        navbar.classList.remove("bg-white", "shadow-md");
        navbar.classList.add("bg-transparent");

        // Restore original heading text color
        headings.forEach(function(heading) {
            heading.classList.remove("text-black");
            heading.classList.add("text-white");
        });
    }
}


const marketPrices = { Afrikaner: 15000, Brahman: 5000, Nguni: 10093, Simmental: 15000, Hereford: 20000, chicken: 50, goat: 2200 };
const growthRates = { Afrikaner: "525", Brahman: "639", Nguni: "161", Simmental: "235", Hereford: "215.26", chicken: "2.8", goat: "34" };

//animal selector
document.getElementById("animal-type").addEventListener("change", function() {
  const type = this.value;
  if (type) {
    document.getElementById("growth-rate").textContent = `Growth Rate: ${growthRates[type]}`;
    document.getElementById("market-price").textContent = `Market Price: R${marketPrices[type].toLocaleString()}`;
    document.getElementById("growth-rate-input").value = growthRates[type];
    document.getElementById("market-price-input").value = marketPrices[type];
  } else {
    document.getElementById("growth-rate").textContent = "";
    document.getElementById("market-price").textContent = "";
    document.getElementById("growth-rate-input").value = "";
    document.getElementById("market-price-input").value = "";
  }
});

//profit calculator
document.getElementById("calculate-profit").addEventListener("click", function() {
  const animalCount = parseInt(document.getElementById("animal-count").value);
  const costPerAnimal = parseFloat(document.getElementById("cost-per-animal").value);
  const marketPrice = parseFloat(document.getElementById("market-price-input").value);
  const profitResult = document.getElementById("profit-result");
  
  if (isNaN(animalCount) || isNaN(costPerAnimal) || isNaN(marketPrice)) {
    profitResult.textContent = "Please enter valid numbers.";
    profitResult.classList.add("text-red-600");
    return;
  }
  
  const totalCost = costPerAnimal * animalCount;
  const totalRevenue = marketPrice * animalCount;
  const profit = totalRevenue - totalCost;
  
  profitResult.textContent = `Estimated Profit: R${profit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  profitResult.classList.remove("text-red-600");
  profitResult.classList.add(profit >= 0 ? "text-green-600" : "text-red-600");
});

    // Function to toggle the visibility of the "Read More" content
    function toggleMoreInfo(id) {
        const content = document.getElementById(id);
        content.classList.toggle('hidden');
    }

//accordion & cattle comparison
const cattleData = {
  Afrikaner: {
    Category: "Sanga",
    Weight: "600-800kg",
    FeedEfficiency: "Moderate",
    Production: "Beef",
    AgeAtPuberty: "18-24 months",
    HotClimateAdaptability: "High",
    FleshingAbility: "Moderate",
    MuscleExpression: "Moderate"
  },
  Brahman: {
    Category: "Zebu",
    Weight: "600-800kg",
    FeedEfficiency: "High",
    Production: "Beef",
    AgeAtPuberty: "15-18 months",
    HotClimateAdaptability: "Very High",
    FleshingAbility: "High",
    MuscleExpression: "Moderate"
  },
  Nguni: {
    Category: "Sanga",
    Weight: "400-600kg",
    FeedEfficiency: "Very High",
    Production: "Beef",
    AgeAtPuberty: "12-18 months",
    HotClimateAdaptability: "Very High",
    FleshingAbility: "High",
    MuscleExpression: "Moderate"
  },
  Simmental: {
    Category: "Continental",
    Weight: "700-900kg",
    FeedEfficiency: "Moderate",
    Production: "Beef & Dairy",
    AgeAtPuberty: "15-20 months",
    HotClimateAdaptability: "Low",
    FleshingAbility: "High",
    MuscleExpression: "High"
  },
  Hereford: {
    Category: "British",
    Weight: "600-800kg",
    FeedEfficiency: "High",
    Production: "Beef",
    AgeAtPuberty: "15-20 months",
    HotClimateAdaptability: "Moderate",
    FleshingAbility: "High",
    MuscleExpression: "High"
  }
};

function compareCattle() {
  const breed1 = document.getElementById("breed1").value;
  const breed2 = document.getElementById("breed2").value;
  
  if (breed1 === breed2) {
      alert("Please select two different breeds to compare.");
      return;
  }
  
  const b1 = cattleData[breed1];
  const b2 = cattleData[breed2];
  
  let result = `<h3 class='text-xl font-bold mb-4'>Comparison: ${breed1} vs ${breed2}</h3>`;
  result += `<table class='table-auto border-collapse border border-gray-300 w-full'>`;
  result += `<tr class='bg-gray-200'><th class='border px-4 py-2'>Attribute</th><th class='border px-4 py-2'>${breed1}</th><th class='border px-4 py-2'>${breed2}</th></tr>`;
  
  for (let key in b1) {
      result += `<tr><td class='border px-4 py-2'>${key.replace(/([A-Z])/g, ' $1').trim()}</td><td class='border px-4 py-2'>${b1[key]}</td><td class='border px-4 py-2'>${b2[key]}</td></tr>`;
  }
  result += `</table>`;
  
  //results
  document.getElementById("comparisonResult").innerHTML = result;
}

// Function to toggle accordion
function toggleAccordion(panelId, button) {
  const panel = document.getElementById(panelId);
  const icon = button.querySelector('[data-accordion-icon]'); // Get the icon element
  const activeClasses = button.getAttribute('data-active-classes').split(' ');
  const inactiveClasses = button.getAttribute('data-inactive-classes').split(' ');

  // Toggle the panel visibility
  panel.classList.toggle('hidden');

  // Toggle the button's active and inactive classes
  if (panel.classList.contains('hidden')) {
      button.classList.remove(...activeClasses);
      button.classList.add(...inactiveClasses);
  } else {
      button.classList.remove(...inactiveClasses);
      button.classList.add(...activeClasses);
  }

  // Rotate the icon when the accordion is expanded
  if (icon) {
      icon.classList.toggle('rotate-180');
  }
}
