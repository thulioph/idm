import development from './development'

const getConfigFile = () => {
  const env = process.env.NODE_ENV

  if (env === 'development')
    return development

  if (env === 'test')
    return development

  if (env === 'production')
    return {}
}

export default getConfigFile()