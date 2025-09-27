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

function createGrid(data) {
    let voted = JSON.parse(localStorage.getItem("votedProjects")) || [];
    voted = voted.map(Number);
    let txt = "";
    for (let obj of data) {
        if (obj) {
            let disabled = voted.includes(obj.id) ? "disabled" : "";
            txt += `
      <div class="card">
        <div onclick="openProject(${obj.id})" style="cursor:pointer">
           <img src="/images/${obj.myFileName}?t=${Date.now()}" alt="${obj.name}">
           <p>${obj.name}</p>
           <div>${obj.description}</div>
        </div>
        <div>
             <button onClick="deleteProject(${obj.id})">Delete</button>
             <button onClick="getById(${obj.id})">Edit</button>
             <button onClick="vote(${obj.id})" ${disabled}>👍 הצבע (${obj.votes || 0})</button>
        </div>
      </div>`;
        }
    }
    document.getElementById("main").innerHTML = txt;
}

addTitle();