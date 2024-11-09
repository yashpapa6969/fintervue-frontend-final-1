// config.js
const config = {
    development: {
      enableLogging: true,
      apiBaseUrl: 'https://teg61ixhma.execute-api.ap-south-1.amazonaws.com',
      mlBaseUrl: 'https://api.fintervue.com',

    },
    production: {
      enableLogging: false,
      apiBaseUrl: 'https://teg61ixhma.execute-api.ap-south-1.amazonaws.com',
      mlBaseUrl: 'https://api.fintervue.com',

      
    }
  }[process.env.NODE_ENV];

  export default config; 
