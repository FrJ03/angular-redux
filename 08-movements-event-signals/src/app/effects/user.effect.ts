import { inject } from "@angular/core";
import { Events } from "@ngrx/signals/events";
import { AuthService } from "../services/auth.service";
import { saveUser } from "../events/user.events";
import { switchMap } from "rxjs";
import { UserState } from "../stores/user.store";
import { StateSignals } from "@ngrx/signals";

export const userEffect = (
    store: StateSignals<UserState>,
    events = inject(Events),
    authService = inject(AuthService)
) => ({
    saveUser$: events
        .on(saveUser.init)
        .pipe(
            switchMap(async ({payload}) =>{ 
                const response = await authService.createUser(payload.user)

                console.log(response)

                if(response.success)
                    return saveUser.success({user: payload.user})
                else 
                    return saveUser.error({error: response.message})
            })
        )
})