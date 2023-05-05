const mongoose = require('mongoose');
const { isEmail } = require('validator');

const compteSchema = new mongoose.Schema(
    {
        compte: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true,
            lowercase: true,
        },
        pseudo: {
            type: String,            
            maxLength: 55,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minLength: 6
        },
        autre: {
            type: String,
            max: 1024,
            minLength: 6
        },
        categorie: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

const CompteModel = mongoose.model("compte", compteSchema);

module.exports = CompteModel;