import { Component, OnInit } from '@angular/core';

type ChartColor = {
  backgroundColor: string;
};

@Component({
  selector: 'app-heatmap-calendar',
  templateUrl: './heatmap-calendar.component.html',
  styleUrls: ['./heatmap-calendar.component.css'],
})
export class HeatmapCalendarComponent implements OnInit {
  Math = Math;
  data!: any[];
  ngOnInit(): void {
    // Initialize mock data
    this.data = [
      { day: 'Mon', value: 10 },
      { day: 'Tue', value: 20 },
      { day: 'Wed', value: 30 },
      { day: 'Thu', value: 40 },
      { day: 'Fri', value: 50 },
      { day: 'Sat', value: 60 },
      { day: 'Sun', value: 70 },
    ];
  }

  getColor(day: any): string {
    // This function returns a color based on the day's data. The color represents the level of contributions or activity.
    // Lighter shades of green indicate fewer contributions, and darker shades indicate more contributions.
    // The exact method of determining the color based on the data is not specified in the instructions and is left as an exercise for the developer.
    let value = day.value;
    switch (true) {
      case value <= 10:
        return 'rgba(0,255,0,0.1)'; // Light green for low activity
      case value <= 20:
        return 'rgba(0,255,0,0.2)';
      case value <= 30:
        return 'rgba(0,255,0,0.3)';
      case value <= 40:
        return 'rgba(0,255,0,0.4)';
      case value <= 50:
        return 'rgba(0,255,0,0.5)';
      case value <= 60:
        return 'rgba(0,255,0,0.6)';
      case value <= 70:
        return 'rgba(0,255,0,0.7)';
      default:
        return 'rgba(0,255,0,0.8)'; // Dark green for high activity
    }
  }

  onChartHover($event: any): void {
    // Handle chart hover event here
  }
}
