# Student Attendance Dashboard

A comprehensive, production-grade full-stack web application titled **“Student Attendance Dashboard”** created for the B.Tech 2nd-Year course **“Interactive Data Visualization using D3.js”**.

The application features a modern responsive academic dashboard UI, RESTful Node.js + Express backend, MySQL database with seed data, and rich interactive **D3.js v7** visualizations.

---

## 🌟 Key Features

1. **Interactive D3.js Visualizations**:
   - **Student Attendance Bar Chart**: Dynamic D3 bar chart with automated scale binding, smooth entry transitions, hover tooltips, threshold highlighting for students with attendance `< 75%` (coral red vs primary blue), and click-to-view student profile drawer.
   - **Present vs Absent Donut Chart**: D3 donut chart built with `d3.pie()` and `d3.arc()`, featuring interactive slice expansion, central count aggregation, legend, and hover tooltips.
   - **Subject-wise Attendance Bar Chart**: Comparative visual analysis of attendance across core curriculum subjects.
   - **Attendance Trend Line Chart**: Smooth time-series curve chart powered by `d3.line()` and `d3.curveMonotoneX` with Daily, Weekly, and Monthly timeline switches.
   - **Cohort Distribution Chart**: D3 histogram/bar chart categorizing students into performance brackets (90-100%, 80-89%, 75-79%, <75%).

2. **Dashboard Overview**:
   - 4 Dynamic KPI Cards: *Total Students*, *Present Today*, *Absent Today*, *Overall Attendance Percentage*.
   - Global interactive filters (*Class*, *Division*, *Subject*, *Date*, *Status*) that update all KPI cards, D3 charts, and tables dynamically without full page reload.

3. **Student Directory & Management**:
   - Tabular student roster display with real-time search, class/division filters, and color-coded status badges (`Excellent`, `Good`, `Satisfactory`, `Low Attendance`).
   - Full CRUD modal dialogs for adding, editing, and deleting students with frontend and backend input validation.
   - Interactive Student Profile modal popup featuring subject breakdown and prominent **Low Attendance Warning** banner if attendance is below 75%.

4. **Attendance Marking Grid**:
   - Interface for selecting Date, Class, Division, and Subject.
   - Per-student interactive Present/Absent toggle switches with pre-filled state for previously recorded dates.
   - Shortcuts for "Mark All Present" and "Mark All Absent".
   - Batch submission to MySQL database with duplicate record prevention (`ON DUPLICATE KEY UPDATE`).

5. **Advanced Academic Analytics**:
   - Performance distribution buckets, Top 5 student leaderboard, extended trend timeline, and a dedicated **Low Attendance Alert List** highlighting deficit classes needed and quick email notification triggers.

6. **Reports & Data Export**:
   - Customizable reports for *Student Attendance*, *Subject Attendance*, *Class Attendance*, and *Date-wise Logs*.
   - **Export CSV** download feature generating standards-compliant CSV data.
   - **Print Report** button optimized with `@media print` styling.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+), **D3.js v7**, FontAwesome 6, SVG Graphics, Responsive CSS Grid & Flexbox.
- **Backend**: Node.js, Express.js framework, CORS, RESTful API architecture, JSON API request/response format, MVC organization.
- **Database**: **MySQL** (using `mysql2/promise` connection pool and fallback dataset engine for zero-config out-of-the-box execution).

---

## 📂 Project Structure

```
student-attendance-dashboard/
├── frontend/
│   ├── index.html              # Main Dashboard Overview (KPI Cards & 4 D3.js Charts)
│   ├── students.html           # Student Management Directory & Form Modals
│   ├── attendance.html         # Class Attendance Marking Interface
│   ├── analytics.html          # Advanced Analytics & Low Attendance Warnings
│   ├── reports.html            # Customizable Reports, CSV Export & Print View
│   ├── css/
│   │   └── style.css           # Custom Academic Dashboard Styling & Print CSS
│   └── js/
│       ├── api.js              # Central REST API Client Service
│       ├── charts.js           # Interactive D3.js v7 Visualization Library
│       ├── dashboard.js        # Overview Controller & Filter Handlers
│       ├── students.js         # Student Roster CRUD Controller
│       ├── attendance.js       # Daily Attendance Marking Controller
│       ├── analytics.js        # Analytics Page Controller
│       └── reports.js          # Report Generation & CSV Exporter
├── backend/
│   ├── server.js               # Express Application Entry Point
│   ├── package.json            # Node.js Dependencies & Scripts
│   ├── .env                    # Environment Config (Port, MySQL Credentials)
│   ├── .env.example            # Environment Config Template
│   ├── config/
│   │   └── db.js               # MySQL Connection Pool & Fallback Engine
│   ├── routes/
│   │   ├── students.js         # Student API Routes
│   │   ├── attendance.js       # Attendance API Routes
│   │   ├── subjects.js         # Subjects API Routes
│   │   ├── dashboard.js        # Dashboard Aggregation API Routes
│   │   └── analytics.js        # Analytics Aggregation API Routes
│   └── controllers/
│       ├── studentsController.js    # Student CRUD & Attendance % Logic
│       ├── attendanceController.js   # Batch Attendance Submission & Queries
│       ├── subjectsController.js     # Subjects Query Controller
│       ├── dashboardController.js    # KPI & Chart Data Aggregator
│       └── analyticsController.js    # Distribution & Leaderboard Calculator
├── database/
│   └── attendance.sql          # Complete DDL Schema + Seed Data (20 Students, 5 Subjects, 30+ Days Data)
└── README.md                   # Full Documentation & Setup Guide
```

---

## 🗄️ Database Setup (MySQL)

1. Open your MySQL Administration tool (MySQL Workbench, phpMyAdmin, or MySQL CLI).
2. Execute the provided SQL script in `database/attendance.sql`:
   ```sql
   SOURCE database/attendance.sql;
   ```
3. This creates the database `student_attendance_db` and populates the 3 core tables:
   - `students` (id, roll_no, name, email, class, division, department)
   - `subjects` (id, subject_code, subject_name, faculty_name)
   - `attendance` (id, student_id, subject_id, attendance_date, status, created_at)

---

## 🚀 How to Run the Project

### Step 1: Install Backend Dependencies
Open your terminal, navigate to the `backend` directory, and run:
```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables
Verify or edit `backend/.env` with your MySQL database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=student_attendance_db
DB_PORT=3306
```

### Step 3: Start the Backend Server
Start the Express server:
```bash
npm start
```
The server will start on **`http://localhost:5000`**.

> [!NOTE]
> If MySQL is not running on your local environment, the backend automatically logs a warning and enters fallback dataset mode so the frontend web pages and all D3 charts continue to run out-of-the-box!

### Step 4: Launch the Frontend
Open `frontend/index.html` in any web browser, or serve static files using any local HTTP server (such as Live Server or via Node Express static route at `http://localhost:5000`).

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard?class=2A&date=2026-09-01` | Returns aggregated KPIs and formatted data for all 4 D3 charts |
| `GET` | `/api/students?class=2A&search=Aarav` | Fetch students with calculated attendance percentages and status |
| `GET` | `/api/students/:id` | Fetch single student profile with subject breakdown & monthly trend |
| `POST` | `/api/students` | Add a new student record |
| `PUT` | `/api/students/:id` | Update existing student record |
| `DELETE` | `/api/students/:id` | Delete student and their attendance history |
| `GET` | `/api/subjects` | Fetch list of curriculum subjects |
| `GET` | `/api/attendance?date=2026-09-01&subject_id=1` | Query daily attendance logs |
| `POST` | `/api/attendance` | Batch submit daily attendance (prevents duplicate records) |
| `GET` | `/api/analytics` | Fetch distribution buckets, top performers, and low attendance list |

---

## 📊 D3.js Visualization Highlights

This application heavily leverages D3.js v7 methods as required by the course syllabus:
- **`d3.select()` / `d3.selectAll()`**: DOM selection and SVG group manipulation.
- **`d3.scaleBand()` / `d3.scaleLinear()` / `d3.scalePoint()`**: Scale mappings for ordinal X-axes and continuous percentage Y-axes.
- **`d3.axisBottom()` / `d3.axisLeft()`**: Automated SVG gridline and axis generation.
- **`d3.pie()` / `d3.arc()`**: Angle calculation and SVG path generation for donut chart slices.
- **`d3.line()` / `d3.area()` / `d3.curveMonotoneX()`**: Smooth cubic spline curve generation for trend timeline charting.
- **Data Join Pattern**: `selection.data(data, key).join("rect")` pattern for dynamic SVG updates.
- **Transitions**: `.transition().duration(750)` animated growing bar heights and line path drawing.
- **Interactive Tooltips**: HTML overlay tooltips displaying contextual metadata on mouseover.

---

## 📷 Screenshots Placeholder

- **Dashboard Overview**: KPI cards, filter controls, D3 bar chart with threshold coloring, donut chart, subject comparison, and line chart.
- **Student Roster**: Filterable data table with status badges and Add/Edit student form modal.
- **Attendance Marking**: Grid with Present/Absent toggle switches and batch submit action.
- **Advanced Analytics**: Cohort distribution histogram and low attendance alert table.
- **Reports**: Customizable report tables with CSV export download.

---

## 🔮 Future Improvements

- Authentication & Role-Based Access Control (Admin vs Faculty vs Student portal).
- RFID / QR-Code automated student attendance scanning integration.
- SMS / WhatsApp integration for automated attendance notifications to parents.
- Predictive Analytics for early identification of at-risk students using Machine Learning.

---

*Developed for B.Tech 2nd Year Subject: Interactive Data Visualization using D3.js*
