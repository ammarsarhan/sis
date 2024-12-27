// Data coming in from the database should be in the following form: An array of objects, where each object will render out to a table row.
// Each object should have the following properties:
// {
//     courseCode: string,
//     courseName: string,
//     absences: [
//         {
//             courseType: string,
//             absenceDate: Date,
//             excuse: boolean
//         }
//     ],
//     absenceCount: number || absences.length,
//     warningCount: number,
// }


let records = [
    {
        courseCode: "CS 101",
        courseName: "Introduction to Computer Science",
        absences: [
            {
                courseType: "Lecture",
                absenceDate: new Date("2020-10-01"),
                excuse: false
            },
            {
                courseType: "Lab",
                absenceDate: new Date("2020-10-02"),
                excuse: false
            }
        ],
        absenceCount: 2,
        warningCount: 0
    },
    {
        courseCode: "CS 102",
        courseName: "Data Structures and Algorithms",
        absences: [
            {
                courseType: "Lecture",
                absenceDate: new Date("2020-10-03"),
                excuse: false
            },
            {
                courseType: "Lab",
                absenceDate: new Date("2020-10-04"),
                excuse: false
            }
        ],
        absenceCount: 2,
        warningCount: 0
    },
    {
        courseCode: "CS 103",
        courseName: "Discrete Mathematics",
        absences: [
            {
                courseType: "Lecture",
                absenceDate: new Date("2020-10-05"),
                excuse: false
            },
            {
                courseType: "Lab",
                absenceDate: new Date("2020-10-06"),
                excuse: false
            }
        ],
        absenceCount: 2,
        warningCount: 0
    },
    {
        courseCode: "CS 103",
        courseName: "Discrete Mathematics",
        absences: [
            {
                courseType: "Lecture",
                absenceDate: new Date("2020-10-05"),
                excuse: false
            },
            {
                courseType: "Lab",
                absenceDate: new Date("2020-10-06"),
                excuse: false
            }
        ],
        absenceCount: 2,
        warningCount: 0
    },
    {
        courseCode: "CS 103",
        courseName: "Discrete Mathematics",
        absences: [
            {
                courseType: "Lecture",
                absenceDate: new Date("2020-10-05"),
                excuse: false
            },
            {
                courseType: "Lab",
                absenceDate: new Date("2020-10-06"),
                excuse: false
            }
        ],
        absenceCount: 2,
        warningCount: 0
    },
]

function handleOpenOverlay(data) {
    let overlay = document.getElementById("dashboard-affairs-attendance-overlay");
    let sublabel = document.getElementById("dashboard-affairs-attendance-overlay-header-label");
    let table = document.getElementById("dashboard-affairs-attendance-overlay-data-items");

//     <div class="dashboard-affairs-attendance-overlay-data-item">
//     <div class="flex-center">
//         <span>Lab</span>
//     </div>
//     <div class="flex-center">
//         <span>12/1/2024</span>
//     </div>
//     <div class="flex-center">
//         <span>No</span>
//     </div>
// </div>

    table.innerHTML = "";
    
    for (let i = 0; i <= data.absences.length - 1; i++) {
        let rowData = data.absences[i];
        let rowElement = document.createElement("div");
        rowElement.classList.add("dashboard-affairs-attendance-overlay-data-item");
        
        rowElement.innerHTML = `
            <div class="flex-center">
                <span>${rowData.courseType}</span>
            </div>
            <div class="flex-center">
                <span>${rowData.absenceDate.toLocaleDateString()}</span>
            </div>
            <div class="flex-center">
                <span>${rowData.excuse ? "Yes" : "No"}</span>
            </div>
        `;

        table.appendChild(rowElement);
    }

    overlay.classList.remove("hidden");
    sublabel.innerText = `More information about each absence for ${data.courseCode}.`;
}

function handleCloseOverlay() {
    let overlay = document.getElementById("dashboard-affairs-attendance-overlay");
    overlay.classList.add("hidden");
}

function populatePrimaryTable(absenceData) {
    let container = document.getElementById("dashboard-affairs-attendance-table-items");
    container.innerHTML = "";

    for (let i = 0; i <= absenceData.length - 1; i++) {
        let rowData = absenceData[i];
        let rowElement = document.createElement("div");
        rowElement.classList.add("dashboard-affairs-attendance-table-item");
        
        rowElement.innerHTML = `
            <div class="flex-center">
                <span>${rowData.courseCode}</span>
            </div>
            <div class="flex-center">
                <span>${rowData.courseName}</span>
            </div>
            <div class="flex-center">
                <span>${rowData.absences.length}</span>
            </div>
            <div class="flex-center">
                <span>${rowData.warningCount}</span>
            </div>
        `;

        rowElement.addEventListener("click", function () {
            handleOpenOverlay(rowData);
        });

        container.appendChild(rowElement);
    }
}

// Handle Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
    // Add Event Listeners
    let closeToggle = document.getElementById("dashboard-affairs-attendance-overlay-toggle");
    closeToggle.addEventListener("click", handleCloseOverlay);

    populatePrimaryTable(records);
});