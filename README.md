

# Heatmap Calendar Component Documentation

The Heatmap Calendar component is a visual representation of commit activity over time, similar to the contribution graph seen on GitHub profiles. It's built using Angular and CSS.

## Getting Started

To start the application and test the Heatmap Calendar component, follow these steps:

1. Install the necessary dependencies by running `npm install` in the project root directory.
2. Start the application by running `npx ng serve` in the project root directory.
3. Open a web browser and navigate to `http://localhost:4200/` to view the application.
4. The Heatmap Calendar component can be found on the main page of the application.
---
## Component API

The component has a clean API with a clear separation between data and logic. The data is passed to the component via `@Input()` properties, and the logic is encapsulated within the component class.

### Inputs

The component accepts the following inputs:

 Input | Type | Description |
 --- | --- | --- |
 `commits` | `GitCommit[]` | An array of GitCommit objects representing the commit data to be displayed. |
 `contributorsUsername` | `string` | A string representing the username of the contributor. |
 `colorNoActivity` | `string` | A string representing the color to be used when there is no commit activity. |
 `colorLowActivity` | `string` | A string representing the color to be used when there is low commit activity. |
 `colorMediumActivity` | `string` | A string representing the color to be used when there is medium commit activity. |
 `colorHighActivity` | `string` | A string representing the color to be used when there is high commit activity. |
 `colorMaxActivity` | `string` | A string representing the color to be used when there is maximum commit activity. |

```typescript
@Input() commits: GitCommit[] = [];
@Input() contributorsUsername: string = '';
@Input() colorNoActivity: string = 'lightgray';
@Input() colorLowActivity: string = '#9be9a8';
@Input() colorMediumActivity: string = '#40c463';
@Input() colorHighActivity: string = '#30a14e';
@Input() colorMaxActivity: string = '#216e39';
```

### CSS
The CSS styling of the component is designed to be flexible and responsive. The size of the component can be adjusted by modifying the `--width-of-component` CSS variable when calling the component. 

Here's an example:

```html
<app-heatmap-calendar [style.--width-of-component]="'500px'" [commits]="mock_data"></app-heatmap-calendar>
```

In this example, the width of the component is set to 500px. The component maintains its aspect ratio when resized. It's important to note that the component does not support percentage (%) values for the `--width-of-component` variable. However, it does support exact values such as viewport height (vh), viewport width (vw), and pixels (px).

Here's a table summarizing the supported and unsupported units for the `--width-of-component` variable:

Unit | Supported |
--- | --- |
**% (Percentage)** | **No** |
vh (Viewport Height) | Yes |
vw (Viewport Width) | Yes |
px (Pixels) | Yes |
em (Relative to font-size of the element) | Yes |
rem (Relative to font-size of the root element) | Yes |
cm (Centimeters) | Yes |
mm (Millimeters) | Yes |
in (Inches) | Yes |
pt (Points) | Yes |
pc (Picas) | Yes |
ex (Relative to x-height of the current font) | Yes |
ch (Relative to width of the "0" (zero)) | Yes |
vmin (Relative to 1% of viewport's smaller dimension) |Yes |
vmax (Relative to 1% of viewport's larger dimension) |Yes |



### Methods

The component class includes several methods for processing and displaying the commit data:

- `ngOnInit()`: Initializes the component by setting the commit data and combining commits into days.
- `combineCommitsToDays()`: Combines commits into days and returns an array of CommitsPerDay objects.
- `getReversedMonths()`: Generates an array of reversed months.
- `getDayWithMostCommits()`: Retrieves the day with the most commits.
- `getColor(amountOfCommits: number)`: Returns the color based on the amount of commits.
## Usage

To use the Heatmap Calendar component, you need to include it in your Angular application and pass the required data via the `@Input()` properties. The `--width-of-component` CSS variable must be specified when calling the component. 

Here's an example:

```html
<app-heatmap-calendar [style.--width-of-component]="'500px'" [commits]="mock_data"></app-heatmap-calendar>
```

In this example, `mock_data` is an array of GitCommit objects that should be provided by the parent component. 

If the `commits` array is not provided and a `contributorsUsername` is specified, the component will fetch the commit data from the GitHub API for the specified user. 

Here's an example:

```html
<app-heatmap-calendar [style.--width-of-component]="'500px'" [contributorsUsername]="'githubUser'"></app-heatmap-calendar>
```

In this case, 'githubUser' is the GitHub username for which the commit data will be fetched.

*Please note that this component uses the free GitHub API, which has a limited number of calls per hour. Excessive reloading of the page may exceed this limit.*

## Conclusion

The Heatmap Calendar component has a clean and clear API, with a good separation of data and logic. The provided instructions should allow you to start using the component quickly and easily.

The component can be found in the file path: `src/app/components/heatmap-calendar/`.
