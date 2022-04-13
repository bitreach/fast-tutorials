var ncp = require("copy-paste")
import isAfter from 'date-fns/isAfter'
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`
const fs = require('fs')
const fileName = 'Screenshot 2021-09-15 at 17.15.37.png'
const SCREENSHOT = 'Screenshot'

const startTime = new Date()
const listOfScreenshots = []
const listOfCopiedItems = []

async function findScreenshots() {
    
    const dir = await fs.promises.opendir(`${desktopDir}/`)
    for await (const dirent of dir) {
        if (dirent.name.includes(SCREENSHOT)) {
            // console.log(dirent.name + ' is relevant')
            fs.stat(`${desktopDir}/${dirent.name}`, (err,stats) => {
                if(err){
                    console.log('there was an error')
                }
                if (isAfter(stats.birthtime,startTime)){

                    listOfScreenshots.push({dateTime:stats.birthtime, path:`${desktopDir}/${dirent.name}`})
                }

            })
        }
        

    }


}
// findScreenshots()
setInterval(findScreenshots, 1000)
setInterval(generateMarkdown, 1000)




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


function generateMarkdown() {
    const intro = '# My JS Tutorial \n'
    const subheader = '## In this tutorial I will show you how to write hello world \n'

    // const arrOfImgMDs = listOfScreenshots.map(screen => `![Tux, the Linux mascot]('~${screen.path}') \n`)
    const arrOfCodeMDs = listOfCopiedItems.map(code => `\`\`\`javascript \n ${code.text} \n \`\`\``)
    const codeMDs = arrOfCodeMDs.join('\n')
    // const imgMDs = arrOfImgMDs.join('')
    if (codeMDs){
        fs.writeFile('test.md',  intro + subheader + codeMDs, (err) => {
            // If there is any error in writing to the file, return
            if (err) {
                console.error(err)
                return
            }
        
            // Log this message if the file was written to successfully
            // console.log('wrote to file successfully')
        })
    }
}
function getImageMD() {
    
}