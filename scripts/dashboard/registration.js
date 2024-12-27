// Records will be an array that takes in objects each of which has the following properties:
// {
//     courseCode: string,
//     courseName: string,
//     creditHours: number,
//     courseStatus: "Active" | "Withdrawn",
//     isPaid: boolean,
//     classType: "Lecture" | "Lab" | "Tutorial",
//     sectionCode: string,
//     instructorNames: string[],
//     buildingLocation: string,
//     roomLocation: string,
//     weekday: string,
//     fromTime: Date,
//     toTime: Date,
//     examDate: Date
// }

let records = [
    {
        courseCode: "CSC309",
        courseName: "Programming on the Web",
        creditHours: 3,
        courseStatus: "Active",
        registrationStatus: "Registered",
        isPaid: true,
        classType: "Lecture",
        sectionCode: "LRA403-S2-CSIT",
        instructorNames: ["John Doe"],
        buildingLocation: "BA",
        roomLocation: "1200",
        weekday: "Thursday",
        fromTime: new Date("2021-09-01"),
        toTime: new Date("2021-12-01"),
        examDate: new Date("2021-12-15")
    },
    {
        courseCode: "CSC369",
        courseName: "Operating Systems",
        creditHours: 1,
        courseStatus: "Active",
        registrationStatus: "Registered",
        isPaid: true,
        classType: "Lecture",
        sectionCode: "LRA403-S2-CSIT",
        instructorNames: ["Jane Doe"],
        buildingLocation: "BA",
        roomLocation: "1200",
        weekday: "Tuesday",
        fromTime: new Date("2021-09-01"),
        toTime: new Date("2021-12-01"),
        examDate: new Date("2021-12-15")
    },
    {
        courseCode: "CSC373",
        courseName: "Algorithm Design, Analysis and Complexity",
        creditHours: 2,
        courseStatus: "Active",
        registrationStatus: "Registered",
        isPaid: true,
        classType: "Tutorial",
        sectionCode: "LRA403-S2-CSIT",
        instructorNames: ["John Doe"],
        buildingLocation: "BA",
        roomLocation: "1200",
        weekday: "Monday",
        fromTime: new Date("2021-09-01"),
        toTime: new Date("2021-12-01"),
        examDate: new Date("2021-12-15")
    },
    {
        courseCode: "CSC384",
        courseName: "Introduction to Artificial Intelligence",
        creditHours: 2,
        courseStatus: "Active",
        registrationStatus: "Registered",
        isPaid: true,
        classType: "Lab",
        sectionCode: "LRA403-S2-CSIT",
        instructorNames: ["Jane Doe"],
        buildingLocation: "BA",
        roomLocation: "1200",
        weekday: "Sunday",
        fromTime: new Date("2021-09-01"),
        toTime: new Date("2021-12-01"),
        examDate: new Date("2021-12-15")
    }
]

function handleOpenOverlay (data) {
    let overlay = document.getElementsByClassName("dashboard-affairs-registration-overlay")[0];
    overlay.classList.remove("hidden");

    let dataContainer = document.getElementById("dashboard-overlay-data");
    dataContainer.innerHTML = "";

    dataContainer.innerHTML = `
        <div>
            <span>Section Information</span>
            <div class="dashboard-affairs-registration-overlay-content-data-subsection">
                <div>
                    <span>Name</span>
                    <span>${data.courseName}</span>
                </div>
                <div>
                    <span>Credit Hours</span>
                    <span>${data.creditHours.toFixed(2)}</span>
                </div>
                <div>
                    <span>Type</span>
                    <span>${data.classType}</span>
                </div>
                <div>
                    <span>Code</span>
                    <span>${data.sectionCode}</span>
                </div>
                <div>
                    <span>Building</span>
                    <span>${data.buildingLocation}</span>
                </div>
                <div>
                    <span>Room</span>
                    <span>${data.roomLocation}</span>
                </div>
            </div>
        </div>
        <div>
            <span>Course Status</span>
            <div class="dashboard-affairs-registration-overlay-content-data-subsection">
                <div>
                    <span>Status</span>
                    <span>${data.courseStatus}</span>
                </div>
                <div>
                    <span>Registered</span>
                    <span>${data.registrationStatus}</span>
                </div>
                <div>
                    <span>Course Paid</span>
                    <span>${data.isPaid ? "Yes" : "No"}</span>
                </div>
            </div>
        </div>
        <div>
            <span>Dates</span>
            <div class="dashboard-affairs-registration-overlay-content-data-subsection">
                <div>
                    <span>Day</span>
                    <span>${data.weekday}</span>
                </div>
                <div>
                    <span>Start Time</span>
                    <span>10:30</span>
                </div>
                <div>
                    <span>End Time</span>
                    <span>12:30</span>
                </div>
                <div>
                    <span>Exam Date</span>
                    <span>${data.examDate.toLocaleDateString()}</span>
                </div>
            </div>
        </div>
        <div>
            <span>Instructors</span>
            <div class="dashboard-affairs-registration-overlay-content-data-subsection">
                ${data.instructorNames.map((name, index) => {
                    return `
                        <div>
                            <span>Instructor ${index + 1}</span>
                            <span>${name}</span>
                        </div>
                    `;
                })}
            </div>
        </div>
    `;
}

function handleCloseOverlay () {
    let overlay = document.getElementsByClassName("dashboard-affairs-registration-overlay")[0];
    overlay.classList.add("hidden");
}

function populateTableView (data) {
    let tableData = document.getElementById("dashboard-affairs-registration-courses-table-items");
    tableData.innerHTML = "";

    for (let i = 0; i <= data.length - 1; i++) {
        let record = data[i];
        let triggerId = `table-item-active-${i+1}`;

        let tableRow = document.createElement("div");
        tableRow.classList.add("dashboard-affairs-registration-courses-table-item");

        tableRow.innerHTML = `
            <div class="flex-center">
                <span>${record.courseCode}</span>
            </div>
            <div class="flex-center">
                <span class="dashboard-affairs-registration-courses-table-item-active" id="${triggerId}">${record.courseName}</span>
            </div>
            <div class="flex-center">
                <span>${record.creditHours.toFixed(2)}</span>
            </div>
            <div class="flex-center">
                <span>${record.courseStatus}</span>
            </div>
            <div class="flex-center">
                <span>${record.isPaid ? "Yes" : "No"}</span>
            </div>
            <div class="flex-center">
                <span>${record.classType}</span>
            </div>
            <div class="flex-center">
                <span>${record.sectionCode}</span>
            </div>
        `;

        tableData.appendChild(tableRow);

        let trigger = document.getElementById(triggerId);
        trigger.addEventListener("click", function() {
            handleOpenOverlay(record);
        })
    }
}

// Handle Initial Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Add Event Listeners
    let overlayToggle = document.getElementById("dashboard-affairs-attendance-overlay-toggle");
    overlayToggle.addEventListener("click", handleCloseOverlay);

    populateTableView(records);
});