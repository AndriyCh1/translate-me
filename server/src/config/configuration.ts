export default () => ({
  mongodbUsername: process.env.MONGO_USERNAME,
  mongodbPassword: process.env.MONGO_PASSWORD,
  mongodbDatabase: process.env.MONGO_DATABASE,
  mongodbHost: process.env.MONGO_HOST,
});
