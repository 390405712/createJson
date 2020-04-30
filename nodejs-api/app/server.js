import Koa from 'koa';
import http from 'http'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
import onerror from 'koa-onerror'
import resource from 'koa-static'

import path from 'path'

import routes from './routes'
import config from '../config';


const app = new Koa();

onerror(app)

app.use(convert(cors()))

app.use(convert(logger()))

app.use(bodyParser())

app.use(resource(path.join(__dirname, '../public')))
// app.use(json({ pretty: false, param: 'pretty' }))

app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routes.routes(), routes.allowedMethods());


app.on('error', (error, ctx) => {
	console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
	console.log('server error:' + error)
})

http.createServer(app.callback()).listen(config.port).on('listening', function () {
	console.log('正在监听端口' + config.port)
})

export default app;
