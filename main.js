const database = firebase.database();
const headerEl = document.querySelector("#form_header");
const descriptionEl = document.querySelector("#form_description");
const form = document.querySelector("form");
const template = document.querySelector("#noteTemplate").content;
const app = document.querySelector("#app");

form.addEventListener("submit", (e)=> {
    e.preventDefault();

    database.ref("notes/").push({
        header: headerEl.value,
        description: descriptionEl.value
    })
    headerEl.value="";
    descriptionEl.value="";
})

//listen for new data

database.ref("notes/").on("child_added", (snapshot)=>{
    const key = snapshot.key;
    const data = snapshot.val();

    const clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = data.header;
    clone.querySelector("div").textContent = data.description;
    app.appendChild(clone);
});