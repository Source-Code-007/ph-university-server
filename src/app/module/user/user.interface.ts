type TUser = {
    _id: string,
    id: string,
    password: string,
    needsPasswordChange: Boolean,
    role: 'Admin' | 'Faculty' | 'Student',
    status: string,
    isDeleted: boolean,
}

export {TUser}