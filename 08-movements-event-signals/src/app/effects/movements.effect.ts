import { inject } from "@angular/core";
import { MovementsService } from "../services/movements.service";
import { Events } from "@ngrx/signals/events";
import { MovementsState, MovementsStore } from "../stores/movements.store";
import { StateSignals } from "@ngrx/signals";
import { createMovement, deleteMovement, loadMovements } from "../events/movements.events";
import { switchMap } from "rxjs";

export const movementsEffect = (
    store: StateSignals<MovementsState>,
    events = inject(Events),
    movementsService = inject(MovementsService)
) => ({
    loadMovements$: events
        .on(loadMovements.init)
        .pipe(
            switchMap(async ({payload}) => {
                const response = await movementsService.getMovementsByEmail(payload.email)

                return (response.success)
                    ? loadMovements.success({movements: response.movements})
                    : loadMovements.error({error: response.message})
            })
        ),
    createMovement$: events
        .on(createMovement.init)
        .pipe(
            switchMap(async ({payload}) => {
                const response = await movementsService.createMovement(payload.movement)

                return response.success
                    ? createMovement.success({movement: payload.movement})
                    : createMovement.error({error: response.message})
            })
        ),
    deleteMovement$: events
        .on(deleteMovement.init)
        .pipe(
            switchMap(async ({payload}) => {
                const response = await movementsService.deleteItem(payload.id)

                if (!response.success)
                    return deleteMovement.error({error: response.message})

                const newMovements = store.movements()
                    .filter(movement => movement.uid !== payload.id)

                return deleteMovement.success({movements: newMovements})
            })
        )
})