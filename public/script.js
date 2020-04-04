getTodos().then(function(value) {
    fillList(value)
})


function fillList(todos) {
    let taskList = document.getElementById('ulTaskList')

    for (let i = 0; i < todos.length; i++) {
        let listItem = document.createElement("li")
        listItem.classList.add("list-group-item")
        listItem.onclick = function addStrike() {

            this.classList.toggle("strike")

        }
        listItem.setAttribute("id", todos[i].id)
        listItem.textContent = todos[i].task
        taskList.appendChild(listItem)

    }


}

function addTask() {
    let inpNewTask = document.getElementById("inpNewTask")
    let ulTaskList = document.getElementById("ulTaskList")
    if (inpNewTask.value != "") {
        let listItem = document.createElement("li")
        listItem.classList.add("list-group-item")
        listItem.onclick = function addStrike() {

            this.classList.toggle("strike")

        }
        listItem.textContent = inpNewTask.value
        ulTaskList.appendChild(listItem)
        addNewTodoJson(inpNewTask.value, false)
        inpNewTask.value = ""

    }


}


async function getTodos() {
    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()

    return todos
}

async function addNewTodoUrlEncoded(task, done, due) {
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `task=${task}&done=${done}&due=2020-04-05`
    })
}

async function addNewTodoJson(task, done) {
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task, done, due: '2020-04-05' })
    })

}

async function deleteTaskFromList(id) {
    const resp = await fetch('/todos/' + id, {
        method: 'DELETE',
    })

}


function deleteTask() {
    const ulTaskList = document.getElementById("ulTaskList");
    let doneTasks = document.getElementsByClassName("strike");
    while (doneTasks[0]) {
        deleteTaskFromList(doneTasks[0].getAttribute("id"))
        ulTaskList.removeChild(doneTasks[0]);
    }
}