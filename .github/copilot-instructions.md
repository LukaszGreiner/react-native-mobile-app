# Copilot Instructions for React Native Mobile App

This repository is a university course project ("projekt zaliczeniowy") focused on building a CRUD mobile application using **React Native**.

## Big Picture Architecture
- **Framework**: React Native (prefer **Expo** for new code/features unless otherwise specified).
- **Core Functionality**: CRUD operations (Create, Read, Update, Delete) interacting with an external REST API.
- **Navigation**: Use `react-navigation` (or `expo-router` if using Expo SDK 48+).
- **State Management**: Use React Context or a lightweight library (Zustand) for global state if complexity increases.
- **Native Integration**: The app must integrate at least one native feature: Camera, GPS (Location), or Local Notifications.

## Coding Conventions
- **Language**: TypeScript (preferred) or JavaScript. Use functional components with Hooks.
- **Styling**: Use `StyleSheet` or a utility-first library like `NativeWind` if configured. Avoid inline styles for complex components.
- **Async Operations**: Use `async/await` for API calls. Handle loading and error states explicitly in the UI.
- **API Pattern**:
  - Implement a dedicated service layer (e.g., `services/api.ts`) for all Fetch/Axios calls.
  - Required methods: `getList`, `getDetails`, `createItem`, `updateItem`, `deleteItem`.

## Critical Workflows & Commands
- **package.json**: Always check scripts for exact commands. Common patterns:
  - Run Android: `npx expo run:android` or `npm run android`
  - Run iOS: `npx expo run:ios` or `npm run ios`
- **Git** (Strict Requirement):
  - Work on feature branches.
  - Create Pull Requests (PR) for merging changes.
  - Resolve conflicts locally before pushing.

## Project Requirements (from README)
- **CI/CD**: GitHub Actions must be configured for the repository.
- **Security Check**: Be aware of React vulnerabilities; ensure dependencies are audited.
- **Database**: External database connection via API is required.

## External Dependencies
- **Maps/Location**: `expo-location` (if GPS selected).
- **Camera**: `expo-camera` (if Camera selected).
- **Notifications**: `expo-notifications` (if Notifications selected).
