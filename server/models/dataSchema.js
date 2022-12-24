const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: {
        public_id: { type: String },
        url: { type: String },
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, {
    timestamps: true,
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokens: [{
        token: {
            type: String,
        },
    }, ],
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.userAuth = async function() {
    try {
        const token = await jwt.sign({ _id: this._id.toString() },
            process.env.SECRET_KEY
        );
        this.tokens = this.tokens.concat({ token });
        const result = await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
module.exports = { Product, User };