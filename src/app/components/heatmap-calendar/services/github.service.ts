import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserEvents, GitCommit } from '../interfaces/git.interface';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves populated commits for a given username.
   *
   * @param {string} username - The username to retrieve populated commits for.
   * @return {Promise<GitCommit[]>} A promise that resolves to an array of populated commits.
   */
  public async getPopulatedCommits(username: string): Promise<GitCommit[]> {
    const userEvents = await this.fetchUserEvents(username);
    const commits = this.getPushEventsCommits(userEvents);
    return this.populateCommitDates(commits);
  }

  /**
   * Fetches the events associated with a specific user.
   *
   * @param {string} username - The username of the user whose events are to be fetched.
   * @return {Promise<UserEvents[]>} - A promise that resolves to an array of UserEvents.
   */
  private async fetchUserEvents(username: string): Promise<UserEvents[]> {
    try {
      const events =
        (await lastValueFrom(
          this.http.get<UserEvents[]>(
            `${this.baseUrl}/users/${username}/events`
          )
        )) || [];
      console.log('Fetched user events:', events);
      return events;
    } catch (e) {
      console.log('Error fetching user events:', e);
      return [] as UserEvents[];
    }
  }

  /**
   * Retrieves the commits from the given array of user events that are of type 'PushEvent'.
   *
   * @param {UserEvents[]} events - The array of user events.
   * @return {GitCommit[]} The array of commits from the 'PushEvent' events.
   */
  private getPushEventsCommits(events: UserEvents[]): GitCommit[] {
    return events
      .filter((event) => event.type === 'PushEvent')
      .reduce(
        (acc: GitCommit[], event: UserEvents) =>
          acc.concat(event.payload.commits),
        []
      );
  }

  /**
   * Populates the commit dates of the given array of GitCommit objects asynchronously.
   *
   * @param {GitCommit[]} commits - The array of GitCommit objects to populate the commit dates for.
   * @returns {Promise<GitCommit[]>} - A promise that resolves with the updated array of GitCommit objects sorted by date in descending order.
   */
  private async populateCommitDates(
    commits: GitCommit[]
  ): Promise<GitCommit[]> {
    const commitsToPopulate = _.cloneDeep(commits);
    await Promise.all(
      commitsToPopulate.map(async (commit) => {
        commit.date = new Date(await this.getCommitDate(commit.url));
      })
    );
    return commitsToPopulate.sort(
      (a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
    );
  }

  /**
   * Retrieves the commit date from the given URL.
   *
   * @param {string} url - The URL to fetch the commit date from.
   * @return {Promise<string>} A promise that resolves to the commit date.
   */
  private async getCommitDate(url: string): Promise<string> {
    const res = await lastValueFrom(
      this.http.get<{ commit: { author: { date: string } } }>(url)
    );
    return res.commit.author.date;
  }
}
