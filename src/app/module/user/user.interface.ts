type TUser = {
    id: string,
    password: string,
    needsPasswordChange: Boolean,
    role: 'admin' | 'faculty' | 'student',
    status: 'active' | 'inactive',
    isDeleted: boolean,
}

export {TUser}