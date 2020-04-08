import { ListContainer } from './listcontainer';
import {AddForm} from './addform';


export class App {

    constructor(appElem) {
        this.AppElem = appElem;
        this.ListContainer = new ListContainer(this.listCallback.bind(this));
        this.AddForm = new AddForm(this.saveButtonCallback.bind(this));

        this.render();
    }

    setUpEvents() {
       const buttonAddTodo = document.querySelector('.app-title button#btn-add-todo');

       if (buttonAddTodo) {
            buttonAddTodo.addEventListener('click', this.clickAddTodo.bind(this));
       }
    }

    dispose() {
        const buttonAddTodo = document.querySelector('.app-title button#btn-add-todo');

        if (buttonAddTodo) {
            buttonAddTodo.removeEventListener('click', this.clickAddTodo.bind(this));
        }
    }

    clickAddTodo() {
        this.AddForm.show();
    }

    renderTitle() {
        return `<h2 class="app-title">
                    <span>Todo App</span>
                    <button id="btn-add-todo" class="add-todo">Add</button>
                </h2>`;
    }

    listCallback() {
        this.dispose();
        this.render();
    }

    saveButtonCallback(todo) {

        if(this.ListContainer.ListItems.find(x => x.Todo.Id === todo.Id)) {
            alert('Same Todo exists already!');
            return;
        }

        const listItem = this.ListContainer.createListItem(todo);
        this.ListContainer.add(listItem);
        this.dispose();
        this.render();
    }

    render() {
        const html = [];
        html.push(this.renderTitle());
        html.push(this.ListContainer.render());
        html.push(this.AddForm.render());
        this.AppElem.innerHTML = html.join('');

        setTimeout(() => this.setUpEvents(), 100);
    }
}
