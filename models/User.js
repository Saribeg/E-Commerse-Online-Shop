const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    deliveryData: {
        country: {
            tyoe: String,
            default: ''
        },
        zipcode: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        street: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        }

    },
    paymentInfo: {
        cardNumber: {
            type: String,
            default: ''
        },
        nameOnCard: {
            type: String,
            default: ''
        },
        expiryMonth: {
            type: String,
            default: ''
        },
        expiryYear: {
            type: String,
            default: ''
        }
    }
});


UserSchema.pre('save', function(next) {
    var user = this;

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = User = mongoose.model("users", UserSchema);
