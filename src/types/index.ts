
export interface IBook{}

export interface IProject{
    projectName : string
    projectNumber : string
    projectLicense : string
    projectPlace : string
    projectTime : string
    supervisorEngineer : string
    engineeringSystemNumber : string
    postalCode : string
    projectLandSizeSpec : string
    floorsCount : string
    residentalUnitCount : string
    businessUnitCount : string
    projectDesc : string
    isActive : boolean
    projectStart : string
    projectEnd : string
}

export interface IUser {
    id: number
    phoneNumber: string
    email: string
    name: string
    roleId: number
    token: string
    verificationCode: string
    validate: boolean
    completedProfile: boolean
    birthDate: string
    nationalId: string
    shenasNameId: string
    shansNameSeries: string
    shansNameRegister: string
    brithPlace: string
    livingCity: string
    occupation: string
    education: string
    image: string
    gender: string
}