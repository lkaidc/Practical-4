// Account settings elements
const accountForm = document.getElementById("accountForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const accountMessage = document.getElementById("accountMessage");

// Password elements
const passwordForm = document.getElementById("passwordForm");
const currentPasswordInput = document.getElementById("currentPassword");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordMessage = document.getElementById("passwordMessage");

// Reading preference elements
const readingForm = document.getElementById("readingForm");
const fontSizeInput = document.getElementById("fontSize");
const saveProgressInput = document.getElementById("saveProgress");
const readingMessage = document.getElementById("readingMessage");

// Notification elements
const notificationForm = document.getElementById("notificationForm");
const emailNotificationsInput =
    document.getElementById("emailNotifications");
const bookRecommendationsInput =
    document.getElementById("bookRecommendations");
const saleNotificationsInput =
    document.getElementById("saleNotifications");
const notificationMessage =
    document.getElementById("notificationMessage");

// Load previously saved account settings
const savedUsername = localStorage.getItem("leafspaceUsername");
const savedEmail = localStorage.getItem("leafspaceEmail");

if (savedUsername !== null) {
    usernameInput.value = savedUsername;
}

if (savedEmail !== null) {
    emailInput.value = savedEmail;
}

// Load previously saved reading preferences
const savedFontSize = localStorage.getItem("leafspaceFontSize");
const savedProgress = localStorage.getItem("leafspaceSaveProgress");

if (savedFontSize !== null) {
    fontSizeInput.value = savedFontSize;
}

if (savedProgress !== null) {
    saveProgressInput.checked = savedProgress === "true";
}

// Load previously saved notification settings
const savedEmailNotifications =
    localStorage.getItem("leafspaceEmailNotifications");

const savedBookRecommendations =
    localStorage.getItem("leafspaceBookRecommendations");

const savedSaleNotifications =
    localStorage.getItem("leafspaceSaleNotifications");

if (savedEmailNotifications !== null) {
    emailNotificationsInput.checked =
        savedEmailNotifications === "true";
}

if (savedBookRecommendations !== null) {
    bookRecommendationsInput.checked =
        savedBookRecommendations === "true";
}

if (savedSaleNotifications !== null) {
    saleNotificationsInput.checked =
        savedSaleNotifications === "true";
}


// Save account settings
if (accountForm !== null) {
    accountForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;

    if (username === "" || email === "") {
        accountMessage.textContent =
            "Please complete the username and email fields.";
    } else {
        localStorage.setItem("leafspaceUsername", username);
        localStorage.setItem("leafspaceEmail", email);

        accountMessage.textContent =
            "Account settings saved successfully.";
    }
});
}

// Validate the password form
passwordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
    ) {
        passwordMessage.textContent =
            "Please complete all password fields.";
    } else if (currentPassword !== savedPassword) {
        passwordMessage.textContent =
            "The current password is incorrect.";
    } else if (newPassword !== confirmPassword) {
        passwordMessage.textContent =
            "The new passwords do not match.";
    } else {
        localStorage.setItem("leafspacePassword", 
            newPassword
        );
        
        passwordMessage.textContent =
            "Password changed successfully.";

        passwordForm.reset();
    }
});


// Save reading preferences
readingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem(
        "leafspaceFontSize",
        fontSizeInput.value
    );

    localStorage.setItem(
        "leafspaceSaveProgress",
        saveProgressInput.checked
    );

    readingMessage.textContent =
        "Reading preferences saved successfully.";
});


// Save notification preferences
notificationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem(
        "leafspaceEmailNotifications",
        emailNotificationsInput.checked
    );

    localStorage.setItem(
        "leafspaceBookRecommendations",
        bookRecommendationsInput.checked
    );

    localStorage.setItem(
        "leafspaceSaleNotifications",
        saleNotificationsInput.checked
    );

    notificationMessage.textContent =
        "Notification settings saved successfully.";
});