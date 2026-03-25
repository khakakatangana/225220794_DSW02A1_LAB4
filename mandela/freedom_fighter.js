const images = document.querySelectorAll("#pics img");
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
        let mainPics = document.getElementById("pics");

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