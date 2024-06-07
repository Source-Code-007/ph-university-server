import { TAdmin } from "./admin.interface"
import { Admin } from "./admin.model"


const getAllAdmin = async () => {
  const admin = await Admin.find({}).select('-__v')
  return admin
}

const getSingleAdminById = async (id: string) => {
  const admin = await Admin.findById(id).select('-__v')
  return admin
}

const deleteAdminById = async (id: string) => {
  const admin = await Admin.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select('-__v')
  return admin
}

const updateAdminById = async (
  id: string,
  updatedAdmin: Partial<TAdmin>,
) => {
  const admin = await Admin.findByIdAndUpdate(id, updatedAdmin, {
    new: true,
  }).select('-__v')
  return admin
}

export const adminServices = {
  getAllAdmin,
  getSingleAdminById,
  deleteAdminById,
  updateAdminById,
}
