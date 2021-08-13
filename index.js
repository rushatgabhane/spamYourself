const puppeteer = require('puppeteer')
const prompt = require('prompt')

let browser
const messsage = 'This is a bot generated message for testing.'

async function launchBrowser() {
    browser = await puppeteer.launch({
        headless: false
    })

    const page = await browser.newPage()
    await page.goto('https://new.expensify.com')
}

async function startSpam(){
    const allPages = (await browser.pages())
    const page = allPages[allPages.length - 1]

    await page.click('[placeholder="Write something..."]')
    await page.type('[placeholder="Write something..."]', messsage)
    
    await page.keyboard.press('Enter')
}

function getTime() {
    prompt.start()
    prompt.get(['Time interval in seconds'], (err, res) => {
        if (err) {
            return console.error(err)
        }
    
        const timeInterval = parseInt(res['Time interval in seconds'])
    
        if(isNaN(timeInterval) || timeInterval <= 0){
            console.error('\nPlease enter a integer only, and greater than 0.')
            return getTime()
        }

        setInterval(startSpam, timeInterval * 1000);
    });
}

console.log('1. Login using the browser that spawned.')
console.log('2. Navigate to a chat report you wish to spam.')
console.log('3. Then fill up the prompt below\n')

launchBrowser()
getTime()

