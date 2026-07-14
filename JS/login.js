const loginForm =
    document.getElementById("loginForm");

const loginIdentifierInput =
    document.getElementById("login-identifier");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");


if (loginForm !== null) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginIdentifier =
            loginIdentifierInput.value;

        const password =
            passwordInput.value;

        const savedUsername =
            localStorage.getItem("leafspaceUsername");

        const savedEmail =
            localStorage.getItem("leafspaceEmail");

        const savedPassword =
            localStorage.getItem("leafspacePassword");

        if (
            loginIdentifier === "" ||
            password === ""
        ) {
            loginMessage.textContent =
                "Please enter your username or email and password.";
        } else if (
            savedUsername === null ||
            savedEmail === null ||
            savedPassword === null
        ) {
            loginMessage.textContent =
                "No account was found. Please register first.";
        } else if (
            loginIdentifier !== savedUsername &&
            loginIdentifier !== savedEmail
        ) {
            loginMessage.textContent =
                "The username or email is incorrect.";
        } else if (password !== savedPassword) {
            loginMessage.textContent =
                "The password is incorrect.";
        } else {
            localStorage.setItem(
                "leafspaceLoggedIn",
                "true"
            );

            alert("Login successful.");

            window.location.href =
                "../../index.html";
        }
    });
}