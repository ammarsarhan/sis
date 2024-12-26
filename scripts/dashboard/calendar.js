// Holidays should be an array of type: {
//     name: string,
//     date: Date,
//     type: "Event" | "Deadline"
// }

var events = [
    {
        name: "Armed Forces Day",
        date: new Date(2024, 11, 4),
        type: "Event"
    },
    {
        name: "Halloween Day",
        date: new Date(2024, 11, 8),
        type: "Event"
    },
    {
        name: "My Birthday",
        date: new Date(2024, 10, 16),
        type: "Event"
    },
    {
        name: "Solia's Birthday",
        date: new Date(2024, 8, 10),
        type: "Event"
    },
    {
        name: "Some Holiday",
        date: new Date(2024, 11, 21),
        type: "Event"
    },
    {
        name: "Random Deadline",
        date: new Date(2024, 11, 29),
        type: "Deadline"
    },
    {
        name: "Random Deadline",
        date: new Date(2024, 9, 29),
        type: "Deadline"
    },
    {
        name: "Random Holiday",
        date: new Date(2024, 9, 20),
        type: "Event"
    }
];

function padMonth (number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}

function handleViewSwitch (e) {
    var checked = e.target.checked;
    var primary = document.getElementById("dashboard-viewing-calendar-primary");
    var secondary = document.getElementById("dashboard-viewing-calendar-secondary");

    if (checked) {
        primary.classList.add("hidden");
        secondary.classList.remove("hidden");
    } else {
        primary.classList.remove("hidden");
        secondary.classList.add("hidden");
    }
}

function handleDateChanged (e) {
    var value = e.target.value;
    var date = new Date(value);

    updateViewDate(date);
}

function getMonthLayout(date) {
    var temp = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var layout = [];

    for (var i = 1; i <= 35; i++) {
        if (i <= temp) {
            layout.push(i);
        } else {
            layout.push(null);
        }
    }

    return layout;
}

function getMonthEvents (date, events) {
    var temp = [];

    for (var i = 0; i <= events.length - 1; i++) {
        var event = events[i];

        if (event.date.getMonth() === date.getMonth()) {
            temp.push(event);
        }
    }

    return temp;
}

function getCalendarActiveDays (date, events) {
    var days = [];
    var filter = getMonthEvents(date, events);

    for (var i = 0; i <= filter.length - 1; i++) {
        var event = filter[i].date.getDate();
        days.push(event);
    }

    return days;
}

function populateListView (date, events) {
    var eventsList = document.getElementById("dashboard-viewing-calendar-event-list");
    var deadlinesList = document.getElementById("dashboard-viewing-calendar-deadline-list");

    var eventFlag = false;
    var deadlineFlag = false;

    // Clear out previous list view items
    if (eventsList.childNodes.length > 0 || deadlinesList.childNodes.length > 0) {
        eventsList.innerHTML = "";
        deadlinesList.innerHTML = "";
    }

    // Get filtered events array
    var filter = getMonthEvents(date, events);

    // Map through all of the filtered events
    for (var i = 0; i <= filter.length - 1; i++) {
        var event = filter[i];
        
        // Check if event date is the same as current date
        if (event.date.getMonth() === date.getMonth()) {
            // Fix styling for when elements are re-added  
            eventsList.style.marginLeft = "1.5rem";
            eventsList.style.marginRight = "1.5rem";
            deadlinesList.style.marginLeft = "1.5rem";
            deadlinesList.style.marginRight = "1.5rem";

            // Create list item DOM element  
            var listElement = document.createElement("li");
            listElement.innerHTML = `
                <span>${event.name}</span>
                <span>${event.date.toLocaleDateString("en-uk", {day: "numeric", month: "long"})}</span>
            `;
    
            // Append to list according to event type
            if (event.type === "Event") {
                eventsList.appendChild(listElement);
                eventFlag = true;
            } else if (event.type === "Deadline") {
                deadlinesList.appendChild(listElement);
                deadlineFlag = true;
            }
        }
    }

    // Display none instead of list elements if none are found
    if (!eventFlag) {
        var listElement = document.createElement("li");
        listElement.style.listStyleType = "None"
        listElement.style.color = "rgb(100, 100, 100)";
        listElement.innerText = "None"
        
        eventsList.style.marginLeft = 0;
        eventsList.style.marginRight = 0;
        
        eventsList.appendChild(listElement);
    }
    
    if (!deadlineFlag) {
        var listElement = document.createElement("li");
        listElement.style.listStyleType = "None"
        listElement.style.color = "rgb(100, 100, 100)";
        listElement.innerText = "None"
        
        deadlinesList.style.marginLeft = 0;
        deadlinesList.style.marginRight = 0;

        deadlinesList.appendChild(listElement);
    }
}

function populateCalendarView (date, events) {
    var calendarLabel = document.getElementById("dashboard-calendar-month-label");
    calendarLabel.innerText = date.toLocaleDateString("en-us", {
        month: "long",
        year: "numeric"
    });

    var layout = getMonthLayout(date);
    var filter = getMonthEvents(date, events);
    var activeDays = getCalendarActiveDays(date, events);

    // Render cells based on layout
    var calendarContainer = document.getElementById("dashboard-viewing-calendar-cells");

    // If cells already exist, clear them out
    if (calendarContainer.childNodes.length > 0) {
        calendarContainer.innerHTML = "";
    }
    
    for (i = 0; i <= layout.length - 1; i++) {
        // If not null, render a normal cell
        if (layout[i] != null) {
            var current = layout[i];

            var calendarCell = document.createElement("div");
            calendarCell.classList.add("dashboard-viewing-calendar-cell");
            
            if (activeDays.includes(current)) {
                calendarCell.classList.add("dashboard-viewing-calendar-cell-active");
                calendarCell.addEventListener("click", function () {
                    // Switch view
                    var input = document.getElementById("dashboard-viewing-date-switch");
                    input.checked = false;

                    var checked = input.checked;
                    var primary = document.getElementById("dashboard-viewing-calendar-primary");
                    var secondary = document.getElementById("dashboard-viewing-calendar-secondary");
                
                    if (checked) {
                        primary.classList.add("hidden");
                        secondary.classList.remove("hidden");
                    } else {
                        primary.classList.remove("hidden");
                        secondary.classList.add("hidden");
                    }                    
                })
            } else {
                calendarCell.classList.add("dashboard-viewing-calendar-cell-inactive");
            }

            calendarCell.innerText = current;
            calendarContainer.appendChild(calendarCell);
        } else {
            var calendarCell = document.createElement("div");
            calendarCell.classList.add("dashboard-viewing-calendar-cell");
            calendarCell.classList.add("dashboard-viewing-calendar-cell-empty");

            calendarContainer.appendChild(calendarCell);
        }
    }

}

function updateViewDate(date) {
    var year = date.getFullYear()
    var month = padMonth(date.getMonth() + 1);

    // Update input value
    var input = document.getElementById("dashboard-viewing-date-input");
    input.setAttribute("value", `${year}-${month}`);

    // Update list view
    populateListView(date, events);

    // Update calendar view
    populateCalendarView(date, events);
}

// Handle Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
    // Add Event Listeners
    var input = document.getElementById("dashboard-viewing-date-input");
    var viewSwitch = document.getElementById("dashboard-viewing-date-switch");

    viewSwitch.addEventListener("change", handleViewSwitch);
    input.addEventListener("change", handleDateChanged);

    // Set inital date value to today's month
    var today = new Date();
    updateViewDate(today);
})