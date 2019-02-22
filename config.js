const config = {
  apiUrl : "/api/v1",
  authServer: 'http://'+ process.env.SERVICE_AUTH + ':4010' || 'http://localhost:4010'
};

module.exports = config;