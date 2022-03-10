pageMonsters = 50
start = 0
pageNum = 1;
document.addEventListener("DOMContentLoaded", () => {
 
  fetchMonster();
  createform();
  pageChange()
 document.querySelector('#monster-form').addEventListener('submit', (e) => {
e.preventDefault()
let name = document.querySelector('#names-con').value
let age = document.querySelector('#age-con').value
let description = document.querySelector('#info-con').value
monsterObj = {
  name,
  age,
  description
}

postMon(monsterObj)

 })
 
});

const createform = () => {

let nameQ = document.createElement("input");
let age = document.createElement("input");
let info = document.createElement("input");
let createMonster = document.getElementById("create-monster");
nameQ.id = "names-con"
age.id = "age-con"
info.id = 'info-con'

  let monsterForm = document.createElement("form");
  monsterForm.id = 'monster-form'

  nameQ.placeholder = "Name..";
  age.placeholder = "Age..";
  info.placeholder = "Description..";

  monsterForm.append(nameQ, age, info);
  createMonster.append(monsterForm);

  let btn = document.createElement("button");
  btn.className = "create";
  btn.innerHTML = "Create";
  monsterForm.appendChild(btn);
};

const postMon = ({name, age, description}) => {
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify ({name, age, description })
  })
      .then(resp => resp.json())
      .then(monster => console.log(monster))
}

const fetchMonster = () => {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(r => r.json())
    .then(monsters => {
      const monsterDiv = document.getElementById("monster-container");
      monsters.forEach(monster => {
        let div = document.createElement("div");
        let h4 = document.createElement("h4");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        p.textContent = `Bio: ${monster.description}`;
        h4.textContent = `Age: ${monster.age}`;
        h2.textContent = monster.name;
        div.append(h2, h4, p);
        monsterDiv.appendChild(div);
      })
    })
  }
  
  function pageChange(){
          let btnForward = document.querySelector('#forward')
          btnForward.addEventListener('click', ()=> {
              console.log('forward')
              pageMonsters += 50
              start += 50
              fetchMonster()
              
          })
      
          let btnB = document.querySelector('#back')
          btnB.addEventListener('click', ()=> console.log('back')
         
          )}