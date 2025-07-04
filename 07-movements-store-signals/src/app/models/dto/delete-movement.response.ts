import { Movement } from "../movement.model";
import { Result } from "../result.model";

export interface DeleteMovementResponse extends Result {
    deletedMovement: Movement | null
}