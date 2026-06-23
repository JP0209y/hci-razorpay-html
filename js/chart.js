document.addEventListener("DOMContentLoaded", function () {
  const allData = [
    {
      name: "HCI eZEN",
      margin: 23,
      brand: "HCI",
      mrp: "₹2,99,999",
      billing: "₹1,34,999.55",
      selling: "₹1,75,000",
    },
    {
      name: "HCI eGENKI PRO",
      margin: 25,
      brand: "HCI",
      mrp: "₹2,99,999",
      billing: "₹1,34,999.55",
      selling: "₹1,79,999",
    },
    {
      name: "HCI eRELAXIC LITE",
      margin: 35,
      brand: "HCI",
      mrp: "₹3,99,999",
      billing: "₹1,79,999.55",
      selling: "₹2,74,999",
    },
    {
      name: "HCI eRELAXIC PRO",
      margin: 36,
      brand: "HCI",
      mrp: "₹6,49,999",
      billing: "₹2,92,499.55",
      selling: "₹4,54,999",
    },
    {
      name: "HCI eRELAXIC NEO",
      margin: 43,
      brand: "HCI",
      mrp: "₹6,99,999",
      billing: "₹3,14,999.55",
      selling: "₹5,49,999",
    },
     {
      name: "HCI eLEG",
      margin: 34,
      brand: "HCI",
      mrp: "₹21,999",
      billing: "₹9,899.55",
      selling: "₹14,999",
    },
    {
      name: "HCI eFOOTIO",
      margin: 40,
      brand: "HCI",
      mrp: "₹39,999",
      billing: "₹17,999.55",
      selling: "₹29,999",
    },
    {
      name: "HCI eKIMOCHI",
      margin: 40,
      brand: "HCI",
      mrp: "₹59,999",
      billing: "₹26,999.55",
      selling: "₹44,999",
    },
    {
      name: "ROTAI R-ELAX",
      margin: 10,
      brand: "ROTAI",
      mrp: "₹1,99,999",
      billing: "₹89,999.55",
      selling: "₹99,999",
    },
    {
      name: "ROTAI R-NEXA",
      margin: 27,
      brand: "ROTAI",
      mrp: "₹6,99,999",
      billing: "₹3,14,999.55",
      selling: "₹3,99,999",
    },
    {
      name: "ROTAI R-ZENORA",
      margin: 33,
      brand: "ROTAI",
      mrp: "₹9,99,999",
      billing: "₹4,49,999.55",
      selling: "₹5,99,999",
    },
    {
      name: "ROTAI R-AUREX",
      margin: 44,
      brand: "ROTAI",
      mrp: "₹9,99,999",
      billing: "₹4,49,999.55",
      selling: "₹6,49,999",
    },
    {
      name: "ROTAI R-VELOR",
      margin: 45,
      brand: "ROTAI",
      mrp: "₹12,99,999",
      billing: "₹5,84,999.55",
      selling: "₹8,49,999",
    },
   
  ];

  const brandColors = {
    HCI: "#7a5137",
    ROTAI: "#b07a4b",
  };

  let chart = null;

  const chartCanvas = document.getElementById("roiChart");
  const chartWrap = document.getElementById("chart-wrap");
  const filterButtons = document.querySelectorAll(".pricing-filter");

  function getFilteredData(brand) {
    if (brand === "all") return allData;
    return allData.filter((item) => item.brand === brand);
  }

  function updateStats(data) {
    const margins = data.map((item) => item.margin);

    const avg = Math.round(
      margins.reduce((total, value) => total + value, 0) / margins.length
    );

    const max = Math.max(...margins);

    document.getElementById("avg-margin").textContent = avg + "%";
    document.getElementById("max-margin").textContent = max + "%";
    document.getElementById("product-count").textContent = data.length;
  }

  function updateChartHeight(data) {
    const height = Math.max(460, data.length * 42 + 120);
    chartWrap.style.height = height + "px";
  }

  function buildChart(data) {
    if (!chartCanvas || typeof Chart === "undefined") return;

    const labels = data.map((item) => item.name);
    const values = data.map((item) => item.margin);
    const colors = data.map((item) => brandColors[item.brand]);

    updateChartHeight(data);

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Dealer Margin",
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 0,
            borderRadius: 10,
            barThickness: 18,
            maxBarThickness: 22,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 900,
          easing: "easeOutQuart",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#4e3b2a",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            padding: 14,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
              title: function (context) {
                return context[0].label;
              },
              label: function (context) {
                const item = data[context.dataIndex];

                return [
                  "Margin: " + item.margin + "%",
                  "MRP: " + item.mrp,
                  "Billing: " + item.billing,
                  "Selling: " + item.selling,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 50,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
              color: "#999999",
              font: {
                size: 12,
                weight: "600",
              },
            },
            grid: {
              color: "rgba(78, 59, 42, 0.10)",
              drawBorder: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: "#4e3b2a",
              font: {
                size: 12,
                weight: "700",
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    });
  }

  function setActiveButton(activeBrand) {
    filterButtons.forEach((button) => {
      const brand = button.getAttribute("data-brand");

      if (brand === activeBrand) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const brand = this.getAttribute("data-brand");
      const filteredData = getFilteredData(brand);

      setActiveButton(brand);
      updateStats(filteredData);
      buildChart(filteredData);
    });
  });

  updateStats(allData);
  buildChart(allData);
});