import { inject } from "@angular/core";
import { MovementsService } from "../services/movements.service";
import { Events } from "@ngrx/signals/events";
import { MovementsState } from "../stores/movements.store";
import { StateSignals } from "@ngrx/signals";
import { loadMovements } from "../events/movements.events";
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
        )
})