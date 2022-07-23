const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: 'This item needs a name!',
            minlength: 1,
            maxlength: 50
        },
        itemLocation: {
            type: String,
            required: 'Where is this item?',
            minlength: 1,
            maxlength: 140
        },
        username: {
            type: String
        }
    }
);

const Item = model('Item', itemSchema);

module.exports = Item;