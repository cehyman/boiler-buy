export interface Accounts {
    username: string,
    password: string,
    email: string;
}

export interface AccountsList extends Array<Accounts> {}