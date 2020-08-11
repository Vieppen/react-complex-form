export const appendScript = (scriptToAppend) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    document.body.appendChild(script);
}

export async function getTextFromStream(stream) {

    let reader = stream.getReader();
    let utf8Decoder = new TextDecoder();
    let nextChunk;

    let resultStr = "";

    while (!(nextChunk = await reader.read()).done) {
        if (nextChunk !== undefined) {
            let partialData = nextChunk.value;
            resultStr += utf8Decoder.decode(partialData);
        }
    }

    return resultStr;

}