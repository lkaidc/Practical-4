const registerForm =
    document.getElementById("registerForm");

const fullNameInput =
    document.getElementById("fullname");

const emailInput =
    document.getElementById("email");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsInput =
    document.getElementById("terms");

const registerMessage =
    document.getElementById("registerMessage");


if (registerForm !== null) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = fullNameInput.value;
        const email = emailInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (
            fullName === "" ||
            email === "" ||
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            registerMessage.textContent =
                "Please complete all required fields.";
        } else if (password !== confirmPassword) {
            registerMessage.textContent =
                "The passwords do not match.";
        } else if (termsInput.checked === false) {
            registerMessage.textContent =
                "Please accept the Terms and Conditions.";
        } else {
            localStorage.setItem(
                "leafspaceFullName",
                fullName
            );

            localStorage.setItem(
                "leafspaceUsername",
                username
            );

            localStorage.setItem(
                "leafspaceEmail",
                email
            );

            localStorage.setItem(
                "leafspacePassword",
                password
            );

            localStorage.setItem(
                "leafspaceLoggedIn",
                "true"
            );

            alert("Account created successfully.");

            window.location.href = "../../index.html";
        }
    });
}