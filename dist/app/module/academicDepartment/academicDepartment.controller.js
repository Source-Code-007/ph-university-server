"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentController = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicDepartment_service_1 = require("./academicDepartment.service");
const appError_1 = __importDefault(require("../../errors/appError"));
const insertAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_service_1.academicDepartmentServices.insertAcademicDepartmentToDb(req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic department inserted successfully!',
        data: academicDepartment,
    });
}));
const getAllAcademicDepartments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartments = yield academicDepartment_service_1.academicDepartmentServices.getAllAcademicDepartments();
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic departments are retrieved successfully!',
        data: academicDepartments,
    });
}));
const getAcademicDepartmentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const academicDepartment = yield academicDepartment_service_1.academicDepartmentServices.getSingleAcademicDepartmentById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!academicDepartment) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic department not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic department retrieved successfully!',
        data: academicDepartment,
    });
}));
const deleteAcademicDepartmentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_service_1.academicDepartmentServices.deleteAcademicDepartmentById(req.params.id);
    if (!academicDepartment) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic department not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic department is deleted successfully!',
        data: academicDepartment,
    });
}));
const updateAcademicDepartmentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const academicDepartment = yield academicDepartment_service_1.academicDepartmentServices.updateAcademicDepartmentById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id, req.body);
    if (!academicDepartment) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic department not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic department is updated successfully!',
        data: academicDepartment,
    });
}));
exports.academicDepartmentController = {
    insertAcademicDepartment,
    getAllAcademicDepartments,
    getAcademicDepartmentById,
    deleteAcademicDepartmentById,
    updateAcademicDepartmentById,
};
