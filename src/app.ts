import express from 'express'

const app = express()

// middlewares
app.use(express.json())

// routes
app.get('/api/healthy', (req, res) => {
  return res.send('Healthy')
})

export default app
