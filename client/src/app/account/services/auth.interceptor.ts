import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwt = authService.getJwt();
  const authorizedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${jwt}`)
  });
  return next(authorizedReq);
};
