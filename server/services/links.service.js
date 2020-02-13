import LinkdropSDK from '@linkdrop/sdk'
import { ethers } from 'ethers'
import { AddressZero } from 'ethers/constants'
import logger from '../utils/logger'

class LinksService {
  constructor () {
    this.sdk = new LinkdropSDK({
      senderAddress: process.env.SENDER_ADDRESS,
      factoryAddress: process.env.LINKDROP_FACTORY_ADDRESS,
      chain: process.env.CHAIN,
      apiHost:
        process.env.API_HOST || `https://${process.env.CHAIN}-v2.linkdrop.io`,
      jsonRpcUrl: process.env.JSON_RPC_URL
    })
  }

  getLinkStatus (claimId) {
    return this.sdk.getLinkStatus(claimId, process.env.CAMPAIGN_ID)
  }

  getContractAddress () {
    return this.sdk.getProxyAddress(process.env.CAMPAIGN_ID)
  }

  async generateLink () {
    return this.sdk.generateLink({
      campaignId: process.env.CAMPAIGN_ID,
      token: process.env.TOKEN_ADDRESS || AddressZero,
      nativeTokensAmount: process.env.NATIVE_TOKENS_AMOUNT || 0,
      tokensAmount: process.env.TOKENS_AMOUNT || 0,
      feeAmount: process.env.FEE_AMOUNT,
      signingKeyOrWallet: process.env.SIGNING_KEY
    })
  }
}

export default new LinksService()
