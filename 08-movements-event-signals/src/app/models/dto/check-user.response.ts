import { Result } from "../result.model";
import { User } from "../user.model";

export interface CheckUserResponse extends Result {
    logged: boolean,
    user: User | null
}