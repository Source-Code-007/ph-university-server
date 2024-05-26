import { TUser } from "./user.interface";
import User from "./user.model";

const insertUserToDbService = async (userData: TUser) => {
    const user = await User.create(userData);
    return user;
};

const getAllUserService = async () => {
    const users = await User.find({}).select('-_id');
    return users;
};

const getSingleUserByIdService = async (id: string) => {
    const user = await User.findById(id).select('-_id');
    return user;

};

const deleteUserByIdService = async (id: string) => {
    const user = await User.findByIdAndDelete(id).select('-_id');
    return user;
};

const deleteAllUserService = async () => {
    const users = await User.deleteMany({});
    return users;
};

const updateUserByIdService = async (id: string, updatedUser: Partial<TUser>) => {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true }).select('-__v');
    return user;
};

const statusToggleUserService = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if(user.status==='active'){
        user.status = 'inactive'
    } else{
        user.status = 'active'
    }
    await user.save();
    return user;
};

export {
  insertUserToDbService,
  getAllUserService,
  getSingleUserByIdService,
  deleteUserByIdService,
  deleteAllUserService,
  updateUserByIdService,
  statusToggleUserService
};