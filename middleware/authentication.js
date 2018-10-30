const axios   = require('axios');
const config  = require('../config');

module.exports = async function(req, res, next) {
  switch (req.originalUrl) {
    case config.apiUrl+"/auth/login":
    case config.apiUrl+"/auth/refresh":
    case config.apiUrl+"/auth/signup":
    case config.apiUrl+"/auth/forgotpass":
    case config.apiUrl+"/auth/resetpass":
    case config.apiUrl+"/auth/activate":
    case config.apiUrl+"/auth/confirm2fa":
      next();
      break;
    default:
      if(req.headers['authorization'] && !req.headers['Authorization']) {
        req.headers['Authorization'] = req.headers['authorization'];
      }
      if(req.headers['Authorization']) {
        let o = await axios.post(config.authServer + "/auth/check", {}, {headers: {Authorization: req.headers['Authorization']}});
        if (o.data.success) {
          req.headers['gatewaypassed'] = 'ok';
          req.headers['userid'] = o.data.data.userId;
          next();
        }
        else {
          return res.json(o.data);
        }
      }
      else {
        next();
      }
  }
};
