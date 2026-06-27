const form = document.getElementById("gradeForm");

if (form) {
    form.addEventListener("submit", submitGrade);
}

async function submitGrade(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        marks: Number(document.getElementById("marks").value)
    };

    try {
        const res = await fetch("/api/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to submit grade");
        }

        alert("Student added successfully!");

        form.reset();

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

async function loadStudents() {

    const table = document.getElementById("students");

    if (!table) return;

    try {
        const res = await fetch("/api/students");
        const data = await res.json();

        table.innerHTML = "";

        data.forEach(student => {
            table.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.marks}</td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}