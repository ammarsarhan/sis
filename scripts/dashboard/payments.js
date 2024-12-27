let options = [
    {
        installment: "First Installment",
        semester: "Fall",
        term: "1st Term",
        year: "2024/2025"
    },
    {
        installment: "Second Installment",
        semester: "Fall",
        term: "2nd Term",
        year: "2024/2025"
    },
    {
        installment: "Third Installment",
        semester: "Spring",
        term: "3rd Term",
        year: "2024/2025"
    },
    {
        installment: "Fourth Installment",
        semester: "Spring",
        term: "4th Term",
        year: "2024/2025"
    }
];

let vouchers = [
    {
        name: "Sibling Discount",
        value: 0.2,
        description: "https://www.ejust.edu.eg/ug-scholarships"
    },
    {
        name: "Academic Excellence",
        value: 0.15,
        description: "https://www.ejust.edu.eg/ug-scholarships"
    }
]

// Event Handlers
function handleInstallmentChanged (e) {
    let value = e.target.value;
    let selection = options[0];
    
    switch (value) {
        case "First":
            selection = options[0];
            break;
        case "Second":
            selection = options[1];
            break;
        case "Third":
            selection = options[2];
            break;
        case "Fourth":
            selection = options[3];
            break;
    };

    let installmentLabel = document.getElementById("dashboard-installment-label");
    let semesterLabel = document.getElementById("dashboard-semester-label");
    let termLabel = document.getElementById("dashboard-term-label");
    let yearLabel = document.getElementById("dashboard-year-label");

    installmentLabel.innerText = selection.installment;
    semesterLabel.innerText = selection.semester;
    termLabel.innerText = selection.term;
    yearLabel.innerText = selection.year;
}

// Handle Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
    // Add Event Listeners
    let selector = document.getElementById("dashboard-installment-select");
    selector.addEventListener("change", handleInstallmentChanged);

    // Add Voucher Items & Calculate Discount
    if (vouchers.length > 0) {
        let voucherContainer = document.getElementById("dashboard-payments-vouchers-container");
        let discountFactor = 0;

        for (let i = 0; i <= vouchers.length - 1; i++) {
            let voucherItem = document.createElement("div");
            voucherItem.classList.add("dashboard-payments-primary-information-voucher-item");

            voucherItem.innerHTML = `
                <span>Voucher ${i + 1}</span>
                <div class="dashboard-payments-primary-information-voucher-label">
                    <span>${vouchers[i].name}</span>
                </div>
                <div class="dashboard-payments-primary-information-voucher-label">
                    <span>Value:</span>
                    <span class="text-red">-${vouchers[i].value * 100}%</span>
                </div>
                <div class="dashboard-payments-primary-information-voucher-label">
                    <span>Description:</span>
                    <a href="${vouchers[i].description}" target="_blank">${vouchers[i].name}</a>
                </div>
            `;

            voucherContainer.appendChild(voucherItem);
            discountFactor = discountFactor + vouchers[i].value;
        }

        let initialFee = 18500;
        let discount = initialFee * discountFactor;
        let paid = 0;
        let postDiscount = initialFee - discount;
        let remaining = postDiscount - paid;

        let currency = new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "EGP"
        })

        let feeLabel = document.getElementById("dashboard-payments-fee");
        let discountLabel = document.getElementById("dashboard-payments-discount");
        let dueLabel = document.getElementById("dashboard-payments-due");
        let paidLabel = document.getElementById("dashboard-payments-paid");
        let remainingLabel = document.getElementById("dashboard-payments-remaining");

        feeLabel.innerText = currency.format(initialFee);
        discountLabel.innerText = currency.format(discount);
        dueLabel.innerText = currency.format(postDiscount);
        paidLabel.innerText = currency.format(paid);
        remainingLabel.innerText = currency.format(remaining);
    }
})