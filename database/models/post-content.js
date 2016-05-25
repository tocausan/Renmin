var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    post: {
        type: String,
        required: true,
        default: ''
    },
    type: {
        type: String,
        required: true,
        default: ''
    },
    classes: {
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

mongoose.model('post-content', schema);