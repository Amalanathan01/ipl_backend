module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8001
    },
    db: {
        url: "mongodb://localhost:27017/ipl"
    },
    secret: 'my_secret_key'
}  