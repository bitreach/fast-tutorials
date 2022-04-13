var ncp = require("copy-paste");

const listOfCopiedItems = []
function trackAllCopiedText (prev = "") {
    const text  = ncp.paste()
    if (prev !== text){
        listOfCopiedItems.push({
            text,
            dateTime: new Date()
        })
    }
    setTimeout(() => {
        trackAllCopiedText(text)
    }, 1000);
}
trackAllCopiedText()