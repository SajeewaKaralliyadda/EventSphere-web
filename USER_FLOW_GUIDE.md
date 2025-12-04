# 🎯 Student User Flow Guide

This guide shows the complete student journey through EventSphere.

---

## 📍 User Journey Map

```
Landing Page (/)
    ↓
    ├─→ Browse Events (/events)
    │       ↓
    │   [Search & Filter Events]
    │       ↓
    │   Event Details (/events/:id)
    │       ↓
    │   [Select Ticket Type]
    │       ↓
    │   Login Required? → Login Page (/login)
    │       ↓
    ├─→ Booking Page (/student/booking)
    │       ↓
    │   Step 1: User Details
    │       ↓
    │   Step 2: Payment
    │       ↓
    │   Step 3: Confirmation
    │       ↓
    └─→ Student Dashboard (/student/dashboard)
            ↓
        My Bookings (/student/bookings)
            ↓
        [View QR Ticket]
            ↓
        [Download PDF]
```

---

## 🔐 Authentication Flow

```
New User:
Landing → Register → Email Verification → Login → Dashboard

Existing User:
Landing → Login → Dashboard

Guest:
Landing → Browse Events → [Login Required for Booking]
```

---

## 🎫 Booking Flow (Detailed)

### Step 1: Event Discovery

**Page**: `/events`

**Actions**:

- Browse all available events
- Use search bar to find specific events
- Apply filters (category, faculty, price)
- Sort events (date, price, popularity)
- Click event card to view details

**Data Shown**:

- Event thumbnail image
- Event title and date
- Venue and organizer
- Price (from lowest ticket)
- Category badge

---

### Step 2: Event Details

**Page**: `/events/:eventId`

**Actions**:

- View full event information
- Read event description
- Check available ticket types
- See venue and timing details
- Read reviews and ratings
- Share event on social media
- Click "Book Tickets" button

**Data Shown**:

- Event banner image
- Full event details
- Multiple ticket types with prices
- Available seats counter
- Organizer information
- Reviews and ratings
- Share buttons

---

### Step 3: Ticket Selection

**Component**: Booking Modal (on Event Details page)

**Actions**:

- Select ticket type (General, VIP, etc.)
- Choose quantity (up to 5 tickets)
- View total price calculation
- Click "Proceed to Booking"

**Validation**:

- Check if user is logged in
- Verify user has STUDENT role
- Ensure sufficient seats available

---

### Step 4: User Details

**Page**: `/student/booking` (Step 1)

**Actions**:

- Fill in personal information
- Provide contact details
- Enter student ID
- Add special requests (optional)
- Click "Continue to Payment"

**Form Fields**:

- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Student ID (required)
- Special Requests (optional)

**Validation**:

- Email format check
- Phone number format check
- Student ID format check
- All required fields filled

---

### Step 5: Payment

**Page**: `/student/booking` (Step 2)

**Actions**:

- Select payment method
- Enter card details (if card payment)
- Review order summary
- Click "Confirm Booking"

**Payment Options**:

- Credit/Debit Card
- Bank Transfer

**Free Events**:

- Skip payment step automatically
- Go directly to confirmation

**Order Summary** (Sidebar):

- Event image and title
- Ticket type and quantity
- Subtotal
- Service fee (5%)
- Grand total

---

### Step 6: Confirmation

**Page**: `/student/booking` (Step 3)

**Actions**:

- View booking confirmation
- See booking ID
- Review order summary
- Navigate to "View My Tickets"
- Or "Browse More Events"

**Data Shown**:

- Success message
- Booking ID
- Event details
- Total amount paid
- Next steps instructions

---

### Step 7: Ticket Management

**Page**: `/student/bookings`

**Actions**:

- View all bookings (upcoming/past tabs)
- Click "View Ticket" button
- See QR code modal
- Download ticket as PDF
- Cancel booking (if upcoming)
- View event details

**Booking Card Info**:

- Event image
- Event title and date
- Venue
- Ticket type and quantity
- Booking status badge
- Countdown timer (upcoming events)

---

### Step 8: QR Ticket

**Component**: Ticket Modal

**Actions**:

- View digital ticket
- See QR code for entry
- Download as PDF
- Print ticket

**Ticket Contains**:

- EventSphere branding
- Event title and details
- Date, time, and venue
- Ticket type and quantity
- QR code (for scanning at entrance)
- Attendee name and student ID
- Booking ID
- Booking status

---

## 🏠 Dashboard Overview

**Page**: `/student/dashboard`

**Sections**:

1. **Welcome Banner**

   - Personalized greeting
   - Quick overview message

2. **Statistics Cards**

   - Total Bookings count
   - Upcoming Events count
   - Past Events count

3. **Upcoming Bookings Widget**

   - Next 3 upcoming bookings
   - Countdown timers
   - Quick actions (View Ticket, Event Details)
   - Empty state if no bookings

4. **Quick Actions Sidebar**

   - Browse Events button
   - My Tickets button
   - My Profile button

5. **Recommended Events**
   - 4 suggested events
   - Based on interests/categories
   - Quick view button

---

## 🔄 Common User Actions

### Search for Event

```
Dashboard → Browse Events → Enter search term → View results
```

### Filter Events

```
Events Page → Click Filters → Select category/faculty/price → Apply
```

### Book Free Event

```
Event Details → Book Tickets → Select quantity →
Enter details → Skip payment → Confirmation
```

### Book Paid Event

```
Event Details → Book Tickets → Select quantity →
Enter details → Payment → Confirmation
```

### Cancel Booking

```
My Bookings → Select booking → Cancel button → Confirm
```

### Download Ticket

```
My Bookings → View Ticket → Download PDF button
```

### Share Event

```
Event Details → Share button → Select platform → Share
```

---

## 🎨 UI States

### Loading States

- **Page Loading**: Full-screen spinner
- **Button Loading**: Spinner with disabled state
- **Data Fetching**: Skeleton loaders (future enhancement)

### Empty States

- **No Events**: "No events found" with browse button
- **No Bookings**: "No bookings yet" with explore button
- **No Search Results**: "Try different filters" message

### Error States

- **Form Errors**: Red text below input fields
- **API Errors**: Toast notifications (future enhancement)
- **Network Errors**: Retry button with error message

### Success States

- **Booking Confirmed**: Green checkmark with message
- **Ticket Downloaded**: Success toast
- **Booking Cancelled**: Confirmation message

---

## 📱 Responsive Behavior

### Mobile (< 640px)

- Single column layouts
- Stacked booking form
- Full-width buttons
- Collapsible filters
- Bottom-sheet modals

### Tablet (640px - 1024px)

- Two-column event grid
- Side-by-side form fields
- Smaller ticket modal
- Optimized spacing

### Desktop (> 1024px)

- Three-column event grid
- Sidebar layouts
- Large ticket modal
- Optimal content width

---

## 🚦 Conditional Logic

### Authentication Required

- Viewing events: ❌ No auth needed
- Viewing event details: ❌ No auth needed
- Booking tickets: ✅ Auth required
- Viewing dashboard: ✅ Auth required
- Managing bookings: ✅ Auth required

### Role-Based Access

- Student Dashboard: Only STUDENT role
- Booking tickets: Only STUDENT role
- Viewing events: All users (including guests)

### Booking Rules

- Max 5 tickets per booking
- Must have available seats
- Cannot book past events
- Cannot book cancelled events

### Cancellation Rules

- Can cancel only CONFIRMED bookings
- Cannot cancel after event start time
- Refund policy applies (future feature)

---

## 💡 Tips for Users

### Best Practices

1. **Book Early**: Popular events sell out quickly
2. **Check Email**: Confirmation sent to email
3. **Save Ticket**: Download PDF before event
4. **Arrive Early**: Allow time for check-in
5. **Keep Student ID**: May be required at entrance

### Troubleshooting

- **Can't Book**: Check if logged in as student
- **No QR Code**: Refresh the page
- **PDF Won't Download**: Try different browser
- **Event Not Found**: It may be cancelled/removed

---

## 🎯 Success Metrics

**Student Engagement**:

- Time on event details page
- Ticket booking completion rate
- Return visit rate
- Events bookmarked/shared

**User Experience**:

- Average booking time (target: < 2 minutes)
- Form abandonment rate (target: < 20%)
- Ticket download rate (target: > 80%)
- Mobile vs desktop usage

---

**Happy Event Booking!** 🎉
