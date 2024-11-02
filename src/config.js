// config.js
const config = {
    development: {
      enableLogging: true,
      apiBaseUrl: 'http://localhost:2000',
      mlBaseUrl: 'https://api.fintervue.com',

    },
    production: {
      enableLogging: false,
      apiBaseUrl: 'https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com ',
      mlBaseUrl: 'https://api.fintervue.com',

      
    }
  }[process.env.NODE_ENV];

  export default config; 