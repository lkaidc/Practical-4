const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");


if (loginForm !== null) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        const savedEmail =
            localStorage.getItem("leafspaceEmail");

        const savedPassword =
            localStorage.getItem("leafspacePassword");

        if (email === "" || password === "") {
            loginMessage.textContent =
                "Please enter your email and password.";
        } else if (
            savedEmail === null ||
            savedPassword === null
        ) {
            loginMessage.textContent =
                "No account was found. Please register first.";
        } else if (
            email !== savedEmail ||
            password !== savedPassword
        ) {
            loginMessage.textContent =
                "Incorrect email or password.";
        } else {
            localStorage.setItem(
                "leafspaceLoggedIn",
                "true"
            );

            alert("Login successful.");

            window.location.href = "../../index.html";
        }
    });
}