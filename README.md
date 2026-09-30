# 👤 User Directory — CRUD Management System

A modern **User Directory & CRUD Management System** built with **React, TypeScript, Bootstrap, and Axios**.
This project provides a frontend interface for managing users, performing CRUD operations, handling optimistic UI updates, storing data persistently with localStorage, managing favorite users, and switching between dark and light themes. It was developed as a practical React project to apply modern frontend development concepts in a real-world application.

> 🚧 **Project Status:** Frontend functionality complete & persisted locally
> 💾 **Current Data:** React State + `localStorage` + JSONPlaceholder API
> 🔌 **Backend:** Mock REST API integration using JSONPlaceholder

---

## 📸 Project Preview

### Main User Directory — Light Mode

![User Direc. - Light Mode](./src/Screenshots/Main%20User%20Directory%20—%20Light%20Mode.png)

### Main User Directory — Dark Mode

![User Direc. - Dark Mode](./src/Screenshots/Main%20User%20Directory%20—%20Dark%20Mode.png)

### Add New User

![Add New User](./src/Screenshots/Add%20New%20User.png)

### Update User

![Update User](./src/Screenshots/Update%20User.png)

### Favorites View

![Favorites View](./src/Screenshots/Favorites%20View.png)

### Responsive Mobile Layout

![Responsive Mobile Layout](./src/Screenshots/Responsive%20Mobile%20Layout.png)

---

## ✨ Features

## 👤 User Management

- Fetch users from the REST API
- Display active user records
- Add new users
- Update existing users
- Delete users
- Validate user input
- Handle locally created users without unnecessary API errors
- Dynamically update the user interface after CRUD operations

## ⚡ Optimistic UI Updates

- Immediately update the interface when an operation is performed
- Add users instantly before the API operation completes
- Update user information immediately
- Remove deleted users instantly from the interface
- Generate temporary client-side IDs using `Date.now()`
- Roll back UI changes if a remote server operation fails

## ⭐ Favorites System

- Mark users as favorites
- Remove users from favorites
- Display a dedicated Favorites view
- Display the number of favorited users
- Update the favorite counter in real time
- Persist favorite selections using `localStorage`

## 💾 LocalStorage Persistence

- Persist user records using `localStorage`
- Retain newly created users after page refresh
- Retain updated user information
- Retain deleted user records correctly
- Persist favorite users
- Persist selected theme mode
- Restore application data when the browser is reopened

## 🎨 Theme Switcher

- Switch between Light Mode and Dark Mode
- Update the complete application appearance
- Style cards, forms, buttons, and navigation elements according to the selected theme
- Persist the selected theme in `localStorage`
- Restore the preferred theme after refreshing the application

## 📱 Responsive User Interface

- Mobile-first responsive layout
- Responsive Bootstrap containers
- Form fields adapt to smaller screens
- Buttons wrap cleanly on mobile devices
- User records remain accessible across different screen sizes

## 🚫 404 Page

A dedicated page can be added for invalid or unavailable routes as the application is expanded with additional navigation.

---

## 🛠️ Tech Stack

| Technology         | Usage                                 |
| ------------------ | ------------------------------------- |
| ⚛️ React           | Frontend application                  |
| 📘 TypeScript      | Type-safe development                 |
| 🎨 Bootstrap 5     | User interface and responsive styling |
| 🌐 Axios           | HTTP client for REST API requests     |
| 🪝 Custom Hooks    | Data fetching and application logic   |
| 🛠️ Service Classes | HTTP and API abstraction              |
| 💾 LocalStorage    | Persistent client-side storage        |
| ⚡ Vite            | Development and build tool            |

---

## 🧠 React Concepts Practiced

This project is also designed as a practical learning project for React and TypeScript.
Concepts implemented include:

- Functional Components
- JSX / TSX
- Props
- State Management
- `useState`
- `useEffect`
- Custom Hooks
- Asynchronous API Handling
- Axios
- Service Abstraction
- Optimistic UI Updates
- State Rollbacks
- LocalStorage Synchronization
- Controlled Components
- Form Handling
- Form Validation
- Array Methods
- Conditional Rendering
- Component Reusability
- Responsive UI Design
- Theme State Management
- Client-Side Data Persistence

---

## 🏗️ Application Architecture

The current application follows a modular and layer-separated React architecture.

                        React Application
                             │
              ┌──────────────┴──────────────┐
              │                             │
       useUsers Hook                   Theme State
              │                             │
    ┌─────────┴─────────┐         ┌─────────┴─────────┐
    │                   │         │                   │

Axios Client LocalStorage Light Mode Dark Mode
│ |
REST API Persisted State

---

## 📁 Project Structure

The project is organized into reusable sections
│ │

user-crud-app/
│
├── public/
│
├── src/
│ │
│ |
│ │
│ │
│ ├── hooks/
│ │ ├── useUsers.ts
│ │ ├── UserForm.tsx
│ ├── services/
│ │ ├── api-client.ts
│ │ ├── http-service.ts
│ │ └── user-service.ts
│ │
│ ├── App.tsx
│ ├── main.tsx
│ |
| └──Screenshots
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md

> The structure may evolve as new functionality is added.

---

## 🔄 Current Data Flow

The current version combines remote API data with persistent frontend storage.

JSONPlaceholder API
│
▼
Axios Services
│
▼
useUsers Hook
│
▼
Shared App State
│
├── User Records
├── Favorites
└── Theme
│
▼
LocalStorage

When a user operation is performed:

Add / Update / Delete User
↓
Optimistic UI Update
↓
Update LocalStorage
↓
Execute API Request
↓
┌────────┴─────────┐
│ │
Success Failure
│ │
Update Data Rollback
│ │
└────────┬─────────┘
↓
Updated UI

---

## 🚀 Getting Started

## Prerequisites

## Make sure you have installed:

- Node.js
- npm
- Git

## Installation

## Clone the repository:

git clone <your-repository-url>

## Move into the project directory:

`cd user-crud-app`

## Install dependencies:

`npm install`

## Start the development server:

`npm run dev`

Vite will provide a local development URL in the terminal.

---

## 🧪 Development

During development, the application can be tested by:

1. Loading users from the remote API.
2. Creating a new user.
3. Validating the user input.
4. Marking users as favorites.
5. Opening the Favorites view.
6. Updating existing users.
7. Deleting users.
8. Checking optimistic UI updates.
9. Testing rollback behavior when an API request fails.
10. Switching between Dark and Light mode.
11. Refreshing the browser to verify `localStorage` persistence.
12. Reopening the application to verify persisted users, favorites, and theme settings.

---

## 🎯 Project Objectives

The main objectives of this project are to:

- Build a practical real-world CRUD application with React.
- Develop a reusable component structure.
- Practice React state management.
- Understand and implement custom hooks.
- Separate API logic using service classes.
- Work with asynchronous API requests using Axios.
- Understand optimistic UI updates.
- Implement state rollback when remote operations fail.
- Learn client-side persistence using `localStorage`.
- Implement a favorites management system.
- Create a functional dark and light theme.
- Build a responsive user management interface.
- Develop a portfolio-ready frontend project.

---

## 🔮 Future Roadmap

The current version focuses on frontend CRUD functionality, API integration, optimistic updates, and persistent client-side storage. Future versions can introduce:

## Backend

- Custom Node.js / Express REST API
- Server-side data management
- PostgreSQL / MongoDB database integration
- Persistent user records
- Server-side validation

## Authentication

- User login
- JWT authentication
- Protected routes
- Admin account
- Guest accounts
- Role-based permissions

## User Management

- User profile pages
- Profile image uploads
- Advanced user search
- User categories
- User status management
- Pagination
- Infinite scrolling

## Favorites

- Server-side favorite storage
- Favorite synchronization between devices
- Favorite groups
- Favorite history

## Storage

- Persistent database storage
- Backend synchronization
- Cloud database integration
- Multi-device data synchronization

## Deployment

- Production build
- Frontend hosting
- Backend deployment
- Database hosting
- Custom domain

---

## 📈 Project Development Stages

## Stage 1

React Fundamentals  
↓

## Stage 2

User Directory UI  
↓

## Stage 3

API Data Fetching  
↓

## Stage 4

CRUD Operations  
↓

## Stage 5

Optimistic UI Updates  
↓

## Stage 6

LocalStorage Persistence  
↓

## Stage 7

Favorites System  
↓

## Stage 8

Dark / Light Theme  
↓

## Stage 9

Backend + Database  
↓

## Stage 10

Authentication + Production Deployment

## Current focus:

Frontend functionality, CRUD operations, persistent storage, and UI refinement.

## 💡 Why This Project?

User management is a common requirement in modern web applications.

Building this application provides practical experience in handling CRUD operations, asynchronous API communication, optimistic UI updates, persistent client-side storage, and shared application logic inside a React application instead of creating isolated demo components.

## For example:

User Records
↕
CRUD Operations
↕
API Services
↕
Optimistic UI
↕
LocalStorage
↕
Favorites
↕
Theme

This makes the project a practical demonstration of frontend application architecture, API handling, state management, persistence, and reusable React development.

## Live links & gitHub Repository

![live link]()
![GitHub Repo]()

## 👨‍💻 Author

Abdullah Saeed

Frontend Developer / React Learner

This project is part of my practical journey toward building real-world React applications and developing a professional frontend portfolio.

## 📄 License

This project is created for educational, learning, and portfolio purposes.
