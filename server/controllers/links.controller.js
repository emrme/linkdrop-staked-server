import logger from '../utils/logger'
import linksService from '../services/links.service'
import usersService from '../services/users.service'
import User from '../models/user.model'

export const getLinkStatus = async (req, res) => {
  const linkId = req.params.linkId
  if (!linkId) {
    throw new Error('Link id should be provided')
  }
  let status = await linksService.getLinkStatus(linkId)
  res.json({ linkId, status })
}

export const generateLink = async (req, res) => {
  const { email, userId, passwordHash } = req.body

  if (!email) {
    throw new Error('Email should be provided')
  }
  if (!userId) {
    throw new Error('User id should be provided')
  }
  if (!passwordHash) {
    throw new Error('Password hash should be provided')
  }

  logger.info('Got request to generate links: ')
  logger.json(
    {
      email,
      userId,
      passwordHash
    },
    'info'
  )

  if (passwordHash !== process.env.PASSWORD_HASH) {
    throw new Error('Invalid password hash provided')
  }

  let user = await User.findOne({
    email,
    userId
  })

  if (user) {
    logger.debug(`Existing user found:`)
    logger.json(user)
    return res.send({
      success: false,
      message: 'User with provided fields already exists',
      user
    })
  }

  logger.debug(`Generating new link for ${email}`)
  const link = await linksService.generateLink()
  logger.debug(
    `Link for ${email} generated successfully. Link id: ${link.linkId}`
  )

  logger.debug(`Saving user ${email} to database:`)
  user = await usersService.create({ email, userId, linkId: link.linkId })
  logger.json(user)
  logger.debug(`User ${email} successfully saved to db.`)

  res.send({ success: true, user, link: link.url })
}
