import { inject } from "@angular/core";
import { Events } from "@ngrx/signals/events";
import { AuthService } from "../services/auth.service";
import { checkLogged, logUser, saveUser } from "../events/user.events";
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

                if(response.success)
                    return saveUser.success({user: payload.user})
                else 
                    return saveUser.error({error: response.message})
            })
        ),
    logUser$: events
        .on(logUser.init)
        .pipe(
            switchMap(async ({payload}) => {
                const response = await authService.loginUser(
                    payload.email,
                    payload.password
                )

                if(response.result?.success && response.user)
                    return logUser.success({user: response.user})
                else 
                    return logUser.error({error: response.result?.message ?? 'Login error'})
            })
        ),
    checkUser$: events
        .on(checkLogged.init)
        .pipe(
            switchMap(async () => {
                const response = await authService.checkLogged()

                if(response.success && response.user){
                    const logResponse = await authService.loginUser(
                        response.user.email,
                        response.user.password
                    )

                    if(logResponse.result?.success) 
                        return checkLogged.success({user: response.user})
                    else 
                        return checkLogged.error({error: logResponse.result?.message ?? 'Login error'})
                } else {
                    return checkLogged.error({error: response.message})
                }
            })
        )
})