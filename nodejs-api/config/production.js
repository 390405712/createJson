const port = Number.parseInt(process.env.PORT) || 5000;

export default {
  port: port,
  hostName: process.env.HOST_NAME_PRO,
  database: 'user:pass@localhost:27017/nodejsDB',
}
