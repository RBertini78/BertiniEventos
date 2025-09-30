import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject (ToastrService);
  const authService = inject(AuthService);

   if(authService.isAuthenticated()){
     return true;
   } else {
toastr.info('Você precisa estar logado para acessar essa área.');
return router.parseUrl('/user/login');
}
}
