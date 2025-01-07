import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const childSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Child's name
    age: {type: Number, required:true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, // Gender of the child
    password: { type: String, required: true }, // Hashed password
    parentEmail: { type: String, required: true }, // Parent's email for password recovery
    createdAt: { type: Date, default: Date.now }, // Timestamp for record creation
});

// Middleware to hash the password before saving
childSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare the entered password with the stored password
childSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Child = mongoose.model('Child', childSchema);

export default Child