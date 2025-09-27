function addTitle(){
    let txt = "פרוייקט סיום";
    document.getElementById("h1").innerText = txt;
}

async function getData() {
    try {
        let response = await fetch("/p");
        let data = await response.json();
        createGrid(data);
    } catch (err) {
        alert(err);
    }
}

addTitle();