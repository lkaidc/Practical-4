const usernameForm =
    document.getElementById("usernameForm");

const usernameInput =
    document.getElementById("username");

const usernameMessage =
    document.getElementById("usernameMessage");

const bioForm =
    document.getElementById("bioForm");

const bioInput =
    document.getElementById("bio");

const bioMessage =
    document.getElementById("bioMessage");


// Load the saved username
const savedUsername =
    localStorage.getItem("leafspaceUsername");

if (savedUsername !== null) {
    usernameInput.value = savedUsername;
}


// Load the saved bio
const savedBio =
    localStorage.getItem("leafspaceBio");

if (savedBio !== null) {
    bioInput.value = savedBio;
}


// Save the updated username
if (usernameForm !== null) {
    usernameForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value;

        if (username === "") {
            usernameMessage.textContent =
                "Please enter a username.";
        } else {
            localStorage.setItem(
                "leafspaceUsername",
                username
            );

            usernameMessage.textContent =
                "Username updated successfully.";
        }
    });
}


// Save the updated bio
if (bioForm !== null) {
    bioForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const bio = bioInput.value;

        if (bio === "") {
            bioMessage.textContent =
                "Please enter a bio.";
        } else {
            localStorage.setItem(
                "leafspaceBio",
                bio
            );

            bioMessage.textContent =
                "Bio updated successfully.";
        }
    });
}