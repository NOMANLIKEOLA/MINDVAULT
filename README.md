                 MindVault

MindVault is a decision intelligence web application that helps users track decisions, review outcomes, and uncover behavioral patterns over time.
It transforms everyday decision-making into a structured, data-driven feedback loop.

This is not a notes app.
It is a thinking system.

 What Problem Does MindVault Solve?

People repeatedly make poor decisions because they:

don’t document their thinking

forget the context behind choices

never review outcomes objectively

MindVault fixes this by allowing users to:

log decisions with context and confidence

review real outcomes later

analyze patterns across time, categories, and confidence levels

   Key Features
Authentication

Secure JWT-based authentication

Persistent login using localStorage

Protected routes for all user data

  Decision Tracking

Create and store decisions with:

title

context

confidence level

User-scoped access (your decisions are yours only)

  Outcome Reviews

Review decisions after outcomes occur

Rate outcomes as success, neutral, or fail

Capture lessons learned for future reference

 Analytics Dashboard

Total decisions made

Reviewed vs unreviewed decisions

Outcome breakdown

Category performance

Confidence vs success analysis
(powered by MongoDB aggregation pipelines)

  Product-Grade UI

Clean, mature dark design

Rich color accents and gradients

Calm, premium visual hierarchy

Responsive and readable layout

  Tech Stack
Frontend

React (Vite)

React Router

Axios

Custom CSS design system

Backend

Node.js

Express

MongoDB + Mongoose

JWT Authentication

REST API architecture

  Architecture Overview
Frontend (React)
 ├─ Auth (localStorage based)
 ├─ Protected Routes
 ├─ Dashboard (Analytics)
 ├─ Decisions
 └─ Reviews

Backend (Express)
 ├─ Auth Routes
 ├─ Decision Routes
 ├─ Review Routes
 ├─ Analytics Routes
 └─ MongoDB Aggregations


The frontend communicates securely with the backend via JWT tokens automatically injected into requests.

  Authentication Strategy

MindVault uses a simple, explicit authentication model:

JWT tokens are issued on login/register

Tokens are stored in localStorage

Axios automatically attaches tokens to API requests

Route protection is enforced on both frontend and backend

This approach avoids unnecessary abstraction while remaining production-valid.

  Analytics Logic

Analytics are calculated using MongoDB aggregation pipelines, including:

grouping outcomes by result

calculating success rates

correlating confidence levels with outcomes

joining decision and review data efficiently

This allows the dashboard to reflect behavioral insights, not just raw data.


  Running the Project Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd client
npm install
npm run dev


Make sure MongoDB is running locally or update the connection string.

  Why This Project Matters

MindVault demonstrates:

real-world full-stack architecture

secure authentication patterns

data modeling with relationships

analytics beyond basic CRUD

thoughtful UI and product design

It is built as a real product, not a tutorial clone.

  Future Improvements

Decision editing and deletion

Review reminders

Data visualizations (charts)

Light mode toggle

AI-assisted decision insights

Exportable reports

Final Note

MindVault is designed to help users think better, not just store information.
It treats decision-making as a skill that can be refined through feedback and reflection.
