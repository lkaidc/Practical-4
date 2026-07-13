let currentPage = 1;

const totalPages = 20;

const previousButton =
    document.getElementById("previous-page");

const nextButton =
    document.getElementById("next-page");

const pageNumber =
    document.getElementById("page-number");

const pageContent =
    document.getElementById("page-content");


function updateReader() {
    pageNumber.textContent =
        "Page " + currentPage + " of " + totalPages;

    pageContent.textContent =
        "You are now viewing page " +
        currentPage +
        " of the online reader demonstration.";

    if (currentPage === 1) {
        previousButton.disabled = true;
    } else {
        previousButton.disabled = false;
    }

    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}


previousButton.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage = currentPage - 1;

        updateReader();
    }
});


nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
        currentPage = currentPage + 1;

        updateReader();
    }
});

updateReader();