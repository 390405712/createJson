const router = require('koa-router')()
import createJson from './createJson'
import nodejs from './nodejs'

router.use(createJson.routes(), createJson.allowedMethods())
router.use(nodejs.routes(), nodejs.allowedMethods())

export default router


