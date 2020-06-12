import { NgModule } from '@angular/core';
import { UiModule } from './ui/ui.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
    exports: [
        UiModule,
        ComponentsModule,
    ]
})
export class PortalCommonsModule {}