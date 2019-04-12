const config = {
  apiUrl : "/api/v1",
  authServer: process.env.SERVICE_AUTH_FULL_PATH || 'http://localhost:4010'
};

module.exports = config;