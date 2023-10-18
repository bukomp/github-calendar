import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeatmapCalendarComponent } from './components/heatmap-calendar/heatmap-calendar.component';
import { DaySquareComponent } from './components/heatmap-calendar/components/day-square/day-square.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HeatmapCalendarComponent, DaySquareComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
