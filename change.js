//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const li =document.getElementById("list");
const todoList = document.querySelector(".todoList");
const toTask = document.querySelector(".toTask");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user enetered data
    if(userData.trim() != 0){// if user data aren't only space
        addBtn.classList.add("active"); //active the add button
    }
    else{
        addBtn.classList.remove("active");
    }
}

//if user enter add button
addBtn.onclick = () =>{
    let userData = inputBox.value; //getting user enetered data
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage); //javascript object to string object
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));//CONVERT javascript values tojavascript object values
    showData();
    addBtn.classList.remove("active");
}

//list out data

function showData(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorage); //javascript object to string object
    } 
    toTask.textContent = listArr.length; //count the pending task
    //TO CLEAR ALL BUTTON DYNAMIC
    if(listArr.length>0){
        deleteAllBtn.classList.add("active");
    }
    else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = ' ';
    listArr.forEach((element, index) => { 
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
        
    });
    todoList.innerHTML=newLiTag;
    inputBox.value= ' ';//once add input box leave empty
}

//delete list of item
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));//for reload after delete item
    showData();
}

//clear all button
deleteAllBtn.onclick = ()=>{
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showData();

}

