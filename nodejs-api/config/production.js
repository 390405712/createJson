const port = Number.parseInt(process.env.PORT) || 8888;

export default {
  port: port,
  hostName: '123.207.121.59',
  database: 'http://123.207.121.59:27017/nodejsDB',
  // database: 'user:pass@localhost:27017/nodejsDB',
}
