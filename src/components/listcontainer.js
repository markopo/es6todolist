import {ListItem} from './listitem';
import {LocalStorageService} from '../services/localstorageservice';
import {todoListKey} from '../constants/localstoragekeys';



export class ListContainer {

    constructor(appCb) {
        this.ListItems = [];
        this.AppCallback = appCb;
        this.LocalStorageService = new LocalStorageService();

        const todoList = this.LocalStorageService.get(todoListKey);

        if (todoList !== null) {

            try {
                this.ListItems = todoList.map(x => this.createListItem(x));
            }
            catch (e) {
                console.log('error: ', e.message);
                this.ListItems = [];
            }
        }
    }

    createListItem(todo) {
        return new ListItem(todo, this.doneCallback.bind(this), this.deleteCallback.bind(this));
    }

    add(listItem) {
        this.ListItems.push(listItem);
        this.LocalStorageService.set(todoListKey, this.ListItems.map(x => x.Todo));
    }

    delete(todo) {
        const selectedIndex = this.ListItems.findIndex(x => x.Todo.Id === todo.Id);

        if (selectedIndex > -1) {
            this.ListItems.splice(selectedIndex, 1);
            this.LocalStorageService.set(todoListKey, this.ListItems.map(x => x.Todo));
        }

        return selectedIndex > -1;
    }

    doneCallback(todo) {
        const selectedTodo = this.ListItems.find(x => x.Todo.Id === todo.Id);

        if (selectedTodo) {
            selectedTodo.Done = todo.Done;

            this.LocalStorageService.set(todoListKey, this.ListItems.map(x => x.Todo));

            this.ListItems.forEach(x => {
                x.dispose();
            });

            this.AppCallback();
        }
    }

    deleteCallback(todo) {

        const deleted = this.delete(todo);

        if (deleted) {
            this.ListItems.forEach(x => {
                x.dispose();
            });

            this.AppCallback();
        }
    }

    render() {
        const html = [];
        html.push(`<ul class="app-list-container">`);
        this.ListItems.forEach(x => html.push(x.render()));
        html.push('</ul>');

        return html.join('');
    }
}
