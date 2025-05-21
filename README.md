#  Interactive Customer Analytics Dashboard

An interactive and responsive web dashboard built using **Next.js**, **Tailwind CSS**, **Chart.js**, and **React Gauge Chart**. It provides insightful visualizations of customer data including gender distribution, division-wise statistics, income groups, and more.

##  Features

-  Dynamic charts (Bar, Pie, Gauge) using `chart.js` and `react-gauge-chart`
-  Filterable & paginated data table
-  Role-based access (Admin, User)
-  Responsive layout with collapsible sidebar
-  LocalStorage-based user management
-  Modern UI with Tailwind, Heroicons, Framer Motion

##  Pages

- `/login` – Login screen with clean split-layout
- `/dashboard` – Data visualizations and charts
- `/dashboard/users` – User management with add/delete functionality
- `/dashboard/settings` – Profile settings (editable)
-  `/dashboard/aboutus` – About the website

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, React
- **Charts**: Chart.js, React-Gauge-Chart
- **Icons & UI**: Lucide-react, Heroicons, Framer Motion
- **State/Storage**: LocalStorage, useState, useEffect


## Getting Started

```bash
# Clone the repo
git clone https://github.com/Binti016/Interactive-Dashboard.git
cd Interactive-Dashboard

# Install dependencies
npm install

# If it doesn't work then run
npm install --legacy-peer-deps

# Run the development server
npm run dev
