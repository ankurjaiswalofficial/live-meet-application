interface UserDataInterface {
    username: string,
    email: string,
    imgSrc: string | null,
    peerId: string,
}

interface BaseUserDataInterface extends UserDataInterface {
    userData: UserDataInterface | null,
}

export type { UserDataInterface, BaseUserDataInterface }
