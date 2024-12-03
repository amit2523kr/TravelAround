const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Access MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// Check if URI exists
if (!uri) {
    console.error("MongoDB URI is not defined in the .env file");
    process.exit(1); // Exit the process with an error
}

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Mongoose connected');
})
.catch((error) => {
    console.error('Failed to connect to Mongoose:', error);
});
