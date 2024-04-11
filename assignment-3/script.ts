async function getGenre() {
    try {
        const response = await fetch("https://binaryjazz.us/wp-json/genrenator/v1/genre/");
        let genre:JSON = await response.json();
        console.log(genre);
        return genre;
    } catch (err) {
        return err;
    }
}

async function Page() {
    let genre = await getGenre();
    console.log(genre);
    return `
    <div>
    <h2>have you tried listening to</h2>
    </div>
    <div>
    <h1>${genre}</h1>
    </div>
    <div>
    <h2>yet?</h2>
    </div>`;
}

function EmptyPage() {
    return `<div class="container"><div id="responseSpace"></div><button>new rec</button></div>`
}

async function refreshGenre() {
    console.log("clicked!");
    let responseSpace = document.getElementById("responseSpace");
    responseSpace.innerHTML = await Page();
}

async function loadPage(page) {
    let body = document.querySelector('body');
    if (body != null) {
        console.log("hi");
        body.innerHTML = page;
    }
}

loadPage(EmptyPage());
document.querySelector("button").addEventListener('click', () => {
    refreshGenre();
})