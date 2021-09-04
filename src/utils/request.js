import fetch from 'node-fetch'

const request = async (URL = null, config = {}) => {
  if (!URL) return URL;

  const fetchConfig = {
    ...config,
    mode: 'cors'
  }

  return await fetch(URL, fetchConfig)
}

export default request
