import { TAcademicInfo } from "./academicInfo.interface";
import AcademicInfo from "./academicInfo.model";


const insertAcademicInfoToDbService = async (academicInfoData: TAcademicInfo) => {
    const academicInfo = await AcademicInfo.create(academicInfoData);
    return academicInfo;
};

const getAllAcademicInfoService = async () => {
    const academicInfo = await AcademicInfo.find({}).select('-__v');
    return academicInfo;
};

const getSingleAcademicInfoByIdService = async (id: string) => {
    const academicInfo = await AcademicInfo.findById(id).select('-__v');
    return academicInfo;
};

const deleteAcademicInfoByIdService = async (id: string) => {
    const academicInfo = await AcademicInfo.findByIdAndDelete(id).select('-__v');
    return academicInfo;
};

const deleteAllAcademicInfoService = async () => {
    const academicInfo = await AcademicInfo.deleteMany({});
    return academicInfo;
};

const updateAcademicInfoByIdService = async (id: string, updatedAcademicInfo: Partial<TAcademicInfo>) => {
    const academicInfo = await AcademicInfo.findByIdAndUpdate(id, updatedAcademicInfo, { new: true }).select('-__v');
    return academicInfo;
};



export {
insertAcademicInfoToDbService,
  getAllAcademicInfoService ,
  getSingleAcademicInfoByIdService ,
  deleteAcademicInfoByIdService ,
  deleteAllAcademicInfoService ,
  updateAcademicInfoByIdService 
};
