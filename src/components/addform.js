import {Todo} from '../entity/todo';


export class AddForm {


    constructor(saveCb) {
        this.SaveCb = saveCb;
    }

    setUpEvents() {
       const form = document.querySelector('#app-add-form #app-add-form-form');

       if (form) {
           form.addEventListener('submit', this.clickSubmit.bind(this));
       }

       const closeLink = document.querySelector(`#app-add-form a.add-form-close`);

       if (closeLink) {
           closeLink.addEventListener('click', this.clickClose.bind(this));
       }
    }

    dispose() {
        const form = document.querySelector('#app-add-form #app-add-form-form');

        if (form) {
            form.removeEventListener('submit', this.clickSubmit.bind(this));
        }

        const closeLink = document.querySelector(`#app-add-form a.add-form-close`);

        if (closeLink) {
            closeLink.removeEventListener('click', this.clickClose.bind(this));
        }
    }

    clickSubmit(e) {
        e.preventDefault();
        const text = document.querySelector('#app-add-form #add-form-text').value;
        const todo = Todo.Create(text);
        this.SaveCb(todo);
        this.hide();
    }

    clickClose(e) {
        e.preventDefault();
        this.hide();
    }

    show() {
       const addForm = document.querySelector('#app-add-form');

       if (addForm) {
           addForm.className = 'show';
       }
    }

    hide() {
        const addForm = document.querySelector('#app-add-form');

        if (addForm) {
            addForm.className = 'hide';
        }
    }


    render() {
        setTimeout(() => this.setUpEvents(), 100);

        return `<div id="app-add-form" class="hide">
                  <div class="add-form-title-container">
                     <h3 class="app-add-form__title">Add Todo</h3>  
                     <a class="add-form-close">Close</a>
                  </div>  
                  <form id="app-add-form-form">  
                      <div class="form-row">
                        <label for="add-form-text">Name</label>
                        <input type="text" required name="add-form-text" id="add-form-text" >
                      </div>  
                      <div class="form-row">
                        <button type="submit" >Save</button>
                      </div>  
                  </form> 
                </div>`;
    }

}
