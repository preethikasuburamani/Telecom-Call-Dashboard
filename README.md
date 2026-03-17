## CDR Analytics Dashboard ##
A modern, SaaS-style Call Data Record (CDR) Analytics Dashboard built for telecom companies to monitor and analyze call data in real time. The dashboard fetches live CDR data from a REST API and presents it through interactive charts, KPI cards, and detailed call logs — making it easy to track call activity, measure costs, monitor success rates, and spot calling patterns across cities and time periods.

## Live Demo ## :     https://telecom-call-dashboard.vercel.app/

## Screenshots ##
Show Image : ![Dashboard Overview](./public/screenshots/dashboard.png)

## Tech Stack ##

React + Vite
TailwindCSS
shadcn/ui
Recharts

**Key Features**
KPI Summary Cards — instantly see Total Calls, Total Cost, Avg Duration, Successful & Failed Calls
Duration Analysis — bar chart comparing Shortest, Average, and Longest call durations
Cost Analysis — visualize total and average call costs broken down by city
Active Timeline — line chart showing call volume trends by hour and by day
Calls by City — identify which cities generate the most call traffic
Call Logs Table — paginated table with full details per call record

## Getting Started ##
bashgit clone https://github.com/your-username/cdr-analytics-dashboard.git
cd cdr-analytics-dashboard
npm install
npm run dev