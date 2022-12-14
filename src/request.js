import fetch from 'node-fetch'
//import httpsProxyAgent from 'https-proxy-agent'
import scrapeAssets from './util/scraper.js'
import links from './webpages/explorers.js'

//const proxy = new httpsProxyAgent('http://127.0.0.1:8080')

const handleFetch = async (webpage) => {
   
    const res = await fetch(webpage,{
        //agent: proxy
    })
     console.log(res)
  
    const html = await res.text()
    const assets = scrapeAssets(webpage,html)
    return assets
}

const loadAssets = async (req,res) => {
    const { address } = req.body
    if(!address || !address.startsWith('0x') || address.length < 20){
        return res.json({ status: 'failed', msg: 'missing or invalid wallet address'})
    }

    try {
        const [ETHEREUM,POLYGON,BNBCHAIN] = await Promise.all(links.map(link => handleFetch(`${link}address/${address}`)))
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
        res.status(200).json({ status: 'success',data: results }) 
        
    } catch (error) {
        res.status(500).json({ status: 'failed',error: error })       
    }     

}

export default loadAssets