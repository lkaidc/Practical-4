document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================

    const form = document.querySelector("form");

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

    const termsCheckbox =
        document.getElementById("terms");

    const submitButton =
        document.querySelector('button[type="submit"]');

    // =========================
    // MESSAGE BOX
    // =========================

    const messageBox =
        document.createElement("div");

    messageBox.id = "register-message";

    form.appendChild(messageBox);

    function showMessage(text, type = "error") {

        messageBox.textContent = text;
        messageBox.style.display = "block";

        if (type === "success") {

            messageBox.style.background = "#1C2413";
            messageBox.style.color = "#8DB255";
            messageBox.style.border =
                "1px solid #8DB255";

        } else {

            messageBox.style.background = "#2A1414";
            messageBox.style.color = "#EF4444";
            messageBox.style.border =
                "1px solid #EF4444";

        }

    }

    function clearMessage() {

        messageBox.textContent = "";
        messageBox.style.display = "none";

    }

    // =========================
    // VALIDATION
    // =========================

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email.trim());

    }

    function isStrongPassword(password) {

        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
            .test(password);

    }

    function getSavedUsers() {

        return JSON.parse(
            localStorage.getItem("leafspaceUsers")
        ) || [];

    }

    // =========================
    // SHOW / HIDE PASSWORD
    // =========================

    const passwordToggle =
        document.createElement("button");

    passwordToggle.type = "button";
    passwordToggle.textContent = "👁 Show";

    passwordToggle.style.marginTop = "8px";
    passwordToggle.style.padding = "8px 12px";
    passwordToggle.style.background = "#3F5910";
    passwordToggle.style.color = "#F7F9F2";
    passwordToggle.style.border = "1px solid #364227";
    passwordToggle.style.borderRadius = "8px";
    passwordToggle.style.cursor = "pointer";

    passwordInput.parentElement.appendChild(
        passwordToggle
    );

    passwordToggle.addEventListener("click", () => {

        const hidden =
            passwordInput.type === "password";

        passwordInput.type =
            hidden ? "text" : "password";

        passwordToggle.textContent =
            hidden ? "🙈 Hide" : "👁 Show";

    });

    // =========================
    // LIVE VALIDATION
    // =========================

    emailInput.addEventListener("input", () => {

        if (
            emailInput.value.trim() &&
            !isValidEmail(emailInput.value)
        ) {

            showMessage(
                "Please enter a valid email address."
            );

        } else {

            clearMessage();

        }

    });

    confirmPasswordInput.addEventListener(
        "input",
        () => {

            if (
                confirmPasswordInput.value &&
                passwordInput.value !==
                confirmPasswordInput.value
            ) {

                showMessage(
                    "Passwords do not match."
                );

            } else {

                clearMessage();

            }

        }
    );

    // =========================
    // REGISTER
    // =========================

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        clearMessage();

        const fullname =
            fullNameInput.value.trim();

        const email =
            emailInput.value.trim();

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;

        if (
            !fullname ||
            !email ||
            !username ||
            !password ||
            !confirmPassword
        ) {

            showMessage(
                "Please complete all fields.",
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

        if (!isStrongPassword(password)) {

            showMessage(
                "Password must contain uppercase, lowercase, a number, and at least 8 characters.",
                "error"
            );
            

            return;

        }

        if (password !== confirmPassword) {

            showMessage(
                "Passwords do not match.", "error"
            );

            return;

        }

        if (!termsCheckbox.checked) {

            showMessage(
                "Please accept the Terms and Conditions."
            );

            return;

        }

        const users =
            getSavedUsers();

        const emailExists =
            users.some(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );

        if (emailExists) {

            showMessage(
                "This email is already registered."
            );

            return;

        }

        users.push({
            fullname,
            email,
            username,
            password
        });

        localStorage.setItem(
            "leafspaceUsers",
            JSON.stringify(users)
        );

        showMessage(
            "Account created successfully! Redirecting...",
            "success"
        );

        submitButton.disabled = true;
        submitButton.textContent =
            "Creating Account...";

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1500);

    });

    // =========================
    // THEME SWITCHER
    // =========================

    const themeToggle =
        document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme =
            localStorage.getItem(
                "leafspaceTheme"
            );

        if (savedTheme === "light") {

            document.body.classList.add(
                "light-mode"
            );

            themeToggle.textContent = "🌙";

        } else {

            themeToggle.textContent = "☀️";

        }

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-mode"
                );

                if (
                    document.body.classList.contains(
                        "light-mode"
                    )
                ) {

                    localStorage.setItem(
                        "leafspaceTheme",
                        "light"
                    );

                    themeToggle.textContent =
                        "🌙";

                } else {

                    localStorage.setItem(
                        "leafspaceTheme",
                        "dark"
                    );

                    themeToggle.textContent =
                        "☀️";

                }

            }
        );
    }

});