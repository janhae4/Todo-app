require('dotenv').config();
const { createClient } = require("redis");
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_db';
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}


let host = process.env.REDIS_HOST || 'redis';
let port = process.env.REDIS_PORT || 6379;
let password = process.env.REDIS_PASSWORD
let client;
async function connectRedis () {
    if (client)
        return client;
    const redisClient = createClient({
        url: `redis://default:${password}@${host}:${port}`,
    });

    redisClient.on('error', (err) => console.error('Redis Client Error:', err));

    try {
        client = await redisClient.connect();
        console.log('Connected to Redis successfully');
        return client;
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        throw err;
    } finally {
        return client
    }
};


module.exports = {connectDB, connectRedis};
