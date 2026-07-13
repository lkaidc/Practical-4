document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.querySelector(".remember input");
  const forgotLink = document.querySelector(".options a");
  const loginButton = document.querySelector('button[type="submit"]');
  const passwordGroup = passwordInput.parentElement;

  // Create a message box for user feedback
  const messageBox = document.createElement("div");
  messageBox.id = "login-message";
  messageBox.style.marginTop = "12px";
  messageBox.style.padding = "10px";
  messageBox.style.borderRadius = "8px";
  messageBox.style.fontSize = "0.95rem";
  messageBox.style.display = "none";
  form.appendChild(messageBox);

  function showMessage(text, type = "info") {
    messageBox.textContent = text;
    messageBox.style.display = "block";

    if (type === "success") {
      messageBox.style.background = "#d1fae5";
      messageBox.style.color = "#065f46";
      messageBox.style.border = "1px solid #10b981";
    } else if (type === "error") {
      messageBox.style.background = "#fee2e2";
      messageBox.style.color = "#991b1b";
      messageBox.style.border = "1px solid #ef4444";
    } else {
      messageBox.style.background = "#e0f2fe";
      messageBox.style.color = "#075985";
      messageBox.style.border = "1px solid #38bdf8";
    }
  }

  function clearMessage() {
    messageBox.style.display = "none";
    messageBox.textContent = "";
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }

  function isStrongPassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  }

  function getSavedUsers() {
    return JSON.parse(localStorage.getItem("leafspaceUsers")) || [];
  }

  function saveRememberedEmail(email) {
    localStorage.setItem("leafspaceRememberedEmail", email);
  }

  function loadRememberedEmail() {
    const remembered = localStorage.getItem("leafspaceRememberedEmail");
    if (remembered) {
      emailInput.value = remembered;
      rememberCheckbox.checked = true;
    }
  }

  // Add show/hide password toggle
  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.textContent = "Show";
  toggleBtn.style.marginTop = "8px";
  toggleBtn.style.padding = "6px 10px";
  toggleBtn.style.border = "none";
  toggleBtn.style.borderRadius = "6px";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.background = "#e5e7eb";
  toggleBtn.style.color = "#111827";

  passwordGroup.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "Hide" : "Show";
  });

  // Live validation feedback
  emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
      showMessage("Please enter a valid email address.", "error");
    } else {
      clearMessage();
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value && !isStrongPassword(passwordInput.value)) {
      showMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number.",
        "error"
      );
    } else {
      clearMessage();
    }
  });

  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();

    if (!emailInput.value.trim()) {
      showMessage("Enter your email first, then click Forgot Password.", "info");
      emailInput.focus();
      return;
    }

    if (isValidEmail(emailInput.value)) {
      showMessage(
        "Password reset requested. In a real system, a reset link would be sent to your email.",
        "success"
      );
    } else {
      showMessage("Please type a valid email first.", "error");
      emailInput.focus();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearMessage();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showMessage("Please fill in both email and password.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    if (!isStrongPassword(password)) {
      showMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number.",
        "error"
      );
      passwordInput.focus();
      return;
    }

    // Check against registered users saved from your register page
    const users = getSavedUsers();
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      showMessage("Invalid email or password. Please try again.", "error");
      return;
    }

    if (rememberCheckbox.checked) {
      saveRememberedEmail(email);
    } else {
      localStorage.removeItem("leafspaceRememberedEmail");
    }

    showMessage("Login successful! Redirecting to LeafSpace...", "success");

    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    setTimeout(() => {
      window.location.href = "bookstore.html";
    }, 1200);
  });

  loadRememberedEmail();
});

