import { data } from "./data.js";


const wrapper = document.querySelector('tbody');
const searchInp = document.querySelector("#search");
const btn = document.querySelector("#btn");
const container = document.querySelector(".searchContainer");

let searchHistory =JSON.parse(localStorage.getItem("searchHistory")) || [];

// console.log(searchHistory);


function render(airports) {
    
    wrapper.innerHTML = "";

    airports.forEach((airport ,index)=> {
        wrapper.innerHTML += `
            <tr>
                <td>${++index}</td>

                <td><a href="./detail.html?name=${airport.name}">${airport.name}</a></td>

                <td>${airport.city}</td>

                <td>${airport.code}</td>

                <td>${airport.country_code}</td>
            </tr>
        `
    });


    
}

function renderSearch(){

    container.innerHTML = ""

    if(searchHistory.length){
        searchHistory.toReversed().forEach(hs =>{

            
            container.innerHTML += `<div class="history">${hs}</div>`
        })
    }

    let historyTabs = document.querySelectorAll('.history');


    historyTabs.forEach((tab)=>{

        
        tab.addEventListener('click', (e)=>{
            // console.log(e);
            
            searchInp.value = e.target.textContent;
        })
    })

}

renderSearch();

searchInp.addEventListener('focus', ()=>{
    container.classList.add("active")
    
})

searchInp.addEventListener('focusout', ()=>{
    setTimeout(()=>{
        container.classList.remove("active")
    }, 100)
   
    
})

btn.addEventListener('click', ()=>{

   

    if (searchHistory.length > 9) {
       searchHistory = searchHistory.slice(1);
    }

   

    if (!searchHistory.some(hs=> hs == searchInp.value)) {
        if (searchInp.value.trim()) {
            searchHistory.push(searchInp.value);
        }
    }
   
   localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
   renderSearch();
   render(searchByName(searchInp.value))
   
})

function searchByName(value) {

    return data.filter((airport)=> airport.name.toLowerCase().startsWith(value.toLowerCase()));

}


render(data)


