import development from './development'
import production from './production'

const getConfigFile = () => {
  const env = process.env.NODE_ENV

  if (env === 'development')
    return development

  if (env === 'test')
    return development

  if (env === 'production')
    return production
}

export default getConfigFile()