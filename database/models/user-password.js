var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
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
});
mongoose.model('user-password', schema);