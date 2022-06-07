const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    brand: {
        type: String,
        unique: true,
        required: true,
    }
});

module.exports = mongoose.model('Brand', brandSchema);