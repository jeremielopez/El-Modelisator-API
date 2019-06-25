module.exports = {
  production: true,
  typeorm: {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    username: 'admin',
    password: 'admin',
    database: 'el-modelisator',
    entities: ['dist/**/**.entity{.ts,.js}'],
    synchronize: false,
    useNewUrlParser: true,
  },
  security: {
    jwt: {
      secret: 'ujrXKRv7q7sS3hFu',
      expiration: '7d',
    },
  },
};
