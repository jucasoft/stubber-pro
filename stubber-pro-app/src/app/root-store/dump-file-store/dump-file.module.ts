import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { featureReducer } from './dump-file.reducer';
import { DumpFileEffects } from './dump-file.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('dumpFile', featureReducer),
    EffectsModule.forFeature([DumpFileEffects]),
  ],
})
export class DumpFileModule {}

