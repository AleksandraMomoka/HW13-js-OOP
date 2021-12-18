class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        this.el.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target.className === 'set-status') {
                this.changeStatus(e.target.parentElement.dataset.id);
                e.target.parentElement.classList.toggle('done');
            } else if (e.target.className === 'delete') {
                this.removeTodo(e.target.parentElement.dataset.id);
                e.target.parentElement.remove();
            }
        })
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((el) => {
            return el.id !== id;
        });
    }

    getTodos() {
        return this.todos;
    }

    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = this.todos[index].status;

    }

    searchEl(){
        let searchLis = '';
        for(let el of this.todos) {
            if(el.value.includes(input.value)) {
                console.log(el.value);
                searchLis += `<li data-id="${el.id}" class="in-progres">${el.value}<button class="set-status">Change status</button><button class="delete">Delete</button></li>`;
            }
            this.el.innerHTML = searchLis;
        }
    }

    render() {
        let lis = '';
        for(let el of this.todos) {
            if(!el) {
                return;
            }
            lis += `<li data-id="${el.id}" class="in-progres">${el.value}<button class="set-status">Change status</button><button class="delete">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
        
    }
}

class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2,9);
    }
    
}

let input = document.getElementById('input-pole-tasks');
let list = document.getElementById('list');
let addBtn = document.getElementById('btn-add');
let findBtn = document.getElementById('btn-find')
let createLi = new TodoList(list);

addBtn.addEventListener('click', (e) => {
    if(e.target) {
        createLi.addTodo(new Task(input.value, false));
        createLi.render();
        input.value = '';
    }
});

findBtn.addEventListener('click', () => {
    createLi.searchEl();
})