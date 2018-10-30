module.exports = {
  apps : [
    {
      name      : 'sicos-gateway',
      script    : './bin/www',
      env: {
        NODE_ENV: 'prod',
        PORT: 3000,
        MONGO_DB_URI: 'mongodb://localhost:27017/community_db'
      },
      env_dev : {
        NODE_ENV: 'dev',
        PORT: 3000,
        MONGO_DB_URI: 'mongodb://localhost:27017/community_db'
      }
    }
  ]
};
