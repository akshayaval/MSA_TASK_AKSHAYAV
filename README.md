# MSA_TASK_AKSHAYAV
# React UI Debugging Task

This repository contains my solution for the MLSA SRM React recruitment task. The objective was to debug an existing React application by fixing the provided issues without rebuilding the project, and then add one small, accessible feature.

---

## Tech Stack

- React
- Vite
- JavaScript
- CSS

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the application

```bash
npm run dev
```

---

## Bugs Fixed

### 1. Update Counter (Stale State)

The "Last update" timer was using an outdated state value, which caused the counter to behave incorrectly over time. I fixed this by updating the state using React's functional state update so the timer always increments from the latest value.

### 2. Responsive Header Width

The header had a fixed width, which caused it to overflow on smaller screens. I replaced it with a responsive width so the layout adapts properly across different screen sizes without horizontal scrolling.

---

## Features Added

### Search Members

Added a search bar that filters team members by name in real time. The search is case-insensitive and displays a message when no matching members are found.

### Status Filter

Added filter buttons for **All**, **On Track**, and **Blocked**, allowing users to quickly view members based on their current status. The search and filters work together to display matching results.

---

## Accessibility

- Search input includes an accessible label.
- Filter buttons are keyboard accessible.
- Existing functionality and layout have been preserved while adding the new feature.

---

## Notes

The goal of this submission was to preserve the original application while fixing the identified bugs and adding small features to enhance the application, rather than redesigning or rebuilding the interface.
