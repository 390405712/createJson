import _ from 'lodash'
import development from './development'
import production from './production'
import test from './test'

export const env = process.env.NODE_ENV || 'production'

const configs = {
  development: development,
  test: test,
  production: production
}

const defaultConfig = {
  env: env
}
const index = _.merge(defaultConfig, configs[env])

export default index
