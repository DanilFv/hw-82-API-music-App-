import mongoose, {HydratedDocument, Model} from 'mongoose';
import {UserFields} from '../types';
import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => void;
}

type UserModel = Model<UserFields, {}, UserMethods>

const UserSchema = new mongoose.Schema<
    HydratedDocument<UserFields>,
    UserModel,
    UserMethods,
    {}>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
    },
    displayName: {
        type: String,
        required: [true, 'Display name is required'],
        trim: true,
    },
    googleID: String,
    avatar: {
        type: String,
        default: null,
    }
});

UserSchema.methods.checkPassword = function (password: string) {
    return argon2.verify(this.password, password);
};

UserSchema.methods.generateAuthToken = function () {
    this.token = jwt.sign({_id: this._id}, config.jwtSecret, {expiresIn: '30m'});
}

UserSchema.path('username').validate({
   validator: async function (this, value: string) {
       if (!this.isModified('username')) return true;

       const user = await User.findOne({ username: value });
       return !user;
   },
    message: 'Username already taken. Please choose another one',
});

UserSchema.pre ('save', async function (next) {
   if (!this.isModified('password')) return;

   try {
       this.password = await argon2.hash(this.password, {
           type: argon2.argon2id,
           memoryCost: 2 ** 16,
           timeCost: 3,
       });
   } catch (e) {
       throw new Error('Error hashing password')
   }
});

UserSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const { password, token, ...rest } = ret;
        return rest;
    }
});

const User = mongoose.model('User', UserSchema);
export default User;