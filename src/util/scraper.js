const cheerio = require('cheerio')

function fixNativeAssetValue(value){
  let formattedValue = value.split(' ')[0].slice(1)
  if(value.includes('Less Than')){
    formattedValue = value.split(' ')[2].slice(1)
    return formattedValue
  }
  return formattedValue
}

function scrapeAssets(webpage,html_payload){

    const $ = cheerio.load(html_payload)
    const nativeAsset = $('.card-body div div:nth-child(2)').html().split(' ') /* Ether || Matic || BNB  */
    const nativeAssetValueSelector = $('.card-body div:nth-child(3) div:nth-child(2)').text()

    const nativeAssetValue = fixNativeAssetValue(nativeAssetValueSelector) * 1
      
    let primaryAsset = {
            name: nativeAsset[1],
            amount: nativeAsset[0].split('<b>.</b>').join('.'),
            value: nativeAssetValue      
        }

    let primarySelector = '.list-custom-ERC-20'  //Polygon default selector

    if(webpage.includes('etherscan.io')){
        primarySelector = '.list-custom-ERC20'
      } else if(webpage.includes('bscscan.com')){
        primarySelector = '.list-custom-BEP-20'
      }

    let assets = $(primarySelector).map((_,el) => {
      const asset = {
                name: $('.list-name',el).text(),
                amount: $('.list-amount',el).text(),
                value: $('.list-usd-value',el).text().slice(1) * 1
            }
      return asset  
    })
        
    assets = [primaryAsset,...assets]
    return assets
}

module.exports = scrapeAssets