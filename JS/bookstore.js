const searchInput =
    document.getElementById("book-search-input");

const books =
    document.querySelectorAll(".book-card");

const searchMessage =
    document.getElementById("search-message");


if (searchInput !== null) {
    searchInput.addEventListener("input", function () {
        const searchText =
            searchInput.value.toLowerCase();

        let matchingBooks = 0;

        for (let index = 0; index < books.length; index++) {
            const bookTitle =
                books[index]
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

            const bookAuthor =
                books[index]
                    .querySelector(".book-author")
                    .textContent
                    .toLowerCase();

            if (
                bookTitle.includes(searchText) ||
                bookAuthor.includes(searchText)
            ) {
                books[index].style.display = "";
                matchingBooks = matchingBooks + 1;
            } else {
                books[index].style.display = "none";
            }
        }

        if (matchingBooks === 0) {
            searchMessage.textContent =
                "No books or authors matched your search.";
        } else {
            searchMessage.textContent = "";
        }
    });
}