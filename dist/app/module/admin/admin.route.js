"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
exports.adminRouter = router;
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), admin_controller_1.adminControllers.getAllAdmin);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), admin_controller_1.adminControllers.getAdminById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), admin_controller_1.adminControllers.deleteAdminById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), admin_controller_1.adminControllers.updateAdminById);