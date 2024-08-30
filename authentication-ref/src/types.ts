type Role = 'STUDENT' | 'MENTOR' | 'SUPERADMIN'
type UserState = {
    username: string
    firstname: string
    lastname: string
    role: Role
}

export type { Role, UserState }