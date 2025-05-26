import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly _url = environment.baseUrl2 + '/accounts';
    private readonly http = inject(HttpClient);

    login(login: LoginModel): Observable<string> {
        return this.http.post(this._url + "/login", login, { responseType: 'text' });
    }
}