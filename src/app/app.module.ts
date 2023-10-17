import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeatmapCalendarComponent } from './components/heatmap-calendar/heatmap-calendar.component';
import { DaySquareComponent } from './components/heatmap-calendar/components/day-square/day-square.component';

@NgModule({
  declarations: [AppComponent, HeatmapCalendarComponent, DaySquareComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
