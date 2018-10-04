const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require( 'md5' );
const validator = require( 'validator' );
const mongodbErrorHandler = require( 'mongoose-mongodb-errors' );
const passportLocalMongoose = require( 'passport-local-mongoose' );


const userSchema = new Schema({
    is_onboarded: Boolean,
    role: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        require: 'Please provide a valid email address.'
    },
    username: {
        type: String,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        require: 'Please provide a name for the account.',
        trim: true
    },
    location: {
        type: String
    },
    avatar: {
        type: String,
        trim: true
    },
    avatar_id: {
        type: String,
        trim: true
    },
    profile_cover: {
        type: String,
        trim: true
    },
    profile_cover_id: {
        type: String,
        trim: true
    },
    profile: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true
    },
    joined_at: {
        type: Date,
        default: Date.now
    },
    birthday: {
        type: Date
    },
    country: {
        type: String,
        trim: true
    },
    public: {
        type: Boolean
    },
    posts: { 
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    seen_notifications: Boolean,
    following: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    suspended: {
        type: Boolean,
        default: false
    },
    changeEmailToken: String,
    changeEmailExpires: Date,
    new_email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    }
});

userSchema.index({
    'name': 'text',
    'username': 'text'
});


userSchema.plugin( passportLocalMongoose, { usernameField: 'email' } );
userSchema.plugin( mongodbErrorHandler );

module.exports = mongoose.model( 'User', userSchema );