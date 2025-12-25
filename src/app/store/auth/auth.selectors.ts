import { createFeatureSelector, createSelector } from "@ngrx/store";
import {AuthState} from './auth.reducers'

{/*  Get All Of Auth Reducer State. Must match StoreModule.forRoot({auth:authReducer})*/}
export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    state => !!state.token
)

export const selectIsHR = createSelector(
    selectAuthState,
    state => state.user?.role === 'HR'
)

export const selectAuthLoading = createSelector(
    selectAuthState,
    state => state.loading
)

export const selectAuthError = createSelector(
    selectAuthState,
    state => state.error
)