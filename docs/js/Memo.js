import Repository from "./repository.js";
import HTMLController from "./controlElement.js";
export default class Memo {
    constructor(data, repository = new Repository("memo")) {
        this.data = data;
        this.repository = repository;
    }
    get() {
        const element = HTMLController.createElement("li", this._createNewMemoHtml(this.data));
        HTMLController.addElement("#memos", element);
    }
    add() {
        this.repository.store(this.data);
    }
    edit() {
        const titleElement = (HTMLController.findElement("#memoTitle"));
        if (!titleElement)
            throw new Error("");
        titleElement.value = this.data.title;
        const textElement = (HTMLController.findElement("#memoText"));
        if (!textElement)
            throw new Error("");
        textElement.value = this.data.text;
        const submitElement = HTMLController.findElement("#addMemo");
        if (!submitElement)
            throw new Error("");
        submitElement.setAttribute("data-status", "update");
        submitElement.setAttribute("data-id", this.data.id);
    }
    update() {
        this.repository.update(this.data);
    }
    delete() {
        this.repository.delete(this.data.id);
    }
    _createNewMemoHtml(data) {
        return (`<div class='memo' id='memo_${data.id}'>` +
            "<div class='id'>" +
            data.id +
            "</div>" +
            "<div class='title'>" +
            data.title +
            "</div>" +
            "<div class='text'>" +
            data.text +
            "</div>" +
            "<div class='memo__btn'>" +
            `<div class='editBtn' data-memo=${JSON.stringify(data)}>編集</div>` +
            `<div class='deleteBtn' data-memo=${JSON.stringify(data)}>削除</div>` +
            "</div>" +
            "</div>");
    }
}
