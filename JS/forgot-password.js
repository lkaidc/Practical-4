
const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

const resetEmailInput =
    document.getElementById("reset-email");

const newPasswordInput =
    document.getElementById("new-password");

const confirmNewPasswordInput =
    document.getElementById("confirm-new-password");

const resetMessage =
    document.getElementById("resetMessage");


if (forgotPasswordForm !== null) {
    forgotPasswordForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const email = resetEmailInput.value;
            const newPassword = newPasswordInput.value;
            const confirmNewPassword =
                confirmNewPasswordInput.value;

            const savedEmail =
                localStorage.getItem("leafspaceEmail");

            if (
                email === "" ||
                newPassword === "" ||
                confirmNewPassword === ""
            ) {
                resetMessage.textContent =
                    "Please complete all fields.";
            } else if (savedEmail === null) {
                resetMessage.textContent =
                    "No registered account was found.";
            } else if (email !== savedEmail) {
                resetMessage.textContent =
                    "The email does not match the registered account.";
            } else if (newPassword.length < 6) {
                resetMessage.textContent =
                    "The password must contain at least 6 characters.";
            } else if (
                newPassword !== confirmNewPassword
            ) {
                resetMessage.textContent =
                    "The new passwords do not match.";
            } else {
                localStorage.setItem(
                    "leafspacePassword",
                    newPassword
                );

                localStorage.setItem(
                    "leafspaceLoggedIn",
                    "false"
                );

                alert(
                    "Password reset successfully. Please log in using your new password."
                );

                window.location.href = "login.html";
            }
        }
    );
}