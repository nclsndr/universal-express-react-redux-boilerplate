/* ------------------------------------------
 * Express server base
 *------------------------------------------- */
import express from 'express'
import cookieParser from 'cookie-parser'
import _debug from 'debug'

import requestHandler from './middlewares/requestHandler'

export default (config, middlewares = []) => {
  const debug = _debug('app:server:base')
  debug('Init server')
  const paths = config.utils_paths
  const { __DEV__, __PROD__, __TEST__, __SSR_ONLY__ } = config.globals

  const app = express()
  app.use(cookieParser())

  const staticAssetsPath = __DEV__ ? paths.static() : paths.dist('static')
  app.use(config.server_assets_path, express.static(staticAssetsPath))

  middlewares.forEach(m => {
    app.use(m)
  })

  app.use(requestHandler)

  return app
}
