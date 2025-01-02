// config.js
const config = {
    development: {
        enableLogging: true,
        uploadBaseUrl:
            "https://teg61ixhma.execute-api.ap-south-1.amazonaws.com",
        mlBaseUrl: "https://api.fintervue.com",
        apiBaseUrl: "http://localhost:2000",
    },
    production: {
        enableLogging: false,
        apiBaseUrl: "https://qa2gxw6zd2.execute-api.ap-south-1.amazonaws.com",
        mlBaseUrl: "https://api.fintervue.com",
        uploadBaseUrl: "https://api.fintervue.com",
    },
}[process.env.NODE_ENV];

  export default config; 
