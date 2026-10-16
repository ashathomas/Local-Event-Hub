# 🎉 Local Event Hub

A responsive event discovery platform built with React and Tailwind CSS. Local Event Hub helps users discover upcoming events, search by location or category, save favorite events, and view event details. It also includes organizer and admin interfaces for managing event listings.

## 📌 Project Overview

Local Event Hub is a frontend mini project developed to make finding local events simple and convenient. The application provides an intuitive interface for exploring events and includes role-based pages for users, organizers, and administrators.

## ✨ Features

### 👤 User Module

- Browse upcoming events.
- Search events by title, location, or category.
- Filter events by category.
- Sort events alphabetically (A–Z and Z–A).
- View event details using Quick View.
- Add or remove events from Favorites.
- View favorite event count.
- Use voice search to find events.
- Register for events through the event details page.

### 🎫 Organizer Module

- Access the Organizer Dashboard.
- Add new events using an event form.
- View and manage personal event listings.
- Track event approval status.

### 🛡️ Admin Module

- Access the Admin Dashboard.
- View and search event listings.
- Filter events by status.
- Approve or reject submitted events.

### 🎨 UI and User Experience

- Responsive design for desktop, tablet, and mobile.
- Reusable React components.
- Tailwind CSS styling.
- React Icons for interface icons.
- Client-side navigation using React Router.

## 🛠️ Technologies Used

- **React** – User interface development.
- **JavaScript** – Application logic.
- **Tailwind CSS** – Responsive styling.
- **React Router DOM** – Page navigation.
- **React Icons** – Icons.
- **Web Speech API** – Voice search.
- **LocalStorage** – Frontend data persistence where implemented.
- **Vite** – Development server and build tool.
- **Git and GitHub** – Version control and source code hosting.

## 📂 Project Structure

```text
local-event-hub/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── EventCard.jsx
│   │   ├── VoiceSearch.jsx
│   │   ├── Footer.jsx
│   │   |── About.jsx
|   |   |── AddEvent.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── EventDetails.jsx
│   │   ├── EventModal.jsx
│   │   ├── Events.jsx
│   │   |── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── OrganizerDashboard.jsx
│   │   ├── OrganizerMyEvents.jsx
│   │   ├── RegistrationForm.jsx
│   │   ├── SignIn.jsx
│   │   |── ThemeToggle.jsx
|   |   |
│   ├── data/
│   │   └── events.js
│   |
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
└── README.md

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   https://github.com/ashathomas/Local-Event-Hub.git
   ```

2. Navigate to the project folder:

   ```bash
   cd local-event-hub
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## 🎤 Voice Search

The application uses the browser's Web Speech API to recognize spoken search terms and filter events. Voice search requires browser support and microphone permission. Availability may vary by browser and environment.

## 💾 Data Storage

This project focuses on frontend functionality. Where implemented, browser LocalStorage is used to retain selected application data. A backend database and server-side authentication are not included unless added separately.

## 🔮 Future Improvements

- Integrate a backend using Node.js and Express.
- Store events and user data in MongoDB.
- Implement secure authentication and authorization.
- Add event registration management.
- Add email notifications and reminders.
- Deploy the application for public access.

## 🌐 Live Demo

**Live Application:** (https://symphonious-douhua-1e4ed1.netlify.app)

## 👩‍💻 Author

**Asha Thomas**

Frontend React Mini Project – Local Event Hub

## 📄 License

This project was created for learning and educational purposes.
