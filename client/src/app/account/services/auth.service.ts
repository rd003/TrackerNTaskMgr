import { Injectable } from "@angular/core";
import { authKeys } from "../../shared/authConst";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { BehaviorSubject, map } from "rxjs";

export interface JwtPayloadExtended extends JwtPayload {
    unique_name: string
}

export interface AuthState {
    loggedIn: boolean,
    username: string,
    token: string | null
}

@Injectable({ providedIn: "root" })
export class AuthService {
    initialState: AuthState = { loggedIn: false, username: "", token: null };
    private state$ = new BehaviorSubject<AuthState>(this.initialState);

    isLoggedIn$ = this.state$.pipe(map(a => a.loggedIn));
    userName$ = this.state$.pipe(map(a => a.username));
    token$ = this.state$.pipe(map(a => a.token));

    setToken(token: string) {
        localStorage.setItem(authKeys.token, token);
        this.setLoginState();
    }

    logout() {
        localStorage.removeItem(authKeys.token);
        this.state$.next(this.initialState);
    }

    private isLoggedIn(): boolean {
        const decoded = this.getDecodedJwt();
        return (decoded && decoded.exp && !this.isTokenExpired(decoded.exp)) ? true : false;
    }

    private isTokenExpired(exp: number) {
        return Date.now() >= exp * 1000;
    }

    private getUsername(): string {
        return this.getDecodedJwt()?.unique_name || "";
    }

    private getJwt(): string | null {
        return localStorage.getItem(authKeys.token);
    }

    private getDecodedJwt(): JwtPayloadExtended | null {
        const token = this.getJwt();
        if (!token) return null;

        return jwtDecode(token) as JwtPayloadExtended;
    }



    private setLoginState() {
        this.state$.next({
            loggedIn: this.isLoggedIn(),
            username: this.getUsername(),
            token: this.getJwt()
        })
    }

    constructor() {
        this.setLoginState();
    }
}