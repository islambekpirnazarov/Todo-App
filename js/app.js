const formTask = document.querySelector("#form-task")
const inputTask = document.querySelector("#input-task")
const list = document.querySelector("ul")
const checkbox = document.querySelector(".checkbox")
const timeDate = document.querySelector(".time-section")
const modal = document.querySelector("#modal")
const overlay = document.querySelector("#overlay")
const close = document.querySelector("#close")
const formEdit = document.querySelector("#form-edit")
const inputEdit = document.querySelector("#input-edit")
let updateTaskId;
const regEx = /^.{3,40}$/

// Array Todo
let todos = []
if(!localStorage.getItem("todos")){
    localStorage.setItem('todos', JSON.stringify(todos))
} else {
    todos = JSON.parse(localStorage.getItem('todos'))
}

// Array Add Object Todo
function getTodosRender(array) {
    list.innerHTML = ""
    if(array.length > 0) {
        array.forEach((element, index) => {
            list.innerHTML += `
            <li>
                <div class="task-text">
                    <div class="checkbox ${element.complate ? "active" : ""}" onclick="complateTodo(${index})">
                        <i class='bx bx-check'></i>
                    </div>
                    <div>
                        <h2>${element.title}</h2>
                        <p>${element.date}</p>
                    </div>
                </div>
                <div class="task-btns">
                    <button class="btn btn-update" onclick="setTodoId(${index})">
                        <i class='bx bxs-edit-alt'></i>
                    </button>
                    <button class="btn btn-delete" onclick="deleteTodo(${index})">
                        <i class='bx bxs-trash-alt' ></i>
                    </button>
                </div>
            </li>
            `
        });
} else list.innerHTML = `<div><i class='bx bx-message-rounded-error'></i>Is not found</div>`
}
getTodosRender(JSON.parse(localStorage.getItem('todos')))

// Set Todo Data
function setTodoData (message) {
    const date = new Date
    const time = date.toTimeString().slice(0, 5)
    const year = date.toLocaleString().slice(0, 10).replaceAll(".", "-")
    const newTodo = {
        id : Date.now,
        title : message,
        date : `${time} ${year}`,
        complate : false
    }
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
    getTodosRender(todos)
}

// Delete Todo
function deleteTodo(id) {
    todos = todos.filter( item => todos.indexOf(item) !== id)
    localStorage.setItem('todos', JSON.stringify(todos))
    getTodosRender(todos)
}

// Edit Todo 
function setTodoId(id) {
    updateTaskId = id
    openModals()
    inputEdit.value = todos.find(item => todos.indexOf(item) === id).title
}
function updateTodo(message) {
    const date = new Date
    const time = date.toTimeString().slice(0, 5)
    const year = date.toLocaleString().slice(0, 10).replaceAll(".", "-")
    const newTodo = {
        id : Date.now,
        title : message,
        date : `${time} ${year}`,
        complate : false
    }
    todos = todos.map(item => {
        if(todos.indexOf(item) === updateTaskId){
            return newTodo
        }
        else return item
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    getTodosRender(todos)
    closeModals()
}

// complate Todo 
function complateTodo(id) {
    todos = todos.map(item => {
        if(todos.indexOf(item) === id) {
            return {
                ...item,
                complate : item.complate ? false : true
            } 
        }
        else 
                return item
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    getTodosRender(todos)
}
// ShowModals
function openModals() {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}
// Close Modals
function closeModals() {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}

// Events

close.addEventListener('click', closeModals)
overlay.addEventListener('click', closeModals)

inputEdit.addEventListener("keyup", () => {
    if(regEx.test(inputEdit.value) && inputEdit.value.trim().length > 2) {
        inputEdit.style.borderColor = "green"
    }
    else{
        inputEdit.style.borderColor = "red"
    }
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    
    if(regEx.test(inputEdit.value) && inputEdit.value.trim().length > 2) {
        updateTodo(inputEdit.value)
        inputEdit.nextElementSibling.style.display = 'none'
        formEdit.reset()
    }else{
        inputEdit.nextElementSibling.style.display = 'inline-block'
        inputEdit.nextElementSibling.textContent = "Mag'liwmat minimum 3 belgi, Max 40 belgiden ibarat bolsin"
    }   
})

inputTask.addEventListener("keyup", () => {
    if(regEx.test(inputTask.value) && inputTask.value.trim().length > 2) {
        inputTask.style.borderColor = "green"
    }
    else{
        inputTask.style.borderColor = "red"
    }
})

formTask.addEventListener("submit", (e) => {
    e.preventDefault()
    if(regEx.test(inputTask.value) && inputTask.value.trim().length > 2) {
        setTodoData(inputTask.value)
        inputTask.nextElementSibling.style.display = 'none'
        formTask.reset()
    }else{
        inputTask.nextElementSibling.style.display = 'inline-block'
        inputTask.nextElementSibling.textContent = "Mag'liwmat minimum 3 belgi, Max 40 belgiden ibarat bolsin"
    }   
})
setInterval(() => {
    const date = new Date
    let time = date.toTimeString().slice(0, 8)
    const year = date.toLocaleString().slice(0, 10).replaceAll(".", "-") 
    timeDate.innerHTML = `
        <div class="time">
            ${time}
        </div>
        <div class="date">
            ${year}
        </div>
    `
}, 1000)
