import express from 'express'
import loadAssets from './src/request.js'

const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App listening on port ${port}!`))

app.use(express.json())

app.get('/', (req, res) => res.status(200).json({ status: 'success', data: [] }))

app.post('/api/assets', loadAssets)

app.all('*', (req, res) => res.status(404).send(`requested path ${req.originalUrl} not found`))
