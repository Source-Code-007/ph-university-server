"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    id: { type: String }, //FK
    password: { type: String, required: [true, 'Password is required'] },
    needsPasswordChange: { type: Boolean, default: false },
    role: { type: String, enum: ['admin', 'faculty', 'student'], required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
