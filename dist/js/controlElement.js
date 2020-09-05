export default class HTMLController {
    createElement(tagName, html) {
        let element = document.createElement(tagName);
        element.innerHTML = html;
        return element;
    }
    addElement(selector, element) {
        const target = document.querySelector(selector);
        if (!target)
            throw new Error("target is not found");
        target.appendChild(element);
    }
    removeElementchildren(selector) {
        const target = document.querySelector(selector);
        if (!target)
            throw new Error("target is not found");
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
    }
    findElement(selector) {
        const element = document.querySelector(selector);
        if (!element)
            throw new Error("can not find element");
        return element;
    }
    deleteElementValue(selector) {
        const target = document.querySelector(selector);
        if (target) {
            target.value = "";
        }
    }
}
