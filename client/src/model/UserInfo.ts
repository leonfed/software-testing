export interface UserInfo {
    login: string | undefined;
    password: string | undefined;
}

export const UndefinedUser: UserInfo = {login: undefined, password: undefined};
