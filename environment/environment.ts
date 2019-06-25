module.exports = {
  production: false,
  typeorm: {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'el-modelisator',
    entities: ['src/**/**.entity{.ts,.js}'],
    synchronize: true,
    useNewUrlParser: true,
  },
  security: {
    jwt: {
      secret: 'c3rrfagXGgLqr6Zw',
      expiration: '7d'
    }
  }
};
