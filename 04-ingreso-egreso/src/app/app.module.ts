import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './reducers/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    imports: [
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
    exports: [StoreModule]
})
export class AppModule {}
