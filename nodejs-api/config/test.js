const port = Number.parseInt(process.env.PORT) || 3000;

module.exports = {
  port: port,
  hostName: 'http://localhost:' + port,
  database: 'localhost:27017/nodejsDB',
};
