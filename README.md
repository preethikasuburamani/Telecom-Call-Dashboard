## CDR Analytics Dashboard

A modern, SaaS-style Call Data Record (CDR) Analytics Dashboard built for telecom companies to monitor and analyze call data in real time. The dashboard fetches live CDR data from a REST API and presents it through interactive charts, KPI cards, and detailed call logs — making it easy to track call activity, measure costs, monitor success rates, and spot calling patterns across cities and time periods.

## Please Click Here for Live [Dashboard] (https://telecom-call-dashboard.vercel.app/)

## Screenshots 
Show Image : ![Dashboard Overview] <img width="1910" height="925" alt="Screenshot (342)" src="https://github.com/user-attachments/assets/51dc65da-c221-40ee-b0b4-e34ef65e7cf3" />


## Tech Stack 

* React + Vite
* TailwindCSS
* shadcn/ui
* Recharts

## Key Features

* KPI Summary Cards — instantly see Total Calls, Total Cost, Avg Duration, Successful & Failed Calls
* Duration Analysis — bar chart comparing Shortest, Average, and Longest call durations
* Cost Analysis — visualize total and average call costs broken down by city
* Active Timeline — line chart showing call volume trends by hour and by day
* Calls by City — identify which cities generate the most call traffic
* Call Logs Table — paginated table with full details per call record


## Project structure

```bash

CallDashboard
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.svg
│  ├─ icons.svg
│  └─ ScreenShort
│     └─ Dashboard.png
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  └─ ui
│  │     ├─ button.jsx
│  │     ├─ CallActivityTimeline.jsx
│  │     ├─ CallCostAnalytics.jsx
│  │     ├─ CallDuration.jsx
│  │     ├─ CallLogTable.jsx
│  │     ├─ CallsByCities.jsx
│  │     ├─ chart.jsx
│  │     ├─ CitySearchDropdown.jsx
│  │     ├─ KPISummaryCard.jsx
│  │     ├─ Navbar.jsx
│  │     ├─ table.jsx
│  │     └─ useFetch.jsx
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Dashboard.jsx
│  │  └─ LoginPage.jsx
│  └─ services
│     └─ Api.js
├─ tailwind.config.js
└─ vite.config.js

```

## Installation Guide

1.Clone Project Folder

```bash
git clone https://github.com/your-username/cdr-analytics-dashboard.git
```
2. Redirect to the folder
```bash
cd cdr-analytics-dashboard
```

3.Install npm liabrary
```bash
npm install
```

4.npm project
```bash
npm run dev
```
