export default class HTMLController {
  createElement(tagName: string, html: string) {
    let element = document.createElement(tagName);
    element.innerHTML = html;
    return element;
  }

  addElement(selector: string, element: HTMLElement) {
    const target = document.querySelector(selector);
    if (!target) throw new Error("target is not found");
    target.appendChild(element);
  }

  removeElementchildren(selector: string) {
    const target = document.querySelector(selector);
    if (!target) throw new Error("target is not found");
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
  }

  findElement(selector: string) {
    const element = document.querySelector(selector);
    if (!element) throw new Error("can not find element");
    return element;
  }

  deleteElementValue(selector: string) {
    const target = <HTMLInputElement>document.querySelector(selector);
    if (target) {
      target.value = "";
    }
  }
}
