import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MovementsService } from "../services/movements.service";
import { addMovement, addMovementError, addMovementSuccess, getMovements, getMovementsError, getMovementsSuccess } from "../actions/movements.actions";
import { mergeMap, of } from "rxjs";

export class MovementsEffect {
    actions = inject(Actions)
    movementsService = inject(MovementsService)

    getMovements$ = createEffect(
        () => this.actions.pipe(
            ofType(getMovements),
            mergeMap(({email}) => {
                const result = this.movementsService.getMovementsByEmail(email)

                return result.success
                    ? of(getMovementsSuccess({movements: result.movements}))
                    : of(getMovementsError({payload: result.message}))
            })
        )
    )

    addMovement$ = createEffect(
        () => this.actions.pipe(
            ofType(addMovement),
            mergeMap(({movement}) => {
                const result = this.movementsService.createMovement(movement)

                return result.success
                    ? of(addMovementSuccess({movement}))
                    : of(addMovementError({payload: result.message}))
            })
        )
    )
}