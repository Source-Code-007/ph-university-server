type TUser = {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'faculty' | 'student'
  status: 'active' | 'inactive'
  isDeleted: boolean
}

type TUserRole = 'admin' | 'faculty' | 'student'

export { TUser, TUserRole }
