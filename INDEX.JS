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


const images = document.querySelectorAll(".pics img");
const favourites = document.getElementById("favourites");
const actions = document.getElementById("actions");
const message = document.getElementById("message");
const counter = document.getElementById("counter");

let count = 0;
let total = images.length;

images.forEach((img, index) => {
    img.dataset.originalIndex = index;

    img.addEventListener("click", function () {

        // Prevent duplicate clicks
        if (img.classList.contains("selected")) return;

        // Move to favourites
        favourites.appendChild(img);

        img.classList.add("selected");
        img.style.border = "3px solid green";

        count++;

        // Update message
        message.textContent = `Image ${index + 1} selected as favorite number ${count}`;

        // Add action log
        let li = document.createElement("li");
        li.textContent = `Moved ${img.src} to favorites`;
        actions.appendChild(li);

        // Update counter
        counter.textContent = `Remaining: ${total - count}`;

        // If all selected
        if (count === total) {
            message.textContent = "All images have been selected!";
        }
    });

    // Hover tooltip
    img.title = img.alt;
});

// Revert functionality
favourites.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {

        let img = e.target;
        let originalIndex = Number(img.dataset.originalIndex);
        let mainPics = document.querySelector(".pics");

        // Move back to original list in original order
        let inserted = false;
        Array.from(mainPics.children).forEach(child => {
            let childIndex = Number(child.dataset.originalIndex);
            if (!inserted && childIndex > originalIndex) {
                mainPics.insertBefore(img, child);
                inserted = true;
            }
        });
        if (!inserted) {
            mainPics.appendChild(img);
        }

        img.classList.remove("selected");
        img.style.border = "";

        count--;

        // Log action
        let li = document.createElement("li");
        li.textContent = `Reverted ${img.src} back to the main list`;
        actions.appendChild(li);

        // Update counter
        counter.textContent = `Remaining: ${total - count}`;

        // Update message when not all selected
        if (count < total) {
            message.textContent = `There are ${total - count} images remaining`;
        }
    }
});