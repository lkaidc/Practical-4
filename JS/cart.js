const totalItemsElement =
    document.getElementById("total-items");

const subtotalElement =
    document.getElementById("cart-subtotal");

const totalElement =
    document.getElementById("cart-total");

const emptyCartMessage =
    document.getElementById("empty-cart-message");

const checkoutButton =
    document.getElementById("checkout-button");

const continueShoppingButton =
    document.getElementById("continue-shopping");

const cartItems =
    document.querySelectorAll(".cart-item");


function updateCart() {
    const remainingItems =
        document.querySelectorAll(".cart-item");

    let subtotal = 0;

    for (
        let index = 0;
        index < remainingItems.length;
        index++
    ) {
        const price =
            Number(
                remainingItems[index].getAttribute("data-price")
            );

        subtotal = subtotal + price;
    }

    totalItemsElement.textContent =
        remainingItems.length;

    subtotalElement.textContent =
        "₱" + subtotal.toFixed(2);

    totalElement.textContent =
        "₱" + subtotal.toFixed(2);

    if (remainingItems.length === 0) {
        emptyCartMessage.style.display = "block";
        checkoutButton.disabled = false;
    } else {
        emptyCartMessage.style.display = "none";
        checkoutButton.disabled = false;
    }
}


for (
    let index = 0;
    index < cartItems.length;
    index++
) {
    const removeButton =
        cartItems[index].querySelector(".remove-item");

    removeButton.addEventListener("click", function () {
        cartItems[index].remove();

        updateCart();
    });
}


checkoutButton.addEventListener("click", function () {
    const remainingItems =
        document.querySelectorAll(".cart-item");

    if (remainingItems.length === 0) {
        alert("Your shopping cart is empty.");
    } else {
        window.location.href = "checkout.html";
    }
});


continueShoppingButton.addEventListener(
    "click",
    function () {
        window.location.href =
            "../books/bookstore.html";
    }
);


updateCart();   