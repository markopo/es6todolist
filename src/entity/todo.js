import { v4 as uuidv4 } from 'uuid';

export class Todo {

    constructor(id, name) {
        this.Id = id;
        this.Name = name;
        this.Done = false;
    }

    static Create(name='') {
        const id = uuidv4();
        return new Todo(id, name);
    }
}
