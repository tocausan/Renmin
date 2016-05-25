var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    username: {
        type: String
    },
    message: {
        type: String
    }
});
mongoose.model('chat-message', schema);