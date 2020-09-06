export default class HTMLController {
    static createElement(tagName, html) {
        let element = document.createElement(tagName);
        element.innerHTML = html;
        return element;
    }
    static addElement(selector, element) {
        const target = document.querySelector(selector);
        if (!target)
            throw new Error("target is not found");
        target.appendChild(element);
    }
    static removeElementchildren(selector) {
        const target = document.querySelector(selector);
        if (!target)
            throw new Error("target is not found");
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
    }
    static findElement(selector) {
        const element = document.querySelector(selector);
        if (!element)
            throw new Error("can not find element");
        return element;
    }
    static deleteElementValue(selector) {
        const target = document.querySelector(selector);
        if (target) {
            target.value = "";
        }
    }
}
