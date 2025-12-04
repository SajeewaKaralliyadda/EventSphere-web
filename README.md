# EventSphere - Frontend

EventSphere is a modern, web-based event management and ticketing platform designed specifically for university events in Sri Lanka.

## 🚀 Features

- **Role-based Authentication** (Student, Organizer, Admin)
- **Event Management** - Browse, create, and manage university events
- **Digital Ticketing** - QR code-based ticket system
- **Secure Payments** - Stripe integration for online payments
- **Real-time Analytics** - Track event performance and attendance
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (Spring Boot)

## 🛠️ Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   - Copy `.env.example` to `.env`
   - Update the values in `.env` file

3. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Reusable React components
│   ├── common/         # Common UI components (Button, Input, Card, etc.)
│   ├── student/        # Student-specific components
│   ├── organizer/      # Organizer-specific components
│   └── admin/          # Admin-specific components
├── pages/              # Page components
│   ├── auth/           # Authentication pages (Login, Register)
│   ├── public/         # Public pages (Landing, Events)
│   ├── student/        # Student dashboard and pages
│   ├── organizer/      # Organizer dashboard and pages
│   └── admin/          # Admin dashboard and pages
├── layouts/            # Layout components (MainLayout, DashboardLayout)
├── context/            # React Context (AuthContext, etc.)
├── services/           # API service functions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and constants
├── App.jsx             # Main App component with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Tech Stack

- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **Lucide React** - Additional icon set
- **QRCode.react** - QR code generation
- **html2canvas & jsPDF** - PDF ticket generation
- **Vite** - Build tool and dev server

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Common Components

- **Button** - Reusable button with variants
- **Input** - Form input with validation
- **Card** - Container component
- **Modal** - Dialog/popup component
- **Navbar** - Main navigation bar
- **Footer** - Site footer
- **Loader** - Loading spinner
- **ProtectedRoute** - Route guard for authenticated users

### Pages Implemented

- ✅ Landing Page
- ✅ Login Page
- ✅ Register Page (Student/Organizer)
- 🚧 Events Listing Page (Coming Soon)
- 🚧 Event Details Page (Coming Soon)
- 🚧 Student Dashboard (Coming Soon)
- 🚧 Organizer Dashboard (Coming Soon)
- 🚧 Admin Dashboard (Coming Soon)

## 🔐 Authentication

The application uses JWT-based authentication:

- Token stored in localStorage
- Automatic token injection in API requests
- Route protection based on user roles
- Auto-redirect on token expiration

## 🎨 Styling

The project uses Tailwind CSS with custom configuration:

- Custom color palette (primary, secondary, accent)
- Custom animations and transitions
- Responsive breakpoints
- Custom utility classes

## 🌐 API Integration

API services are organized in `src/services/apiService.js`:

- **authService** - Authentication endpoints
- **eventService** - Event management
- **bookingService** - Ticket booking
- **paymentService** - Payment processing
- **reviewService** - Event reviews
- **adminService** - Admin operations
- **userService** - User profile management

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. The `dist` folder contains the production build

3. Deploy to your hosting service (Netlify, Vercel, etc.)

## 👤 Author

Sajeewa - 3rd Year Student
IS 3920 - Individual Project on Business Solutions

## 📞 Support

For support and queries, please contact through university channels.
