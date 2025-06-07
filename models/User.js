import mongoose from 'mongoose';

const UserSchemsa = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', UserSchemsa);

export default User;