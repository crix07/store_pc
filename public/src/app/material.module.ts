import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
 } from "@angular/material";


@NgModule({
    imports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatTabsModule,
      MatExpansionModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatMenuModule

    ],
    exports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatTabsModule,
      MatExpansionModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatMenuModule
    ]
})


export class MaterialModule {}
