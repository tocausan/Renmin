var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        default: ''
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: ''
    },
    firstname: {
        type: String,
        required: true,
        default: ''
    },
    lastname: {
        type: String,
        required: true,
        default: ''
    },
    preview_image: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmation: {
        type: String,
        default: ''
    }
},{strict: true});

mongoose.model('user', schema);