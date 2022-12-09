import fetch from 'got';
import scrapeAssets from './util/scraper.js'
import links from './webpages/explorers.js'

const handleFetch = async (webpage) => {
    const html = await fetch(webpage).text()
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

export default loadAssets