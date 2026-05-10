# Habit Tracker App Backend Documentation

## Project Overview

This backend powers a Habit Tracker application built using the MERN stack.

The application supports:

- Annual habit tracking
- Monthly target tracking
- Custom duration tracking
- Daily streak management
- Consistency analytics
- Heatmap analytics
- Module-based habit separation

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Security & Middleware

- Helmet
- Express Rate Limit
- CORS
- Express Async Handler

---

# Backend Folder Structure

```txt
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── tracker.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validate.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── tracker.model.js
│   └── trackingEntry.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── tracker.routes.js
│
├── utils/
│   ├── generateToken.js
│   ├── successResponse.js
│   └── pagination.js
│
├── validations/
│   ├── auth.validation.js
│   └── tracker.validation.js
│
└── app.js

server.js
```

---

# Environment Variables

Create a `.env` file in server root.

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

# Start Server

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# Base API URL

```txt
http://localhost:5000/api
```

---

# Authentication System

The backend uses JWT authentication.

After login/register, a token is returned.

This token must be sent in protected routes.

## Authorization Header

```txt
Authorization: Bearer YOUR_TOKEN
```

---

# Database Models

# 1. User Model

## Fields

| Field    | Type   |
| -------- | ------ |
| name     | String |
| email    | String |
| password | String |

---

# 2. Tracker Model

## Tracker Types

- annual
- monthly
- custom

## Fields

| Field            | Type     |
| ---------------- | -------- |
| user             | ObjectId |
| title            | String   |
| description      | String   |
| type             | String   |
| startDate        | Date     |
| endDate          | Date     |
| color            | String   |
| icon             | String   |
| currentStreak    | Number   |
| bestStreak       | Number   |
| totalCompletions | Number   |
| isArchived       | Boolean  |

---

# 3. TrackingEntry Model

Stores daily habit completion.

## Important Rule

ONLY ONE ENTRY PER DAY.

## Fields

| Field     | Type     |
| --------- | -------- |
| user      | ObjectId |
| tracker   | ObjectId |
| date      | Date     |
| completed | Boolean  |
| note      | String   |

---

# Authentication Routes

# Register User

## Route

```txt
POST /api/auth/register
```

## Dummy Body

```json
{
  "name": "Sharjeel",
  "email": "sharjeel@gmail.com",
  "password": "123456"
}
```

## Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

---

# Login User

## Route

```txt
POST /api/auth/login
```

## Dummy Body

```json
{
  "email": "sharjeel@gmail.com",
  "password": "123456"
}
```

---

# Get Current User

## Route

```txt
GET /api/auth/me
```

## Protected Route

Requires JWT token.

---

# Tracker Routes

# Create Tracker

## Route

```txt
POST /api/trackers
```

## Protected Route

---

# Annual Tracker Example

```json
{
  "title": "Workout",
  "description": "Daily gym workout",
  "type": "annual",
  "color": "#22c55e",
  "icon": "dumbbell"
}
```

---

# Monthly Tracker Example

```json
{
  "title": "Study React",
  "description": "Complete React target",
  "type": "monthly",
  "color": "#3b82f6",
  "icon": "book"
}
```

---

# Custom Tracker Example

```json
{
  "title": "90 Days Fitness",
  "type": "custom",
  "startDate": "2026-05-01",
  "endDate": "2026-08-01",
  "color": "#22c55e",
  "icon": "check"
}
```

---

# Get User Trackers

## Route

```txt
GET /api/trackers
```

---

# Filter by Type

## Route

```txt
GET /api/trackers?type=annual
```

Available types:

- annual
- monthly
- custom

---

# Check-In Tracker

Marks a habit as completed for today.

## Route

```txt
POST /api/trackers/check-in
```

## Dummy Body

```json
{
  "trackerId": "TRACKER_ID"
}
```

---

# Important Check-In Rules

- Only one entry per day
- Strict daily streak logic
- Automatically updates:
  - current streak
  - best streak
  - total completions

---

# Update Tracker

## Route

```txt
PUT /api/trackers/:trackerId
```

## Dummy Body

```json
{
  "title": "Updated Workout",
  "description": "Updated Description",
  "color": "#000000"
}
```

---

# Archive Tracker

## Route

```txt
PATCH /api/trackers/:trackerId/archive
```

---

# Restore Tracker

## Route

```txt
PATCH /api/trackers/:trackerId/restore
```

---

# Get Archived Trackers

## Route

```txt
GET /api/trackers/archived
```

---

# Delete Tracker Permanently

## Route

```txt
DELETE /api/trackers/:trackerId
```

## Important

Tracker must be archived before deletion.

---

# Analytics Routes

# Get Dashboard Statistics

## Route

```txt
GET /api/trackers/stats
```

## Example Response

```json
{
  "success": true,
  "data": {
    "totalActiveTrackers": 5,
    "totalCompletions": 120,
    "bestStreak": 20
  }
}
```

---

# Get Tracker Consistency

## Route

```txt
GET /api/trackers/:trackerId/consistency
```

## Example Response

```json
{
  "success": true,
  "message": "Consistency fetched successfully",
  "data": {
    "trackerTitle": "Workout",
    "trackerType": "annual",
    "completedDays": 18,
    "totalDays": 24,
    "consistencyPercentage": 75
  }
}
```

---

# Heatmap APIs

# Tracker Heatmap

Returns GitHub-style heatmap data.

## Route

```txt
GET /api/trackers/:trackerId/heatmap
```

## Example Response

```json
{
  "success": true,
  "data": {
    "trackerTitle": "Workout",
    "heatmap": [
      {
        "date": "2026-05-01",
        "count": 1,
        "level": 1
      }
    ]
  }
}
```

---

# Module Heatmap

Combines all habits in one module.

## Route

```txt
GET /api/trackers/heatmap/module?type=annual
```

## Available Types

- annual
- monthly
- custom

---

# Heatmap Levels

| Count | Level |
| ----- | ----- |
| 0     | 0     |
| 1     | 1     |
| 2     | 2     |
| 3-4   | 3     |
| 5+    | 4     |

---

# Protected Routes Guide

Any route requiring authentication needs:

```txt
Authorization: Bearer YOUR_TOKEN
```

---

# Testing APIs Using Postman

## Recommended Flow

### 1. Register User

```txt
POST /api/auth/register
```

---

### 2. Login User

```txt
POST /api/auth/login
```

Copy token.

---

### 3. Add Authorization Header

```txt
Authorization: Bearer TOKEN
```

---

### 4. Create Tracker

```txt
POST /api/trackers
```

Copy tracker ID.

---

### 5. Check-In Habit

```txt
POST /api/trackers/check-in
```

---

### 6. Test Analytics

```txt
GET /api/trackers/stats
```

```txt
GET /api/trackers/:trackerId/consistency
```

```txt
GET /api/trackers/:trackerId/heatmap
```

---

# Suggested Testing Data

## Annual Habits

- Workout
- Reading
- Meditation
- Sleep Early

---

## Monthly Habits

- React Course
- Build Portfolio
- DSA Practice

---

## Custom Habits

- 90 Days Fitness
- 30 Days Coding Challenge
- 60 Days Discipline

---

# Important Backend Rules

## 1. One Entry Per Day

MongoDB compound unique index prevents duplicate check-ins.

---

## 2. Strict Daily Streak

Missing a day resets streak.

---

## 3. Module Separation

Annual, monthly, and custom trackers are independent.

---

## 4. Archived Trackers

Archived trackers:

- are hidden from active lists
- can be restored
- can be permanently deleted

---

# Database Optimization

Indexes added for:

- streak queries
- heatmap queries
- analytics queries
- tracker filtering
- sorting performance

---

# Current Backend Completion Status

## Completed

- Authentication system
- Tracker management
- Daily tracking
- Streak engine
- Analytics system
- Heatmap APIs
- Consistency APIs
- Validation
- Security middleware
- Database optimization

---

# Future Features (Not Implemented Yet)

- Notifications
- Achievements
- Export system
- Electron desktop app
- AI insights
- Advanced productivity reports

---

# Recommended Frontend Stack

## Frontend

- React + Vite
- Tailwind CSS
- Zustand

## Charts

- Recharts

## Heatmap UI

- react-calendar-heatmap

---

# Final Project Status

The backend is now structured as a scalable SaaS-style productivity system suitable for:

- Portfolio projects
- Electron desktop apps
- Real-world habit tracking applications
- Future AI productivity systems

