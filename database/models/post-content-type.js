var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    classes: {
        type: [String],
        default: []
    },
    style: {
        type: String,
        default: 0
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

mongoose.model('post-content-type', schema);