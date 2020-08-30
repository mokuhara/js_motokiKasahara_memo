import Memo from './Memo.js'
import Repository from './repository.js'
import HTMLController from './controlElement.js'

import AIBot from './AIBot.js'

//AIbotと会話できる機能
// const message = AIBot.getMessage("こんにちは、私はhogeです。")

// console.log('message')
// console.log(message.then(mes=>{
//     console.log(mes)
// }))

const getAllMemos = () => {
    const repository = new Repository('memo')
    const memos = repository.getAll()
    if(memos) {
        memos.forEach(memo =>{
            const _memo =  new Memo(memo)
            _memo.get()
        })
    }
}


const createMemolister = () => {
    const btn = document.querySelector('#addMemo')
    btn.addEventListener('click', () => {
        const title = document.querySelector("#memoTitle").value
        const text = document.querySelector("#memoText").value
        _nullValidation(title, "titleが空白です")
        _nullValidation(text, "textが空白です")
        const memoOjb = {title, text}
        if(btn.getAttribute('data-status') === 'new'){
            const _memo = new Memo(memoOjb)
            _memo.add()
            _deleteInputValue()
        } else if (btn.getAttribute('data-status') === 'update'){
            memoOjb.id = btn.getAttribute('data-id')
            const _memo = new Memo(memoOjb)
            _memo.update()
            _deleteInputValue()
            document.querySelector('#cancel').classList.add("hidden")
            document.querySelector('#addMemo').innerHTML = "作成"
        }
        const htmlController = new HTMLController()
        htmlController.removeElementchildren("#memos")
        _reloadAllMemo()
        btn.setAttribute('data-status', 'new');
    }, false);
}

const editMemoLister = () => {
    const editBtns = document.querySelectorAll('.editBtn')
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', (element) =>{
            if(!element || !element.currentTarget.dataset || !element.currentTarget.dataset.memo) return
            console.log(JSON.parse(element.currentTarget.dataset.memo))
            const _memo = new Memo(JSON.parse(element.currentTarget.dataset.memo))
            _memo.edit()
            document.querySelector('#cancel').classList.remove("hidden")
            document.querySelector('#addMemo').innerHTML = "更新"
        })
    });
}


const cancelLister = () =>{
    const cancelBtn = document.querySelector('#cancel')
    cancelBtn.addEventListener('click', () => {
        cancelBtn.classList.add("hidden")
        const btn = document.querySelector('#addMemo')
        btn.setAttribute('data-status', 'new');
        _deleteInputValue()
    })
}


const deleteLister = () => {
    const deleteBtns = document.querySelectorAll('.deleteBtn')
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (element) =>{
            if(!element || !element.currentTarget.dataset || !element.currentTarget.dataset.memo) return
            const _memo = new Memo(JSON.parse(element.currentTarget.dataset.memo))
            _memo.delete()
            const htmlController = new HTMLController()
            htmlController.removeElementchildren("#memos")
            _reloadAllMemo()
        })
    });

}


const _nullValidation = (target, message) =>{
    if(!target){
        alert(message)
        return
    }
}

const _deleteInputValue = () => {
    const htmlController = new HTMLController()
    htmlController.deleteElementValue('#memoTitle')
    htmlController.deleteElementValue('#memoText')
}

const _reloadAllMemo = () =>{
    getAllMemos()
    editMemoLister()
    deleteLister()
    cancelLister()
}


// 全削除
// const repository = new Repository('memo')
// repository.deleteAll()


export default {
    getAllMemos,
    createMemolister,
    editMemoLister,
    deleteLister,
    cancelLister
}