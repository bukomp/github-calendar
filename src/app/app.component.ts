import { Component } from '@angular/core';
import { userCommits_mock } from './mock-data/UserCommits';
import { GitCommit } from './components/heatmap-calendar/interfaces/git.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GitCalendarApp';
  mock_data: GitCommit[] = userCommits_mock.map((c) => {
    c.date = new Date(c.date);
    return c;
  });
}
