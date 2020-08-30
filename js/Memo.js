import Repository from './repository.js'
import HTMLController from './controlElement.js'

export default class Memo {
    constructor(data) {
        this.data = data
    }

    get(){
        const htmlController = new HTMLController()
        const element = htmlController.createElement('li', this._createNewMemoHtml(this.data))
        htmlController.addElement('#memos', element)
    }

    add(){
        const repository = new Repository('memo')
        repository.store(this.data)
    }

    edit(){
        const htmlController = new HTMLController()
        const titleElement = htmlController.findElement('#memoTitle')
        titleElement.value = this.data.title
        const textElement = htmlController.findElement('#memoText')
        textElement.value = this.data.text
        const submitElement = htmlController.findElement('#addMemo')
        submitElement.setAttribute('data-status', 'update');
        submitElement.setAttribute('data-id', this.data.id);
    }

    update(){
        const repository = new Repository('memo')
        console.log('update')
        console.log(this.data)
        repository.update(this.data)
    }

    delete(){
        const repository = new Repository('memo')
        repository.delete(this.data.id)
    }

    _createNewMemoHtml(data){
        return `<div class='memo' id='memo_${data.id}'>`
                + "<div class='id'>"
                +  data.id
                + "</div>"
                + "<div class='title'>"
                +  data.title
                + "</div>"
                + "<div class='text'>"
                +  data.text
                + "</div>"
                + "<div class='memo__btn'>"
                + `<div class='editBtn' data-memo=${JSON.stringify(data)}>編集</div>`
                + `<div class='deleteBtn' data-memo=${JSON.stringify(data)}>削除</div>`
                + "</div>"
                + "</div>"
    }
}

