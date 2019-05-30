const axios   = require('axios');
const config  = require('../config');

module.exports = async function(req, res, next) {
  switch (req.originalUrl) {
    case config.apiUrl+"/auth/login":
    case config.apiUrl+"/auth/refresh":
    case config.apiUrl+"/auth/signup":
    case config.apiUrl+"/auth/forgotPass":
    case config.apiUrl+"/auth/resetPass":
    case config.apiUrl+"/auth/activate":
    case config.apiUrl+"/auth/confirm2fa":
      next();
      break;
    default:
      if(req.headers['authorization'] && !req.headers['Authorization']) {
        req.headers['Authorization'] = req.headers['authorization'];
      }
      if(req.headers['Authorization']) {
        try {
          let o = await axios.post(config.authServer + "/auth/check", {}, {headers: {Authorization: req.headers['Authorization']}});
          if (o.data.userId) {
            req.headers['gatewaypassed'] = 'ok';
            req.headers['userid'] = o.data.userId;
	    req.headers['user_type'] = o.data.userType;
            next();
          }
          else {
            return res.status(401).send('E_AUTH');
          }
        }
        catch(err) {
          if(err.response && err.response.data) {
            console.error(err.response.data);
            return res.status(err.response.status).send(err.response.data);
          }
          else {
            console.error(err);
            return res.status(403).send('E_AUTH_OBECTNOTFOUND');
          }
        }
      }
      else {
         return res.status(401).send('E_AUTH');
      }
  }
};
