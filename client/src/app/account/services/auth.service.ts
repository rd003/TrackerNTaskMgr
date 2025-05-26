import { Injectable } from "@angular/core";
import { authKeys } from "../../shared/authConst";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface JwtPayloadExtended extends JwtPayload {
    unique_name: string
}

@Injectable({ providedIn: "root" })
export class AuthService {

    isLoggedIn(): boolean {
        const decoded = this.getDecodedJwt();
        return (decoded && decoded.exp && !this.isTokenExpired(decoded.exp)) ? true : false;
    }

    getUsername(): string {
        return this.getDecodedJwt()?.unique_name || "";
    }

    private isTokenExpired(exp: number) {
        return Date.now() >= exp * 1000;
    }

    public getJwt(): string | null {
        return localStorage.getItem(authKeys.token);
    }

    private getDecodedJwt(): JwtPayloadExtended | null {
        const token = this.getJwt();
        if (!token) return null;

        return jwtDecode(token) as JwtPayloadExtended;
    }
}