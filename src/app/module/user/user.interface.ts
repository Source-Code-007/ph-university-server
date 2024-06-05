type TUser = {
    id: string,
    password: string,
    needsPasswordChange: Boolean,
    role: 'Admin' | 'Faculty' | 'Student',
    status: 'active' | 'inactive',
    isDeleted: boolean,
}

export {TUser}