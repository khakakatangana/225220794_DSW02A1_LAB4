const compareBtn = document.getElementById("compare-btn");
const clearBtn = document.getElementById("clear-btn");
const expected = document.getElementById("expected");
const actual = document.getElementById("actual");
const differencesList = document.getElementById("differences");

compareBtn.addEventListener("click", function () {
    // Clear previous results
    differencesList.innerHTML = "";

    let text1 = expected.value.trim();
    let text2 = actual.value.trim();

    // Validation
    if (text1 === "" && text2 === "") {
        differencesList.innerHTML = "<li>Please enter text in both areas.</li>";
        return;
    }

    let lines1 = text1.split("\n");
    let lines2 = text2.split("\n");

    let differences = [];

    // Check line by line
    let max = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < max; i++) {
        if (lines1[i] !== lines2[i]) {
            differences.push(`Line ${i + 1}: "${lines1[i] || ""}" !== "${lines2[i] || ""}"`);
        }
    }

    // If number of lines differ
    if (lines1.length !== lines2.length) {
        let li = document.createElement("li");
        li.textContent = `Number of lines differ: Expected (${lines1.length}) vs Actual (${lines2.length})`;
        differencesList.appendChild(li);
    }

    // Show results
    if (differences.length > 0) {
        differencesList.className = "change";

        let title = document.createElement("li");
        title.textContent = "Texts are different";
        differencesList.appendChild(title);

        differences.forEach(diff => {
            let li = document.createElement("li");
            li.textContent = diff;
            differencesList.appendChild(li);
        });

    } else {
        differencesList.className = "nochange";

        let li = document.createElement("li");
        li.textContent = "No differences found";
        differencesList.appendChild(li);
    }
});

// Clear button
clearBtn.addEventListener("click", function () {
    expected.value = "";
    actual.value = "";
    differencesList.innerHTML = "";
}); 