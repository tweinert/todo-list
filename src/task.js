export default class Task {
    constuctor(name, dueDate = 'No date', description = '') {
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
    }

    setName(name) {
        this.name = name;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setDescription(description) {
        this.description = description;
    }

    getName() {
        return this.name;
    }

    getDueDate() {
        return this.dueDate;
    }

    getDescription() {
        return this.description;
    }
}