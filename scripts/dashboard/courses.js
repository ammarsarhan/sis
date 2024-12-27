// Results should be in the following form:
// {
//     courseName: string,
//     courseCode: string,
//     creditHours: number,
//     online: boolean,
//     minimumStudents: number
// }

let results = [
    {
        courseCode: "ACM215",
        courseName: "Ordinary Differential Equations",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "ACM422",
        courseName: "Operations Research",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "AID311",
        courseName: "Mathematics of Data Science",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "AID312",
        courseName: "Intelligent Systems",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "AID321",
        courseName: "Machine Learning",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "AID321",
        courseName: "Machine Learning",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "AID411",
        courseName: "BIG Data Analytics & Visualization",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "AID413",
        courseName: "Data Security",
        creditHours: 3,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "AID414",
        courseName: "Graduation Project (1)",
        creditHours: 2,
        online: true,
        minimumStudents: 10
    },
    {
        courseCode: "CSC413",
        courseName: "Graduation Project I",
        creditHours: 2,
        online: true,
        minimumStudents: 10
    },
];

function populateListView() {
    let container = document.getElementById("dashboard-viewing-courses-results-items");
    let count = document.getElementById("dashboard-viewing-courses-results-count");

    count.innerText = `Found ${results.length} available courses in system.`;
    container.innerHTML = "";

    // Map through each result item and create a list element for it
    for (let i = 0; i <= results.length - 1; i++) {
        let item = results[i];
        let itemElement = document.createElement("div");
        itemElement.classList.add("dashboard-viewing-courses-results-item");

        itemElement.innerHTML = `
            <div class="flex-center">
                <span>${item.courseCode}</span>
            </div>
            <div class="flex-center">
                <span>${item.courseName}</span>
            </div>
            <div class="flex-center">
                <span>${item.creditHours.toFixed(2)}</span>
            </div>
            <div class="flex-center">
                <span>${item.online ? "Yes" : "No"}</span>
            </div>
            <div class="flex-center">
                <span>${item.minimumStudents}</span>
            </div>
        `;

        container.appendChild(itemElement);
    }
}

// Handle Initial Page Load
document.addEventListener("DOMContentLoaded", function () {
    populateListView();
});