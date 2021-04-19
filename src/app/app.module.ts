import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';
import { ReportDialogComponent } from './report-problem/dialog';
import { GeneralInfoComponent } from './report-problem/general-info.component';
import { ScreenshotComponent } from './report-problem/screenshot.component';
import { SampleGridComponent } from './sample-grid';


@NgModule({
  declarations: [
    AppComponent,
    SampleGridComponent,
    ReportDialogComponent,
    GeneralInfoComponent,
    ScreenshotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
