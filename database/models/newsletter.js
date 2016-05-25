var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
},{strict: true});

mongoose.model('newsletter', schema);