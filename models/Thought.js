const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thougthText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            
        }
    }
)