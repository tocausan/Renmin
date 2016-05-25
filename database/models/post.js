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
    preview_image: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true,
        default: ''
    },
    position: {
        type: Number,
        default: 0
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
    },
    updated_by: {
        type: String,
        default: ''
    }
},{strict: true});

mongoose.model('post', schema);