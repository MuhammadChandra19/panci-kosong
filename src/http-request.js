const requestPromise = require("request-promise")

module.exports = async (url, method, data = null) => {
  try {
    const config = {
      method: method,
      url: url,
    }
    console.log(config)
    const result = await requestPromise({ ...config })
    return result
  } catch (e) {
    throw e
  }
}
