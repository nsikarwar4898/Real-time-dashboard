# Next.js Dashboard Assignment

A responsive, customizable dashboard built using Next.js 15 (App Router), Tailwind CSS v4, and TypeScript. The dashboard includes a paginated payments table, real-time data updates using Faker, theme support, and filter controls. It is designed with modular components and a clean layout system optimized for modern frontend development workflows.

## Features

- Next.js 15 App Router for routing and layout management
- Tailwind CSS v4 for utility-first styling with light/dark theme support
- TypeScript for type-safe component development
- Paginated payments table with mock data and checkboxes
- Filter input and column selection UI
- Faker.js integration for generating random data
- ThemeLoader component to apply dynamic or server-based themes
- Responsive layout with flexible containers
- Interval-based updates to simulate real-time data
- Environment variable configuration for map and API behavior

## Getting Started

### 1. Clone the repository

bash
git clone https://github.com/your-username/next-dashboard-assignment.git
cd next-dashboard-assignment

### 2. Configure Environment Variables

Create a .env.local file using .env.example as a template:

bash
cp .env.example .env.local

Fill in your values in .env.local:

NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_API_URL_TOKEN=your_token_here
NEXT_PUBLIC_CENTER_LAT=39.8283
NEXT_PUBLIC_CENTER_LNG=-98.5795
NEXT_PUBLIC_ZOOM_LEVEL=5
NEXT_PUBLIC_TILE_LAYER_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
NEXT_PUBLIC_TILE_LAYER_ATTRIBUTION=&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors
NEXT_PUBLIC_MAP_HEIGHT=480px
NEXT_PUBLIC_MAP_WIDTH=100%

### 3. Install Dependencies

bash
npm install

### 4. Run the Development Server

bash

npm run dev

Then open the app in your browser at:

http://localhost:3000

## Scripts

| Command       | Description                       |
| ------------- | --------------------------------- |
| npm run dev   | Starts the development server     |
| npm run build | Builds the project for production |
| npm run start | Starts the production server      |
| npm run lint  | Runs ESLint on the project        |

## Technologies Used

- Next.js 15 (App Router)
- Tailwind CSS v4
- TypeScript
- @faker-js/faker
- Chart.js (optional, if used)
- Leaflet (optional, if maps are used)

## Possible Enhancements

- Add search and advanced filtering logic
- Integrate real APIs for payments and telemetry
- Add localStorage-based layout or theme persistence
- Support drag-and-drop dashboard customization
- Implement auth (login + RBAC)
- Write tests using Jest and React Testing Library
- Dockerize for containerized deployment

## License

This project is licensed under the MIT License.
