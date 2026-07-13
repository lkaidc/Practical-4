const contactForm =
    document.getElementById("contact-form");

const nameInput =
    document.getElementById("contact-name");

const emailInput =
    document.getElementById("contact-email");

const messageInput =
    document.getElementById("contact-message-input");

const formMessage =
    document.getElementById("contact-form-message");


if (contactForm !== null) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {
            formMessage.textContent =
                "Please complete all fields.";
        } else if (
            email.includes("@") === false ||
            email.includes(".") === false
        ) {
            formMessage.textContent =
                "Please enter a valid email address.";
        } else {
            formMessage.textContent =
                "Your message was submitted successfully.";

            contactForm.reset();
        }
    });
}