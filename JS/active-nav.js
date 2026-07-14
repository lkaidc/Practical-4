const navigationLinks =
    document.querySelectorAll(".navigation a");

let currentPage =
    window.location.pathname.split("/").pop();

if (currentPage === "") {
    currentPage = "index.html";
}

for (
    let index = 0;
    index < navigationLinks.length;
    index++
) {
    const linkAddress =
        navigationLinks[index].getAttribute("href");

    const linkPage =
        linkAddress.split("/").pop();

    if (linkPage === currentPage) {
        navigationLinks[index].classList.add(
            "active-nav"
        );

        navigationLinks[index].setAttribute(
            "aria-current",
            "page"
        );
    }
}