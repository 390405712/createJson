const port = Number.parseInt(process.env.PORT) || 3000;

export default {
  port: port,
  hostName: 'http://localhost:' + port,
  database: 'localhost:27017/nodejsDB',
}
