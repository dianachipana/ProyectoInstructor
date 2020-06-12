import { NgModule } from '@angular/core';
import { UiModule } from './ui/ui.module';
import { ComponentsModule } from './components/components.module';
import { HttpModule } from './http/http.module';
import { GlxCrytoServiceModule } from '@galaxy/commons/services';

@NgModule({
  exports: [
    UiModule,
    ComponentsModule,
    HttpModule,

    GlxCrytoServiceModule
  ]
})
export class AuthCommonsModule { }
