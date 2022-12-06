const express = require('express')
const loadAssets = require('./src/request')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App listening on port ${port}!`))
app.use(express.json())

app.get('/', (req, res) => res.status(200).json({
    status: 'success',
    data: []
}))

app.post('/api/assets', async (req, res) => {

    const { address } = req.body

    if(!address || !address.startsWith('0x') || address.length < 20){
        return res.json({ status: 'failed', msg: 'missing or invalid wallet address'})
    }

    try {

        const assets = await loadAssets(address)
        res.status(200).json({ status: 'success',data: assets })
        
    } catch (error) {

        res.status(400).json({ status: 'failed', data: null})
        
    }
    

})

app.all('*', (req, res) => res.status(404).send(`requested path ${req.originalUrl} not found`))
