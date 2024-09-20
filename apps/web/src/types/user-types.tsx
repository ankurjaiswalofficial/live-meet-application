interface UserDataInterface {
    username: string,
    email: string,
    imgSrc: string | null,
    peerId: string,
}

interface BaseUserDataInterface extends UserDataInterface {
    userData: UserDataInterface | null,
    status: boolean
}

export type { UserDataInterface, BaseUserDataInterface }
