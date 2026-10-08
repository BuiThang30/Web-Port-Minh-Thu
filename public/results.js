document.addEventListener("DOMContentLoaded", function() {
    
    // 1. XÓA DỮ LIỆU VÀ QUAY VỀ TRANG CHỦ KHI NHẤN LOGO
    const homeLink = document.getElementById("homeLink");
    if (homeLink) {
        homeLink.addEventListener("click", function() {
            localStorage.clear();
        });
    }

    // 2. LẤY DỮ LIỆU TỪ TRANG TRƯỚC
    const monthlyKwhRaw = localStorage.getItem("monthlyElectricity");
    const monthlyKwh = monthlyKwhRaw ? parseFloat(monthlyKwhRaw) : 0; 

    const hasCo2Monitoring = false; 
    const hasEnergyManagement = true; 

    // 3. TÍNH TOÁN ENERGY & CARBON
    const EF_VIETNAM = 0.7221; 
    const annualElectricity = monthlyKwh * 12; 
    const electricCo2e = (annualElectricity * EF_VIETNAM) / 1000; 
    const totalCo2e = electricCo2e;

    // Cập nhật DOM
    const resConsumptionEl = document.getElementById("resConsumption");
    const resElectricCo2El = document.getElementById("resElectricCo2");
    const resTotalCo2El = document.getElementById("resTotalCo2");

    if (resConsumptionEl) resConsumptionEl.innerText = annualElectricity.toLocaleString('en-US');
    if (resElectricCo2El) resElectricCo2El.innerText = electricCo2e.toLocaleString('en-US', {maximumFractionDigits: 2});
    if (resTotalCo2El) resTotalCo2El.innerText = totalCo2e.toLocaleString('en-US', {maximumFractionDigits: 2});

    // 4. LOGIC ĐÁNH GIÁ GREEN TRANSITION
    let readinessStatus = "";
    let strengthsText = "Strengths:<br>";
    let gapsText = "Areas For Improvement:<br>";

    if (hasCo2Monitoring && hasEnergyManagement) {
        readinessStatus = "READY";
        strengthsText += "- CO₂ monitoring in place.<br>- Energy management adopted.";
        gapsText += "- No major gaps identified.";
    } 
    else if (hasCo2Monitoring || hasEnergyManagement) {
        readinessStatus = "PARTIALLY READY";
        if (hasCo2Monitoring) {
            strengthsText += "- CO₂ monitoring in place.";
            gapsText += "- Missing Energy Management practices.";
        } else {
            strengthsText += "- Energy management adopted.";
            gapsText += "- Missing CO₂ monitoring.";
        }
    } 
    else {
        readinessStatus = "NEEDS PREPARATION";
        strengthsText += "- No existing green practices identified.";
        gapsText += "- Missing CO₂ monitoring.<br>- Missing Energy Management practices.";
    }

    const readinessEl = document.getElementById("resReadiness");
    const strengthsEl = document.getElementById("resStrengths");
    const gapsEl = document.getElementById("resGaps");

    if (readinessEl) {
        readinessEl.innerText = readinessStatus;
        if(readinessStatus === "READY") {
            readinessEl.style.color = "#4ade80"; 
        } else if (readinessStatus === "PARTIALLY READY") {
            readinessEl.style.color = "#fbbf24"; 
        } else {
            readinessEl.style.color = "#f87171"; 
        }
    }
    if (strengthsEl) strengthsEl.innerHTML = strengthsText;
    if (gapsEl) gapsEl.innerHTML = gapsText;

    // 5. VẼ ĐỒ THỊ VỚI LOGIC RESPONSIVE
    const chartCanvas = document.getElementById('emissionChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        // Nhận diện màn hình nhỏ để thu nhỏ font chữ biểu đồ
        const isMobile = window.innerWidth <= 768;
        const chartFontSize = isMobile ? 10 : 12;

        new Chart(ctx, {
            type: 'bar',
            data: {
                // Rút gọn text nếu trên mobile để tránh vỡ khung
                labels: isMobile 
                    ? ['Electricity', 'Electric CO2e', 'Total CO2e'] 
                    : ['Electricity (MWh)', 'Electric CO2e (t)', 'Total CO2e (t)'],
                datasets: [{
                    label: 'Emission Profile',
                    data: [annualElectricity / 1000, electricCo2e, totalCo2e],
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.8)',
                        'rgba(255, 255, 255, 0.6)',
                        'rgba(255, 255, 255, 0.9)'
                    ],
                    borderColor: '#FFF',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Cho phép đồ thị lấp đầy container
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { 
                            color: '#FFF', 
                            font: { family: 'Actor', size: chartFontSize },
                            maxRotation: isMobile ? 45 : 0 // Xoay nghiêng nhãn trên mobile
                        },
                        grid: { display: false }
                    },
                    y: {
                        ticks: { 
                            color: '#FFF', 
                            font: { family: 'Actor', size: chartFontSize } 
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' }
                    }
                }
            }
        });
    }

    // 6. SỰ KIỆN NÚT SEND
    const btnSend = document.getElementById("btnSend");
    if (btnSend) {
        btnSend.addEventListener("click", function() {
            window.print();
        });
    }
});