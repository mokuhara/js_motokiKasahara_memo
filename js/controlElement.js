export default class HTMLController{

    createElement(tagName, html){
        let element = document.createElement(tagName)
        element.innerHTML = html
        return element
    }

    addElement(selector, element){
        const target = document.querySelector(selector)
        target.appendChild(element)
    }

    removeElementchildren(selector){
        const target = document.querySelector(selector)
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
    }

    findElement(selector){
        return document.querySelector(selector)
    }

    deleteElementValue(selector){
        const target = document.querySelector(selector)
        target.value = ''
    }
}

