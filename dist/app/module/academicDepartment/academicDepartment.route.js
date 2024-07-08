"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const academicDepartment_validate_1 = require("./academicDepartment.validate");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = (0, express_1.Router)();
exports.academicDepartmentRouter = router;
router.post('/', (0, zodValidateHandler_1.default)(academicDepartment_validate_1.createAcademicDepartmentZodSchema), academicDepartment_controller_1.academicDepartmentController.insertAcademicDepartment);
router.get('/', academicDepartment_controller_1.academicDepartmentController.getAllAcademicDepartments);
router.get('/:id', academicDepartment_controller_1.academicDepartmentController.getAcademicDepartmentById);
router.delete('/:id', academicDepartment_controller_1.academicDepartmentController.deleteAcademicDepartmentById);
router.patch('/:id', (0, zodValidateHandler_1.default)(academicDepartment_validate_1.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.academicDepartmentController.updateAcademicDepartmentById);
