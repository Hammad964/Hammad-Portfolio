# Hammad Ahmed — Portfolio v2

A modern, responsive one-page portfolio for GitHub Pages. Built with plain HTML, CSS and JavaScript so it stays fast, easy to maintain and easy to deploy.

## What is included

- Native Mobile Application Developer positioning (iOS + Android)
- Responsive hero section with mobile-themed visuals
- Filterable project cards for iOS / Android
- Project detail modal
- Scalable project archive structure
- Career timeline
- Grouped technical skills
- About / engineering principles
- Contact section
- Dark / light theme toggle
- Responsive mobile navigation
- SEO metadata + Person structured data
- Resume download button
- No framework or build step required

## Deploy to GitHub Pages

1. Back up your existing repository.
2. Copy `index.html`, `styles.css`, `script.js`, `assets/` and this README into your GitHub Pages repository.
3. Commit and push to the branch GitHub Pages is serving (often `main`).
4. Wait a minute or two and refresh your live site.

## Resume

The latest resume has been copied to:

`assets/Hammad-Ahmed-Resume.pdf`

Replace that file whenever your resume changes. Keeping the same filename means you never need to update the HTML links.

## Adding real project screenshots later

Create an `assets/projects/` folder and add your screenshots there. The current version uses polished CSS phone mockups rather than pretending to show real app UI.

When you have screenshots, you can either:

- replace the decorative phone previews in the cards, or
- extend the project modal with a screenshot gallery.

## Adding more projects

Open `script.js` and add another object to the `projects` array. Example:

```js
{
  title: "Project name",
  platform: "ios", // ios | android | mobile
  category: "Fintech",
  summary: "One short product description.",
  tech: ["Swift", "UIKit", "MVVM"],
  highlights: [
    "Important contribution one.",
    "Important contribution two.",
    "Important contribution three."
  ],
  featured: false,
  storeUrl: "",
  screenshot: "",
  colors: ["#26375f", "#121827"]
}
```

There is no technical cap on the number of projects. For recruiter readability, keep the strongest 4–6 projects featured and place the rest in a project archive / all-projects view.

## Important links currently used

- LinkedIn: `https://www.linkedin.com/in/hammad-ahmed-0ab569190`
- GitHub: `https://github.com/hammad964`
- Email: `hk959125@gmail.com`
- ABL Funds App Store: `https://apps.apple.com/pk/app/abl-funds/id1071609981`
- AKD-IML App Store: `https://apps.apple.com/pk/app/akdiml/id6738114412`

## Next improvements when you upload project assets

- Real screenshots for each project
- Play Store / App Store links for more applications
- Additional project archive entries
- Optional professional photo in About section
- Optional individual project case-study pages
