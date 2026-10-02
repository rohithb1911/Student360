# STUDENT360 🎓

> **Smart Student Academic & Career Management Dashboard**  
> An all-in-one, modern, offline-ready productivity platform designed for college students to track classes, homework, assignments, exams, attendance, study goals, internships, job applications, skills, resume, and career roadmaps in one unified interface.

![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Native)-emerald?style=for-the-badge)
![Storage](https://img.shields.io/badge/Storage-Browser%20LocalStorage-orange?style=for-the-badge)
![Theme](https://img.shields.io/badge/Theme-Modern%20SaaS%20Light-sky?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Dashboard & Today's Schedule](#1-dashboard--todays-schedule)
  - [2. Homework Manager](#2-homework-manager)
  - [3. Classwork & Lecture Notes](#3-classwork--lecture-notes)
  - [4. Assignment Manager & Countdowns](#4-assignment-manager--countdowns)
  - [5. Smart Deadline Radar](#5-smart-deadline-radar)
  - [6. Attendance Tracker & 75% Math Engine](#6-attendance-tracker--75-math-engine)
  - [7. Weekly Timetable Grid](#7-weekly-timetable-grid)
  - [8. Exam Planner](#8-exam-planner)
  - [9. Daily Study Planner](#9-daily-study-planner)
  - [10. Internship Discovery](#10-internship-discovery)
  - [11. Job Application Kanban Board](#11-job-application-kanban-board)
  - [12. Skill Tracker & Matrix](#12-skill-tracker--matrix)
  - [13. Career Roadmaps](#13-career-roadmaps)
  - [14. Live Resume Builder & PDF Print](#14-live-resume-builder--pdf-print)
  - [15. Career Assistant (Rule-Based AI Mentor)](#15-career-assistant-rule-based-ai-mentor)
  - [16. Native SVG Analytics Charts](#16-native-svg-analytics-charts)
  - [17. Reminder System & Notifications](#17-reminder-system--notifications)
  - [18. Global Search (Ctrl+K)](#18-global-search-ctrlk)
  - [19. Profile Management](#19-profile-management)
  - [20. Data Backup, Export & Import](#20-data-backup-export--import)
- [Project Structure](#-project-structure)
- [How to Run](#-how-to-run)
- [LocalStorage Architecture](#-localstorage-architecture)
- [Browser Notification Limitations](#-browser-notification-limitations)
- [Deployment Guide](#-deployment-guide)
  - [Deploy to GitHub Pages](#deploy-to-github-pages)
  - [Deploy to Vercel](#deploy-to-vercel)
  - [Deploy to Netlify](#deploy-to-netlify)
- [Security & Data Privacy](#-security--data-privacy)
- [License](#-license)

---

## 🌟 Overview

**STUDENT360** bridges the gap between academic responsibilities and career milestones. It unites the capabilities of:
- **Google Calendar** (Timetable & daily schedules)
- **Notion** (Structured lecture notes, homework, and assignment trackers)
- **Student Planner** (Attendance percentage algorithms & exam countdowns)
- **Huntr / Trello** (Internship discovery & Kanban application tracker)
- **Reactive Resume** (Live 2-column ATS-friendly resume builder)

Built **strictly** with standard HTML5, CSS3, and modern Vanilla JavaScript, Student360 requires **no build tools, no npm installs, no external CDNs, and no server backend**. It opens and functions immediately by double-clicking `index.html`.

---

## 🚀 Key Features

### 1. Dashboard & Today's Schedule
- Dynamic personalized greetings (`Good Morning, Rohith 👋` based on local time).
- 6 live summary stat cards (Pending Homework, Due Soon Assignments, Classes Today, Attendance Rate %, Saved Internships, Active Job Applications).
- Interactive **Today's Activity Timeline** highlighting the current/upcoming class session.
- Priority Deadlines and quick daily study checklists.

### 2. Homework Manager
- Full CRUD operations (Add, Edit, Delete, Mark Completed).
- Fields: Subject, Title, Description, Due Date, Priority (High/Medium/Low), Estimated Time, and Status.
- Real-time search, subject filter, priority filter, status filter, and deadline sorting.
- Live status count pills (e.g. *4 Pending*, *2 Completed*, *1 Due Today*).

### 3. Classwork & Lecture Notes
- Track daily subject sessions, topics covered, faculty members, and verification status.
- Expandable lecture notes view for rapid revision before quizzes.

### 4. Assignment Manager & Countdowns
- Track course submissions with automated real-time deadline countdowns:
  - 🔴 **Due Today**
  - 🟠 **2 Days Left**
  - 🟢 **7 Days Left**
- Filter by status: *Not Started*, *In Progress*, *Submitted*, *Late*.

### 5. Smart Deadline Radar
- Unified multi-source deadline engine that aggregates and sorts tasks across:
  - Homework deadlines
  - Project/Lab assignments
  - Midterm & final exams
  - Internship application deadlines
- Color-coded urgency badges: `TODAY`, `TOMORROW`, `X DAYS SOON`, and `SAFE`.

### 6. Attendance Tracker & 75% Math Engine
- Live percentage calculator:
  $$\text{Attendance \%} = \left(\frac{\text{Present Classes}}{\text{Total Classes}}\right) \times 100$$
- Automated warning threshold alerts when attendance falls below the target (default: 75%).
- **Automated Mathematical Prescriptions**:
  - If below target: *"You need to attend the next 5 classes consecutively to reach 75%."*
  - If above target: *"Safe to miss up to 3 classes and stay above 75%."*
- Quick action `+ Present` and `+ Absent` 1-click logger buttons on each subject card.

### 7. Weekly Timetable Grid
- Monday through Saturday responsive timetable matrix.
- Class category badges: `Lecture`, `Lab`, `Tutorial`, `Other`.
- Day-filter tabs or complete weekly overview.

### 8. Exam Planner
- Midterms, finals, and practical exam scheduler with date, time, room hall, and syllabus scope.
- Live countdown meters showing days remaining.
- Interactive syllabus preparation slider with 1-click `+10%` / `-10%` buttons.

### 9. Daily Study Planner
- Time-blocked study tasks with duration in minutes, subjects, and priorities.
- Weekly study goal progress bar and average daily focus hours tracker.

### 10. Internship Discovery
- 16 curated realistic demo listings across Software Engineering, Frontend, Backend, Machine Learning, Cloud DevOps, and Data Analytics.
- Multi-parameter filtering by Role, Work Mode (`Remote`, `Hybrid`, `Onsite`), and Bookmarked status.
- Direct **"Add to Job Applications"** button linking directly to the Kanban tracker.

### 11. Job Application Kanban Board
- Visual recruitment pipeline across 5 stages:
  $$\text{Applied} \longrightarrow \text{Screening} \longrightarrow \text{Interview} \longrightarrow \text{Selected} \longrightarrow \text{Rejected}$$
- Drag-and-drop card movement or quick dropdown stage switcher.
- Synchronized automatically with the dashboard metrics.

### 12. Skill Tracker & Matrix
- 5 comprehensive skill categories:
  - **Programming** (Java, Python, C++, JavaScript)
  - **Web Development** (HTML5, CSS3, React, REST APIs)
  - **Database & Backend** (SQL, MySQL, Indexing, Node.js)
  - **Tools & DevOps** (Git, Docker, Linux, VS Code)
  - **Soft Skills & Interview** (DSA, Problem Solving, Communication)
- Progress bars with 1-click level increment / decrement modifiers.

### 13. Career Roadmaps
- 6 interactive career roadmaps:
  1. Java Full Stack Developer
  2. Frontend Web Developer
  3. Backend Engineer
  4. Python Developer
  5. Data Analyst
  6. AI/ML Engineer
- Interactive checkbox milestones with dynamic path completion progress percentage.

### 14. Live Resume Builder & PDF Print
- 2-column layout: Form editor on the left, live synchronized ATS-friendly paper sheet on the right.
- Sections: Personal Details, Career Objective, Education, Projects, Skills, Certifications, and Achievements.
- **Export to PDF**: Triggered via `window.print()` with custom `@media print` CSS rules that cleanly strip away UI headers, sidebars, and buttons for a crisp single-page printout.

### 15. Career Assistant (Rule-Based AI Mentor)
- Built-in rule-based conversational assistant with simulated typing animation.
- Quick suggestion chips for:
  - *"How can I get an internship?"*
  - *"What skills should I learn?"*
  - *"How can I improve my resume?"*
  - *"How should I prepare for interviews?"*
  - *"What Java projects should I build?"*
  - *"How can I improve my coding skills?"*
- Explicitly transparent and rule-based (no fake AI claims or external API dependencies).

### 16. Native SVG Analytics Charts
- Completely built from scratch with **zero charting libraries** (No Chart.js, no D3, no Canvas):
  - **Homework Completion Donut Chart**: Pure SVG circle stroke-dasharray and stroke-dashoffset math.
  - **Subject Attendance Bar Chart**: Pure CSS and HTML flex pillars.
  - **Recruitment Pipeline Funnel**: Dynamic horizontal funnel bars.
  - **Career Skill Readiness Gauge**: Circular SVG progress gauge meter.

### 17. Reminder System & Notifications
- Browser Notification API integration (`Notification.requestPermission()`).
- In-app notification bell dropdown with unread badge counter.
- Custom non-intrusive toast notifications for all user actions.

### 18. Global Search (`Ctrl + K`)
- Instant command palette searching across Homework, Assignments, Classwork, Exams, Internships, and Applications.
- Grouped results with 1-click navigation to the destination module.

### 19. Profile Management
- Complete academic credentials editor (College, Degree, Department, Year, CGPA, GitHub, LinkedIn, Portfolio).
- Dynamic profile completeness calculation meter (e.g. `82%`).

### 20. Data Backup, Export & Import
- **Export**: One-click download of all data as a timestamped `.json` file.
- **Import**: Upload and restore previous backups with structure validation.
- **Reset Options**: Clear all data or reset to default demo seed data with confirmation modals.

---

## 📁 Project Structure

```text
student360/
├── index.html          # Semantic HTML5 shell with all module views and modals
├── style.css           # Light-theme design system, tokens, layout, and print CSS
├── script.js           # Core JS engine, data models, state store, and event handlers
├── README.md           # Complete application documentation
└── assets/
    └── images/
        └── logo.svg    # Scalable vector logo for Student360
```


---

## 💻 How to Run

1. Clone or download the `student360` folder to your computer:
   ```bash
   git clone https://github.com/rohithb1911/Student360.git

