import { Injectable } from '@angular/core';
import { AuthHttp } from '../../commons/http/auth.http';
import { MatDialog } from '@angular/material/dialog';
import { GlxLoadingComponent } from '@galaxy/commons/components';
import { SignInCredentials } from '../../interfaces/sign-in-credentials.interface';
import { finalize } from 'rxjs/operators';
import { GlxCryptoService } from '@galaxy/commons/services';

@Injectable()
export class SignInPresenter {

  constructor(
    private authHttp: AuthHttp,
    private dialog: MatDialog,
    private crypto: GlxCryptoService
  ) {}

  signIn(credentials: SignInCredentials) {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.authHttp.signIn(credentials)
    .pipe(finalize(() => loading.close()))
    .subscribe(
      res => {
        const tokenEncrypted = this.crypto.encrypt(res.token);
        sessionStorage.setItem('token', tokenEncrypted);
      }
    );
  }

}
