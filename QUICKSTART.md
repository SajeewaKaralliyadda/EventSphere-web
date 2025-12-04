# EventSphere - Quick Start Guide

## ✅ What's Been Built

### Core Infrastructure

- ✅ Project setup with Vite + React 19
- ✅ Tailwind CSS 4 configured with custom theme
- ✅ React Router for navigation
- ✅ Folder structure organized by feature
- ✅ API service layer with Axios
- ✅ Authentication context with JWT support
- ✅ Utility functions and constants

### Components Created

1. **Common Components**

   - Button (with variants: primary, secondary, outline, ghost, danger, success, white)
   - Input (with validation, icons, password toggle)
   - Card (with hover effects)
   - Modal (with overlay and animations)
   - Navbar (responsive with role-based navigation)
   - Footer (with social links)
   - Loader (fullscreen and inline options)
   - ProtectedRoute (for authenticated routes)

2. **Layouts**
   - MainLayout (Navbar + Content + Footer)

### Pages Implemented

1. **Landing Page** (`/`)

   - Hero section with search
   - Features section
   - Upcoming events preview
   - Call-to-action sections
   - Fully responsive

2. **Login Page** (`/login`)

   - Email/password authentication
   - Remember me option
   - Forgot password link
   - Redirect to appropriate dashboard based on role

3. **Register Page** (`/register`)
   - Toggle between Student and Organizer registration
   - Form validation
   - Faculty selection
   - Student ID (for students)
   - Club information (for organizers)
   - Password strength requirements

### API Services Ready

- `authService` - Login, register, logout, password reset
- `eventService` - CRUD operations for events
- `bookingService` - Ticket booking and validation
- `paymentService` - Payment processing
- `reviewService` - Event reviews
- `adminService` - Admin operations
- `userService` - Profile management
- `notificationService` - Notifications

### Routing Setup

- Public routes: `/`, `/login`, `/register`, `/events`
- Student routes: `/student/*` (protected)
- Organizer routes: `/organizer/*` (protected)
- Admin routes: `/admin/*` (protected)
- Role-based access control

## 🚀 How to Run

1. **Make sure you're in the project directory:**

   ```bash
   cd "f:\A- Sajeewa\3rd Year\IS 3920 - Individual Project on Business Solutions\EventSphere\Project\EventSphere\EventSphere"
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Go to `http://localhost:5173` (or the port shown in terminal)

## 🎨 Design System

### Colors

- **Primary**: Blue (#0ea5e9) - Main brand color
- **Secondary**: Purple (#d946ef) - Accent color
- **Accent**: Orange (#f97316) - Highlights
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography

- **Headings**: Poppins font
- **Body**: Inter font

### Spacing

- Uses Tailwind's spacing scale (0.25rem increments)

## 📋 Next Steps to Complete

### 7. Student Pages (Priority: High)

- [ ] Student Dashboard
- [ ] Events Listing Page with filters
- [ ] Event Details Page
- [ ] Ticket Booking Flow
- [ ] My Bookings Page
- [ ] QR Ticket Display
- [ ] Review/Feedback Form
- [ ] Profile Page

### 8. Organizer Pages (Priority: High)

- [ ] Organizer Dashboard with analytics
- [ ] Create Event Form
- [ ] My Events List
- [ ] Event Edit Page
- [ ] Bookings Management
- [ ] QR Scanner Page
- [ ] Analytics/Reports
- [ ] Profile Page

### 9. Admin Pages (Priority: Medium)

- [ ] Admin Dashboard
- [ ] Event Approval Queue
- [ ] Organizer Approval Queue
- [ ] User Management
- [ ] System Analytics
- [ ] Transaction History

### 10. Additional Features (Priority: Low)

- [ ] Forgot Password Page
- [ ] Email Verification Page
- [ ] 404 Page
- [ ] Contact Page
- [ ] About Page
- [ ] FAQ Page
- [ ] Terms & Privacy Pages

## 🔧 Customization

### To Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... },
    }
  }
}
```

### To Add New API Endpoints

Edit `src/services/apiService.js`:

```javascript
export const yourService = {
  methodName: async (params) => {
    const response = await api.get("/endpoint", { params });
    return response.data;
  },
};
```

### To Add New Routes

Edit `src/App.jsx`:

```javascript
<Route path="/new-route" element={<YourComponent />} />
```

## 📦 Available Packages

- `react-router-dom` - Routing
- `axios` - HTTP requests
- `react-icons` - Icon library
- `lucide-react` - Additional icons
- `qrcode.react` - QR code generation
- `html2canvas` - Screenshot generation
- `jspdf` - PDF generation

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port 5173 is in use", Vite will automatically try the next available port.

### Module Not Found

```bash
npm install
```

### Tailwind Styles Not Loading

Make sure `@import "tailwindcss";` is at the top of `src/index.css`

### API Connection Issues

1. Check that `.env` file exists with correct `VITE_API_BASE_URL`
2. Make sure your Spring Boot backend is running
3. Check CORS configuration in backend

## 📝 Notes

- The current setup uses **mock data** until the backend is connected
- Protected routes will redirect to `/login` if user is not authenticated
- Role-based access is enforced on all protected routes
- All forms include validation
- Responsive design works on mobile, tablet, and desktop

## 🎯 Testing Checklist

### Before Connecting to Backend:

- [x] App starts without errors
- [x] Landing page displays
- [x] Navigation works
- [x] Login/Register pages are accessible
- [x] Forms have validation
- [x] Responsive design works

### After Connecting to Backend:

- [ ] User can register
- [ ] User can login
- [ ] Token is stored and used
- [ ] Protected routes work
- [ ] API calls succeed
- [ ] Error handling works

## 💡 Tips

1. **Use the components**: Don't create new buttons or inputs, use the common components
2. **Follow the structure**: Keep pages in appropriate folders
3. **Use utility functions**: Check `src/utils/helpers.js` for formatting functions
4. **Check constants**: Use constants from `src/utils/constants.js` instead of hardcoding
5. **Responsive first**: Always test on mobile view

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Review existing components for examples
- Check console for error messages
- Use React DevTools for debugging

---

**Status**: Foundation complete ✅ | Ready for feature development 🚀
