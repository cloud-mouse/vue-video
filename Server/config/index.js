const JWT_SECRET = 'ahdagdjhagfjhafjhsdbgfhgfisaidfhisadhfuiasdyiuyh'
const WEB_JWT_SECRET = 'ahdagdjhagfjhafjhsdbgfhgfisaidfhisadhfuiasdyiuyh'

let ENV_CONFIG 
if (process.env.NODE_ENV === 'production') {
  ENV_CONFIG = {
    URL: ''
  }
} else {
  ENV_CONFIG = {
    URL: 'http://localhost:3001'
  }
}

module.exports = {
  JWT_SECRET,
  WEB_JWT_SECRET,
  ENV_CONFIG
}
