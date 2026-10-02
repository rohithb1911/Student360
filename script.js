/* ==========================================================================
   STUDENT360 - Smart Student Academic & Career Management Dashboard
   Core Application Engine (Vanilla JavaScript)
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. LocalStorage Architecture & Storage Helpers
     -------------------------------------------------------------------------- */
  const STORAGE_KEYS = {
    PROFILE: 'student360_studentProfile',
    HOMEWORK: 'student360_homework',
    CLASSWORK: 'student360_classwork',
    ASSIGNMENTS: 'student360_assignments',
    EXAMS: 'student360_exams',
    TIMETABLE: 'student360_timetable',
    ATTENDANCE: 'student360_attendance',
    STUDY_TASKS: 'student360_studyTasks',
    INTERNSHIPS: 'student360_internships',
    APPLICATIONS: 'student360_applications',
    SKILLS: 'student360_skills',
    ROADMAPS: 'student360_roadmaps',
    RESUME: 'student360_resume',
    NOTIFICATIONS: 'student360_notifications',
    REMINDERS: 'student360_reminders',
    SETTINGS: 'student360_settings'
  };

  function saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('LocalStorage write error:', e);
      showToast('⚠️ Storage limit reached or error saving data', 'warning');
      return false;
    }
  }

  function loadData(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.error('LocalStorage read error:', e);
      return fallback;
    }
  }

  function removeData(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('LocalStorage delete error:', e);
    }
  }

  /* --------------------------------------------------------------------------
     2. Initial Default Demo Data (Seed Data for Rohith)
     -------------------------------------------------------------------------- */
  const DEFAULT_PROFILE = {
    name: 'Rohith B',
    email: 'rohith.b@student360.edu',
    phone: '+91 98765 43210',
    college: 'National Institute of Technology',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    year: '3rd Year (Semester 6)',
    cgpa: 8.92,
    github: 'https://github.com/rohithb',
    linkedin: 'https://linkedin.com/in/rohithb',
    portfolio: 'https://rohithb.dev'
  };

  const DEFAULT_HOMEWORK = [
    {
      id: 'hw-1',
      subject: 'Compiler Design',
      title: 'Construct SLR(1) Parsing Table',
      description: 'Find canonical collection of LR(0) items and construct the action and goto tables for grammar G.',
      dueDate: getRelativeDateString(0), // Today
      priority: 'High',
      estTime: '45 mins',
      status: 'Pending'
    },
    {
      id: 'hw-2',
      subject: 'Database Management',
      title: 'B+ Tree Indexing & Query Cost Calculation',
      description: 'Solve textbook problems 14.3 to 14.8 on B+ tree insertion, splitting, and node deletion.',
      dueDate: getRelativeDateString(2),
      priority: 'High',
      estTime: '60 mins',
      status: 'Pending'
    },
    {
      id: 'hw-3',
      subject: 'Web Technology',
      title: 'Responsive Flexbox & CSS Grid Layout Exercise',
      description: 'Implement a mobile-responsive product dashboard layout using pure CSS without frameworks.',
      dueDate: getRelativeDateString(3),
      priority: 'Medium',
      estTime: '40 mins',
      status: 'Pending'
    },
    {
      id: 'hw-4',
      subject: 'Operating Systems',
      title: 'Banker’s Algorithm Deadlock Avoidance',
      description: 'Write trace table for safety state verification with 5 processes and 3 resource types.',
      dueDate: getRelativeDateString(4),
      priority: 'Medium',
      estTime: '50 mins',
      status: 'Pending'
    },
    {
      id: 'hw-5',
      subject: 'AI & Machine Learning',
      title: 'Gradient Descent Implementation in Python',
      description: 'Implement batch and stochastic gradient descent for linear regression from scratch.',
      dueDate: getRelativeDateString(-2),
      priority: 'Medium',
      estTime: '90 mins',
      status: 'Completed'
    },
    {
      id: 'hw-6',
      subject: 'Computer Networks',
      title: 'TCP 3-Way Handshake Wireshark Trace Analysis',
      description: 'Analyze SYN, SYN-ACK, and ACK packets and document sequence numbers from pcap capture.',
      dueDate: getRelativeDateString(-3),
      priority: 'Low',
      estTime: '30 mins',
      status: 'Completed'
    }
  ];

  const DEFAULT_CLASSWORK = [
    {
      id: 'cw-1',
      subject: 'Compiler Design',
      date: '2026-09-30',
      topic: 'SLR Parsing Table & Handle Pruning',
      teacher: 'Dr. K. Sharma',
      notes: 'Covered LR(0) items sets, closure, goto functions, and shift-reduce conflicts. Completed Example 4.12.',
      status: 'Completed'
    },
    {
      id: 'cw-2',
      subject: 'Database Management',
      date: '2026-10-01',
      topic: 'Transactions & ACID Properties',
      teacher: 'Prof. S. Verma',
      notes: 'Detailed discussion on Serializability, Conflict vs View equivalence, and Two-Phase Locking (2PL).',
      status: 'Completed'
    },
    {
      id: 'cw-3',
      subject: 'Web Technology',
      date: '2026-10-01',
      topic: 'REST API Architecture & Fetch API',
      teacher: 'Prof. Ananya R.',
      notes: 'Understanding REST principles, statelessness, HTTP verbs, response codes, and async/await syntax.',
      status: 'Completed'
    },
    {
      id: 'cw-4',
      subject: 'Operating Systems',
      date: '2026-09-29',
      topic: 'Virtual Memory & Demand Paging',
      teacher: 'Dr. P. Nair',
      notes: 'Page fault service routine, dirty bit optimization, and comparison between FIFO, LRU, and Optimal replacement.',
      status: 'Completed'
    },
    {
      id: 'cw-5',
      subject: 'AI & Machine Learning',
      date: '2026-09-28',
      topic: 'Decision Trees & Information Gain',
      teacher: 'Dr. Ramesh M.',
      notes: 'Calculated Shannon Entropy and Gini Index on sample weather dataset. Discussed post-pruning.',
      status: 'Completed'
    },
    {
      id: 'cw-6',
      subject: 'Computer Networks',
      date: '2026-09-27',
      topic: 'IPv4 Subnetting & CIDR Notation',
      teacher: 'Prof. Deepa K.',
      notes: 'Solved 4 variable length subnet masking (VLSM) practical questions for college department routing.',
      status: 'Completed'
    }
  ];

  const DEFAULT_ASSIGNMENTS = [
    {
      id: 'as-1',
      title: 'DBMS Lab Mini Project: Online Bookstore Schema & Queries',
      subject: 'Database Management',
      description: 'Implement relational schema with 8 tables, indexes, triggers, and complex nested SQL analytical queries.',
      assignedDate: getRelativeDateString(-5),
      dueDate: getRelativeDateString(0), // Today
      priority: 'High',
      status: 'In Progress',
      notes: 'Need to write SQL triggers for inventory check.'
    },
    {
      id: 'as-2',
      title: 'Compiler Design Syntax Tree Generator in Lex/Yacc',
      subject: 'Compiler Design',
      description: 'Build syntax analyzer that generates abstract syntax trees for arithmetic and boolean expressions.',
      assignedDate: getRelativeDateString(-4),
      dueDate: getRelativeDateString(2), // 2 Days Left
      priority: 'High',
      status: 'In Progress',
      notes: 'Bison grammar rules complete, AST node pointers remaining.'
    },
    {
      id: 'as-3',
      title: 'Web Technology Portfolio Site using Modern CSS',
      subject: 'Web Technology',
      description: 'Build interactive student dashboard with CSS variables, transitions, and semantic layout.',
      assignedDate: getRelativeDateString(-2),
      dueDate: getRelativeDateString(7), // 7 Days Left
      priority: 'Medium',
      status: 'In Progress',
      notes: 'All views designed. Implementing LocalStorage logic.'
    },
    {
      id: 'as-4',
      title: 'Operating Systems Kernel Process Synchronization in C',
      subject: 'Operating Systems',
      description: 'Simulate Producer-Consumer and Dining Philosophers problem using POSIX semaphores and mutex locks.',
      assignedDate: getRelativeDateString(-6),
      dueDate: getRelativeDateString(11),
      priority: 'Medium',
      status: 'Not Started',
      notes: 'Review pthread library documentation.'
    },
    {
      id: 'as-5',
      title: 'AI Model Evaluation: Cross Validation & ROC-AUC',
      subject: 'AI & Machine Learning',
      description: 'Evaluate logistic regression, SVM, and Random Forest on Kaggle heart disease dataset.',
      assignedDate: getRelativeDateString(-12),
      dueDate: getRelativeDateString(-1),
      priority: 'Low',
      status: 'Submitted',
      notes: 'Submitted via Google Classroom on Oct 1.'
    }
  ];

  const DEFAULT_EXAMS = [
    {
      id: 'ex-1',
      subject: 'Compiler Design',
      examType: 'Mid Semester Exam',
      date: getRelativeDateString(8),
      time: '09:30 AM - 11:30 AM',
      room: 'Hall 204',
      syllabus: 'Lexical Analysis, Top-Down Parsing, Bottom-Up SLR/CLR/LALR, SDD',
      preparationPct: 65
    },
    {
      id: 'ex-2',
      subject: 'Database Management Systems',
      examType: 'Mid Semester Exam',
      date: getRelativeDateString(12),
      time: '02:00 PM - 04:00 PM',
      room: 'Hall 301',
      syllabus: 'ER Modeling, Relational Algebra, Normalization (1NF to BCNF), Indexing, Concurrency Control',
      preparationPct: 80
    },
    {
      id: 'ex-3',
      subject: 'Web Technology',
      examType: 'Lab Practical Exam',
      date: getRelativeDateString(16),
      time: '10:00 AM - 01:00 PM',
      room: 'Computer Lab 2',
      syllabus: 'HTML5/CSS3 Responsive Layouts, DOM Manipulation, Fetch API & JSON Storage',
      preparationPct: 90
    },
    {
      id: 'ex-4',
      subject: 'Operating Systems',
      examType: 'Mid Semester Exam',
      date: getRelativeDateString(19),
      time: '09:30 AM - 11:30 AM',
      room: 'Hall 204',
      syllabus: 'Process Management, CPU Scheduling, Synchronization, Deadlocks, Memory Management',
      preparationPct: 50
    }
  ];

  const DEFAULT_TIMETABLE = [
    { id: 'tt-1', day: 'Monday', subject: 'Compiler Design', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 204', faculty: 'Dr. K. Sharma', type: 'Lecture' },
    { id: 'tt-2', day: 'Monday', subject: 'Web Technology', startTime: '10:00 AM', endTime: '11:00 AM', room: 'Room 302', faculty: 'Prof. Ananya R.', type: 'Lecture' },
    { id: 'tt-3', day: 'Monday', subject: 'DBMS Lab', startTime: '11:30 AM', endTime: '01:30 PM', room: 'Lab 2', faculty: 'Prof. S. Verma', type: 'Lab' },
    { id: 'tt-4', day: 'Monday', subject: 'Operating Systems', startTime: '02:00 PM', endTime: '03:00 PM', room: 'Room 204', faculty: 'Dr. P. Nair', type: 'Lecture' },

    { id: 'tt-5', day: 'Tuesday', subject: 'Database Management', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 301', faculty: 'Prof. S. Verma', type: 'Lecture' },
    { id: 'tt-6', day: 'Tuesday', subject: 'AI & Machine Learning', startTime: '10:00 AM', endTime: '11:00 AM', room: 'Room 302', faculty: 'Dr. Ramesh M.', type: 'Lecture' },
    { id: 'tt-7', day: 'Tuesday', subject: 'Compiler Design Lab', startTime: '11:30 AM', endTime: '01:30 PM', room: 'Lab 1', faculty: 'Dr. K. Sharma', type: 'Lab' },
    { id: 'tt-8', day: 'Tuesday', subject: 'Computer Networks', startTime: '02:00 PM', endTime: '03:00 PM', room: 'Room 204', faculty: 'Prof. Deepa K.', type: 'Lecture' },

    { id: 'tt-9', day: 'Wednesday', subject: 'Web Technology', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 302', faculty: 'Prof. Ananya R.', type: 'Lecture' },
    { id: 'tt-10', day: 'Wednesday', subject: 'Operating Systems', startTime: '10:00 AM', endTime: '11:00 AM', room: 'Room 204', faculty: 'Dr. P. Nair', type: 'Lecture' },
    { id: 'tt-11', day: 'Wednesday', subject: 'Aptitude & Soft Skills', startTime: '11:30 AM', endTime: '12:30 PM', room: 'Room 105', faculty: 'Mr. Arvind S.', type: 'Tutorial' },
    { id: 'tt-12', day: 'Wednesday', subject: 'Database Management', startTime: '02:00 PM', endTime: '03:00 PM', room: 'Room 301', faculty: 'Prof. S. Verma', type: 'Lecture' },

    { id: 'tt-13', day: 'Thursday', subject: 'Compiler Design', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 204', faculty: 'Dr. K. Sharma', type: 'Lecture' },
    { id: 'tt-14', day: 'Thursday', subject: 'Database Management', startTime: '10:00 AM', endTime: '11:00 AM', room: 'Room 301', faculty: 'Prof. S. Verma', type: 'Lecture' },
    { id: 'tt-15', day: 'Thursday', subject: 'AI & ML Lab', startTime: '11:30 AM', endTime: '01:30 PM', room: 'Lab 3', faculty: 'Dr. Ramesh M.', type: 'Lab' },
    { id: 'tt-16', day: 'Thursday', subject: 'Web Tech Lab', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Lab 2', faculty: 'Prof. Ananya R.', type: 'Lab' },

    { id: 'tt-17', day: 'Friday', subject: 'Compiler Design', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 204', faculty: 'Dr. K. Sharma', type: 'Lecture' },
    { id: 'tt-18', day: 'Friday', subject: 'Web Technology', startTime: '10:00 AM', endTime: '11:00 AM', room: 'Lab 2', faculty: 'Prof. Ananya R.', type: 'Lab' },
    { id: 'tt-19', day: 'Friday', subject: 'Database Management', startTime: '11:00 AM', endTime: '12:00 PM', room: 'Room 301', faculty: 'Prof. S. Verma', type: 'Lecture' },
    { id: 'tt-20', day: 'Friday', subject: 'Complete DBMS Assignment', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Lab 2', faculty: 'Self / Mentored', type: 'Other' },

    { id: 'tt-21', day: 'Saturday', subject: 'Capstone Project Guidance', startTime: '09:30 AM', endTime: '11:00 AM', room: 'Room 301', faculty: 'Project Mentor', type: 'Tutorial' },
    { id: 'tt-22', day: 'Saturday', subject: 'Competitive Coding Club', startTime: '11:15 AM', endTime: '01:00 PM', room: 'Lab 1', faculty: 'Coding Club', type: 'Other' }
  ];

  const DEFAULT_ATTENDANCE = [
    { id: 'att-1', subject: 'Compiler Design', present: 23, total: 25 },
    { id: 'att-2', subject: 'Database Management', present: 24, total: 28 },
    { id: 'att-3', subject: 'Operating Systems', present: 27, total: 30 },
    { id: 'att-4', subject: 'Web Technology', present: 17, total: 25 }, // 68% -> Warning!
    { id: 'att-5', subject: 'AI & Machine Learning', present: 22, total: 25 },
    { id: 'att-6', subject: 'Computer Networks', present: 20, total: 25 }
  ];

  const DEFAULT_STUDY_TASKS = [
    { id: 'st-1', task: 'Java DSA — Binary Tree Traversals & LeetCode #102', subject: 'DSA', duration: 60, date: getRelativeDateString(0), priority: 'High', completed: true },
    { id: 'st-2', task: 'Compiler Design — SLR(1) Parsing Table Practice', subject: 'Compiler Design', duration: 45, date: getRelativeDateString(0), priority: 'High', completed: false },
    { id: 'st-3', task: 'DBMS Revision — BCNF Normalization & Decomposition', subject: 'DBMS', duration: 60, date: getRelativeDateString(0), priority: 'Medium', completed: false },
    { id: 'st-4', task: 'Aptitude Practice — Quantitative Time & Work Problems', subject: 'Aptitude', duration: 30, date: getRelativeDateString(0), priority: 'Low', completed: false }
  ];

  const DEFAULT_INTERNSHIPS = [
    {
      id: 'int-1',
      role: 'Frontend Developer Intern',
      company: 'Atlassian',
      location: 'Bengaluru, India',
      mode: 'Remote',
      duration: '6 Months',
      stipend: '₹65,000 / month',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
      deadline: getRelativeDateString(14),
      description: 'Work alongside the Jira Cloud team building scalable, accessible web components using modern React, TypeScript, and micro-frontends.',
      saved: true
    },
    {
      id: 'int-2',
      role: 'Software Engineer Intern',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      mode: 'Hybrid',
      duration: '3 Months (Summer)',
      stipend: '₹80,000 / month',
      skills: ['C++', 'Java', 'Data Structures', 'Algorithms', 'Azure'],
      deadline: getRelativeDateString(8),
      description: 'Join Azure Core Engineering team to design high-throughput distributed microservices and optimize system latency.',
      saved: true
    },
    {
      id: 'int-3',
      role: 'Backend Engineering Intern',
      company: 'Swiggy',
      location: 'Bengaluru, India',
      mode: 'Hybrid',
      duration: '6 Months',
      stipend: '₹50,000 / month',
      skills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Kafka'],
      deadline: getRelativeDateString(18),
      description: 'Develop low-latency order routing APIs, handle high-concurrency event streaming, and optimize MySQL queries.',
      saved: true
    },
    {
      id: 'int-4',
      role: 'Full Stack Developer Intern',
      company: 'Razorpay',
      location: 'Bengaluru, India',
      mode: 'Remote',
      duration: '6 Months',
      stipend: '₹55,000 / month',
      skills: ['Node.js', 'React', 'TypeScript', 'MongoDB', 'Docker'],
      deadline: getRelativeDateString(12),
      description: 'Contribute to merchant onboarding flows and payment gateway dashboard tools with seamless user experience.',
      saved: true
    },
    {
      id: 'int-5',
      role: 'Machine Learning Intern',
      company: 'Google',
      location: 'Bengaluru, India',
      mode: 'Onsite',
      duration: '3 Months (Summer)',
      stipend: '₹95,000 / month',
      skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Math'],
      deadline: getRelativeDateString(25),
      description: 'Collaborate with researchers on multimodal generative models, data preprocessing pipelines, and benchmark evaluations.',
      saved: true
    },
    {
      id: 'int-6',
      role: 'Data Analyst Intern',
      company: 'Flipkart',
      location: 'Bengaluru, India',
      mode: 'Hybrid',
      duration: '6 Months',
      stipend: '₹40,000 / month',
      skills: ['SQL', 'Python', 'Excel', 'PowerBI', 'Statistics'],
      deadline: getRelativeDateString(10),
      description: 'Extract actionable insights from supply chain metrics, build interactive dashboards, and perform A/B test analysis.',
      saved: true
    },
    {
      id: 'int-7',
      role: 'Cloud DevOps Intern',
      company: 'Cisco',
      location: 'Bengaluru, India',
      mode: 'Onsite',
      duration: '6 Months',
      stipend: '₹45,000 / month',
      skills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Bash'],
      deadline: getRelativeDateString(5),
      description: 'Automate CI/CD pipelines, containerize backend microservices, and manage monitoring with Prometheus and Grafana.',
      saved: true
    },
    {
      id: 'int-8',
      role: 'Android Developer Intern',
      company: 'PhonePe',
      location: 'Bengaluru, India',
      mode: 'Hybrid',
      duration: '6 Months',
      stipend: '₹50,000 / month',
      skills: ['Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'MVVM'],
      deadline: getRelativeDateString(7),
      description: 'Build responsive and accessible UPI payment interfaces used by millions of users across India.',
      saved: true
    },
    {
      id: 'int-9',
      role: 'UI/UX & Frontend Intern',
      company: 'CRED',
      location: 'Bengaluru, India',
      mode: 'Onsite',
      duration: '4 Months',
      stipend: '₹60,000 / month',
      skills: ['Figma', 'HTML5', 'CSS3', 'JavaScript', 'Animations'],
      deadline: getRelativeDateString(20),
      description: 'Design and prototype slick, high-polish user interfaces with fluid 60fps micro-animations and sound effects.',
      saved: false
    },
    {
      id: 'int-10',
      role: 'Python Developer Intern',
      company: 'Zoho Corporation',
      location: 'Chennai, India',
      mode: 'Onsite',
      duration: '6 Months',
      stipend: '₹35,000 / month',
      skills: ['Python', 'Django', 'PostgreSQL', 'Git', 'Linux'],
      deadline: getRelativeDateString(15),
      description: 'Develop enterprise CRM modules, build background data processing jobs, and implement secure REST endpoints.',
      saved: false
    },
    {
      id: 'int-11',
      role: 'Systems & OS Engineering Intern',
      company: 'Intel',
      location: 'Bengaluru, India',
      mode: 'Hybrid',
      duration: '6 Months',
      stipend: '₹50,000 / month',
      skills: ['C', 'Linux Kernel', 'Computer Architecture', 'GDB'],
      deadline: getRelativeDateString(22),
      description: 'Device driver development, performance benchmarking on next-gen Xeon silicon, and memory optimization.',
      saved: false
    },
    {
      id: 'int-12',
      role: 'Security Analyst Intern',
      company: 'Palo Alto Networks',
      location: 'Bengaluru, India',
      mode: 'Remote',
      duration: '6 Months',
      stipend: '₹55,000 / month',
      skills: ['Networks', 'Linux', 'Cryptography', 'Python', 'Wireshark'],
      deadline: getRelativeDateString(11),
      description: 'Threat hunting, vulnerability assessment, firewall log analysis, and automated security script writing.',
      saved: false
    },
    {
      id: 'int-13',
      role: 'Java Software Intern',
      company: 'Oracle',
      location: 'Bengaluru, India',
      mode: 'Hybrid',
      duration: '6 Months',
      stipend: '₹60,000 / month',
      skills: ['Core Java', 'OOP', 'SQL', 'JUnit', 'Data Structures'],
      deadline: getRelativeDateString(19),
      description: 'Join Oracle Cloud Infrastructure (OCI) database tools team to build enterprise persistence modules.',
      saved: false
    },
    {
      id: 'int-14',
      role: 'Web Engineering Intern',
      company: 'Postman',
      location: 'Bengaluru, India',
      mode: 'Remote',
      duration: '6 Months',
      stipend: '₹70,000 / month',
      skills: ['JavaScript', 'HTTP/REST', 'APIs', 'Node.js', 'Electron'],
      deadline: getRelativeDateString(17),
      description: 'Help develop collaborative API development features and developer documentation tools in Postman app.',
      saved: false
    },
    {
      id: 'int-15',
      role: 'AI Research Intern',
      company: 'IBM Research',
      location: 'Bengaluru, India',
      mode: 'Hybrid',
      duration: '6 Months',
      stipend: '₹50,000 / month',
      skills: ['NLP', 'Transformers', 'Python', 'Research', 'Git'],
      deadline: getRelativeDateString(28),
      description: 'Conduct experiments on domain adaptation for enterprise Large Language Models and code synthesis.',
      saved: false
    },
    {
      id: 'int-16',
      role: 'Fintech Software Intern',
      company: 'Groww',
      location: 'Bengaluru, India',
      mode: 'Onsite',
      duration: '6 Months',
      stipend: '₹50,000 / month',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Redis', 'PostgreSQL'],
      deadline: getRelativeDateString(13),
      description: 'Build fast and resilient transaction processing microservices for stock trading and mutual fund orders.',
      saved: false
    }
  ];

  const DEFAULT_APPLICATIONS = [
    { id: 'app-1', company: 'Microsoft', role: 'SDE Intern', location: 'Hyderabad', dateApplied: getRelativeDateString(-12), deadline: getRelativeDateString(8), status: 'Applied', notes: 'Referred by alumni. Awaiting OA link.' },
    { id: 'app-2', company: 'Swiggy', role: 'Backend Intern', location: 'Bengaluru', dateApplied: getRelativeDateString(-8), deadline: getRelativeDateString(18), status: 'Applied', notes: 'Applied via career portal with resume v3.' },
    { id: 'app-3', company: 'Google', role: 'ML Engineering Intern', location: 'Bengaluru', dateApplied: getRelativeDateString(-4), deadline: getRelativeDateString(25), status: 'Applied', notes: 'Submitted resume and transcript.' },

    { id: 'app-4', company: 'Razorpay', role: 'Full Stack Intern', location: 'Remote', dateApplied: getRelativeDateString(-15), deadline: getRelativeDateString(12), status: 'Screening', notes: 'Completed online coding assessment on HackerRank (Score: 100%).' },
    { id: 'app-5', company: 'Flipkart', role: 'Data Analyst Intern', location: 'Bengaluru', dateApplied: getRelativeDateString(-14), deadline: getRelativeDateString(10), status: 'Screening', notes: 'Passed resume screening. HR phone screen scheduled.' },
    { id: 'app-6', company: 'Atlassian', role: 'Frontend Intern', location: 'Remote', dateApplied: getRelativeDateString(-18), deadline: getRelativeDateString(14), status: 'Screening', notes: 'Submitted take-home coding challenge.' },

    { id: 'app-7', company: 'Cisco', role: 'Cloud DevOps Intern', location: 'Bengaluru', dateApplied: getRelativeDateString(-25), deadline: getRelativeDateString(5), status: 'Interview', notes: 'Round 1 technical interview on Docker/Linux scheduled for next Tuesday.' },
    { id: 'app-8', company: 'PhonePe', role: 'Android Intern', location: 'Bengaluru', dateApplied: getRelativeDateString(-22), deadline: getRelativeDateString(7), status: 'Interview', notes: 'Completed Round 1 DSA; Round 2 System Design scheduled.' },

    { id: 'app-9', company: 'Zoho Corporation', role: 'Summer Technology Intern', location: 'Chennai', dateApplied: getRelativeDateString(-40), deadline: getRelativeDateString(-10), status: 'Selected', notes: 'Official Offer Letter Received! Stipend: ₹35,000/mo. Joining in May.' },
    { id: 'app-10', company: 'TechStart AI', role: 'Web Dev Intern', location: 'Remote', dateApplied: getRelativeDateString(-30), deadline: getRelativeDateString(-5), status: 'Selected', notes: 'Accepted part-time winter internship.' },

    { id: 'app-11', company: 'Uber', role: 'Software Intern', location: 'Bengaluru', dateApplied: getRelativeDateString(-35), deadline: getRelativeDateString(-15), status: 'Rejected', notes: 'Resume screened out. Recommended to re-apply next cycle with more open-source work.' },
    { id: 'app-12', company: 'Amazon', role: 'SDE Intern', location: 'Bengaluru', dateApplied: getRelativeDateString(-45), deadline: getRelativeDateString(-20), status: 'Rejected', notes: 'Cleared OA, position filled prior to interview round.' }
  ];

  const DEFAULT_SKILLS = [
    {
      category: 'Programming',
      skills: [
        { name: 'Java', level: 90 },
        { name: 'Python', level: 80 },
        { name: 'C++', level: 75 },
        { name: 'JavaScript', level: 85 }
      ]
    },
    {
      category: 'Web Development',
      skills: [
        { name: 'HTML5 & Semantic Markup', level: 92 },
        { name: 'CSS3, Grid & Flexbox', level: 88 },
        { name: 'React & Frontend State', level: 75 },
        { name: 'REST APIs & Fetch', level: 85 }
      ]
    },
    {
      category: 'Database & Backend',
      skills: [
        { name: 'SQL & Relational Schema', level: 85 },
        { name: 'MySQL & Query Optimization', level: 80 },
        { name: 'B+ Tree Indexing & ACID', level: 82 },
        { name: 'Node.js Basics', level: 70 }
      ]
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git & GitHub Version Control', level: 90 },
        { name: 'Docker Containerization', level: 65 },
        { name: 'Linux Command Line', level: 75 },
        { name: 'VS Code & DevTools', level: 90 }
      ]
    },
    {
      category: 'Soft Skills & Interview',
      skills: [
        { name: 'Data Structures & Algorithms', level: 82 },
        { name: 'Technical Problem Solving', level: 88 },
        { name: 'Team Collaboration', level: 90 },
        { name: 'Interview Communication', level: 84 }
      ]
    }
  ];

  const DEFAULT_ROADMAPS = [
    {
      id: 'java-fullstack',
      title: 'Java Full Stack Developer',
      description: 'Comprehensive enterprise roadmap from Core Java fundamentals to Spring Boot microservices, React, and deployment.',
      milestones: [
        { title: 'Core Java Fundamentals (Syntax, Datatypes, Loops)', done: true },
        { title: 'Object-Oriented Programming (Polymorphism, Inheritance, Encapsulation)', done: true },
        { title: 'Java Collections Framework (List, Set, Map, Queue)', done: true },
        { title: 'Exception Handling & Multi-threading', done: true },
        { title: 'Relational Database & SQL (Joins, Indexing, Transactions)', done: true },
        { title: 'JDBC & Hibernate / JPA Persistence', done: false },
        { title: 'HTML5, CSS3, Modern JavaScript (ES6+)', done: true },
        { title: 'React.js Component Architecture & Hooks', done: true },
        { title: 'Spring Framework & Spring Boot Essentials', done: false },
        { title: 'Building RESTful Web Services with Spring Boot', done: false },
        { title: 'Authentication (JWT, Spring Security)', done: false },
        { title: 'Docker Containerization & CI/CD Basics', done: false },
        { title: 'Full Stack End-to-End Capstone Project', done: false },
        { title: 'Data Structures & Algorithms (300+ LeetCode problems)', done: true },
        { title: 'Mock Technical & Behavioral Interview Preparation', done: false }
      ]
    },
    {
      id: 'frontend-dev',
      title: 'Frontend Developer',
      description: 'Modern web engineering path covering HTML/CSS mastery, JavaScript deep dive, modern frameworks, and accessibility.',
      milestones: [
        { title: 'Semantic HTML5 & Web Accessibility (WCAG)', done: true },
        { title: 'Advanced CSS (Flexbox, Grid, Animations, Custom Properties)', done: true },
        { title: 'Modern JavaScript (Closures, Promises, Async/Await, ES Modules)', done: true },
        { title: 'Browser APIs & DOM Manipulation', done: true },
        { title: 'Git & GitHub Workflow', done: true },
        { title: 'React.js Fundamentals & Ecosystem', done: true },
        { title: 'State Management (Context API, Redux Toolkit)', done: false },
        { title: 'CSS Frameworks & Utility Systems', done: true },
        { title: 'Web Performance Optimization & Lighthouse Auditing', done: false },
        { title: 'Frontend Unit Testing (Jest, React Testing Library)', done: false }
      ]
    },
    {
      id: 'backend-dev',
      title: 'Backend Developer',
      description: 'Master backend architectures, APIs, server security, database tuning, and caching.',
      milestones: [
        { title: 'Programming Language Mastery (Java or Node.js)', done: true },
        { title: 'HTTP Protocol, RESTful APIs & Status Codes', done: true },
        { title: 'Database Design & SQL Optimization', done: true },
        { title: 'NoSQL Databases (MongoDB, Redis caching)', done: false },
        { title: 'Authentication & Authorization (OAuth2, JWT)', done: false },
        { title: 'Microservices Architecture & Event Streaming', done: false },
        { title: 'System Design Fundamentals (Scalability, Sharding, Load Balancers)', done: false }
      ]
    },
    {
      id: 'python-dev',
      title: 'Python Developer',
      description: 'General-purpose Python programming, Django/FastAPI, automation, and data handling.',
      milestones: [
        { title: 'Python Syntax & Data Structures', done: true },
        { title: 'OOP & Functional Programming in Python', done: true },
        { title: 'FastAPI / Django Framework Essentials', done: false },
        { title: 'SQLAlchemy & ORM Databases', done: false },
        { title: 'Web Scraping & Task Automation (BeautifulSoup, Celery)', done: true },
        { title: 'Unit Testing with pytest', done: false }
      ]
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      description: 'Data wrangling, SQL queries, statistical analysis, and interactive dashboarding.',
      milestones: [
        { title: 'Advanced Microsoft Excel (VLOOKUP, Pivot Tables, Macros)', done: true },
        { title: 'SQL for Data Analysis (Window Functions, CTEs, Aggregations)', done: true },
        { title: 'Python for Data Analysis (Pandas, NumPy)', done: true },
        { title: 'Data Visualization (Matplotlib, Seaborn)', done: false },
        { title: 'Business Intelligence Tools (PowerBI / Tableau)', done: false },
        { title: 'Statistical Methods & Hypothesis Testing', done: false }
      ]
    },
    {
      id: 'aiml-engineer',
      title: 'AI/ML Engineer',
      description: 'From Linear Algebra and Probability to Deep Learning, Computer Vision, and NLP.',
      milestones: [
        { title: 'Linear Algebra, Calculus & Probability', done: true },
        { title: 'Python Scientific Stack (NumPy, SciPy, Pandas)', done: true },
        { title: 'Classical Machine Learning (Scikit-Learn Regression & Classification)', done: true },
        { title: 'Model Evaluation & Cross-Validation Techniques', done: true },
        { title: 'Neural Networks & Deep Learning (PyTorch or TensorFlow)', done: false },
        { title: 'Natural Language Processing & Transformers', done: false }
      ]
    }
  ];

  const DEFAULT_RESUME = {
    name: 'Rohith B',
    title: 'Computer Science Engineering Student',
    email: 'rohith.b@student360.edu',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    links: 'github.com/rohithb • linkedin.com/in/rohithb',
    objective: 'Motivated 3rd-year Computer Science undergraduate with strong foundation in Java, Data Structures, Web Development, and Database Systems. Seeking software engineering and backend internships to build scalable real-world products.',
    college: 'National Institute of Technology',
    degree: 'B.Tech in Computer Science & Engineering',
    eduYear: '2023 – 2027 • CGPA: 8.92',
    projects: '• Student360 Academic & Career Management Dashboard: Engineered an all-in-one frontend student SaaS dashboard with LocalStorage persistence, timetable schedule, Kanban job tracker, and live resume builder.\n• Distributed B+ Tree Indexing Simulation: Built an interactive visualization tool demonstrating page splits, concurrency locking, and query lookups with 40% reduced search overhead.\n• Compiler Lexical & Syntax Analyzer: Developed a custom C-subset compiler front-end utilizing Lex & Yacc with complete Abstract Syntax Tree generation.',
    skills: 'Java, Python, C++, SQL, HTML5, CSS3, JavaScript, React, Git, Docker, Linux, REST APIs',
    certs: '• Oracle Certified Associate: Java SE Programmer\n• Finalist in Smart India Hackathon 2025\n• Solved 350+ LeetCode DSA Problems (Top 15% Rating)'
  };

  const DEFAULT_REMINDERS = [
    { id: 'rem-1', title: 'DBMS Assignment is due today at 11:59 PM', date: getRelativeDateString(0), time: '11:59 PM', type: 'Assignment' },
    { id: 'rem-2', title: 'Compiler Design class starts at 09:00 AM in Room 204', date: getRelativeDateString(0), time: '09:00 AM', type: 'Class' },
    { id: 'rem-3', title: 'Cisco Cloud DevOps Technical Interview on Tuesday', date: getRelativeDateString(4), time: '02:00 PM', type: 'Interview' }
  ];

  const DEFAULT_NOTIFICATIONS = [
    { id: 'notif-1', title: 'DBMS Assignment is due today at 11:59 PM', time: '1 hour ago', unread: true, type: 'danger', icon: '📝' },
    { id: 'notif-2', title: 'Compiler Design class starts in Room 204', time: '2 hours ago', unread: true, type: 'info', icon: '🏫' },
    { id: 'notif-3', title: 'Attendance Warning: Web Technology is at 68% (Below 75%)', time: '5 hours ago', unread: true, type: 'warning', icon: '⚠️' },
    { id: 'notif-4', title: 'Cisco interview invitation received for next week', time: 'Yesterday', unread: false, type: 'success', icon: '🎯' }
  ];

  const DEFAULT_SETTINGS = {
    attendanceThreshold: 75,
    browserNotifications: false
  };

  // Helper date utility
  function getRelativeDateString(daysOffset) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /* --------------------------------------------------------------------------
     3. State Initialization & Data Hydration
     -------------------------------------------------------------------------- */
  let appState = {
    profile: loadData(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE),
    homework: loadData(STORAGE_KEYS.HOMEWORK, DEFAULT_HOMEWORK),
    classwork: loadData(STORAGE_KEYS.CLASSWORK, DEFAULT_CLASSWORK),
    assignments: loadData(STORAGE_KEYS.ASSIGNMENTS, DEFAULT_ASSIGNMENTS),
    exams: loadData(STORAGE_KEYS.EXAMS, DEFAULT_EXAMS),
    timetable: loadData(STORAGE_KEYS.TIMETABLE, DEFAULT_TIMETABLE),
    attendance: loadData(STORAGE_KEYS.ATTENDANCE, DEFAULT_ATTENDANCE),
    studyTasks: loadData(STORAGE_KEYS.STUDY_TASKS, DEFAULT_STUDY_TASKS),
    internships: loadData(STORAGE_KEYS.INTERNSHIPS, DEFAULT_INTERNSHIPS),
    applications: loadData(STORAGE_KEYS.APPLICATIONS, DEFAULT_APPLICATIONS),
    skills: loadData(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS),
    roadmaps: loadData(STORAGE_KEYS.ROADMAPS, DEFAULT_ROADMAPS),
    resume: loadData(STORAGE_KEYS.RESUME, DEFAULT_RESUME),
    notifications: loadData(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
    reminders: loadData(STORAGE_KEYS.REMINDERS, DEFAULT_REMINDERS),
    settings: loadData(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
    activeRoadmapIndex: 0,
    currentTimetableDay: 'All',
    deadlineCategoryFilter: 'all'
  };

  // Save state immediately on first launch to populate LocalStorage
  function persistAll() {
    saveData(STORAGE_KEYS.PROFILE, appState.profile);
    saveData(STORAGE_KEYS.HOMEWORK, appState.homework);
    saveData(STORAGE_KEYS.CLASSWORK, appState.classwork);
    saveData(STORAGE_KEYS.ASSIGNMENTS, appState.assignments);
    saveData(STORAGE_KEYS.EXAMS, appState.exams);
    saveData(STORAGE_KEYS.TIMETABLE, appState.timetable);
    saveData(STORAGE_KEYS.ATTENDANCE, appState.attendance);
    saveData(STORAGE_KEYS.STUDY_TASKS, appState.studyTasks);
    saveData(STORAGE_KEYS.INTERNSHIPS, appState.internships);
    saveData(STORAGE_KEYS.APPLICATIONS, appState.applications);
    saveData(STORAGE_KEYS.SKILLS, appState.skills);
    saveData(STORAGE_KEYS.ROADMAPS, appState.roadmaps);
    saveData(STORAGE_KEYS.RESUME, appState.resume);
    saveData(STORAGE_KEYS.NOTIFICATIONS, appState.notifications);
    saveData(STORAGE_KEYS.REMINDERS, appState.reminders);
    saveData(STORAGE_KEYS.SETTINGS, appState.settings);
  }

  // Ensure first run saves defaults
  if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
    persistAll();
  }

  /* --------------------------------------------------------------------------
     4. Navigation Routing & Page Switching
     -------------------------------------------------------------------------- */
  window.navigateTo = function (pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(p => p.classList.remove('active'));

    // Activate selected page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Update active nav links in sidebar
    const navLinks = document.querySelectorAll('.nav-link, .nav-sublink');
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.dataset.page === pageId) {
        l.classList.add('active');
      }
    });

    // Update mobile bottom nav
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');
    mobileLinks.forEach(m => {
      m.classList.remove('active');
      if (m.dataset.page === pageId) {
        m.classList.add('active');
      }
    });

    // Close mobile sidebar if open
    const sidebar = document.getElementById('appSidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh specific page views
    refreshPageView(pageId);
  };

  window.toggleNavGroup = function (groupId) {
    const group = document.getElementById(groupId);
    if (group) {
      group.classList.toggle('open');
    }
  };

  function refreshPageView(pageId) {
    switch (pageId) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'homework':
        renderHomework();
        break;
      case 'classwork':
        renderClasswork();
        break;
      case 'assignments':
        renderAssignments();
        break;
      case 'deadlines':
        renderDeadlines();
        break;
      case 'exams':
        renderExams();
        break;
      case 'timetable':
        renderTimetable();
        break;
      case 'attendance':
        renderAttendance();
        break;
      case 'study':
        renderStudyPlanner();
        break;
      case 'internships':
        renderInternships();
        break;
      case 'applications':
        renderApplicationsKanban();
        break;
      case 'skills':
        renderSkills();
        break;
      case 'roadmap':
        renderRoadmap();
        break;
      case 'resume':
        syncResumeFormAndPreview();
        break;
      case 'reminders':
        renderReminders();
        break;
      case 'analytics':
        renderAnalyticsCharts();
        break;
      case 'profile':
        populateProfileForm();
        break;
      case 'settings':
        renderSettingsView();
        break;
    }
    updateAllBadges();
  }

  /* --------------------------------------------------------------------------
     5. Toast Notification System
     -------------------------------------------------------------------------- */
  window.showToast = function (message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚠️';
    if (type === 'danger') icon = '✕';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span style="flex: 1;">${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  /* --------------------------------------------------------------------------
     6. Header & Badges Management
     -------------------------------------------------------------------------- */
  function updateAllBadges() {
    // Homework pending count
    const pendingHw = appState.homework.filter(h => h.status !== 'Completed').length;
    const sidebarHw = document.getElementById('sidebarHwCount');
    if (sidebarHw) sidebarHw.textContent = pendingHw;

    // Assignment active count
    const activeAssign = appState.assignments.filter(a => a.status !== 'Submitted').length;
    const sidebarAssign = document.getElementById('sidebarAssignCount');
    if (sidebarAssign) sidebarAssign.textContent = activeAssign;

    // Attendance percentage overall
    const overallAtt = calculateOverallAttendance();
    const sidebarAtt = document.getElementById('sidebarAttendPct');
    if (sidebarAtt) sidebarAtt.textContent = `${overallAtt}%`;

    // Active applications count
    const activeApps = appState.applications.filter(a => a.status !== 'Rejected').length;
    const sidebarApp = document.getElementById('sidebarAppCount');
    if (sidebarApp) sidebarApp.textContent = activeApps;

    // Notifications count
    const unreadNotifs = appState.notifications.filter(n => n.unread).length;
    const notifBadge = document.getElementById('notifBadge');
    if (notifBadge) {
      notifBadge.textContent = unreadNotifs;
      notifBadge.style.display = unreadNotifs > 0 ? 'flex' : 'none';
    }

    // Reminders count
    const sidebarReminder = document.getElementById('sidebarReminderCount');
    if (sidebarReminder) sidebarReminder.textContent = appState.reminders.length;

    // User profile in sidebar
    const sidebarStudentName = document.getElementById('sidebarStudentName');
    const sidebarStudentDept = document.getElementById('sidebarStudentDept');
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    if (sidebarStudentName && appState.profile.name) {
      sidebarStudentName.textContent = appState.profile.name;
    }
    if (sidebarStudentDept && appState.profile.department) {
      sidebarStudentDept.textContent = `${appState.profile.degree} ${appState.profile.department.substring(0, 15)}...`;
    }
    if (sidebarAvatar && appState.profile.name) {
      sidebarAvatar.textContent = getInitials(appState.profile.name);
    }
  }

  function calculateOverallAttendance() {
    if (!appState.attendance || appState.attendance.length === 0) return 100;
    const totalPresent = appState.attendance.reduce((sum, item) => sum + Number(item.present), 0);
    const totalClasses = appState.attendance.reduce((sum, item) => sum + Number(item.total), 0);
    if (totalClasses === 0) return 100;
    return Math.round((totalPresent / totalClasses) * 100);
  }

  function getInitials(name) {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /* --------------------------------------------------------------------------
     7. Notifications Dropdown
     -------------------------------------------------------------------------- */
  window.toggleNotifDropdown = function () {
    const dropdown = document.getElementById('notifDropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
      renderNotifications();
    }
  };

  function renderNotifications() {
    const list = document.getElementById('notifListContainer');
    if (!list) return;

    if (appState.notifications.length === 0) {
      list.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No new notifications</div>`;
      return;
    }

    list.innerHTML = appState.notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markNotifRead('${n.id}')">
        <div class="notif-icon" style="background: var(--${n.type || 'primary'}-bg); color: var(--${n.type || 'primary'});">
          ${n.icon || '🔔'}
        </div>
        <div class="notif-content">
          <div class="notif-title">${escapeHtml(n.title)}</div>
          <div class="notif-time">${escapeHtml(n.time)}</div>
        </div>
      </div>
    `).join('');
  }

  window.markNotifRead = function (id) {
    const notif = appState.notifications.find(n => n.id === id);
    if (notif) {
      notif.unread = false;
      saveData(STORAGE_KEYS.NOTIFICATIONS, appState.notifications);
      updateAllBadges();
      renderNotifications();
    }
  };

  window.clearAllNotifications = function () {
    appState.notifications = [];
    saveData(STORAGE_KEYS.NOTIFICATIONS, appState.notifications);
    updateAllBadges();
    renderNotifications();
    showToast('Notifications cleared', 'info');
  };

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    const bellBtn = document.getElementById('notifBellBtn');
    const dropdown = document.getElementById('notifDropdown');
    if (dropdown && bellBtn && !bellBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });

  /* --------------------------------------------------------------------------
     8. DASHBOARD VIEW RENDERING
     -------------------------------------------------------------------------- */
  function renderDashboard() {
    // Dynamic greeting based on time of day
    const hour = new Date().getHours();
    let timeGreeting = 'Good Morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
    if (hour >= 17) timeGreeting = 'Good Evening';

    const firstName = appState.profile.name ? appState.profile.name.split(' ')[0] : 'Student';
    const dashGreeting = document.getElementById('dashGreeting');
    if (dashGreeting) dashGreeting.textContent = `${timeGreeting}, ${firstName} 👋`;

    // CGPA & Overall Attendance in Banner
    const dashCgpa = document.getElementById('dashCgpa');
    if (dashCgpa) dashCgpa.textContent = appState.profile.cgpa || '8.92';

    const overallAtt = calculateOverallAttendance();
    const dashOverallAtt = document.getElementById('dashOverallAttendance');
    if (dashOverallAtt) dashOverallAtt.textContent = `${overallAtt}%`;

    // Summary Cards
    const pendingHw = appState.homework.filter(h => h.status !== 'Completed').length;
    const dashHwPending = document.getElementById('dashHwPending');
    if (dashHwPending) dashHwPending.textContent = `${pendingHw} Pending`;

    const activeAssign = appState.assignments.filter(a => a.status !== 'Submitted').length;
    const dashAssignDue = document.getElementById('dashAssignDue');
    if (dashAssignDue) dashAssignDue.textContent = `${activeAssign} Due Soon`;

    // Classes Today (count for Friday or today's weekday)
    const todayDayName = getDayNameToday();
    const todayClasses = appState.timetable.filter(t => t.day.toLowerCase() === todayDayName.toLowerCase());
    const dashClassesCount = document.getElementById('dashClassesCount');
    if (dashClassesCount) dashClassesCount.textContent = `${todayClasses.length || 5} Classes`;

    const dashAttendancePct = document.getElementById('dashAttendancePct');
    if (dashAttendancePct) dashAttendancePct.textContent = `${overallAtt}%`;

    const savedInternshipsCount = appState.internships.filter(i => i.saved).length;
    const dashSavedInternships = document.getElementById('dashSavedInternships');
    if (dashSavedInternships) dashSavedInternships.textContent = `${savedInternshipsCount} Saved`;

    const activeAppsCount = appState.applications.filter(a => a.status !== 'Rejected').length;
    const dashActiveApps = document.getElementById('dashActiveApps');
    if (dashActiveApps) dashActiveApps.textContent = `${activeAppsCount} Active`;

    // Today Date Subtitle
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString('en-US', options);
    const dashTodayDate = document.getElementById('dashTodayDate');
    if (dashTodayDate) dashTodayDate.textContent = dateFormatted;

    // Timeline Rendering
    renderDashboardTimeline();

    // Priority Deadlines Mini Widget
    renderDashboardDeadlinesMini();

    // Study Mini Widget
    renderDashboardStudyMini();
  }

  function getDayNameToday() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const current = days[new Date().getDay()];
    return current === 'Sunday' ? 'Friday' : current; // fallback to Friday demo if weekend
  }

  function renderDashboardTimeline() {
    const container = document.getElementById('dashTimeline');
    if (!container) return;

    // Sample timeline for today as specified in requirement 6
    const scheduleItems = [
      { time: '09:00 AM', subject: 'Compiler Design', location: 'Room 204', faculty: 'Dr. K. Sharma', active: false },
      { time: '10:00 AM', subject: 'Web Technology', location: 'Lab 2', faculty: 'Prof. Ananya R.', active: true },
      { time: '11:00 AM', subject: 'Database Management', location: 'Room 301', faculty: 'Prof. S. Verma', active: false },
      { time: '02:00 PM', subject: 'Complete DBMS Assignment', location: 'Computer Lab 2', faculty: 'Self Work', active: false }
    ];

    container.innerHTML = scheduleItems.map(item => `
      <div class="timeline-item ${item.active ? 'active' : ''}">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div>
            <div class="timeline-time">${item.time} ${item.active ? '• Upcoming Now' : ''}</div>
            <div class="timeline-subject">${escapeHtml(item.subject)}</div>
            <div class="timeline-location">${escapeHtml(item.location)} • ${escapeHtml(item.faculty)}</div>
          </div>
          ${item.active ? '<span class="badge badge-primary">Current / Next</span>' : ''}
        </div>
      </div>
    `).join('');
  }

  function renderDashboardDeadlinesMini() {
    const container = document.getElementById('dashDeadlinesMini');
    if (!container) return;

    const allDeadlines = getAllSortedDeadlines().slice(0, 3);
    if (allDeadlines.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.82rem;">No immediate upcoming deadlines! 🎉</div>`;
      return;
    }

    container.innerHTML = allDeadlines.map(d => `
      <div class="deadline-card ${d.urgencyClass}" style="padding: 0.75rem 1rem;">
        <div class="deadline-left">
          <span class="deadline-badge badge-${d.badgeColor}">${d.urgencyText}</span>
          <div class="deadline-info">
            <h4 style="font-size: 0.88rem;">${escapeHtml(d.title)}</h4>
            <p style="font-size: 0.75rem;">Due: ${escapeHtml(d.dueFormatted)}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderDashboardStudyMini() {
    const container = document.getElementById('dashStudyMini');
    if (!container) return;

    const tasks = appState.studyTasks.slice(0, 4);
    if (tasks.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.82rem;">No study tasks scheduled for today.</div>`;
      return;
    }

    container.innerHTML = tasks.map(t => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: var(--bg-muted); border-radius: var(--radius-md);">
        <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.85rem; ${t.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
          <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleStudyTaskCompleted('${t.id}')">
          <span>${escapeHtml(t.task)}</span>
        </label>
        <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${t.duration}m</span>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     9. HOMEWORK MANAGER
     -------------------------------------------------------------------------- */
  window.renderHomework = function () {
    const grid = document.getElementById('homeworkGrid');
    const searchVal = document.getElementById('hwSearchInput')?.value.toLowerCase().trim() || '';
    const subjectFilter = document.getElementById('hwSubjectFilter')?.value || '';
    const priorityFilter = document.getElementById('hwPriorityFilter')?.value || '';
    const statusFilter = document.getElementById('hwStatusFilter')?.value || '';
    const sortVal = document.getElementById('hwSortFilter')?.value || 'deadline';

    // Populate subject filter options
    populateSubjectDropdown('hwSubjectFilter', appState.homework.map(h => h.subject));

    // Stats Pills
    const pendingCount = appState.homework.filter(h => h.status === 'Pending').length;
    const completedCount = appState.homework.filter(h => h.status === 'Completed').length;
    const todayStr = getRelativeDateString(0);
    const dueTodayCount = appState.homework.filter(h => h.dueDate === todayStr && h.status !== 'Completed').length;

    const statsPills = document.getElementById('hwStatsPills');
    if (statsPills) {
      statsPills.innerHTML = `
        <span class="pill-stat"><strong style="color: var(--warning);">${pendingCount}</strong> Pending</span>
        <span class="pill-stat"><strong style="color: var(--success);">${completedCount}</strong> Completed</span>
        <span class="pill-stat"><strong style="color: var(--danger);">${dueTodayCount}</strong> Due Today</span>
      `;
    }

    // Filter list
    let filtered = appState.homework.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(searchVal) ||
                          item.subject.toLowerCase().includes(searchVal) ||
                          (item.description && item.description.toLowerCase().includes(searchVal));
      const matchSubject = !subjectFilter || item.subject === subjectFilter;
      const matchPriority = !priorityFilter || item.priority === priorityFilter;
      const matchStatus = !statusFilter || item.status === statusFilter;
      return matchSearch && matchSubject && matchPriority && matchStatus;
    });

    // Sort list
    filtered.sort((a, b) => {
      if (sortVal === 'deadline') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortVal === 'priority') {
        const order = { High: 1, Medium: 2, Low: 3 };
        return (order[a.priority] || 4) - (order[b.priority] || 4);
      }
      if (sortVal === 'subject') return a.subject.localeCompare(b.subject);
      return 0;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📚</div>
          <div class="empty-title">No homework found</div>
          <div class="empty-desc">No homework matches your search criteria, or no tasks have been added yet. Stay organized by adding your first homework task!</div>
          <button class="btn btn-primary" onclick="openAddModal('homework')">+ Add Homework</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(h => {
      const isCompleted = h.status === 'Completed';
      const badgeClass = h.priority === 'High' ? 'badge-danger' : (h.priority === 'Medium' ? 'badge-warning' : 'badge-neutral');
      const statusBadge = isCompleted ? 'badge-success' : (h.status === 'In Progress' ? 'badge-info' : 'badge-warning');
      const daysDiff = calculateDaysRemaining(h.dueDate);
      let countdownBadge = '';
      if (!isCompleted) {
        if (daysDiff === 0) countdownBadge = '<span class="badge badge-danger">🔴 Due Today</span>';
        else if (daysDiff === 1) countdownBadge = '<span class="badge badge-warning">🟠 Tomorrow</span>';
        else if (daysDiff > 1) countdownBadge = `<span class="badge badge-neutral">⏳ ${daysDiff} days left</span>`;
        else countdownBadge = `<span class="badge badge-danger">⚠️ Overdue</span>`;
      }

      return `
        <div class="task-card ${isCompleted ? 'completed' : ''}">
          <div class="task-top">
            <div>
              <span class="task-subject">${escapeHtml(h.subject)}</span>
              <h3 class="task-title">${escapeHtml(h.title)}</h3>
            </div>
            <span class="badge ${badgeClass}">${h.priority}</span>
          </div>

          <p class="task-desc">${escapeHtml(h.description || 'No description provided.')}</p>

          <div class="task-meta">
            <span class="task-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${h.dueDate}
            </span>
            <span class="task-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${h.estTime || '30m'}
            </span>
            ${countdownBadge}
          </div>

          <div class="task-footer">
            <span class="badge ${statusBadge}">${h.status}</span>
            <div class="task-actions">
              <button class="btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-outline'}" onclick="toggleHomeworkStatus('${h.id}')" title="Toggle Completed">
                ${isCompleted ? 'Mark Pending' : '✓ Mark Done'}
              </button>
              <button class="btn-icon" onclick="openEditModal('homework', '${h.id}')" title="Edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-icon" onclick="confirmDeleteItem('homework', '${h.id}')" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  window.toggleHomeworkStatus = function (id) {
    const hw = appState.homework.find(h => h.id === id);
    if (hw) {
      hw.status = hw.status === 'Completed' ? 'Pending' : 'Completed';
      saveData(STORAGE_KEYS.HOMEWORK, appState.homework);
      showToast(`Homework marked as ${hw.status}`, 'success');
      renderHomework();
      updateAllBadges();
    }
  };

  /* --------------------------------------------------------------------------
     10. CLASSWORK MANAGER
     -------------------------------------------------------------------------- */
  window.renderClasswork = function () {
    const grid = document.getElementById('classworkGrid');
    const searchVal = document.getElementById('cwSearchInput')?.value.toLowerCase().trim() || '';
    const subjectFilter = document.getElementById('cwSubjectFilter')?.value || '';
    const statusFilter = document.getElementById('cwStatusFilter')?.value || '';

    populateSubjectDropdown('cwSubjectFilter', appState.classwork.map(c => c.subject));

    let filtered = appState.classwork.filter(item => {
      const matchSearch = item.topic.toLowerCase().includes(searchVal) ||
                          item.subject.toLowerCase().includes(searchVal) ||
                          (item.notes && item.notes.toLowerCase().includes(searchVal));
      const matchSubject = !subjectFilter || item.subject === subjectFilter;
      const matchStatus = !statusFilter || item.status === statusFilter;
      return matchSearch && matchSubject && matchStatus;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📖</div>
          <div class="empty-title">No classwork notes found</div>
          <div class="empty-desc">Record your lecture notes, discussion topics, and teacher references for every college session.</div>
          <button class="btn btn-primary" onclick="openAddModal('classwork')">+ Add Classwork</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(c => `
      <div class="classwork-card">
        <div class="classwork-header">
          <div>
            <span class="task-subject">${escapeHtml(c.subject)}</span>
            <h3 class="classwork-topic">${escapeHtml(c.topic)}</h3>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">
              📅 ${c.date} • Faculty: ${escapeHtml(c.teacher || 'Faculty')}
            </div>
          </div>
          <span class="badge ${c.status === 'Completed' ? 'badge-success' : 'badge-warning'}">${c.status}</span>
        </div>

        <div class="classwork-notes">
          <strong>Lecture Notes:</strong>\n${escapeHtml(c.notes || 'No lecture notes recorded.')}
        </div>

        <div class="task-footer">
          <span style="font-size: 0.78rem; color: var(--text-muted);">Verified Session</span>
          <div class="task-actions">
            <button class="btn-icon" onclick="openEditModal('classwork', '${c.id}')" title="Edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon" onclick="confirmDeleteItem('classwork', '${c.id}')" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  /* --------------------------------------------------------------------------
     11. ASSIGNMENT MANAGER
     -------------------------------------------------------------------------- */
  window.renderAssignments = function () {
    const grid = document.getElementById('assignmentGrid');
    const searchVal = document.getElementById('assignSearchInput')?.value.toLowerCase().trim() || '';
    const subjectFilter = document.getElementById('assignSubjectFilter')?.value || '';
    const statusFilter = document.getElementById('assignStatusFilter')?.value || '';

    populateSubjectDropdown('assignSubjectFilter', appState.assignments.map(a => a.subject));

    // Stats
    const notStarted = appState.assignments.filter(a => a.status === 'Not Started').length;
    const inProgress = appState.assignments.filter(a => a.status === 'In Progress').length;
    const submitted = appState.assignments.filter(a => a.status === 'Submitted').length;
    const statsContainer = document.getElementById('assignStatsPills');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <span class="pill-stat"><strong>${inProgress}</strong> In Progress</span>
        <span class="pill-stat"><strong>${notStarted}</strong> Not Started</span>
        <span class="pill-stat"><strong style="color: var(--success);">${submitted}</strong> Submitted</span>
      `;
    }

    let filtered = appState.assignments.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(searchVal) ||
                          item.subject.toLowerCase().includes(searchVal) ||
                          (item.description && item.description.toLowerCase().includes(searchVal));
      const matchSubject = !subjectFilter || item.subject === subjectFilter;
      const matchStatus = !statusFilter || item.status === statusFilter;
      return matchSearch && matchSubject && matchStatus;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📝</div>
          <div class="empty-title">No assignments found</div>
          <div class="empty-desc">Track project deadlines, lab submission requirements, and automated day countdowns.</div>
          <button class="btn btn-primary" onclick="openAddModal('assignments')">+ Add Assignment</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(a => {
      const daysDiff = calculateDaysRemaining(a.dueDate);
      let countdownMarkup = '';
      if (a.status === 'Submitted') {
        countdownMarkup = '<span class="badge badge-success">✓ Submitted</span>';
      } else {
        if (daysDiff === 0) {
          countdownMarkup = '<span class="badge badge-danger">🔴 Due Today</span>';
        } else if (daysDiff === 1) {
          countdownMarkup = '<span class="badge badge-warning">🟠 1 Day Left</span>';
        } else if (daysDiff === 2) {
          countdownMarkup = '<span class="badge badge-warning">🟠 2 Days Left</span>';
        } else if (daysDiff > 2 && daysDiff <= 7) {
          countdownMarkup = `<span class="badge badge-warning">🟡 ${daysDiff} Days Left</span>`;
        } else if (daysDiff > 7) {
          countdownMarkup = `<span class="badge badge-success">🟢 ${daysDiff} Days Left</span>`;
        } else {
          countdownMarkup = '<span class="badge badge-danger">🔴 Late / Overdue</span>';
        }
      }

      return `
        <div class="task-card ${a.status === 'Submitted' ? 'completed' : ''}">
          <div class="task-top">
            <div>
              <span class="task-subject">${escapeHtml(a.subject)}</span>
              <h3 class="task-title">${escapeHtml(a.title)}</h3>
            </div>
            <span class="badge ${a.priority === 'High' ? 'badge-danger' : 'badge-warning'}">${a.priority}</span>
          </div>

          <p class="task-desc">${escapeHtml(a.description || 'No detailed instructions specified.')}</p>

          <div class="task-meta">
            <span class="task-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Due: ${a.dueDate}
            </span>
            ${countdownMarkup}
          </div>

          <div class="task-footer">
            <span class="badge ${a.status === 'Submitted' ? 'badge-success' : (a.status === 'In Progress' ? 'badge-info' : 'badge-neutral')}">${a.status}</span>
            <div class="task-actions">
              <button class="btn btn-sm ${a.status === 'Submitted' ? 'btn-secondary' : 'btn-outline'}" onclick="toggleAssignmentSubmitted('${a.id}')">
                ${a.status === 'Submitted' ? 'Reopen' : 'Mark Submitted'}
              </button>
              <button class="btn-icon" onclick="openEditModal('assignments', '${a.id}')" title="Edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-icon" onclick="confirmDeleteItem('assignments', '${a.id}')" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  window.toggleAssignmentSubmitted = function (id) {
    const item = appState.assignments.find(a => a.id === id);
    if (item) {
      item.status = item.status === 'Submitted' ? 'In Progress' : 'Submitted';
      saveData(STORAGE_KEYS.ASSIGNMENTS, appState.assignments);
      showToast(`Assignment status updated to ${item.status}`, 'success');
      renderAssignments();
      updateAllBadges();
    }
  };

  /* --------------------------------------------------------------------------
     12. SMART DEADLINE SYSTEM
     -------------------------------------------------------------------------- */
  function getAllSortedDeadlines() {
    const combined = [];

    // Homework deadlines
    appState.homework.forEach(h => {
      if (h.status !== 'Completed') {
        const days = calculateDaysRemaining(h.dueDate);
        combined.push({
          type: 'homework',
          typeLabel: 'Homework',
          title: `${h.subject}: ${h.title}`,
          dueDate: h.dueDate,
          daysRemaining: days
        });
      }
    });

    // Assignments
    appState.assignments.forEach(a => {
      if (a.status !== 'Submitted') {
        const days = calculateDaysRemaining(a.dueDate);
        combined.push({
          type: 'assignment',
          typeLabel: 'Assignment',
          title: `${a.subject}: ${a.title}`,
          dueDate: a.dueDate,
          daysRemaining: days
        });
      }
    });

    // Exams
    appState.exams.forEach(e => {
      const days = calculateDaysRemaining(e.date);
      if (days >= 0) {
        combined.push({
          type: 'exam',
          typeLabel: 'Exam',
          title: `${e.subject} (${e.examType})`,
          dueDate: e.date,
          daysRemaining: days
        });
      }
    });

    // Internships (Saved or Active)
    appState.internships.forEach(i => {
      if (i.saved && i.deadline) {
        const days = calculateDaysRemaining(i.deadline);
        if (days >= 0) {
          combined.push({
            type: 'internship',
            typeLabel: 'Internship App',
            title: `${i.role} at ${i.company}`,
            dueDate: i.deadline,
            daysRemaining: days
          });
        }
      }
    });

    // Sort ascending by remaining days
    combined.sort((a, b) => a.daysRemaining - b.daysRemaining);

    return combined.map(item => {
      let urgencyText = '';
      let urgencyClass = '';
      let badgeColor = 'neutral';

      if (item.daysRemaining <= 0) {
        urgencyText = '🔴 TODAY';
        urgencyClass = 'urgent-today';
        badgeColor = 'danger';
      } else if (item.daysRemaining === 1) {
        urgencyText = '🟠 TOMORROW';
        urgencyClass = 'urgent-tomorrow';
        badgeColor = 'warning';
      } else if (item.daysRemaining <= 4) {
        urgencyText = `🟡 ${item.daysRemaining} DAYS`;
        urgencyClass = 'urgent-soon';
        badgeColor = 'warning';
      } else {
        urgencyText = `🟢 ${item.daysRemaining} DAYS`;
        urgencyClass = 'urgent-safe';
        badgeColor = 'success';
      }

      return {
        ...item,
        urgencyText,
        urgencyClass,
        badgeColor,
        dueFormatted: item.dueDate
      };
    });
  }

  window.filterDeadlines = function (category, btnElement) {
    appState.deadlineCategoryFilter = category;
    document.querySelectorAll('.active-filter').forEach(b => b.classList.remove('active-filter'));
    if (btnElement) btnElement.classList.add('active-filter');
    renderDeadlines();
  };

  window.renderDeadlines = function () {
    const container = document.getElementById('allDeadlinesContainer');
    if (!container) return;

    let deadlines = getAllSortedDeadlines();
    if (appState.deadlineCategoryFilter && appState.deadlineCategoryFilter !== 'all') {
      deadlines = deadlines.filter(d => d.type === appState.deadlineCategoryFilter);
    }

    if (deadlines.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <div class="empty-title">All Caught Up!</div>
          <div class="empty-desc">No upcoming deadlines found for the selected filter. Excellent time management!</div>
        </div>
      `;
      return;
    }

    container.innerHTML = deadlines.map(d => `
      <div class="deadline-card ${d.urgencyClass}">
        <div class="deadline-left">
          <span class="deadline-badge badge-${d.badgeColor}">${d.urgencyText}</span>
          <div class="deadline-info">
            <h4>${escapeHtml(d.title)}</h4>
            <p>Due: <strong>${d.dueFormatted}</strong> • Category: <span class="deadline-category">${d.typeLabel}</span></p>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="navigateTo('${d.type === 'internship' ? 'internships' : (d.type === 'exam' ? 'exams' : (d.type === 'homework' ? 'homework' : 'assignments'))}')">
          View Details
        </button>
      </div>
    `).join('');
  };

  /* --------------------------------------------------------------------------
     13. EXAM PLANNER
     -------------------------------------------------------------------------- */
  window.renderExams = function () {
    const grid = document.getElementById('examGrid');
    if (!grid) return;

    if (appState.exams.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🎓</div>
          <div class="empty-title">No exams scheduled</div>
          <div class="empty-desc">Keep track of your midterms, final examinations, syllabus milestones, and revision progress.</div>
          <button class="btn btn-primary" onclick="openAddModal('exams')">+ Add Exam</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = appState.exams.map(e => {
      const days = calculateDaysRemaining(e.date);
      const isPast = days < 0;

      return `
        <div class="exam-card">
          <div class="exam-header">
            <div>
              <span class="badge badge-primary">${escapeHtml(e.examType)}</span>
              <h3 class="exam-subject" style="margin-top: 0.35rem;">${escapeHtml(e.subject)}</h3>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                📅 ${e.date} • 🕒 ${escapeHtml(e.time || 'TBA')} • 📍 ${escapeHtml(e.room || 'Hall 204')}
              </div>
            </div>
            <div class="task-actions">
              <button class="btn-icon" onclick="openEditModal('exams', '${e.id}')" title="Edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-icon" onclick="confirmDeleteItem('exams', '${e.id}')" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>

          <div class="exam-countdown-box">
            <div>
              <div class="countdown-label">${isPast ? 'Exam Concluded' : 'Days Remaining'}</div>
              <div class="countdown-digits">${isPast ? 'Passed' : Math.max(0, days)}</div>
            </div>
            <div style="text-align: right;">
              <span class="badge ${days <= 3 && !isPast ? 'badge-danger' : 'badge-primary'}">${isPast ? 'Done' : (days === 0 ? 'Today' : `${days} days`)}</span>
            </div>
          </div>

          <div class="progress-container">
            <div class="progress-label-row">
              <span>Syllabus Preparation</span>
              <span><strong>${e.preparationPct || 0}%</strong></span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${e.preparationPct || 0}%;"></div>
            </div>
            <div style="display: flex; gap: 0.35rem; margin-top: 0.35rem;">
              <button class="btn btn-secondary btn-sm" onclick="adjustExamPrep('${e.id}', -10)">-10%</button>
              <button class="btn btn-secondary btn-sm" onclick="adjustExamPrep('${e.id}', 10)">+10%</button>
            </div>
          </div>

          <div style="background: var(--bg-muted); padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.82rem; color: var(--text-secondary);">
            <strong>Syllabus Scope:</strong>\n${escapeHtml(e.syllabus || 'Refer to curriculum handbook.')}
          </div>
        </div>
      `;
    }).join('');
  };

  window.adjustExamPrep = function (id, delta) {
    const exam = appState.exams.find(e => e.id === id);
    if (exam) {
      let current = Number(exam.preparationPct) || 0;
      exam.preparationPct = Math.min(100, Math.max(0, current + delta));
      saveData(STORAGE_KEYS.EXAMS, appState.exams);
      renderExams();
    }
  };

  /* --------------------------------------------------------------------------
     14. TIMETABLE
     -------------------------------------------------------------------------- */
  window.switchTimetableDay = function (day, btn) {
    appState.currentTimetableDay = day;
    document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderTimetable();
  };

  window.renderTimetable = function () {
    const grid = document.getElementById('timetableGrid');
    if (!grid) return;

    let items = appState.timetable;
    if (appState.currentTimetableDay && appState.currentTimetableDay !== 'All') {
      items = items.filter(t => t.day.toLowerCase() === appState.currentTimetableDay.toLowerCase());
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📅</div>
          <div class="empty-title">No classes scheduled</div>
          <div class="empty-desc">No timetable entries found for this day. Click "+ Add Class Slot" to add one!</div>
          <button class="btn btn-primary" onclick="openAddModal('timetable')">+ Add Class Slot</button>
        </div>
      `;
      return;
    }

    // Sort by day order then time
    const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    items.sort((a, b) => (dayOrder[a.day] || 7) - (dayOrder[b.day] || 7));

    grid.innerHTML = items.map(slot => `
      <div class="time-slot-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge ${slot.type === 'Lab' ? 'badge-purple' : (slot.type === 'Tutorial' ? 'badge-info' : 'badge-primary')}">${slot.type}</span>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${slot.day}</span>
        </div>

        <div class="time-slot-time">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ${slot.startTime} – ${slot.endTime}
        </div>

        <h3 class="time-slot-subject">${escapeHtml(slot.subject)}</h3>

        <div class="time-slot-meta">
          <div>📍 Room: <strong>${escapeHtml(slot.room || 'Room 204')}</strong></div>
          <div>👨‍🏫 Faculty: ${escapeHtml(slot.faculty || 'Department Faculty')}</div>
        </div>

        <div class="task-footer">
          <span></span>
          <div class="task-actions">
            <button class="btn-icon" onclick="openEditModal('timetable', '${slot.id}')" title="Edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon" onclick="confirmDeleteItem('timetable', '${slot.id}')" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  /* --------------------------------------------------------------------------
     15. ATTENDANCE TRACKER & MATHEMATICAL FORMULAS
     -------------------------------------------------------------------------- */
  window.renderAttendance = function () {
    const grid = document.getElementById('attendanceGrid');
    if (!grid) return;

    const threshold = Number(appState.settings.attendanceThreshold) || 75;

    if (appState.attendance.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📊</div>
          <div class="empty-title">No subjects added yet</div>
          <div class="empty-desc">Track your attendance across all registered courses and receive automated eligibility warnings.</div>
          <button class="btn btn-primary" onclick="openAddModal('attendance')">+ Add Subject</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = appState.attendance.map(item => {
      const present = Number(item.present);
      const total = Number(item.total);
      const pct = total === 0 ? 100 : Math.round((present / total) * 100);
      const isBelow = pct < threshold;

      // Calculate attendance warning advice:
      // Formula: to reach target T (e.g. 0.75):
      // (present + x) / (total + x) >= T
      // present + x >= T*total + T*x
      // x*(1 - T) >= T*total - present
      // x = ceil((T*total - present) / (1 - T))
      let adviceMessage = '';
      if (isBelow) {
        const targetDecimal = threshold / 100;
        const needed = Math.ceil((targetDecimal * total - present) / (1 - targetDecimal));
        adviceMessage = `You need to attend the next <strong>${Math.max(1, needed)} classes</strong> consecutively to reach ${threshold}%.`;
      } else {
        // Safe bunks calculation:
        // present / (total + y) >= T
        // present / T >= total + y
        // y = floor(present / T - total)
        const targetDecimal = threshold / 100;
        const canMiss = Math.floor(present / targetDecimal - total);
        if (canMiss > 0) {
          adviceMessage = `Safe to miss up to <strong>${canMiss} classes</strong> and stay above ${threshold}%.`;
        } else {
          adviceMessage = `On the borderline! Attend your next class to stay safe.`;
        }
      }

      return `
        <div class="attendance-card ${isBelow ? 'warning-card' : ''}">
          <div class="attendance-top">
            <h3 class="attendance-subject">${escapeHtml(item.subject)}</h3>
            <div class="attendance-percent ${isBelow ? 'low' : ''}">${pct}%</div>
          </div>

          <div class="progress-track">
            <div class="progress-fill" style="width: ${pct}%; background: ${isBelow ? 'var(--danger)' : 'var(--primary)'};"></div>
          </div>

          <div class="attendance-stats-row">
            <span>Present: <strong>${present}</strong></span>
            <span>Absent: <strong>${Math.max(0, total - present)}</strong></span>
            <span>Total: <strong>${total}</strong></span>
          </div>

          <div class="attendance-warning-box" style="background: ${isBelow ? 'var(--warning-bg)' : 'var(--success-bg)'}; border-color: ${isBelow ? 'var(--warning-border)' : 'var(--success-border)'}; color: ${isBelow ? 'var(--warning-text)' : 'var(--success-text)'};">
            <span>${isBelow ? '⚠️' : '✓'}</span>
            <div>${adviceMessage}</div>
          </div>

          <div class="attendance-controls">
            <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="markAttendanceQuick('${item.id}', true)">+ Present</button>
            <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="markAttendanceQuick('${item.id}', false)">+ Absent</button>
            <button class="btn-icon" onclick="openEditModal('attendance', '${item.id}')" title="Edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon" onclick="confirmDeleteItem('attendance', '${item.id}')" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  };

  window.markAttendanceQuick = function (id, isPresent) {
    const item = appState.attendance.find(a => a.id === id);
    if (item) {
      if (isPresent) {
        item.present = Number(item.present) + 1;
        item.total = Number(item.total) + 1;
        showToast(`Recorded Present in ${item.subject}`, 'success');
      } else {
        item.total = Number(item.total) + 1;
        showToast(`Recorded Absent in ${item.subject}`, 'warning');
      }
      saveData(STORAGE_KEYS.ATTENDANCE, appState.attendance);
      renderAttendance();
      updateAllBadges();
    }
  };

  /* --------------------------------------------------------------------------
     16. STUDY PLANNER
     -------------------------------------------------------------------------- */
  window.renderStudyPlanner = function () {
    const list = document.getElementById('studyTaskList');
    if (!list) return;

    if (appState.studyTasks.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎯</div>
          <div class="empty-title">No study tasks planned</div>
          <div class="empty-desc">Create your daily focus checklist to track revision sessions and study hours.</div>
          <button class="btn btn-primary" onclick="openAddModal('studyTasks')">+ Add Study Task</button>
        </div>
      `;
      return;
    }

    list.innerHTML = appState.studyTasks.map(task => `
      <div class="study-task-item ${task.completed ? 'done' : ''}">
        <div class="study-task-left">
          <input type="checkbox" class="study-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleStudyTaskCompleted('${task.id}')">
          <div>
            <div class="study-title" style="font-size: 0.95rem; font-weight: 600; color: var(--text-main);">${escapeHtml(task.task)}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">
              📚 ${escapeHtml(task.subject)} • ⏱️ ${task.duration} min • Priority: <span class="badge ${task.priority === 'High' ? 'badge-danger' : 'badge-neutral'}">${task.priority}</span>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn-icon" onclick="openEditModal('studyTasks', '${task.id}')" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="btn-icon" onclick="confirmDeleteItem('studyTasks', '${task.id}')" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `).join('');
  };

  window.toggleStudyTaskCompleted = function (id) {
    const task = appState.studyTasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveData(STORAGE_KEYS.STUDY_TASKS, appState.studyTasks);
      renderStudyPlanner();
      renderDashboardStudyMini();
    }
  };

  /* --------------------------------------------------------------------------
     17. INTERNSHIP FINDER
     -------------------------------------------------------------------------- */
  window.renderInternships = function () {
    const grid = document.getElementById('internshipGrid');
    if (!grid) return;

    const searchVal = document.getElementById('internSearchInput')?.value.toLowerCase().trim() || '';
    const modeFilter = document.getElementById('internModeFilter')?.value || '';
    const savedFilter = document.getElementById('internSavedFilter')?.value || 'all';

    let filtered = appState.internships.filter(item => {
      const matchSearch = item.role.toLowerCase().includes(searchVal) ||
                          item.company.toLowerCase().includes(searchVal) ||
                          item.location.toLowerCase().includes(searchVal) ||
                          (item.skills && item.skills.some(s => s.toLowerCase().includes(searchVal)));
      const matchMode = !modeFilter || item.mode === modeFilter;
      const matchSaved = savedFilter === 'saved' ? item.saved : true;
      return matchSearch && matchMode && matchSaved;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">💼</div>
          <div class="empty-title">No internships matched</div>
          <div class="empty-desc">Try clearing your search query or switching your work mode filter.</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="internship-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h3 class="internship-role">${escapeHtml(item.role)}</h3>
              <div class="internship-company">${escapeHtml(item.company)}</div>
            </div>
            <button class="btn-icon" onclick="toggleSaveInternship('${item.id}')" title="${item.saved ? 'Unsave' : 'Save'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${item.saved ? 'var(--primary)' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          <div class="internship-badges" style="margin: 0.85rem 0;">
            <span class="badge badge-neutral">📍 ${escapeHtml(item.location)}</span>
            <span class="badge badge-primary">🌐 ${item.mode}</span>
            <span class="badge badge-info">⏱️ ${item.duration}</span>
            <span class="badge badge-success">💰 ${item.stipend}</span>
          </div>

          <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.35rem;">Required Skills:</div>
          <div class="skills-tags">
            ${(item.skills || []).map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>

        <div class="task-footer">
          <span style="font-size: 0.78rem; color: var(--text-muted);">Deadline: ${item.deadline || 'Ongoing'}</span>
          <div class="task-actions">
            <button class="btn btn-secondary btn-sm" onclick="openInternshipDetails('${item.id}')">View Details</button>
            <button class="btn btn-${item.saved ? 'secondary' : 'primary'} btn-sm" onclick="toggleSaveInternship('${item.id}')">
              ${item.saved ? '✓ Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  window.toggleSaveInternship = function (id) {
    const item = appState.internships.find(i => i.id === id);
    if (item) {
      item.saved = !item.saved;
      saveData(STORAGE_KEYS.INTERNSHIPS, appState.internships);
      showToast(item.saved ? 'Internship saved to your list' : 'Internship removed from saved', 'info');
      renderInternships();
      updateAllBadges();
    }
  };

  window.openInternshipDetails = function (id) {
    const item = appState.internships.find(i => i.id === id);
    if (!item) return;

    document.getElementById('internDetailsRole').textContent = `${item.role} • ${item.company}`;
    document.getElementById('internDetailsBody').innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="badge badge-neutral">Sample Demo Opportunity</span>
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-top: 0.5rem;">${escapeHtml(item.company)} — ${escapeHtml(item.role)}</h4>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.2rem;">${item.location} • ${item.mode} • Stipend: ${item.stipend}</p>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem;">Role Overview</h5>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(item.description)}</p>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem;">Key Skills & Qualifications</h5>
        <div class="skills-tags">
          ${(item.skills || []).map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>

      <div style="background: var(--bg-muted); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.82rem; color: var(--text-muted);">
        Application Deadline: <strong>${item.deadline}</strong>. (This record is part of Student360 sample database).
      </div>
    `;

    document.getElementById('internDetailsFooter').innerHTML = `
      <button class="btn btn-secondary" onclick="closeModal('internshipDetailsModalBackdrop')">Close</button>
      <button class="btn btn-primary" onclick="applyDirectlyToKanban('${item.id}')">Add to Job Applications</button>
    `;

    openModal('internshipDetailsModalBackdrop');
  };

  window.applyDirectlyToKanban = function (id) {
    const item = appState.internships.find(i => i.id === id);
    if (!item) return;

    // Check if already applied
    const exists = appState.applications.some(a => a.company === item.company && a.role === item.role);
    if (exists) {
      showToast('Already tracked in Job Applications!', 'warning');
      closeModal('internshipDetailsModalBackdrop');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      company: item.company,
      role: item.role,
      location: item.location,
      dateApplied: getRelativeDateString(0),
      deadline: item.deadline,
      status: 'Applied',
      notes: `Applied through Student360 discovery portal. Stipend: ${item.stipend}.`
    };

    appState.applications.push(newApp);
    saveData(STORAGE_KEYS.APPLICATIONS, appState.applications);
    closeModal('internshipDetailsModalBackdrop');
    showToast(`Added ${item.company} to Applications Kanban`, 'success');
    updateAllBadges();
  };

  /* --------------------------------------------------------------------------
     18. JOB APPLICATIONS KANBAN
     -------------------------------------------------------------------------- */
  const KANBAN_STAGES = ['Applied', 'Screening', 'Interview', 'Selected', 'Rejected'];

  window.renderApplicationsKanban = function () {
    const board = document.getElementById('kanbanBoard');
    if (!board) return;

    board.innerHTML = KANBAN_STAGES.map(stage => {
      const itemsInStage = appState.applications.filter(a => a.status === stage);
      const stagePillColor = stage === 'Selected' ? 'badge-success' : (stage === 'Rejected' ? 'badge-danger' : (stage === 'Interview' ? 'badge-warning' : 'badge-primary'));

      return `
        <div class="kanban-column" ondragover="handleDragOver(event)" ondrop="handleDrop(event, '${stage}')">
          <div class="kanban-col-header">
            <span class="kanban-col-title">
              <span>${stage}</span>
            </span>
            <span class="badge ${stagePillColor}">${itemsInStage.length}</span>
          </div>

          <div class="kanban-cards">
            ${itemsInStage.length === 0 ? '<div style="font-size: 0.78rem; color: var(--text-muted); text-align: center; padding: 1.5rem 0;">No applications in this stage</div>' : ''}
            ${itemsInStage.map(app => `
              <div class="kanban-card" draggable="true" ondragstart="handleDragStart(event, '${app.id}')">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <span class="kanban-company">${escapeHtml(app.company)}</span>
                  <div class="task-actions">
                    <button class="btn-icon" onclick="openEditModal('applications', '${app.id}')" title="Edit">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn-icon" onclick="confirmDeleteItem('applications', '${app.id}')" title="Delete">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>

                <div class="kanban-role">${escapeHtml(app.role)}</div>

                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                  📍 ${escapeHtml(app.location || 'Remote')} • Applied: ${app.dateApplied || 'N/A'}
                </div>

                ${app.notes ? `<div style="font-size: 0.76rem; background: var(--bg-muted); padding: 0.45rem; border-radius: var(--radius-sm); color: var(--text-secondary); margin-bottom: 0.5rem;">${escapeHtml(app.notes)}</div>` : ''}

                <!-- Quick stage change selector -->
                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-light); padding-top: 0.4rem;">
                  <span style="font-size: 0.7rem; color: var(--text-muted);">Stage:</span>
                  <select class="filter-select" style="padding: 0.2rem 0.4rem; font-size: 0.72rem;" onchange="changeApplicationStage('${app.id}', this.value)">
                    ${KANBAN_STAGES.map(s => `<option value="${s}" ${s === app.status ? 'selected' : ''}>${s}</option>`).join('')}
                  </select>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  };

  let draggedAppId = null;
  window.handleDragStart = function (e, id) {
    draggedAppId = id;
    e.dataTransfer.setData('text/plain', id);
  };

  window.handleDragOver = function (e) {
    e.preventDefault();
  };

  window.handleDrop = function (e, targetStage) {
    e.preventDefault();
    const id = draggedAppId || e.dataTransfer.getData('text/plain');
    if (!id) return;

    changeApplicationStage(id, targetStage);
    draggedAppId = null;
  };

  window.changeApplicationStage = function (id, stage) {
    const app = appState.applications.find(a => a.id === id);
    if (app && app.status !== stage) {
      app.status = stage;
      saveData(STORAGE_KEYS.APPLICATIONS, appState.applications);
      showToast(`${app.company} application moved to ${stage}`, 'success');
      renderApplicationsKanban();
      updateAllBadges();
    }
  };

  /* --------------------------------------------------------------------------
     19. SKILLS TRACKER
     -------------------------------------------------------------------------- */
  window.renderSkills = function () {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    if (appState.skills.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">⚡</div>
          <div class="empty-title">No skills tracked yet</div>
          <div class="empty-desc">Document your technical competencies, frameworks, and tools.</div>
          <button class="btn btn-primary" onclick="openAddModal('skills')">+ Add Skill</button>
        </div>
      `;
      return;
    }

    container.innerHTML = appState.skills.map((cat, catIdx) => `
      <div class="skill-category-card">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <h3 class="card-title">${escapeHtml(cat.category)}</h3>
          <span class="badge badge-primary">${cat.skills.length} Skills</span>
        </div>

        <div class="skill-list">
          ${cat.skills.map((s, skillIdx) => `
            <div class="skill-item">
              <div class="skill-info">
                <span>${escapeHtml(s.name)}</span>
                <span style="color: var(--primary); font-weight: 700;">${s.level}%</span>
              </div>
              <div class="progress-track" style="height: 7px;">
                <div class="progress-fill" style="width: ${s.level}%;"></div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 0.35rem; margin-top: 0.2rem;">
                <button class="btn btn-secondary btn-sm" style="padding: 0.15rem 0.5rem; font-size: 0.72rem;" onclick="updateSkillLevel(${catIdx}, ${skillIdx}, -5)">-5%</button>
                <button class="btn btn-secondary btn-sm" style="padding: 0.15rem 0.5rem; font-size: 0.72rem;" onclick="updateSkillLevel(${catIdx}, ${skillIdx}, 5)">+5%</button>
                <button class="btn-icon" style="width: 22px; height: 22px;" onclick="removeSkill(${catIdx}, ${skillIdx})" title="Delete">✕</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  };

  window.updateSkillLevel = function (catIdx, skillIdx, delta) {
    if (appState.skills[catIdx] && appState.skills[catIdx].skills[skillIdx]) {
      const skill = appState.skills[catIdx].skills[skillIdx];
      skill.level = Math.min(100, Math.max(10, skill.level + delta));
      saveData(STORAGE_KEYS.SKILLS, appState.skills);
      renderSkills();
    }
  };

  window.removeSkill = function (catIdx, skillIdx) {
    if (appState.skills[catIdx]) {
      appState.skills[catIdx].skills.splice(skillIdx, 1);
      saveData(STORAGE_KEYS.SKILLS, appState.skills);
      renderSkills();
    }
  };

  /* --------------------------------------------------------------------------
     20. CAREER ROADMAP
     -------------------------------------------------------------------------- */
  window.renderRoadmap = function () {
    const tabsContainer = document.getElementById('roadmapTrackTabs');
    const milestonesContainer = document.getElementById('roadmapMilestonesContainer');
    if (!tabsContainer || !milestonesContainer) return;

    // Render Track Tabs
    tabsContainer.innerHTML = appState.roadmaps.map((track, idx) => `
      <button class="roadmap-tab ${idx === appState.activeRoadmapIndex ? 'active' : ''}" onclick="switchRoadmapTrack(${idx})">
        ${escapeHtml(track.title)}
      </button>
    `).join('');

    const currentTrack = appState.roadmaps[appState.activeRoadmapIndex] || appState.roadmaps[0];
    if (!currentTrack) return;

    // Calculate completion %
    const totalMilestones = currentTrack.milestones.length;
    const completedCount = currentTrack.milestones.filter(m => m.done).length;
    const pct = totalMilestones === 0 ? 0 : Math.round((completedCount / totalMilestones) * 100);

    document.getElementById('roadmapTitle').textContent = currentTrack.title;
    document.getElementById('roadmapDesc').textContent = currentTrack.description;
    document.getElementById('roadmapPct').textContent = `${pct}% Complete (${completedCount}/${totalMilestones})`;
    document.getElementById('roadmapProgressFill').style.width = `${pct}%`;

    // Render Milestones
    milestonesContainer.innerHTML = currentTrack.milestones.map((m, mIdx) => `
      <div class="milestone-item ${m.done ? 'completed' : ''}">
        <label style="display: flex; align-items: center; gap: 0.85rem; cursor: pointer; flex: 1;">
          <input type="checkbox" class="study-checkbox" ${m.done ? 'checked' : ''} onchange="toggleMilestone(${mIdx})">
          <span style="font-size: 0.95rem; font-weight: ${m.done ? '600' : '500'}; color: var(--text-main); ${m.done ? 'text-decoration: none;' : ''}">
            ${m.done ? '✓ ' : '○ '} ${escapeHtml(m.title)}
          </span>
        </label>
        <span class="badge ${m.done ? 'badge-success' : 'badge-neutral'}">
          ${m.done ? 'Completed' : 'Upcoming'}
        </span>
      </div>
    `).join('');
  };

  window.switchRoadmapTrack = function (index) {
    appState.activeRoadmapIndex = index;
    renderRoadmap();
  };

  window.toggleMilestone = function (milestoneIndex) {
    const currentTrack = appState.roadmaps[appState.activeRoadmapIndex];
    if (currentTrack && currentTrack.milestones[milestoneIndex]) {
      currentTrack.milestones[milestoneIndex].done = !currentTrack.milestones[milestoneIndex].done;
      saveData(STORAGE_KEYS.ROADMAPS, appState.roadmaps);
      renderRoadmap();
    }
  };

  /* --------------------------------------------------------------------------
     21. RESUME BUILDER & LIVE PRINT
     -------------------------------------------------------------------------- */
  function populateResumeFormFromState() {
    const r = appState.resume;
    setInputValue('resName', r.name);
    setInputValue('resTitle', r.title);
    setInputValue('resEmail', r.email);
    setInputValue('resPhone', r.phone);
    setInputValue('resLocation', r.location);
    setInputValue('resLinks', r.links);
    setInputValue('resObjective', r.objective);
    setInputValue('resCollege', r.college);
    setInputValue('resDegree', r.degree);
    setInputValue('resEduYear', r.eduYear);
    setInputValue('resProjects', r.projects);
    setInputValue('resSkills', r.skills);
    setInputValue('resCerts', r.certs);
  }

  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  window.syncResumeFormAndPreview = function () {
    populateResumeFormFromState();
    updateResumeLive();
  };

  window.toggleResumeSection = function (header) {
    const body = header.nextElementSibling;
    if (body) {
      body.style.display = body.style.display === 'none' ? 'flex' : 'none';
    }
  };

  window.updateResumeLive = function () {
    const r = {
      name: document.getElementById('resName')?.value || 'Student Name',
      title: document.getElementById('resTitle')?.value || 'Engineering Student',
      email: document.getElementById('resEmail')?.value || 'email@example.com',
      phone: document.getElementById('resPhone')?.value || '+91 00000 00000',
      location: document.getElementById('resLocation')?.value || 'City, India',
      links: document.getElementById('resLinks')?.value || 'github.com • linkedin.com',
      objective: document.getElementById('resObjective')?.value || '',
      college: document.getElementById('resCollege')?.value || '',
      degree: document.getElementById('resDegree')?.value || '',
      eduYear: document.getElementById('resEduYear')?.value || '',
      projects: document.getElementById('resProjects')?.value || '',
      skills: document.getElementById('resSkills')?.value || '',
      certs: document.getElementById('resCerts')?.value || ''
    };

    // Update Live Paper Preview
    const prevName = document.getElementById('prevName');
    if (prevName) prevName.textContent = r.name;

    const prevTitle = document.getElementById('prevTitle');
    if (prevTitle) prevTitle.textContent = r.title;

    const prevContact = document.getElementById('prevContact');
    if (prevContact) prevContact.textContent = `${r.email} • ${r.phone} • ${r.location} • ${r.links}`;

    const prevObjective = document.getElementById('prevObjective');
    if (prevObjective) prevObjective.textContent = r.objective;

    const prevCollege = document.getElementById('prevCollege');
    if (prevCollege) prevCollege.textContent = r.college;

    const prevEduYear = document.getElementById('prevEduYear');
    if (prevEduYear) prevEduYear.textContent = r.eduYear;

    const prevDegree = document.getElementById('prevDegree');
    if (prevDegree) prevDegree.textContent = r.degree;

    const prevProjects = document.getElementById('prevProjects');
    if (prevProjects) {
      const projectLines = r.projects.split('\n').filter(p => p.trim());
      prevProjects.innerHTML = projectLines.map(p => `<div>${escapeHtml(p)}</div>`).join('');
    }

    const prevSkills = document.getElementById('prevSkills');
    if (prevSkills) prevSkills.textContent = r.skills;

    const prevCerts = document.getElementById('prevCerts');
    if (prevCerts) {
      const certLines = r.certs.split('\n').filter(c => c.trim());
      prevCerts.innerHTML = certLines.map(c => `<div>${escapeHtml(c)}</div>`).join('');
    }

    // Save to appState
    appState.resume = r;
    saveData(STORAGE_KEYS.RESUME, appState.resume);
  };

  window.printResume = function () {
    window.print();
  };

  /* --------------------------------------------------------------------------
     22. CAREER ASSISTANT (INTELLIGENT RULE-BASED CHAT)
     -------------------------------------------------------------------------- */
  const CAREER_RULES = [
    {
      keywords: ['internship', 'how to get', 'off-campus', 'find job'],
      response: `To land a top software engineering internship:
1. **Strong Fundamentals**: Master Data Structures & Algorithms (Array, Tree, Graph, DP). Solve 250+ LeetCode problems.
2. **2-3 Deep Projects**: Build full-stack apps with real authentication, database indexing, and deploy them on Vercel or AWS.
3. **Optimized Resume**: Keep it to a crisp 1-page ATS-friendly format highlighting metrics (e.g., "reduced latency by 35%").
4. **Active Networking**: Reach out to college alumni and recruiters on LinkedIn with tailored 3-line messages asking for referrals.
5. **Cold Applications**: Apply to at least 10 internships weekly on company career portals before openings close.`
    },
    {
      keywords: ['skills', 'what should i learn', 'technologies', 'stack'],
      response: `In current campus and entry-level hiring, top companies prioritize:
• **Core Programming**: Java (Spring Boot) or Python or TypeScript.
• **Database Mastery**: Relational SQL (Joins, ACID, B+ trees) + Redis caching basics.
• **System Fundamentals**: Operating Systems (Processes, Concurrency, Threads) & Computer Networks (HTTP/TCP).
• **DevOps Fundamentals**: Docker containerization and Git branching workflows.
• **Frontend Basics**: Modern HTML5/CSS3 and React component lifecycle.`
    },
    {
      keywords: ['resume', 'improve', 'ats', 'cv'],
      response: `Here are the top tips to make your student resume stand out:
1. **Single-Page Rule**: Never exceed 1 page for undergraduate applications.
2. **Use Google's 'X-Y-Z' Formula**: "Accomplished [X], as measured by [Y], by doing [Z]."
3. **No Fluff**: Remove generic declarations, hobbies, and outdated high school items.
4. **Live Links**: Include clickable GitHub repo links and live hosted deployment URLs for each listed project.
5. **Skills Section**: List only technologies you can confidently defend in an interview without hesitation.`
    },
    {
      keywords: ['interview', 'prepare', 'rounds', 'hr', 'technical'],
      response: `Comprehensive 4-step interview preparation checklist:
1. **Coding Rounds**: Practice writing bug-free code on paper or Google Docs without IDE auto-complete.
2. **Project Walkthrough**: Be prepared to explain architecture choices, database schema, and challenges you overcame.
3. **CS Core Subjects**: Revise OOP principles, DBMS normalization, OS process synchronization, and Computer Networks.
4. **Behavioral (STAR Method)**: Prepare Situation-Task-Action-Result stories for leadership, conflict resolution, and handling strict deadlines.`
    },
    {
      keywords: ['java', 'project', 'projects', 'build'],
      response: `High-impact Java project ideas that impress interviewers:
1. **Distributed Key-Value Store**: Built using Java sockets, multithreading, and Raft consensus algorithm.
2. **E-Commerce Microservices Engine**: Spring Boot backend with Spring Cloud, Kafka order queue, and MySQL.
3. **Custom SQL Database Query Parser**: Lexer and B+ Tree index engine in pure Java without third-party libraries.
4. **Real-time Collaborative Whiteboard**: Java WebSockets with Redis Pub/Sub backplane and React frontend.`
    },
    {
      keywords: ['coding', 'dsa', 'leetcode', 'problem solving'],
      response: `To rapidly elevate your coding and problem-solving skills:
• Focus on **patterns** rather than memorizing questions: Two Pointers, Sliding Window, Fast & Slow Pointers, BFS/DFS, Top K Elements.
• Solve at least 2 problems daily consistently for 90 days.
• Analyze optimal time & space complexity before typing the first line of code.
• Participate in LeetCode weekly contests to practice coding under real exam time pressure.`
    }
  ];

  window.sendSuggestedChat = function (text) {
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = text;
      handleChatSubmit();
    }
  };

  window.handleChatSubmit = function (e) {
    if (e) e.preventDefault();
    const input = document.getElementById('chatInput');
    const text = input ? input.value.trim() : '';
    if (!text) return;

    input.value = '';
    appendChatMessage('user', text);

    // Show typing indicator
    const chatContainer = document.getElementById('chatMessages');
    const typingId = `typing-${Date.now()}`;
    const typingEl = document.createElement('div');
    typingEl.id = typingId;
    typingEl.className = 'chat-bubble bot chat-typing';
    typingEl.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
    chatContainer.appendChild(typingEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Generate rule response
    setTimeout(() => {
      typingEl.remove();
      const botResponse = generateBotResponse(text);
      appendChatMessage('bot', botResponse);
    }, 600);
  };

  function generateBotResponse(query) {
    const lower = query.toLowerCase();
    for (const rule of CAREER_RULES) {
      if (rule.keywords.some(kw => lower.includes(kw))) {
        return rule.response;
      }
    }

    return `That's a great question regarding your career planning! 

Key recommendations for "${query}":
• Build strong foundational mastery in Data Structures and Core CS subjects.
• Keep your Student360 dashboard updated daily to balance homework, college classes, and internship applications.
• Try asking me specific questions like:
  - "How can I get an internship?"
  - "What skills should I learn?"
  - "What Java projects should I build?"
  - "How should I prepare for interviews?"`;
  }

  function appendChatMessage(sender, message) {
    const chatContainer = document.getElementById('chatMessages');
    if (!chatContainer) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = escapeHtml(message).replace(/\n/g, '<br>');
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  /* --------------------------------------------------------------------------
     23. REMINDERS & BROWSER NOTIFICATIONS
     -------------------------------------------------------------------------- */
  window.requestBrowserNotificationPermission = function () {
    if (!('Notification' in window)) {
      showToast('Browser notifications are not supported in this browser.', 'warning');
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showToast('Browser notifications enabled successfully!', 'success');
        appState.settings.browserNotifications = true;
        saveData(STORAGE_KEYS.SETTINGS, appState.settings);
        new Notification('STUDENT360 Reminders Active', {
          body: 'You will receive active browser reminders while the website is open.',
          icon: 'assets/images/logo.png'
        });
      } else {
        showToast('Browser notifications permission denied.', 'info');
      }
      renderReminders();
    });
  };

  window.renderReminders = function () {
    const grid = document.getElementById('remindersGrid');
    if (!grid) return;

    const permBtn = document.getElementById('requestPermBtn');
    if (permBtn && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        permBtn.textContent = '✓ Notifications Allowed';
        permBtn.disabled = true;
      } else {
        permBtn.textContent = 'Enable Browser Notifications';
        permBtn.disabled = false;
      }
    }

    if (appState.reminders.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🔔</div>
          <div class="empty-title">No reminders scheduled</div>
          <div class="empty-desc">Never miss an upcoming deadline, class schedule, or interview with custom alert reminders.</div>
          <button class="btn btn-primary" onclick="openAddModal('reminders')">+ Add Reminder</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = appState.reminders.map(r => `
      <div class="task-card">
        <div class="task-top">
          <div>
            <span class="badge badge-info">${escapeHtml(r.type || 'General')}</span>
            <h3 class="task-title" style="margin-top: 0.35rem;">${escapeHtml(r.title)}</h3>
          </div>
        </div>

        <div class="task-meta">
          <span class="task-meta-item">
            📅 ${r.date} • 🕒 ${r.time}
          </span>
        </div>

        <div class="task-footer">
          <span class="badge badge-neutral">Active Alert</span>
          <div class="task-actions">
            <button class="btn-icon" onclick="openEditModal('reminders', '${r.id}')" title="Edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon" onclick="confirmDeleteItem('reminders', '${r.id}')" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  /* --------------------------------------------------------------------------
     24. PURE SVG ANALYTICS CHARTS (NO EXTERNAL LIBRARIES!)
     -------------------------------------------------------------------------- */
  function renderAnalyticsCharts() {
    renderHwDonutChart();
    renderAttendanceBarChart();
    renderApplicationFunnelChart();
    renderSkillGaugeChart();
  }

  function renderHwDonutChart() {
    const container = document.getElementById('hwChartContainer');
    if (!container) return;

    const total = appState.homework.length;
    const completed = appState.homework.filter(h => h.status === 'Completed').length;
    const inProgress = appState.homework.filter(h => h.status === 'In Progress').length;
    const pending = appState.homework.filter(h => h.status === 'Pending').length;

    const completedPct = total ? Math.round((completed / total) * 100) : 0;
    const circumference = 2 * Math.PI * 45; // r=45 -> ~282.74
    const offset = circumference - (completedPct / 100) * circumference;

    container.innerHTML = `
      <svg width="160" height="160" viewBox="0 0 120 120" class="donut-svg">
        <circle cx="60" cy="60" r="45" class="donut-bg" />
        <circle cx="60" cy="60" r="45" class="donut-segment" stroke="var(--primary)" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" />
      </svg>
      <div class="donut-center-text">
        <div class="donut-number">${completedPct}%</div>
        <div class="donut-sublabel">Done</div>
      </div>
      <div style="position: absolute; bottom: 0; display: flex; gap: 1rem; font-size: 0.78rem;">
        <span style="color: var(--primary);">● Completed: ${completed}</span>
        <span style="color: var(--warning);">● Pending: ${pending}</span>
      </div>
    `;
  }

  function renderAttendanceBarChart() {
    const container = document.getElementById('attendanceBarChartContainer');
    if (!container) return;

    const data = appState.attendance.slice(0, 5);
    container.innerHTML = `
      <div class="bar-chart-container">
        ${data.map(item => {
          const pct = item.total ? Math.round((item.present / item.total) * 100) : 0;
          const isLow = pct < 75;
          return `
            <div class="bar-col">
              <span style="font-size: 0.72rem; font-weight: 700; color: ${isLow ? 'var(--danger)' : 'var(--primary)'};">${pct}%</span>
              <div class="bar-pillar" style="height: ${Math.max(10, pct * 1.3)}px; background: ${isLow ? 'var(--danger)' : 'var(--primary)'};" title="${item.subject}: ${pct}%"></div>
              <span class="bar-label">${escapeHtml(item.subject.substring(0, 6))}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderApplicationFunnelChart() {
    const container = document.getElementById('appFunnelChartContainer');
    if (!container) return;

    const counts = {
      Applied: appState.applications.filter(a => a.status === 'Applied').length,
      Screening: appState.applications.filter(a => a.status === 'Screening').length,
      Interview: appState.applications.filter(a => a.status === 'Interview').length,
      Selected: appState.applications.filter(a => a.status === 'Selected').length
    };

    const maxVal = Math.max(1, counts.Applied, counts.Screening, counts.Interview, counts.Selected);

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%; padding: 0.5rem 1rem;">
        ${Object.keys(counts).map(stage => {
          const val = counts[stage];
          const pct = Math.round((val / maxVal) * 100);
          return `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.2rem;">
                <span>${stage}</span>
                <span>${val} Candidates</span>
              </div>
              <div class="progress-track" style="height: 12px;">
                <div class="progress-fill" style="width: ${Math.max(8, pct)}%; background: ${stage === 'Selected' ? 'var(--success)' : 'var(--primary)'};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderSkillGaugeChart() {
    const container = document.getElementById('skillGaugeContainer');
    if (!container) return;

    // Calculate average skill score
    let totalScore = 0;
    let count = 0;
    appState.skills.forEach(c => {
      c.skills.forEach(s => {
        totalScore += Number(s.level);
        count++;
      });
    });

    const avg = count ? Math.round(totalScore / count) : 80;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (avg / 100) * circumference;

    container.innerHTML = `
      <svg width="160" height="160" viewBox="0 0 120 120" class="donut-svg">
        <circle cx="60" cy="60" r="45" class="donut-bg" />
        <circle cx="60" cy="60" r="45" class="donut-segment" stroke="var(--success)" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" />
      </svg>
      <div class="donut-center-text">
        <div class="donut-number">${avg}%</div>
        <div class="donut-sublabel">Readiness</div>
      </div>
      <div style="position: absolute; bottom: 0; font-size: 0.8rem; color: var(--text-secondary);">
        Rated across ${count} key technical competencies
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     25. PROFILE MANAGEMENT
     -------------------------------------------------------------------------- */
  function populateProfileForm() {
    const p = appState.profile;
    setInputValue('formProfName', p.name);
    setInputValue('formProfEmail', p.email);
    setInputValue('formProfPhone', p.phone);
    setInputValue('formProfCollege', p.college);
    setInputValue('formProfDegree', p.degree);
    setInputValue('formProfDept', p.department);
    setInputValue('formProfYear', p.year);
    setInputValue('formProfCgpa', p.cgpa);
    setInputValue('formProfGithub', p.github);
    setInputValue('formProfLinkedin', p.linkedin);
    setInputValue('formProfPortfolio', p.portfolio);

    // Profile header
    const profHeaderName = document.getElementById('profHeaderName');
    if (profHeaderName) profHeaderName.textContent = p.name || 'Rohith B';

    const profHeaderDept = document.getElementById('profHeaderDept');
    if (profHeaderDept) profHeaderDept.textContent = `${p.degree || ''} in ${p.department || ''}`;

    const profAvatar = document.getElementById('profileAvatarLarge');
    if (profAvatar) profAvatar.textContent = getInitials(p.name);

    // Calculate profile completion percentage
    calculateProfileCompletion();
  }

  function calculateProfileCompletion() {
    const fields = ['name', 'email', 'phone', 'college', 'degree', 'department', 'year', 'cgpa', 'github', 'linkedin', 'portfolio'];
    let filled = 0;
    fields.forEach(f => {
      if (appState.profile[f] && String(appState.profile[f]).trim()) filled++;
    });

    const pct = Math.round((filled / fields.length) * 100);
    const text = document.getElementById('profCompletionPct');
    const fill = document.getElementById('profCompletionFill');
    if (text) text.textContent = `${pct}%`;
    if (fill) fill.style.width = `${pct}%`;
  }

  window.saveProfileForm = function (e) {
    if (e) e.preventDefault();
    appState.profile = {
      name: document.getElementById('formProfName')?.value || '',
      email: document.getElementById('formProfEmail')?.value || '',
      phone: document.getElementById('formProfPhone')?.value || '',
      college: document.getElementById('formProfCollege')?.value || '',
      degree: document.getElementById('formProfDegree')?.value || '',
      department: document.getElementById('formProfDept')?.value || '',
      year: document.getElementById('formProfYear')?.value || '',
      cgpa: parseFloat(document.getElementById('formProfCgpa')?.value) || 0,
      github: document.getElementById('formProfGithub')?.value || '',
      linkedin: document.getElementById('formProfLinkedin')?.value || '',
      portfolio: document.getElementById('formProfPortfolio')?.value || ''
    };

    saveData(STORAGE_KEYS.PROFILE, appState.profile);
    showToast('✓ Student profile saved successfully', 'success');
    populateProfileForm();
    updateAllBadges();
  };

  /* --------------------------------------------------------------------------
     26. SETTINGS & DATA EXPORT/IMPORT
     -------------------------------------------------------------------------- */
  function renderSettingsView() {
    const slider = document.getElementById('settingThresholdSlider');
    const valText = document.getElementById('settingThresholdVal');
    if (slider && valText) {
      slider.value = appState.settings.attendanceThreshold || 75;
      valText.textContent = `${slider.value}%`;
    }
  }

  window.updateAttendanceThreshold = function (val) {
    appState.settings.attendanceThreshold = Number(val);
    const valText = document.getElementById('settingThresholdVal');
    if (valText) valText.textContent = `${val}%`;
    saveData(STORAGE_KEYS.SETTINGS, appState.settings);
  };

  window.exportDataJSON = function () {
    const fullBackup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      studentProfile: appState.profile,
      homework: appState.homework,
      classwork: appState.classwork,
      assignments: appState.assignments,
      exams: appState.exams,
      timetable: appState.timetable,
      attendance: appState.attendance,
      studyTasks: appState.studyTasks,
      internships: appState.internships,
      applications: appState.applications,
      skills: appState.skills,
      roadmaps: appState.roadmaps,
      resume: appState.resume,
      notifications: appState.notifications,
      reminders: appState.reminders,
      settings: appState.settings
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `student360_backup_${getRelativeDateString(0)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('✓ Data backup downloaded successfully', 'success');
  };

  window.importDataJSON = function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.studentProfile) appState.profile = imported.studentProfile;
        if (imported.homework) appState.homework = imported.homework;
        if (imported.classwork) appState.classwork = imported.classwork;
        if (imported.assignments) appState.assignments = imported.assignments;
        if (imported.exams) appState.exams = imported.exams;
        if (imported.timetable) appState.timetable = imported.timetable;
        if (imported.attendance) appState.attendance = imported.attendance;
        if (imported.studyTasks) appState.studyTasks = imported.studyTasks;
        if (imported.internships) appState.internships = imported.internships;
        if (imported.applications) appState.applications = imported.applications;
        if (imported.skills) appState.skills = imported.skills;
        if (imported.roadmaps) appState.roadmaps = imported.roadmaps;
        if (imported.resume) appState.resume = imported.resume;
        if (imported.notifications) appState.notifications = imported.notifications;
        if (imported.reminders) appState.reminders = imported.reminders;
        if (imported.settings) appState.settings = imported.settings;

        persistAll();
        showToast('✓ Data successfully imported from backup file!', 'success');
        updateAllBadges();
        navigateTo('dashboard');
      } catch (err) {
        console.error('Import parse error:', err);
        showToast('⚠️ Invalid JSON file format. Could not import.', 'danger');
      }
    };
    reader.readAsText(file);
  };

  window.confirmClearAllData = function () {
    showConfirmModal(
      'Clear All Stored Data?',
      'This will erase all your custom homework, classwork, assignments, applications, and settings stored in LocalStorage. Are you sure?',
      () => {
        localStorage.clear();
        appState.homework = [];
        appState.classwork = [];
        appState.assignments = [];
        appState.exams = [];
        appState.timetable = [];
        appState.attendance = [];
        appState.studyTasks = [];
        appState.internships = [];
        appState.applications = [];
        appState.notifications = [];
        appState.reminders = [];
        showToast('All data has been cleared', 'info');
        updateAllBadges();
        navigateTo('dashboard');
      }
    );
  };

  window.confirmResetDemoData = function () {
    showConfirmModal(
      'Reset to Default Demo Data?',
      'This will reload fresh default sample data for Rohith B (NIT CSE). Any custom changes will be overwritten.',
      () => {
        localStorage.clear();
        appState.profile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
        appState.homework = JSON.parse(JSON.stringify(DEFAULT_HOMEWORK));
        appState.classwork = JSON.parse(JSON.stringify(DEFAULT_CLASSWORK));
        appState.assignments = JSON.parse(JSON.stringify(DEFAULT_ASSIGNMENTS));
        appState.exams = JSON.parse(JSON.stringify(DEFAULT_EXAMS));
        appState.timetable = JSON.parse(JSON.stringify(DEFAULT_TIMETABLE));
        appState.attendance = JSON.parse(JSON.stringify(DEFAULT_ATTENDANCE));
        appState.studyTasks = JSON.parse(JSON.stringify(DEFAULT_STUDY_TASKS));
        appState.internships = JSON.parse(JSON.stringify(DEFAULT_INTERNSHIPS));
        appState.applications = JSON.parse(JSON.stringify(DEFAULT_APPLICATIONS));
        appState.skills = JSON.parse(JSON.stringify(DEFAULT_SKILLS));
        appState.roadmaps = JSON.parse(JSON.stringify(DEFAULT_ROADMAPS));
        appState.resume = JSON.parse(JSON.stringify(DEFAULT_RESUME));
        appState.notifications = JSON.parse(JSON.stringify(DEFAULT_NOTIFICATIONS));
        appState.reminders = JSON.parse(JSON.stringify(DEFAULT_REMINDERS));
        appState.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

        persistAll();
        showToast('✓ Demo data restored successfully!', 'success');
        updateAllBadges();
        navigateTo('dashboard');
      }
    );
  };

  /* --------------------------------------------------------------------------
     27. GLOBAL SEARCH SYSTEM (Ctrl + K)
     -------------------------------------------------------------------------- */
  window.openGlobalSearch = function () {
    openModal('searchModalBackdrop');
    const input = document.getElementById('searchModalInput');
    if (input) {
      input.value = '';
      input.focus();
    }
    handleGlobalSearch('');
  };

  window.handleGlobalSearch = function (query) {
    const container = document.getElementById('searchResultsContainer');
    if (!container) return;

    const q = query.toLowerCase().trim();
    if (!q) {
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          Type to search across Homework, Assignments, Exams, Internships, and Applications...
        </div>
      `;
      return;
    }

    const results = [];

    // Search Homework
    appState.homework.forEach(h => {
      if (h.title.toLowerCase().includes(q) || h.subject.toLowerCase().includes(q)) {
        results.push({ category: 'Homework', title: h.title, subtitle: `${h.subject} • Due: ${h.dueDate}`, page: 'homework' });
      }
    });

    // Search Assignments
    appState.assignments.forEach(a => {
      if (a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q)) {
        results.push({ category: 'Assignments', title: a.title, subtitle: `${a.subject} • Due: ${a.dueDate}`, page: 'assignments' });
      }
    });

    // Search Exams
    appState.exams.forEach(e => {
      if (e.subject.toLowerCase().includes(q) || e.examType.toLowerCase().includes(q)) {
        results.push({ category: 'Exams', title: `${e.subject} (${e.examType})`, subtitle: `Date: ${e.date} • ${e.room}`, page: 'exams' });
      }
    });

    // Search Internships
    appState.internships.forEach(i => {
      if (i.role.toLowerCase().includes(q) || i.company.toLowerCase().includes(q)) {
        results.push({ category: 'Internships', title: `${i.role} at ${i.company}`, subtitle: `${i.location} • ${i.stipend}`, page: 'internships' });
      }
    });

    // Search Applications
    appState.applications.forEach(app => {
      if (app.company.toLowerCase().includes(q) || app.role.toLowerCase().includes(q)) {
        results.push({ category: 'Applications', title: `${app.role} — ${app.company}`, subtitle: `Status: ${app.status}`, page: 'applications' });
      }
    });

    if (results.length === 0) {
      container.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          No matching results found for "${escapeHtml(query)}"
        </div>
      `;
      return;
    }

    container.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="closeModal('searchModalBackdrop'); navigateTo('${r.page}')">
        <div>
          <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-main);">${escapeHtml(r.title)}</div>
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.1rem;">${escapeHtml(r.subtitle)}</div>
        </div>
        <span class="badge badge-neutral">${r.category}</span>
      </div>
    `).join('');
  };

  // Keyboard shortcut Ctrl + K
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openGlobalSearch();
    }
  });

  /* --------------------------------------------------------------------------
     28. UNIVERSAL MODAL SYSTEM (Add / Edit Any Entity)
     -------------------------------------------------------------------------- */
  let currentModalMode = 'add'; // 'add' or 'edit'
  let currentModalEntity = 'homework';
  let currentEditId = null;

  window.openAddModal = function (entity) {
    currentModalMode = 'add';
    currentModalEntity = entity;
    currentEditId = null;

    document.getElementById('modalTitle').textContent = `Add ${formatEntityName(entity)}`;
    buildModalFields(entity, null);
    openModal('universalModalBackdrop');
  };

  window.openEditModal = function (entity, id) {
    currentModalMode = 'edit';
    currentModalEntity = entity;
    currentEditId = id;

    const item = getItemById(entity, id);
    if (!item) return;

    document.getElementById('modalTitle').textContent = `Edit ${formatEntityName(entity)}`;
    buildModalFields(entity, item);
    openModal('universalModalBackdrop');
  };

  window.openQuickAddModal = function () {
    // Quick Add defaults to homework
    openAddModal('homework');
  };

  function formatEntityName(entity) {
    switch (entity) {
      case 'homework': return 'Homework';
      case 'classwork': return 'Classwork Note';
      case 'assignments': return 'Assignment';
      case 'exams': return 'Exam';
      case 'timetable': return 'Class Slot';
      case 'attendance': return 'Course / Subject';
      case 'studyTasks': return 'Study Task';
      case 'applications': return 'Job Application';
      case 'skills': return 'Skill';
      case 'reminders': return 'Reminder Alert';
      default: return 'Item';
    }
  }

  function getItemById(entity, id) {
    const list = appState[entity];
    return list ? list.find(item => item.id === id) : null;
  }

  function buildModalFields(entity, item) {
    const container = document.getElementById('modalFormFields');
    if (!container) return;

    let html = '';

    if (entity === 'homework') {
      html = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Subject <span class="req">*</span></label>
            <input type="text" name="subject" class="form-control" value="${escapeHtml(item?.subject || '')}" required placeholder="e.g. Compiler Design">
          </div>
          <div class="form-group">
            <label class="form-label">Title <span class="req">*</span></label>
            <input type="text" name="title" class="form-control" value="${escapeHtml(item?.title || '')}" required placeholder="e.g. SLR Parsing Table">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control" placeholder="Provide problem numbers or instructions...">${escapeHtml(item?.description || '')}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Due Date <span class="req">*</span></label>
            <input type="date" name="dueDate" class="form-control" value="${item?.dueDate || getRelativeDateString(1)}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Priority</label>
            <select name="priority" class="form-control">
              <option value="High" ${item?.priority === 'High' ? 'selected' : ''}>High</option>
              <option value="Medium" ${item?.priority === 'Medium' || !item ? 'selected' : ''}>Medium</option>
              <option value="Low" ${item?.priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Estimated Time</label>
            <input type="text" name="estTime" class="form-control" value="${escapeHtml(item?.estTime || '45 mins')}" placeholder="e.g. 45 mins">
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select name="status" class="form-control">
              <option value="Pending" ${item?.status === 'Pending' || !item ? 'selected' : ''}>Pending</option>
              <option value="In Progress" ${item?.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Completed" ${item?.status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
          </div>
        </div>
      `;
    } else if (entity === 'classwork') {
      html = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Subject <span class="req">*</span></label>
            <input type="text" name="subject" class="form-control" value="${escapeHtml(item?.subject || '')}" required placeholder="e.g. Database Management">
          </div>
          <div class="form-group">
            <label class="form-label">Topic Covered <span class="req">*</span></label>
            <input type="text" name="topic" class="form-control" value="${escapeHtml(item?.topic || '')}" required placeholder="e.g. 2PL Protocol">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date <span class="req">*</span></label>
            <input type="date" name="date" class="form-control" value="${item?.date || getRelativeDateString(0)}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Faculty / Teacher</label>
            <input type="text" name="teacher" class="form-control" value="${escapeHtml(item?.teacher || '')}" placeholder="e.g. Dr. Sharma">
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select name="status" class="form-control">
              <option value="Completed" ${item?.status === 'Completed' || !item ? 'selected' : ''}>Completed</option>
              <option value="Pending" ${item?.status === 'Pending' ? 'selected' : ''}>Pending Review</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Lecture Notes</label>
          <textarea name="notes" class="form-control" rows="4" placeholder="Detailed notes, formulas, whiteboard snippets...">${escapeHtml(item?.notes || '')}</textarea>
        </div>
      `;
    } else if (entity === 'assignments') {
      html = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Assignment Title <span class="req">*</span></label>
            <input type="text" name="title" class="form-control" value="${escapeHtml(item?.title || '')}" required placeholder="e.g. Mini Project Report">
          </div>
          <div class="form-group">
            <label class="form-label">Subject <span class="req">*</span></label>
            <input type="text" name="subject" class="form-control" value="${escapeHtml(item?.subject || '')}" required placeholder="e.g. Web Technology">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Instructions / Description</label>
          <textarea name="description" class="form-control">${escapeHtml(item?.description || '')}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Assigned Date</label>
            <input type="date" name="assignedDate" class="form-control" value="${item?.assignedDate || getRelativeDateString(-2)}">
          </div>
          <div class="form-group">
            <label class="form-label">Due Date <span class="req">*</span></label>
            <input type="date" name="dueDate" class="form-control" value="${item?.dueDate || getRelativeDateString(5)}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Priority</label>
            <select name="priority" class="form-control">
              <option value="High" ${item?.priority === 'High' ? 'selected' : ''}>High</option>
              <option value="Medium" ${item?.priority === 'Medium' || !item ? 'selected' : ''}>Medium</option>
              <option value="Low" ${item?.priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select name="status" class="form-control">
              <option value="Not Started" ${item?.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
              <option value="In Progress" ${item?.status === 'In Progress' || !item ? 'selected' : ''}>In Progress</option>
              <option value="Submitted" ${item?.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
              <option value="Late" ${item?.status === 'Late' ? 'selected' : ''}>Late</option>
            </select>
          </div>
        </div>
      `;
    } else if (entity === 'exams') {
      html = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Subject <span class="req">*</span></label>
            <input type="text" name="subject" class="form-control" value="${escapeHtml(item?.subject || '')}" required placeholder="e.g. Compiler Design">
          </div>
          <div class="form-group">
            <label class="form-label">Exam Type <span class="req">*</span></label>
            <input type="text" name="examType" class="form-control" value="${escapeHtml(item?.examType || 'Mid Semester Exam')}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date <span class="req">*</span></label>
            <input type="date" name="date" class="form-control" value="${item?.date || getRelativeDateString(10)}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Time</label>
            <input type="text" name="time" class="form-control" value="${escapeHtml(item?.time || '09:30 AM - 11:30 AM')}">
          </div>
          <div class="form-group">
            <label class="form-label">Room / Hall</label>
            <input type="text" name="room" class="form-control" value="${escapeHtml(item?.room || 'Hall 204')}">
          </div>
          <div class="form-group">
            <label class="form-label">Preparation %</label>
            <input type="number" name="preparationPct" min="0" max="100" class="form-control" value="${item?.preparationPct || 50}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Syllabus</label>
          <textarea name="syllabus" class="form-control">${escapeHtml(item?.syllabus || '')}</textarea>
        </div>
      `;
    } else if (entity === 'timetable') {
      html = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Day <span class="req">*</span></label>
            <select name="day" class="form-control">
              ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => `
                <option value="${d}" ${item?.day === d ? 'selected' : ''}>${d}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Subject <span class="req">*</span></label>
            <input type="text" name="subject" class="form-control" value="${escapeHtml(item?.subject || '')}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Start Time</label>
            <input type="text" name="startTime" class="form-control" value="${escapeHtml(item?.startTime || '09:00 AM')}">
          </div>
          <div class="form-group">
            <label class="form-label">End Time</label>
            <input type="text" name="endTime" class="form-control" value="${escapeHtml(item?.endTime || '10:00 AM')}">
          </div>
          <div class="form-group">
            <label class="form-label">Room</label>
            <input type="text" name="room" class="form-control" value="${escapeHtml(item?.room || 'Room 204')}">
          </div>
          <div class="form-group">
            <label class="form-label">Type</label>
            <select name="type" class="form-control">
              <option value="Lecture" ${item?.type === 'Lecture' || !item ? 'selected' : ''}>Lecture</option>
              <option value="Lab" ${item?.type === 'Lab' ? 'selected' : ''}>Lab</option>
              <option value="Tutorial" ${item?.type === 'Tutorial' ? 'selected' : ''}>Tutorial</option>
              <option value="Other" ${item?.type === 'Other' ? 'selected' : ''}>Other</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Faculty Name</label>
          <input type="text" name="faculty" class="form-control" value="${escapeHtml(item?.faculty || '')}">
        </div>
      `;
    } else if (entity === 'attendance') {
      html = `
        <div class="form-group">
          <label class="form-label">Subject Name <span class="req">*</span></label>
          <input type="text" name="subject" class="form-control" value="${escapeHtml(item?.subject || '')}" required placeholder="e.g. Computer Networks">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Classes Attended (Present) <span class="req">*</span></label>
            <input type="number" name="present" min="0" class="form-control" value="${item?.present || 20}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Total Classes Conducted <span class="req">*</span></label>
            <input type="number" name="total" min="1" class="form-control" value="${item?.total || 25}" required>
          </div>
        </div>
      `;
    } else if (entity === 'studyTasks') {
      html = `
        <div class="form-group">
          <label class="form-label">Study Task Title <span class="req">*</span></label>
          <input type="text" name="task" class="form-control" value="${escapeHtml(item?.task || '')}" required placeholder="e.g. Solve LeetCode #102">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Subject / Topic</label>
            <input type="text" name="subject" class="form-control" value="${escapeHtml(item?.subject || 'General')}">
          </div>
          <div class="form-group">
            <label class="form-label">Duration (Minutes)</label>
            <input type="number" name="duration" min="5" class="form-control" value="${item?.duration || 45}">
          </div>
          <div class="form-group">
            <label class="form-label">Priority</label>
            <select name="priority" class="form-control">
              <option value="High" ${item?.priority === 'High' ? 'selected' : ''}>High</option>
              <option value="Medium" ${item?.priority === 'Medium' || !item ? 'selected' : ''}>Medium</option>
              <option value="Low" ${item?.priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>
          </div>
        </div>
      `;
    } else if (entity === 'applications') {
      html = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Company Name <span class="req">*</span></label>
            <input type="text" name="company" class="form-control" value="${escapeHtml(item?.company || '')}" required placeholder="e.g. Microsoft">
          </div>
          <div class="form-group">
            <label class="form-label">Role Title <span class="req">*</span></label>
            <input type="text" name="role" class="form-control" value="${escapeHtml(item?.role || '')}" required placeholder="e.g. SDE Intern">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Location</label>
            <input type="text" name="location" class="form-control" value="${escapeHtml(item?.location || 'Remote')}">
          </div>
          <div class="form-group">
            <label class="form-label">Date Applied</label>
            <input type="date" name="dateApplied" class="form-control" value="${item?.dateApplied || getRelativeDateString(0)}">
          </div>
          <div class="form-group">
            <label class="form-label">Status Stage</label>
            <select name="status" class="form-control">
              ${KANBAN_STAGES.map(s => `<option value="${s}" ${item?.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Recruiter / Assessment Notes</label>
          <textarea name="notes" class="form-control" placeholder="Interview schedule, OA link, referral info...">${escapeHtml(item?.notes || '')}</textarea>
        </div>
      `;
    } else if (entity === 'skills') {
      html = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Skill Name <span class="req">*</span></label>
            <input type="text" name="skillName" class="form-control" required placeholder="e.g. React.js">
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select name="category" class="form-control">
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="Database & Backend">Database & Backend</option>
              <option value="Tools & DevOps">Tools & DevOps</option>
              <option value="Soft Skills & Interview">Soft Skills & Interview</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Proficiency Level (%)</label>
            <input type="number" name="level" min="10" max="100" class="form-control" value="80" required>
          </div>
        </div>
      `;
    } else if (entity === 'reminders') {
      html = `
        <div class="form-group">
          <label class="form-label">Reminder Title <span class="req">*</span></label>
          <input type="text" name="title" class="form-control" value="${escapeHtml(item?.title || '')}" required placeholder="e.g. DBMS Assignment is due tomorrow">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Reminder Date <span class="req">*</span></label>
            <input type="date" name="date" class="form-control" value="${item?.date || getRelativeDateString(1)}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Reminder Time</label>
            <input type="text" name="time" class="form-control" value="${escapeHtml(item?.time || '10:00 AM')}">
          </div>
          <div class="form-group">
            <label class="form-label">Type</label>
            <select name="type" class="form-control">
              <option value="Homework" ${item?.type === 'Homework' ? 'selected' : ''}>Homework</option>
              <option value="Assignment" ${item?.type === 'Assignment' ? 'selected' : ''}>Assignment</option>
              <option value="Exam" ${item?.type === 'Exam' ? 'selected' : ''}>Exam</option>
              <option value="Class" ${item?.type === 'Class' ? 'selected' : ''}>Class</option>
              <option value="Internship" ${item?.type === 'Internship' ? 'selected' : ''}>Internship</option>
              <option value="Interview" ${item?.type === 'Interview' ? 'selected' : ''}>Interview</option>
            </select>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  window.handleUniversalFormSubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    if (currentModalEntity === 'skills') {
      // Custom skill addition logic
      const catName = dataObj.category;
      const skillName = dataObj.skillName;
      const skillLevel = parseInt(dataObj.level, 10) || 80;

      let catObj = appState.skills.find(c => c.category === catName);
      if (!catObj) {
        catObj = { category: catName, skills: [] };
        appState.skills.push(catObj);
      }
      catObj.skills.push({ name: skillName, level: skillLevel });
      saveData(STORAGE_KEYS.SKILLS, appState.skills);
      showToast(`Skill ${skillName} added to ${catName}`, 'success');
      renderSkills();
      closeModal('universalModalBackdrop');
      return;
    }

    if (currentModalMode === 'add') {
      dataObj.id = `${currentModalEntity.substring(0, 3)}-${Date.now()}`;
      if (currentModalEntity === 'studyTasks') dataObj.completed = false;
      appState[currentModalEntity].unshift(dataObj);
      showToast(`✓ ${formatEntityName(currentModalEntity)} added successfully`, 'success');
    } else {
      // Edit existing
      const list = appState[currentModalEntity];
      const index = list.findIndex(i => i.id === currentEditId);
      if (index !== -1) {
        list[index] = { ...list[index], ...dataObj };
        showToast(`✓ ${formatEntityName(currentModalEntity)} updated`, 'success');
      }
    }

    // Persist to local storage
    saveData(STORAGE_KEYS[currentModalEntity.toUpperCase()] || `student360_${currentModalEntity}`, appState[currentModalEntity]);
    closeModal('universalModalBackdrop');
    refreshPageView(currentModalEntity === 'studyTasks' ? 'study' : currentModalEntity);
    updateAllBadges();
  };

  /* --------------------------------------------------------------------------
     29. CONFIRMATION MODAL & DELETION HANDLERS
     -------------------------------------------------------------------------- */
  let confirmCallback = null;

  function showConfirmModal(title, message, onConfirm) {
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMessage').textContent = message;
    confirmCallback = onConfirm;
    openModal('confirmModalBackdrop');
  }

  document.getElementById('confirmModalActionBtn')?.addEventListener('click', function () {
    if (confirmCallback) {
      confirmCallback();
      confirmCallback = null;
    }
    closeModal('confirmModalBackdrop');
  });

  window.confirmDeleteItem = function (entity, id) {
    showConfirmModal(
      `Delete this ${formatEntityName(entity)}?`,
      'Are you sure you want to permanently delete this item from your dashboard?',
      () => {
        appState[entity] = appState[entity].filter(i => i.id !== id);
        saveData(STORAGE_KEYS[entity.toUpperCase()] || `student360_${entity}`, appState[entity]);
        showToast(`${formatEntityName(entity)} deleted`, 'info');
        refreshPageView(entity === 'studyTasks' ? 'study' : entity);
        updateAllBadges();
      }
    );
  };

  /* --------------------------------------------------------------------------
     30. MODAL UTILITIES & BACKDROP CONTROLS
     -------------------------------------------------------------------------- */
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  };

  window.handleBackdropClick = function (e, modalId) {
    if (e.target.id === modalId) {
      closeModal(modalId);
    }
  };

  // Close modals on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.show').forEach(m => m.classList.remove('show'));
    }
  });

  /* --------------------------------------------------------------------------
     31. UTILITY FUNCTIONS & HELPERS
     -------------------------------------------------------------------------- */
  function calculateDaysRemaining(dateStr) {
    if (!dateStr) return 99;
    const target = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  function populateSubjectDropdown(dropdownId, subjectList) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    const currentVal = dropdown.value;
    const uniqueSubjects = Array.from(new Set(subjectList)).filter(Boolean);

    dropdown.innerHTML = `<option value="">All Subjects</option>` +
      uniqueSubjects.map(s => `<option value="${escapeHtml(s)}" ${s === currentVal ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('');
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* --------------------------------------------------------------------------
     32. MOBILE SIDEBAR TOGGLE
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');
  const sidebar = document.getElementById('appSidebar');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  /* --------------------------------------------------------------------------
     33. APPLICATION BOOTSTRAP
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    // Initial Render
    navigateTo('dashboard');
    updateAllBadges();

    // Check reminders periodically (every 60s)
    setInterval(() => {
      const todayStr = getRelativeDateString(0);
      const dueTodayCount = appState.homework.filter(h => h.dueDate === todayStr && h.status !== 'Completed').length;
      if (dueTodayCount > 0 && Math.random() < 0.2) { // subtle notification trigger
        // Periodic check active
      }
    }, 60000);
  });

})();
