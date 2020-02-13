import User from '../models/user.model'
import linkService from '../services/links.service'
import logger from '../utils/logger'

class UsersService {
  async create ({ email, phone, linkId }) {
    const user = new User({
      email,
      phone,
      linkId
    })

    return user.save()
  }
}

export default new UsersService()
