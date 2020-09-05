import Memo from "./Memo.js";
import Repository from "./repository.js";
import HTMLController from "./controlElement.js";
import AIBot from "./aibot.js";
const htmlController = new HTMLController();
const getAllMemos = () => {
    const repository = new Repository("memo");
    const memos = repository.getAll();
    if (memos) {
        memos.forEach((memo) => {
            const _memo = new Memo(memo);
            _memo.get();
        });
    }
};
const createMemolister = () => {
    const btn = htmlController.findElement("#addMemo");
    if (!btn)
        throw new Error("btnElement is not found");
    btn.addEventListener("click", () => {
        const memoOjb = _getInputData();
        if (!memoOjb)
            return console.error("null error");
        if (btn.getAttribute("data-status") === "new") {
            _createMemo(memoOjb);
            if (_getBotSetting() === "ON") {
                _replyBot(memoOjb.text);
            }
        }
        else if (btn.getAttribute("data-status") === "update") {
            memoOjb.id = btn.getAttribute("data-id");
            _updateMemo(memoOjb);
            if (_getBotSetting() === "ON") {
                _replyBot(memoOjb.text);
            }
        }
        _reloadAllMemo();
        btn.setAttribute("data-status", "new");
    }, false);
};
const editMemoLister = () => {
    const editBtns = document.querySelectorAll(".editBtn");
    editBtns.forEach((editBtn) => {
        editBtn.addEventListener("click", (event) => {
            const _memo = _getTargetMemo(event);
            if (!_memo)
                throw new Error("failed get memo");
            _memo.edit();
            _changeEditBtnStatus("edit");
        });
    });
};
const deleteLister = () => {
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (event) => {
            const _memo = _getTargetMemo(event);
            if (!_memo)
                throw new Error("failed get memo");
            _memo.delete();
            _reloadAllMemo();
        });
    });
};
const cancelLister = () => {
    const cancelBtn = htmlController.findElement("#cancel");
    if (!cancelBtn)
        throw new Error("cancel btn is not found");
    cancelBtn.addEventListener("click", () => {
        cancelBtn.classList.add("hidden");
        _changeEditBtnStatus("cancel");
        _deleteInputValue();
    });
};
const changeBotSettingListener = () => {
    const settingBtn = (htmlController.findElement("#botsettingBtn"));
    if (!settingBtn)
        throw new Error("setting btn is not found");
    settingBtn.addEventListener("click", () => {
        if (settingBtn.innerText === "OFF") {
            settingBtn.innerText = "ON";
        }
        else if (settingBtn.innerText === "ON") {
            settingBtn.innerText = "OFF";
        }
    });
};
//ここから内部で使用する関数
const _createMemo = (memo) => {
    const _memo = new Memo(memo);
    _memo.add();
    _deleteInputValue();
};
const _updateMemo = (memo) => {
    const _memo = new Memo(memo);
    _memo.update();
    _deleteInputValue();
    _changeEditBtnStatus("create");
};
const _changeEditBtnStatus = (status) => {
    if (status === "create") {
        htmlController.findElement("#cancel").classList.add("hidden");
        htmlController.findElement("#addMemo").innerHTML = "作成";
    }
    else if (status === "edit") {
        htmlController.findElement("#cancel").classList.remove("hidden");
        htmlController.findElement("#addMemo").innerHTML = "更新";
    }
    else if (status === "cancel") {
        const btn = htmlController.findElement("#addMemo");
        btn.setAttribute("data-status", "new");
    }
};
const _getTargetMemo = (element) => {
    const _element = element.currentTarget;
    if (!element || !_element.dataset || !_element.dataset.memo)
        return;
    return new Memo(JSON.parse(_element.dataset.memo));
};
const _getInputData = () => {
    const titleElenent = (htmlController.findElement("#memoTitle"));
    const textElement = htmlController.findElement("#memoText");
    const title = _isNullValidation(titleElenent, "titleが空白です");
    const text = _isNullValidation(textElement, "textが空白です");
    if (!title || !text)
        return;
    const id = "";
    return { title, text, id };
};
const _isNullValidation = (target, message) => {
    if (!target || !target.value) {
        alert(message);
        return "";
    }
    return target.value;
};
const _deleteInputValue = () => {
    htmlController.deleteElementValue("#memoTitle");
    htmlController.deleteElementValue("#memoText");
};
const _reloadAllMemo = () => {
    htmlController.removeElementchildren("#memos");
    getAllMemos();
    editMemoLister();
    deleteLister();
    cancelLister();
};
const _getBotSetting = () => {
    const settingBtn = (htmlController.findElement("#botsettingBtn"));
    if (!settingBtn)
        throw new Error("");
    return settingBtn.innerText;
};
const _replyBot = (text) => {
    const aibot = new AIBot(text);
    const message = aibot.createAIBotReply();
    const settingBtn = (htmlController.findElement("#botsettingBtn"));
    if (!settingBtn)
        throw new Error("");
    settingBtn.innerText = "OFF";
    message.text.then((text) => {
        if (!text)
            return;
        const _text = text.replace('"', "");
        const titleElement = (htmlController.findElement("#memoTitle"));
        if (!titleElement)
            throw new Error("");
        titleElement.value = message.title;
        const textElement = (htmlController.findElement("#memoText"));
        if (!textElement)
            throw new Error("");
        textElement.value = _text;
        const btnElement = htmlController.findElement("#addMemo");
        if (!btnElement)
            throw new Error("");
        btnElement.click();
        titleElement.value = "";
        textElement.value = "";
    });
};
// 全削除
const repository = new Repository("memo");
repository.deleteAll();
export default {
    getAllMemos,
    createMemolister,
    editMemoLister,
    deleteLister,
    cancelLister,
    changeBotSettingListener,
};
