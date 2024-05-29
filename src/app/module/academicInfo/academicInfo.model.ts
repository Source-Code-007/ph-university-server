import { Schema, model } from "mongoose";
import { TAcademicInfo } from "./academicInfo.interface";


const academicInfoSchema = new Schema<TAcademicInfo>({
    department: {type: String, required: true},
    roll: {type: Number, required: true},
    batch: {type: Number, required: true},
    admissionYear: {type: Number, required: true},
    admissionDate: {type: Date, required: true},
    regSLno: {type: Number, required: true},
    RegCode: {type: String, required: true},
}, {timestamps: true})

const AcademicInfo = model('AcademicInfo', academicInfoSchema)
export default AcademicInfo