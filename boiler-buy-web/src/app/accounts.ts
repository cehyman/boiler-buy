export interface Accounts {
    username: string,
    password: string,
    email: string;
}

interface AccountsArray extends Array<Accounts> {}