import logger from '../utils/logger'
import linksService from '../services/links.service'
import usersService from '../services/users.service'
import User from '../models/user.model'

export const getLinkStatus = async (req, res) => {
  const linkId = req.params.linkId
  if (!linkId) {
    throw new Error('Please provide link id')
  }
  let status = await linksService.getLinkStatus(linkId)
  res.json({ linkId, status })
}

export const generateLink = async (req, res) => {
  const { email, phone, passwordHash } = req.body

  if (!passwordHash) {
    throw new Error('Please provide the password hash')
  }

  if (passwordHash !== process.env.PASSWORD_HASH) {
    throw new Error('Invalid password hash provided')
  }

  if (email && phone) {
    throw new Error('Please provide either email or phone number only')
  }

  if (!email && !phone) {
    throw new Error(' Please provide email or phone number')
  }

  let link, user

  if (email) {
    logger.info(`Got request to generate links from ${email}: `)

    user = await User.findOne({
      email
    })

    if (user) {
      logger.debug('Existing user found:')
      logger.json(user)
      return res.send({
        success: false,
        message: 'User with provided email already exists',
        user
      })
    }

    logger.debug(`Generating new link for ${email}`)
    link = await linksService.generateLink()
    logger.debug(
      `Link for ${email} generated successfully. Link id: ${link.linkId}`
    )

    logger.debug(`Saving user ${email} to database:`)
  } else if (phone) {
    logger.info(`Got request to generate links from ${phone}: `)

    user = await User.findOne({
      phone
    })

    if (user) {
      logger.debug('Existing user found:')
      logger.json(user)
      return res.send({
        success: false,
        message: 'User with provided phone number already exists',
        user
      })
    }

    logger.debug(`Generating new link for ${phone}`)
    link = await linksService.generateLink()
    logger.debug(
      `Link for ${phone} generated successfully. Link id: ${link.linkId}`
    )

    logger.debug(`Saving user ${phone} to database:`)
  }

  user = await usersService.create({ email, phone, linkId: link.linkId })
  logger.json(user)
  logger.debug(`User ${email} successfully saved to db.`)

  res.send({ success: true, user, link: link.url })
}
