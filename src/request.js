const request = require('request-promise')
const scrapeAssets = require('./util/scraper')
const links = require('./webpages/explorers')
const createBrowser = require('browserless')
const browser = createBrowser()



const handleFetch = async (browserless,webpage) => {

    const html = await browserless.html(webpage)
    const assets = scrapeAssets(webpage,html)
    return assets

}

const loadAssets = async (walletAddress) => {

    const browserless = await browser.createContext()
    const [ETHEREUM,POLYGON,BNBCHAIN] = await Promise.all(links.map(link => handleFetch(browserless,`${link}address/${walletAddress}`)))
    
    const results = [{
        chain: 'ethereum',
        total: ETHEREUM.length,
        assets: ETHEREUM
    },{
        chain: 'polygon',
        total: POLYGON.length,
        assets: POLYGON

    },{
        chain: 'bnb chain',
        total: BNBCHAIN.length,
        assets: BNBCHAIN

    }]
    
    return results

}

module.exports = loadAssets