const mongoose = require('mongoose');

const connectToDD = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log('connect db successfully');
    } catch (error) {
        console.log(error);
    }
}

connectToDD();

module.exports = mongoose;