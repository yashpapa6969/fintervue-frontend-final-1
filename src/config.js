// config.js
const config = {
    development: {
        enableLogging: true,
        uploadBaseUrl:
            "https://api.fintervue.com",
        mlBaseUrl: "https://api.fintervue.com",
        apiBaseUrl: "http://localhost:2000",
    },
    production: {
        enableLogging: false,
        apiBaseUrl: "https://api.fintervue.com",
        mlBaseUrl: "https://api.fintervue.com",
        uploadBaseUrl: "https://api.fintervue.com",
    },
}[process.env.NODE_ENV];

  export default config; 
