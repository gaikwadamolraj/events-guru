export const config = () => ({
  GRPC_PORT: Number(process.env.GRPC_PORT),
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ?? 'micro_auth',
    //TODO: change this as per requirement
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
});
