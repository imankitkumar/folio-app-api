const req =  require('request-promise')

req('https://polygonscan.com/tokenholdingsHandler.aspx?&a=0x70bfe28f7e488fc36c0054c9486f201a759c4707&fav=&ps=10')
.then(res => console.log(res))