import { Movement } from "../movement.model";
import { Result } from "../result.model";

export interface GetMovementsResponse extends Result {
    movements: Movement[]
}