import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {UsuarioService} from "../Usuario/UsuarioService";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private usuarioService: UsuarioService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usuarioService.isUserLoggedIn())
      return true;

    this.router.navigate(['autenticacion/login']);
    return false;

  }

}
