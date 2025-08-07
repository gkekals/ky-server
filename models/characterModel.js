// models/characterModel.js

const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        level: {
            type: Number,
            required: true,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt 자동 생성
    }
);

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
