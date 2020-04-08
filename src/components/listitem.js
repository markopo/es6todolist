

export class ListItem {

    /**
     *
     * @param todo
     */
    constructor(todo, doneCb, deleteCb) {
        this.Todo = todo;
        this.DoneCb = doneCb;
        this.DeleteCb = deleteCb;

    }

    setUpEvents() {
        const listId = this.getId();
        const doneCheckBox = document.querySelector(`#${listId} input.list-item__donecheckbox`);

        if (doneCheckBox) {
            doneCheckBox.addEventListener('click', this.clickChecked.bind(this));
        }

        const deleteLink = document.querySelector(`#${listId} a.list-item__deletelink`);

        if (deleteLink) {
            deleteLink.addEventListener('click', this.clickDelete.bind(this));
        }
    }

    clickChecked(e) {
        const checked = e.currentTarget.checked;
        this.Todo.Done = checked;
        this.DoneCb(this.Todo);
    }

    clickDelete(e) {
        e.preventDefault();
        this.DeleteCb(this.Todo);
    }

    dispose() {
        const listId = this.getId();
        const doneCheckBox = document.querySelector(`#${listId} input.list-item__donecheckbox`);

        if(doneCheckBox) {
            doneCheckBox.removeEventListener('click', this.clickChecked);
        }

        const deleteLink = document.querySelector(`#${listId} a.list-item__deletelink`);

        if (deleteLink) {
            deleteLink.removeEventListener('click', this.clickDelete.bind(this));
        }
    }

    getId() {
        return `list-item-${this.Todo.Id}`;
    }

    render() {
        setTimeout(() => this.setUpEvents(), 100);

        const listId = this.getId();
        const isChecked = this.Todo.Done;
        const isCheckedCssClass = isChecked ? 'is-checked' : '';

        return `<li id="${listId}" class="list-item">
                   <strong class="list-item__title ${isCheckedCssClass}">${this.Todo.Name}</strong> 
                   <span class="list-item__linkscontainer">
                       <input ${isChecked ? 'checked' : '' } type="checkbox" class="list-item__donecheckbox" >
                       <a class="list-item__deletelink" >Delete</a>    
                   </span>
                </li>`;
    }

}
