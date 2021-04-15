
export function appendCSSFromString(selector, cssString) {
    return new Promise(function () {

        let el = document.createElement("style");
        el.type = "text/css";
        el.appendChild(document.createTextNode(cssString));

        document.querySelector(selector)?.appendChild(el);
    })
}

