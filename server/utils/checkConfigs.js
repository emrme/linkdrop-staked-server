const checkConfigs = () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI env variable is not provided')
  }
  if (!process.env.TOKEN_ADDRESS) {
    throw new Error('TOKEN_ADDRESS env variable is not provided')
  }
  if (!process.env.TOKENS_AMOUNT) {
    throw new Error('TOKENS_AMOUNT env variable is not provided')
  }
  if (!process.env.NATIVE_TOKENS_AMOUNT) {
    throw new Error('NATIVE_TOKENS_AMOUNT env variable is not provided')
  }
  if (!process.env.CHAIN) {
    throw new Error('CHAIN env variable is not provided')
  }
  if (!process.env.FEE_AMOUNT) {
    throw new Error('FEE_AMOUNT env variable is not provided')
  }
  if (!process.env.SIGNING_KEY) {
    throw new Error('SIGNING_KEY env variable is not provided')
  }
  if (!process.env.SENDER_ADDRESS) {
    throw new Error('SENDER_ADDRESS env variable is not provided')
  }
  if (!process.env.LINKDROP_FACTORY_ADDRESS) {
    throw new Error('LINKDROP_FACTORY_ADDRESS env variable is not provided')
  }
  if (!process.env.JSON_RPC_URL) {
    throw new Error('JSON_RPC_URL env variable is not provided')
  }
  if (!process.env.PASSWORD_HASH) {
    throw new Error('PASSWORD_HASH env variable is not provided')
  }
}

export default checkConfigs
