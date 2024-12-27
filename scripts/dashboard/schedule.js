// Schedule will be an array of 4/5 arrays,
// where a single item will contain:
// {
//     slot: string,
//     course: string,
//     location: string,
//     type: string
// }

let schedule = [
    [
        {
            slot: "9:00-9:45",
            course: "CSC 211 Software Engineering",
            location: "B18 G01",
            type: "Lab"
        },
        {
            slot: "9:45-10:30",
            course: "CSC 211 Software Engineering",
            location: "B18 G01",
            type: "Lab"
        },
        {
            slot: "10:45-11:30",
            course: "MTH 212 Probability & Statistics",
            location: "B18 G01",
            type: "Lab"
        },
        {
            slot: "11:30-12:15",
            course: "MTH 212 Probability & Statistics",
            location: "B18 G01",
            type: "Lab"
        },
        {
            slot: "12:30-1:15",
            course: "CNC 111 Networks and Web Programming",
            location: "COE F2.17",
            type: "Lab"
        },
        {
            slot: "1:15-2:00",
            course: "CNC 111 Networks and Web Programming",
            location: "COE F2.17",
            type: "Lab"
        },
        {
            slot: "2:15-3:00",
            course: null
        },
        {
            slot: "3:00-3:45",
            course: null
        }
    ],
    [
        {
            slot: "9:00-9:45",
            course: "LRA 306 Natural Resources and Sustainability",
            location: "Green Hall",
            type: "Lecture"
        },
        {
            slot: "9:45-10:30",
            course: "LRA 306 Natural Resources and Sustainability",
            location: "Green Hall",
            type: "Lecture"
        },
        {
            slot: "10:45-11:30",
            course: null
        },
        {
            slot: "11:30-12:15",
            course: null
        },
        {
            slot: "12:30-1:15",
            course: "MTH 212 Probability and Statistics",
            location: "Green Hall",
            type: "Lecture"
        },
        {
            slot: "1:15-2:00",
            course: "MTH 212 Probability and Statistics",
            location: "Green Hall",
            type: "Lecture"
        },
        {
            slot: "2:15-3:00",
            course: "CSE 214 Computer Organization",
            location: "F2.16",
            type: "Lab"
        },
        {
            slot: "3:00-3:45",
            course: "CSE 214 Computer Organization",
            location: "F2.16",
            type: "Lab"
        }
    ],
    [
        {
            slot: "9:00-9:45",
            course: "ACM 215 Ordinary Differential Equations",
            location: "B10 F1.07",
            type: "Tutorial"
        },
        {
            slot: "9:45-10:30",
            course: "ACM 215 Ordinary Differential Equations",
            location: "B10 F1.07",
            type: "Tutorial"
        },
        {
            slot: "10:45-11:30",
            course: "ACM 215 Ordinary Differential Equations",
            location: "Yellow Hall",
            type: "Lecture"
        },
        {
            slot: "11:30-12:15",
            course: "ACM 215 Ordinary Differential Equations",
            location: "Yellow Hall",
            type: "Lecture"
        },
        {
            slot: "12:30-1:15",
            course: "LRA 403 Japanese Language (3)",
            location: "B10 F1.10",
            type: "Lecture"
        },
        {
            slot: "1:15-2:00",
            course: "LRA 403 Japanese Language (3)",
            location: "B10 F1.10",
            type: "Lecture"
        },
        {
            slot: "2:15-3:00",
            course: "CSE 214 Networks and Web Programming",
            location: "B8 Theatre",
            type: "Lecture"
        },
        {
            slot: "3:00-3:45",
            course: "CSE 214 Networks and Web Programming",
            location: "B8 Theatre",
            type: "Lecture"
        }
    ],
    [
        {
            slot: "9:00-9:45",
            course: null
        },
        {
            slot: "9:45-10:30",
            course: "CSE 214 Computer Organization",
            location: "COE F3.15",
            type: "Tutorial"
        },
        {
            slot: "10:45-11:30",
            course: "CSC 211 Software Engineering",
            location: "Theatre B10",
            type: "Lecture"
        },
        {
            slot: "11:30-12:15",
            course: "CSC 211 Software Engineering",
            location: "Theatre B10",
            type: "Lecture"
        },
        {
            slot: "12:30-1:15",
            course: "CSE 214 Computer Organization",
            location: "B10 Theatre",
            type: "Lecture"
        },
        {
            slot: "1:15-2:00",
            course: "CSE 214 Computer Organization",
            location: "B10 Theatre",
            type: "Lecture"
        },
        {
            slot: "2:15-3:00",
            course: null
        },
        {
            slot: "3:00-3:45",
            course: null
        }
    ]
]

function populateScheduleView () {
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    let scheduleContainer = document.getElementById("dashboard-viewing-schedule-container");

    // Loop through schedule and create elements
    for (let i = 0; i <= schedule.length - 1; i++) {
        let scheduleItem = document.createElement("div");
        scheduleItem.classList.add("dashboard-viewing-schedule-item");

        // Create day preceeding data
        scheduleItem.innerHTML = `
            <div class="dashboard-viewing-schedule-day">
                <span>${weekdays[i]}</span>
            </div>
            <div class="dashboard-viewing-schedule-header">
                <span>Time</span>
                <span>Course</span>
            </div>
        `;

        // Create data container
        let scheduleItemDataContainer = document.createElement("div");
        scheduleItemDataContainer.classList.add("dashboard-viewing-schedule-data");

        scheduleItemDataContainer.appendChild(scheduleItem);

        for (let x = 0; x <= schedule[i].length - 1; x++) {
            let item = schedule[i][x];

            let element = document.createElement("div");

            // Render schedule item based on whether there is a class or not
            if (item.course) {
                element.classList.add("dashboard-viewing-schedule-data-item");
                
                element.innerHTML = `
                    <span class="flex-center">${item.slot}</span>
                    <div class="flex-center">
                        <span>${item.course} ${item.type}</span>
                        <span>${item.location}</span>
                    </div>
                `;
            } else {
                element.classList.add("dashboard-viewing-schedule-data-item");
                element.classList.add("dashboard-viewing-schedule-data-item-inactive");
                
                element.innerHTML = `
                    <span>${item.slot}</span>
                    <div></div>
                `;
            }

            scheduleItemDataContainer.appendChild(element);
        }

        scheduleContainer.appendChild(scheduleItemDataContainer);
    }
}

// Handle Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
    populateScheduleView();
})