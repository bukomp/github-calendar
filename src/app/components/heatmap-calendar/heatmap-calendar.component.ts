import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from './services/github.service';
import { CommitsPerDay, GitCommit } from './interfaces/git.interface';

@Component({
  selector: 'app-heatmap-calendar',
  templateUrl: './heatmap-calendar.component.html',
  styleUrls: ['./heatmap-calendar.component.css'],
})
export class HeatmapCalendarComponent implements OnInit {
  @Input() commits: GitCommit[] = [];
  @Input() contributorsUsername: string = '';

  data: GitCommit[] = [];
  days: CommitsPerDay[] | null = null;

  constructor(private githubService: GithubService) {}

  async ngOnInit(): Promise<void> {
    // Initialize data
    this.data =
      this.commits ||
      (await this.githubService.getPopulatedCommits(this.contributorsUsername));

    // Combine commits to days
    this.days = this.combineCommitsToDays();
  }

  getColor(amountOfCommits: any): string {
    const maxCommits = this.getDayWithMostCommits();
    switch (true) {
      case amountOfCommits === 0:
        return 'lightgray'; // Default color for no activity
      case amountOfCommits <= maxCommits / 4 && amountOfCommits > 0:
        return '#9be9a8';
      case amountOfCommits <= (maxCommits / 4) * 2:
        return '#40c463';
      case amountOfCommits <= (maxCommits / 4) * 3:
        return '#30a14e';
      case amountOfCommits <= maxCommits:
        return '#216e39';
      default:
        return 'lightgray'; // Default color for no activity
    }
  }

  // This function combines commits into days
  combineCommitsToDays(): CommitsPerDay[] {
    // Calculate the number of days to process
    const daysToProcess = 371 - (7 - new Date().getDay());
    // Calculate the cutoff date
    const cutoffDate = new Date(daysToProcess * 24 * 60 * 60 * 1000);

    // Filter commits that are older than the cutoff date
    const filteredCommits = this.data.filter((commit: GitCommit) => {
      return (commit.date as Date) > cutoffDate;
    });

    // Create a map to group data by date
    const groupedDataMap = new Map<string, CommitsPerDay>();

    // Group commits by date
    for (const commit of filteredCommits) {
      const date = (commit.date as Date).toISOString().split('T')[0];
      const existingDay = groupedDataMap.get(date);
      if (!existingDay) {
        groupedDataMap.set(date, { date: new Date(date), amountOfCommits: 1 });
      } else {
        existingDay.amountOfCommits += 1;
      }
    }

    // Fill in empty days
    const today = new Date();
    const existingDates = new Set(groupedDataMap.keys());
    for (let i = 0; groupedDataMap.size - 1 < daysToProcess; i++) {
      const emptyDay = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const emptyDateString = emptyDay.toISOString().split('T')[0];
      if (!existingDates.has(emptyDateString)) {
        groupedDataMap.set(emptyDateString, {
          date: emptyDay,
          amountOfCommits: 0,
        });
      }
    }

    // Convert the map to an array and sort it by date
    const groupedData = [...groupedDataMap.values()].sort(
      (a: CommitsPerDay, b: CommitsPerDay) =>
        a.date.getTime() - b.date.getTime()
    );

    // Return the grouped data
    return groupedData;
  }

  getDayWithMostCommits(): number {
    if (!this.days || !this.days.length) return 0;
    let maxCommitsDay: CommitsPerDay = this.days[0];
    for (let day of this.days) {
      if (day.amountOfCommits > maxCommitsDay.amountOfCommits) {
        maxCommitsDay = day;
      }
    }
    return maxCommitsDay.amountOfCommits;
  }

  onChartHover($event: any): void {
    // Handle chart hover event here
  }
}
