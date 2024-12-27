function handleOpenOverlay() {
    var overlay = document.getElementById("dashboard-affairs-attendance-overlay");
    overlay.classList.remove("hidden");
}

function handleCloseOverlay() {
    var overlay = document.getElementById("dashboard-affairs-attendance-overlay");
    overlay.classList.add("hidden");
}

// Handle Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
    // Add Event Listeners
    var tableRows = document.getElementsByClassName("dashboard-affairs-attendance-table-item");
    
    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i];
        row.addEventListener("click", handleOpenOverlay);
    }

    var closeToggle = document.getElementById("dashboard-affairs-attendance-overlay-toggle");
    closeToggle.addEventListener("click", handleCloseOverlay);
});