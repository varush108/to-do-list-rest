fillList()

function fillList() {
    let taskList = document.getElementById('ulTaskList')
    let toDoList = getTodos();
    console.log(toDoList)
    const todos = getTodos()
    Promise.resolve(todos).then(function(value) {
        for (let i = 0; i < value.length; i++) {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.onclick = function addStrike() {

                this.classList.toggle("strike");

            }
            listItem.textContent = value[i].task;
            taskList.appendChild(listItem);
            console.log(value[i].task)
        }
    });

}

function addTask() {
    let inpNewTask = document.getElementById("inpNewTask");
    let ulTaskList = document.getElementById("ulTaskList");
    if (inpNewTask.value != "") {
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.onclick = function addStrike() {

            this.classList.toggle("strike");

        }
        listItem.textContent = inpNewTask.value;
        ulTaskList.appendChild(listItem);
        addNewTodoJson(inpNewTask.value, false)
        inpNewTask.value = "";

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
    Promise.resolve(resp).then(function(value) {
        console.log("response value : ")
        console.log(value)
    })
}