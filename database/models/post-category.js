var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    url_name: {
        type: String,
        required: true,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    posts: {
        type: [String],
        default: []
    },
    display: {
        type: Boolean,
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

mongoose.model('post-category', schema);