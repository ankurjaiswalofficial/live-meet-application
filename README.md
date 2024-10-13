# Live Meet Application

#### The URL has 50 seconds of delay start so please consider it as it's by default through render.com on free accounts for deployments...

A real-time meeting platform built using cutting-edge technologies, offering a seamless and interactive experience for users. This application provides features like video conferencing, chat, and collaborative tools to enhance online meetings.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Radix UI**: A set of unstyled, accessible components for building rich UI experiences.
- **React Hook Form**: A library for managing forms and validation in React.
- **Embla Carousel**: A library for building responsive and customizable carousels.
- **React Player**: A media player component for React.
- **Socket.io Client**: For real-time, bi-directional communication.

### Backend & Authentication
- **NextAuth.js**: Authentication for Next.js applications with support for multiple providers.
- **Prisma**: An ORM for seamless database integration.
- **Bcrypt**: A library for hashing and checking passwords.
- **JSON Web Token (JWT)**: For secure authentication and authorization.
- **Zod**: A TypeScript-first schema declaration and validation library.

### Real-Time
- **Socket.io**: A library for real-time communication.
- **WebRTC**: A technology for enabling real-time communication directly between browsers for peer-to-peer video and audio streaming.

### Optimization & Performance
- **Turbo.js**: A framework for optimizing real-time application updates and ensuring a smooth user experience.

### State Management
- **Redux Toolkit**: A library for efficient state management in React.

### Utilities
- **Date-fns** and **Day.js**: For date and time manipulation.
- **Lucide React**: A library for customizable icons in React.
- **Clsx**: A utility for dynamically building class names.
- **Tailwind Merge**: For combining Tailwind CSS classes dynamically.

### Dev Tools
- **ESLint**: A linter for identifying and fixing problems in JavaScript code.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Prisma**: An ORM for TypeScript/JavaScript.

## Features
- **Real-Time Video Conferencing**: Host and join live video meetings using WebRTC and Video SDK Live.
- **Chat Integration**: Text chat with participants during live meetings.
- **Optimized Performance**: Turbo.js ensures real-time updates and an optimized user experience.
- **Responsive UI**: Built with Tailwind CSS for a mobile-first, responsive design.
- **Authentication**: Secure login and user management using NextAuth.js and JWT.
- **State Management**: Efficient state handling with Redux Toolkit.
- **Form Validation**: Using React Hook Form integrated with Zod for schema validation.
- **Customizable Components**: Using Radix UI for building accessible and flexible UI components.

## Installation

### Prerequisites
- Node.js and npm installed on your system.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ankurjaiswalofficial/live-meet-application.git
   ```
2. Navigate to the project directory:
   ```bash
   cd live-meet-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables by creating a `.env.local` file and adding necessary configurations (e.g., database URL, authentication providers, etc.).
5. Run Prisma migrations to set up the database:
   ```bash
   npx prisma migrate dev
   ```
    
Usage
-----

### Development

Start the development server:

   ```bash
   npm run dev
   ```

Visit http://localhost:3000 to view the application locally.

### Production

To build and run the application in production:

   ```bash
   npm run build npm start
   ```

### Deployment

This application can be easily deployed on platforms like Render like platforms so that its backend could run properly. Ensure your environment variables are correctly set up in the deployment platform.

License
-------

This project is licensed under the MIT License.
