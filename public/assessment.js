document.addEventListener("DOMContentLoaded", function() {
    
    // Bắt sự kiện logo để xóa dữ liệu khi quay về /home
    const homeLink = document.getElementById("homeLink");
    if (homeLink) {
        homeLink.addEventListener("click", function() {
            localStorage.clear();
        });
    }

    const btnContinue = document.getElementById("btnContinue");
    const sectionCompany = document.getElementById("sectionCompany");
    const sectionActivity = document.getElementById("sectionActivity");
    const tabCompany = document.getElementById("tabCompany");
    const tabActivity = document.getElementById("tabActivity");

    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.addEventListener('click', function(e) {
            allCards.forEach(c => c.classList.remove('active-card'));
            this.classList.add('active-card');
            
            const input = this.querySelector('.form-control');
            if (input && e.target !== input) {
                input.focus();
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.card')) {
            allCards.forEach(card => card.classList.remove('active-card'));
        }
    });

    function checkFormValidity() {
        const ind1 = document.getElementById("companyInd1").value.trim();
        const emp = document.getElementById("companyEmp").value.trim();
        const ind2 = document.getElementById("companyInd2").value.trim();
        const cons = document.getElementById("activityCons").value.trim();
        const cost = document.getElementById("activityCost").value.trim();
        const outageChecked = document.querySelector('input[name="powerOutage"]:checked');

        if (ind1 !== "" && emp !== "" && ind2 !== "" && cons !== "" && cost !== "" && outageChecked !== null) {
            btnContinue.disabled = false;
        } else {
            btnContinue.disabled = true;
        }
    }

    document.querySelectorAll('.form-control').forEach(control => {
        control.addEventListener('input', checkFormValidity);
        control.addEventListener('change', checkFormValidity);
    });

    tabCompany.addEventListener("click", function() {
        sectionCompany.classList.remove("d-none");
        sectionActivity.classList.add("d-none");
        tabCompany.classList.add("active");
        tabCompany.classList.remove("inactive");
        tabActivity.classList.add("inactive");
        tabActivity.classList.remove("active");
    });

    tabActivity.addEventListener("click", function() {
        sectionCompany.classList.add("d-none");
        sectionActivity.classList.remove("d-none");
        tabCompany.classList.remove("active");
        tabCompany.classList.add("inactive");
        tabActivity.classList.remove("inactive");
        tabActivity.classList.add("active");
    });

    // Chuyển tới Route /results của Server
    btnContinue.addEventListener("click", function() {
        const consValue = document.getElementById("activityCons").value.trim();
        localStorage.setItem("monthlyElectricity", consValue);
        window.location.href = '/results'; 
    });
});