const requestPromise = require("request-promise")

module.exports = async (url, method) => {
  try {
    const config = {
      method: method,
      url: url,
    }
    console.log(config)
    const result = await requestPromise({ ...config })
    console.log(result)
    return result
  } catch (e) {
    throw e
  }
}
