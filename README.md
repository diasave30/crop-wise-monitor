# FarmWatch AI

Act as a senior frontend engineer and professional SaaS product designer. Build a production-quality, clean, minimalist frontend for an AI-Based Crop Health and Irrigation Recommendation System.

The application is an agricultural intelligence dashboard that helps users monitor farm zones, understand crop health, identify potential water stress, and prioritize irrigation.

The frontend must look like a professional enterprise monitoring platform, not like a generic AI-generated website.

1. TECH STACK — STRICT REQUIREMENTS

Build the frontend using:

React

Vite

Tailwind CSS

shadcn/ui components where appropriate

Lucide React for icons

Recharts for data visualization

React Leaflet / Leaflet for farm and zone visualization

React Router for navigation

Use reusable components and maintain a clean, scalable folder structure.

Do not create a backend in this task. Use a clean API service layer with mock/demo data initially so the frontend can later connect to the Node.js backend.

2. DESIGN PHILOSOPHY

The design must communicate:

Agricultural intelligence + data monitoring + reliability + clarity.

The UI should feel similar to a professional SaaS dashboard used for monitoring operations or environmental data.

Design principles

Minimal and purposeful

High information clarity

Strong visual hierarchy

Clean spacing and alignment

Limited color palette

No decorative elements without a functional purpose

Important information should be understandable within a few seconds

Every screen should have a clear primary purpose

Avoid making the interface look overly futuristic or artificially generated.

3. STRICTLY AVOID

Do NOT use:

Excessive gradients

Random floating shapes

Large unnecessary illustrations

Too many rounded cards

Oversized headings

Generic AI-generated marketing text

Repeated descriptions

Emoji inside the application UI

Excessive shadows

Too many colors

Glassmorphism

Animated backgrounds

Fake statistics

Unnecessary charts

“Welcome back” text

Long paragraphs explaining obvious information

A card for every small piece of information

Use icons only when they improve recognition or navigation.

4. VISUAL SYSTEM

Color Palette

Use a restrained, professional agricultural palette.

Primary

Deep forest green for primary actions and navigation accents.

Background

Warm off-white or very light neutral gray.

Surface

White.

Text

Near-black for primary text and muted gray for secondary text.

Status colors

Healthy: green

Moderate attention: amber/yellow

High stress / urgent: muted red

Information: neutral blue/gray

Colors must be used primarily for status and meaning, not decoration.

Do not use multiple unrelated accent colors.

5. TYPOGRAPHY

Use a clean modern sans-serif font.

Recommended visual hierarchy:

Page titles: clear but not oversized

Section titles: medium weight

Metrics: prominent but compact

Supporting text: muted and concise

Avoid excessive bold text.

Use short labels such as:

Overall Health

Stress Zones

Irrigation Priority

Recent Analysis

Active Alerts

6. APPLICATION LAYOUT

Use a professional desktop-first dashboard layout.

Left Sidebar

Fixed or collapsible sidebar containing:

Project logo / product name

Dashboard

Farms

Crop Health

Irrigation

Alerts

Analytics

Settings

Use Lucide icons.

The active navigation item should be clearly visible with a subtle background or accent border.

Do not make navigation items oversized.

Top Header

Keep the header minimal.

Include:

Current page title or breadcrumb

Optional farm selector

Notification button

User profile/avatar

Avoid unnecessary search bars unless they serve a real function.

7. MAIN DASHBOARD — PRIMARY SCREEN

This should be the strongest screen in the application.

The user should immediately understand the current agricultural situation.

Top Summary Metrics

Display only four important metrics:

Overall Crop Health

Zones Under Stress

High-Priority Irrigation Zones

Active Alerts

Each metric should be compact and visually consistent.

Do not add unnecessary percentages or fake growth indicators.

Main Content Layout

Create a balanced two-column layout.

Left — Farm Health Overview

A large central visualization showing farm zones.

Each zone should visually communicate status:

Healthy

Moderate

High Stress

Use a clean map/grid visualization.

When a zone is selected, it should visually highlight and reveal relevant information.

Right — Priority Actions

Show the most important current actions.

Example:

High Priority

Zone Z04
Low vegetation health and low moisture detected.

Recommended Action
Prioritize irrigation.

Keep the language direct and concise.

Do not use long AI-generated explanations.

Bottom Section

Crop Health Trend

Use a clean Recharts line chart showing crop health over time.

Recent Alerts

Show only recent and relevant alerts.

Each alert should include:

Zone

Severity

Short reason

Time/date

8. FARMS SCREEN

Create a clean farm management screen.

Display farms in a structured list or compact cards.

Each farm should show:

Farm name

Crop type

Number of zones

Overall health status

Zones requiring attention

Clicking a farm should open the detailed farm analysis page.

Avoid large image cards.

9. FARM ANALYSIS SCREEN

This is one of the most important screens.

Use a clear structure:

Header

Farm name

Crop type

Last analysis date

Overall health status

Main Area

Large farm zone visualization.

The user should immediately identify:

Healthy zones

Moderate zones

High-stress zones

Selected Zone Panel

When a zone is selected, show:

Zone ID

Crop Health Score

Vegetation Index / NDVI

Soil Moisture

Water Stress

Irrigation Priority

Use compact information rows rather than large individual cards.

10. CROP HEALTH SCREEN

Focus entirely on crop health.

Include:

Overall health score

Health trend chart

Zone health comparison

Zones requiring attention

The screen should answer:

How healthy are the crops and where is the condition declining?

Use meaningful charts only.

11. IRRIGATION RECOMMENDATIONS SCREEN

This is a key decision-making screen.

Display zones ranked by priority:

High Priority

Medium Priority

Low Priority

For every recommendation show:

Zone

Priority

Primary reason

Recommended action

Example structure:

ZONE Z04
HIGH PRIORITY

Reason
Low moisture and declining vegetation health.

Recommended Action
Prioritize irrigation within the next recommended cycle.

Do not overcomplicate recommendations with excessive AI terminology.

12. ALERTS SCREEN

Create a clean operational alert system.

Use:

Severity indicator

Zone name

Short issue description

Timestamp

Status

Allow filtering by:

High

Medium

Resolved

Avoid a cluttered notification design.

13. ANALYTICS SCREEN

Create a data-focused screen with a limited number of useful charts:

Crop health over time

Water stress distribution

Irrigation priority distribution

Zone comparison

Use clear chart labels and tooltips.

Do not add charts simply to fill space.

14. AI RECOMMENDATION DESIGN

AI recommendations must be presented as explainable decisions, not chatbot messages.

Use a consistent recommendation component.

Structure:

Recommendation

Priority: High

Why:
Low vegetation health, low soil moisture, and increasing temperature.

Action:
Prioritize irrigation for this zone.

Keep the AI explanation factual and short.

Do not create a chatbot interface unless explicitly required.

15. ICON SYSTEM

Use Lucide React icons consistently.

Suggested icons:

LayoutDashboard — Dashboard

Map — Farms

Sprout — Crop Health

Droplets — Irrigation

TriangleAlert — Alerts

ChartNoAxesCombined — Analytics

Settings — Settings

Bell — Notifications

ChevronRight — Navigation

MapPin — Farm location

Activity — Health status

Use icons at a consistent size and stroke width.

Do not use random icons for decoration.

16. COMPONENT ARCHITECTURE

Create reusable components such as:

AppSidebar

TopHeader

PageHeader

MetricCard

FarmSelector

FarmZoneMap

ZoneStatusBadge

HealthScore

PriorityBadge

RecommendationCard

AlertList

TrendChart

ZoneDetailPanel

EmptyState

LoadingState

Avoid duplicated UI code across pages.

17. RESPONSIVE DESIGN

The dashboard must work on:

Desktop

Laptop

Tablet

Mobile

For mobile:

Sidebar becomes a drawer

Complex grids stack vertically

Charts remain readable

Zone details open in a bottom sheet or dedicated view

Do not simply shrink the desktop interface.

18. FRONTEND DATA STRUCTURE

Create realistic mock data that can later be replaced with API responses.

Example:

{
  farmId: "farm-001",
  name: "Green Valley Farm",
  cropType: "Wheat",
  overallHealth: 72,
  zones: [
    {
      id: "Z01",
      healthScore: 88,
      ndvi: 0.72,
      soilMoisture: 62,
      waterStress: "Low",
      irrigationPriority: "Low"
    }
  ]
}


Keep all mock data separate from UI components.

Create an API service layer such as:

getFarms()

getFarmDetails(id)

getZoneAnalysis(id)

getAlerts()

getIrrigationRecommendations()

This will make it easy to integrate the Node.js backend later.

19. PROJECT FOLDER STRUCTURE

Use a professional structure:

src/
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── farms/
│   └── shared/
├── pages/
├── services/
├── hooks/
├── data/
├── types/
├── utils/
└── App.jsx


Keep UI components, API services, and business logic separate.

20. FINAL QUALITY CHECK

Before completing the frontend, verify:

The UI looks like a real product, not an AI-generated template.

Every page has a clear purpose.

No unnecessary text is present.

There are no excessive cards or decorative elements.

Status colors are consistent.

Important actions are easy to identify.

The dashboard tells a clear story.

The selected zone → analysis → irrigation recommendation workflow is intuitive.

Mock data can easily be replaced by the Node.js API.

All components are reusable and responsive.

FINAL PRODUCT EXPERIENCE

The final application should feel like a professional agricultural intelligence platform where a user can open the dashboard and immediately answer:

What is the current health of my farm?
Which zones are under stress?
Where should irrigation be prioritized?
Why did the system make that recommendation?

Focus on clarity, operational usefulness, and professional visual design over visual decoration.

here is the given inspo 
 frnotend in react not in tanstack

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b9e4bbff-974c-4019-9999-3170baf7dd54).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
