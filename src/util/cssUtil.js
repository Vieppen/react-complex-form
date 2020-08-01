
export function appendCSSFromString(selector, cssString) {
    return new Promise(function (resolve, reject) {

        let el = document.createElement("style");
        el.type = "text/css";
        el.appendChild(document.createTextNode(cssString));

        document.querySelector(selector).appendChild(el);

        console.log(selector);

    })
}

