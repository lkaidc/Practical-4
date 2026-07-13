document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.querySelector(".remember input");
    const forgotLink = document.querySelector(".options a");
    const loginButton = document.querySelector('button[type="submit"]');
    const passwordGroup = passwordInput.parentElement;

    // =========================
    // MESSAGE BOX
    // =========================

    const messageBox = document.createElement("div");
    messageBox.id = "login-message";
    messageBox.style.display = "none";
    messageBox.style.marginTop = "12px";
    messageBox.style.padding = "10px";
    messageBox.style.borderRadius = "8px";

    form.appendChild(messageBox);

    function showMessage(text, type = "info") {
        messageBox.textContent = text;
        messageBox.style.display = "block";

        if (type === "success") {
            messageBox.style.background = "#1C2413";
            messageBox.style.color = "#8DB255";
            messageBox.style.border = "1px solid #8DB255";
        } else if (type === "error") {
            messageBox.style.background = "#2A1414";
            messageBox.style.color = "#EF4444";
            messageBox.style.border = "1px solid #EF4444";
        } else {
            messageBox.style.background = "#242E1A";
            messageBox.style.color = "#C6D2B7";
            messageBox.style.border = "1px solid #364227";
        }
    }

    function clearMessage() {
        messageBox.style.display = "none";
        messageBox.textContent = "";
    }

    // =========================
    // VALIDATION
    // =========================

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function isStrongPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    }

    // =========================
    // LOCAL STORAGE
    // =========================

    function getSavedUsers() {
        return JSON.parse(localStorage.getItem("leafspaceUsers")) || [];
    }

    function saveRememberedEmail(email) {
        localStorage.setItem("leafspaceRememberedEmail", email);
    }

    function loadRememberedEmail() {
        const savedEmail = localStorage.getItem("leafspaceRememberedEmail");

        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberCheckbox.checked = true;
        }
    }

    // =========================
    // PASSWORD TOGGLE
    // =========================

    const toggleBtn = document.createElement("button");

    toggleBtn.type = "button";
    toggleBtn.textContent = "👁 Show";

    toggleBtn.style.marginTop = "8px";
    toggleBtn.style.padding = "8px 12px";
    toggleBtn.style.background = "#3F5910";
    toggleBtn.style.color = "#F7F9F2";
    toggleBtn.style.border = "1px solid #364227";
    toggleBtn.style.borderRadius = "8px";
    toggleBtn.style.cursor = "pointer";

    passwordGroup.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
        const hidden = passwordInput.type === "password";

        passwordInput.type = hidden ? "text" : "password";
        toggleBtn.textContent = hidden ? "🙈 Hide" : "👁 Show";
    });

    // =========================
    // LIVE VALIDATION
    // =========================

    emailInput.addEventListener("input", () => {

        if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
            showMessage("Please enter a valid email address.", "error");
        } else {
            clearMessage();
        }

    });

    passwordInput.addEventListener("input", () => {

        if (
            passwordInput.value &&
            !isStrongPassword(passwordInput.value)
        ) {
            showMessage(
                "Password must contain at least 8 characters, uppercase, lowercase, and a number.",
                "error"
            );
        } else {
            clearMessage();
        }

    });

    // =========================
    // FORGOT PASSWORD
    // =========================

    if (forgotLink) {

        forgotLink.addEventListener("click", (e) => {

            e.preventDefault();

            const email = emailInput.value.trim();

            if (!email) {
                showMessage(
                    "Enter your email first before requesting a password reset.",
                    "info"
                );
                emailInput.focus();
                return;
            }

            if (!isValidEmail(email)) {
                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );
                emailInput.focus();
                return;
            }

            showMessage(
                "Password reset link would be sent to your email.",
                "success"
            );

        });

    }

    // =========================
    // LOGIN
    // =========================

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        clearMessage();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            showMessage(
                "Please fill in both email and password.",
                "error"
            );
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(
                "Please enter a valid email address.",
                "error"
            );
            return;
        }

        const users = getSavedUsers();

        const matchedUser = users.find(
            user =>
                user.email === email &&
                user.password === password
        );

        if (!matchedUser) {
            showMessage(
                "Invalid email or password.",
                "error"
            );
            return;
        }

        if (rememberCheckbox.checked) {
            saveRememberedEmail(email);
        } else {
            localStorage.removeItem(
                "leafspaceRememberedEmail"
            );
        }

        showMessage(
            "Login successful! Redirecting...",
            "success"
        );

        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";

        setTimeout(() => {
            window.location.href = "bookstore.html";
        }, 1200);

    });

    // =========================
    // THEME SWITCHER
    // =========================

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme =
            localStorage.getItem("leafspaceTheme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeToggle.textContent = "🌙";
        } else {
            themeToggle.textContent = "☀️";
        }

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            if (
                document.body.classList.contains("light-mode")
            ) {
                localStorage.setItem(
                    "leafspaceTheme",
                    "light"
                );

                themeToggle.textContent = "🌙";
            } else {
                localStorage.setItem(
                    "leafspaceTheme",
                    "dark"
                );

                themeToggle.textContent = "☀️";
            }

        });

    }

    // =========================
    // INITIALIZE
    // =========================

    loadRememberedEmail();

});