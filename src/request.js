const request = require('request-promise')
const scrapeAssets = require('./util/scraper')
const links = require('./webpages/explorers')


const handleFetch = async (webpage) => {

    const html = await request(webpage)
    const assets = scrapeAssets(webpage,html)
    return assets

}

const loadAssets = async (walletAddress) => {

    const [ETHEREUM,POLYGON,BNBCHAIN] = await Promise.all(links.map(link => handleFetch(`${link}address/${walletAddress}`)))
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