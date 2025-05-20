import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// const childSchema = new mongoose.Schema({
//     name: { type: String, required: true }, // Child's name
//     age: {type: Number, required:true },
//     gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, // Gender of the child
//     password: { type: String, required: true }, // Hashed password
//     parentEmail: { type: String, required: true }, // Parent's email for password recovery
//     createdAt: { type: Date, default: Date.now }, // Timestamp for record creation
// });

// const childSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//     password: { type: String, required: true },
//     parentEmail: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     progress: { 
//         type: Map, 
//         of: { 
//             beginner: { type: Boolean, default: true },
//             intermediate: { type: Boolean, default: false },
//             advanced: { type: Boolean, default: false }
//         }
//     }
// });

const childsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    password: { type: String, required: true },
    parentEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    progress: { 
        type: Map, 
        of: {
            beginner: { type: Boolean, default: true },
            intermediate: { type: Boolean, default: false },
            advanced: { type: Boolean, default: false }
        },
        default: {
            addition: { beginner: true, intermediate: false, advanced: false },
            subtraction: { beginner: true, intermediate: false, advanced: false },
            multiplication: { beginner: true, intermediate: false, advanced: false },
            division: { beginner: true, intermediate: false, advanced: false }
        }
    }
});




// Middleware to hash the password before saving
childsSchema.pre('save', async function (next) {
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
childsSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Child = mongoose.model('Childs', childsSchema);

export default Child