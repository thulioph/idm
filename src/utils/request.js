import fetch from 'node-fetch'

const request = async (URL = null, config = {}) => {
  if (!URL) return URL;

  const fetchConfig = {
    ...config,
  }

  return await fetch(URL, fetchConfig)
}

export default request
