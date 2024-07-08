"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const student_validate_1 = require("./student.validate");
const router = (0, express_1.Router)();
exports.studentRouter = router;
router.get('/', student_controller_1.studentController.getAllStudent);
router.get('/:id', student_controller_1.studentController.getStudentById);
router.patch('/:id', (0, zodValidateHandler_1.default)(student_validate_1.updateStudentZodSchema), student_controller_1.studentController.updateStudentById);
