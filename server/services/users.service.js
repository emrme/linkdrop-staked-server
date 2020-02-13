import User from '../models/user.model'
import linkService from '../services/links.service'
import logger from '../utils/logger'

class UsersService {
  async create ({ email, userId, linkId }) {
    const user = new User({
      email,
      userId,
      linkId
    })

    return user.save()
  }
}

export default new UsersService()
