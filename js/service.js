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

const htmlController = new HTMLController()

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
    const btn = htmlController.findElement('#addMemo')
    btn.addEventListener('click', () => {
        const memoOjb = _getInputData()
        if(!memoOjb) return console.error('null error')
        if(btn.getAttribute('data-status') === 'new'){
            _createMemo(memoOjb)
        } else if (btn.getAttribute('data-status') === 'update'){
            memoOjb.id = btn.getAttribute('data-id')
            _updateMemo(memoOjb)
        }
        _reloadAllMemo()
        btn.setAttribute('data-status', 'new');
    }, false);
}

const editMemoLister = () => {
    const editBtns = document.querySelectorAll('.editBtn')
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', (element) =>{
            const _memo = _getTargetMemo(element)
            _memo.edit()
            _changeEditBtnStatus('edit')
        })
    });
}


const deleteLister = () => {
    const deleteBtns = document.querySelectorAll('.deleteBtn')
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (element) =>{
            const _memo = _getTargetMemo(element)
            _memo.delete()
            _reloadAllMemo()
        })
    });

}


const cancelLister = () =>{
    const cancelBtn = document.querySelector('#cancel')
    cancelBtn.addEventListener('click', () => {
        cancelBtn.classList.add("hidden")
        _changeEditBtnStatus('cancel')
        _deleteInputValue()
    })
}


//ここから内部で使用する関数
const _createMemo = (memo) => {
    const _memo = new Memo(memo)
    _memo.add()
    _deleteInputValue()
}

const _updateMemo = (memo) => {
    const _memo = new Memo(memo)
    _memo.update()
    _deleteInputValue()
    _changeEditBtnStatus('create')
}

const _changeEditBtnStatus = (status) => {
    if(status === 'create'){
        htmlController.findElement('#cancel').classList.add("hidden")
        htmlController.findElement('#addMemo').innerHTML = "作成"
    } else if (status === 'edit'){
        htmlController.findElement('#cancel').classList.remove("hidden")
        htmlController.findElement('#addMemo').innerHTML = "更新"
    } else if (status === 'cancel'){
        const btn = htmlController.findElement('#addMemo')
        btn.setAttribute('data-status', 'new')
    }
}

const _getTargetMemo = (element) => {
    if(!element || !element.currentTarget.dataset || !element.currentTarget.dataset.memo) return
    return new Memo(JSON.parse(element.currentTarget.dataset.memo))
}


const _getInputData = () => {
    const title = htmlController.findElement("#memoTitle").value
    const text = htmlController.findElement("#memoText").value
    const titleVal = _isNullValidation(title, "titleが空白です")
    const textVal = _isNullValidation(text, "textが空白です")
    if(titleVal || textVal) return null
    return {title, text}
}


const _isNullValidation = (target, message) =>{
    if(!target){
        alert(message)
        return true
    }
}

const _deleteInputValue = () => {
    htmlController.deleteElementValue('#memoTitle')
    htmlController.deleteElementValue('#memoText')
}

const _reloadAllMemo = () =>{
    htmlController.removeElementchildren("#memos")
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