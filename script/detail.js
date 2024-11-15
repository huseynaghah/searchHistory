import { data } from "./data.js";

let name = new URLSearchParams(window.location.search).get("name");

console.log(data);

const currentInfo = data.find((airport)=> airport.name == name);

document.body.innerHTML += `
    <h1>${currentInfo.name}</h1>
    <h1>${currentInfo.city}</h1>
`
console.log(name);

