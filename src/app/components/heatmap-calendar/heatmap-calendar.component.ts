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

  @Input() colorNoActivity: string = 'lightgray';
  @Input() colorLowActivity: string = '#9be9a8';
  @Input() colorMediumActivity: string = '#40c463';
  @Input() colorHighActivity: string = '#30a14e';
  @Input() colorMaxActivity: string = '#216e39';

  data: GitCommit[] = [];
  days: CommitsPerDay[] | null = null;
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor(private githubService: GithubService) {}

  /**
   * Initializes data by setting `this.data` to `this.commits` or by calling `this.githubService.getPopulatedCommits(this.contributorsUsername)`.
   * Combines commits to days by calling `this.combineCommitsToDays()`.
   *
   * @return {Promise<void>} This function does not return a value.
   */
  async ngOnInit(): Promise<void> {
    // Initialize data
    this.data =
      this.commits ||
      (await this.githubService.getPopulatedCommits(this.contributorsUsername));

    // Combine commits to days
    this.days = this.combineCommitsToDays();
  }

  /**
   * Returns the color based on the amount of commits.
   *
   * @param {number} amountOfCommits - The number of commits.
   * @return {string} The color based on the amount of commits.
   */
  getColor(amountOfCommits: number): string {
    const maxCommits = this.getDayWithMostCommits();
    switch (true) {
      case amountOfCommits === 0:
        return this.colorNoActivity; // Default color for no activity
      case amountOfCommits <= maxCommits / 4 && amountOfCommits > 0:
        return this.colorLowActivity;
      case amountOfCommits <= (maxCommits / 4) * 2:
        return this.colorMediumActivity;
      case amountOfCommits <= (maxCommits / 4) * 3:
        return this.colorHighActivity;
      case amountOfCommits <= maxCommits:
        return this.colorMaxActivity;
      default:
        return this.colorNoActivity; // Default color for no activity
    }
  }

  /**
   * Generates an array of reversed months.
   *
   * @return {string[]} An array of reversed months.
   */
  getReversedMonths(): string[] {
    const currentMonth = new Date().getMonth();
    return Array.from(
      { length: 12 },
      (_, i) => this.months[(currentMonth - i + 12) % 12]
    ).reverse();
  }

  /**
   * Combines commits into days and returns an array of CommitsPerDay objects.
   *
   * @return {CommitsPerDay[]} An array of CommitsPerDay objects representing the number of commits per day.
   */
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

  /**
   * Retrieves the day with the most commits.
   *
   * @return {number} The number of commits on the day with the most commits.
   */
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
}
