var options = [
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

var vouchers = [
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
    var value = e.target.value;
    var selection = options[0];
    
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

    var installmentLabel = document.getElementById("dashboard-installment-label");
    var semesterLabel = document.getElementById("dashboard-semester-label");
    var termLabel = document.getElementById("dashboard-term-label");
    var yearLabel = document.getElementById("dashboard-year-label");

    installmentLabel.innerText = selection.installment;
    semesterLabel.innerText = selection.semester;
    termLabel.innerText = selection.term;
    yearLabel.innerText = selection.year;
}

// Handle Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
    // Add Event Listeners
    var selector = document.getElementById("dashboard-installment-select");
    selector.addEventListener("change", handleInstallmentChanged);

    // Add Voucher Items & Calculate Discount
    if (vouchers.length > 0) {
        var voucherContainer = document.getElementById("dashboard-payments-vouchers-container");
        var discountFactor = 0;

        for (var i = 0; i <= vouchers.length - 1; i++) {
            var voucherItem = document.createElement("div");
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

        var initialFee = 18500;
        var discount = initialFee * discountFactor;
        var paid = 0;
        var postDiscount = initialFee - discount;
        var remaining = postDiscount - paid;

        var currency = new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "EGP"
        })

        var feeLabel = document.getElementById("dashboard-payments-fee");
        var discountLabel = document.getElementById("dashboard-payments-discount");
        var dueLabel = document.getElementById("dashboard-payments-due");
        var paidLabel = document.getElementById("dashboard-payments-paid");
        var remainingLabel = document.getElementById("dashboard-payments-remaining");

        feeLabel.innerText = currency.format(initialFee);
        discountLabel.innerText = currency.format(discount);
        dueLabel.innerText = currency.format(postDiscount);
        paidLabel.innerText = currency.format(paid);
        remainingLabel.innerText = currency.format(remaining);
    }
})