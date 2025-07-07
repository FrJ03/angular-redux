import { Result } from "../result.model";
import { User } from "../user.model";

export interface GetUserResponse {
    user: User,
    result: Result
}