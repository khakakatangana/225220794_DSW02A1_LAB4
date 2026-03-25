

const picsContainer = document.getElementById("pics");
const favouritesContainer = document.querySelector("#favourites .favorites-list");
const actionsList = document.getElementById("actions");
const message = document.getElementById("message");
const counter = document.getElementById("counter");

let selectedCount = 0;
const images = Array.from(document.querySelectorAll("#pics img"));
const totalImages = images.length;

// Style images for consistent layout and hover tooltip
images.forEach((img, index) => {
    img.dataset.originalIndex = index;
    img.style.width = "130px";
    img.style.height = "130px";
    img.style.objectFit = "cover";
    img.style.cursor = "pointer";
    img.title = img.alt || `Nelson Mandela Image ${index + 1}`;
});

const updateCounter = () => {
    counter.textContent = `Remaining: ${totalImages - selectedCount}`;
};

const logAction = text => {
    const li = document.createElement("li");
    li.textContent = text;
    actionsList.appendChild(li);
};

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        if (img.classList.contains("selected")) {
            return;
        }

        // move to favourites area (rightmost end)
        favouritesContainer.appendChild(img);

        img.classList.add("selected");
        img.style.border = "3px solid green";

        selectedCount += 1;
        message.textContent = `Image ${index + 1} selected as favorite number ${selectedCount}`;
        logAction(`Moved ${img.src} to favorites`);
        updateCounter();

        if (selectedCount === totalImages) {
            message.textContent = "All images have been selected!";
        }
    });
});

favouritesContainer.addEventListener("click", e => {
    if (e.target && e.target.tagName === "IMG") {
        const img = e.target;
        const originalIndex = Number(img.dataset.originalIndex);

        // this block of code moves the image back to its original position
        const mainPics = picsContainer;
        let inserted = false;

        Array.from(mainPics.children).forEach(child => {
            const childIndex = Number(child.dataset.originalIndex);
            if (!inserted && childIndex > originalIndex) {
                mainPics.insertBefore(img, child);
                inserted = true;
            }
        });

        if (!inserted) {
            mainPics.appendChild(img);
        }

        img.classList.remove("selected");
        img.style.border = "2px solid transparent";

        selectedCount -= 1;
        logAction(`Reverted ${img.src} back to the main list`);
        updateCounter();

        if (selectedCount < totalImages) {
            message.textContent = `There are ${totalImages - selectedCount} images remaining`;
        }
    }
});

// Initialize counter text
updateCounter(); 