import { createAction,props } from "@ngrx/store";

// Dispatched by component
export const login = createAction(
    '[Auth] Login',
    props<{username: string, password: string}>()
)



//dispatched by Effect
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{token: string, user:any}>()
)
export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{error:string}>()
)

export const logout = createAction(
    '[Auth] Logout'
)

