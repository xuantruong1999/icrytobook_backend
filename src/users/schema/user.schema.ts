import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    username: {
        type: String,
        required: true,
        min: [10, 'username required min 101 character'],
        max: [14, 'username required max 101 character']
    },
    password: {
        type: String,
        required: true,
    }
})
