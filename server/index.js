import * as linksController from './controllers/links.controller'
import checkConfigs from './utils/checkConfigs'
import logger from './utils/logger'
import linksService from './services/links.service'
import User from './models/user.model'
import { ethers } from 'ethers'

const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

// Check that all configs are provided
require('dotenv').config()
checkConfigs()

// Apply middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// Set up default mongoose connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    logger.info('Connected to db: ' + process.env.MONGODB_URI)

    // Run server
    const PORT = process.env.PORT || 5011
    app.listen(PORT, () => {
      logger.info(`Server is up on port ${PORT}\n`)
    })
  })
  .catch(err => {
    logger.error(`${err}\n`)
    process.exit(1)
  })

const getTopupAddress = async (req, res) => {
  logger.debug('req /info')
  const contractAddress = linksService.getContractAddress()
  res.send(contractAddress)
}

// Define routes
app.get('/', (req, res) => res.send(`Hello, world!`))
app.get('/info', asyncHandler(getTopupAddress))
app.post('/generate-link', asyncHandler(linksController.generateLink))
app.get('/get-status/:linkId', asyncHandler(linksController.getLinkStatus))

// error handling
app.use((err, req, res, next) => {
  logger.error(err)
  res.status(err.status || 500)
  let errorMessage = err.message || 'Server error!'
  res.send({ success: false, message: errorMessage })
  return null
})
