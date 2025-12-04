# 🚀 Quick Start Guide - Phase 1

Fast reference guide for testing Phase 1 features.

---

## ⚡ Start the Application

```bash
# Navigate to project directory
cd "f:\A- Sajeewa\3rd Year\IS 3920 - Individual Project on Business Solutions\EventSphere\Project\EventSphere\EventSphere"

# Start dev server
npm run dev
```

**Server URL**: http://localhost:5174

---

## 🔐 Login as Student

1. Go to http://localhost:5174/login
2. Select **"Student"** role
3. Enter any email (e.g., `student@university.lk`)
4. Enter any password (e.g., `password123`)
5. Click **"Sign In"**

You'll be redirected to `/student/dashboard`

---

## 🎯 Test All Features (5-Minute Test)

### 1. Browse Events (30 seconds)

- Go to http://localhost:5174/events
- Try the search bar
- Apply a category filter
- Sort by price
- Click any event card

### 2. View Event Details (30 seconds)

- Check event information
- Scroll to ticket types
- Click **"Book Tickets"** button
- Select quantity (1-5)
- Click **"Proceed to Booking"**

### 3. Complete Booking (2 minutes)

**Step 1: User Details**

- Fill in your name
- Enter email and phone
- Enter student ID (any format)
- Click **"Continue to Payment"**

**Step 2: Payment**

- Select **"Credit/Debit Card"**
- Enter card number: `4242 4242 4242 4242`
- Expiry: `12/25`
- CVV: `123`
- Name: Your name
- Click **"Confirm Booking"**

**Step 3: Confirmation**

- Note your booking ID (e.g., BK001)
- Click **"View My Tickets"**

### 4. View Dashboard (30 seconds)

- Go to http://localhost:5174/student/dashboard
- Check statistics cards
- View upcoming bookings widget
- Try quick action buttons

### 5. Manage Bookings (1 minute)

- Go to http://localhost:5174/student/bookings
- Click **"View Ticket"** on any booking
- See the QR code
- Click **"Download PDF"**
- Close the modal
- Switch to **"Past"** tab

---

## 📍 All Routes

### Public Routes (No Login Required)

```
/                    → Landing Page
/login               → Login Page
/register            → Register Page
/events              → Events Listing
/events/1            → Event Details (Tech Summit)
/events/2            → Event Details (Cultural Festival)
```

### Student Routes (Login Required)

```
/student/dashboard         → Student Dashboard
/student/bookings          → My Bookings
/student/bookings/BK001    → View Specific Ticket
/student/booking           → Booking Flow
```

---

## 🎨 Demo Scenarios

### Scenario 1: Book a Free Event

1. Browse events → Find "Web Development Workshop" (Free)
2. View details → Book ticket
3. Fill details → Skip payment (automatic)
4. Get confirmation

### Scenario 2: Book Multiple Tickets

1. Browse events → Find "Cultural Festival"
2. View details → Select VIP ticket
3. Change quantity to 2
4. Complete booking → Pay Rs. 4,200 (Rs. 2,000 × 2 + 5% fee)

### Scenario 3: Filter & Search

1. Go to events page
2. Search: "Tech"
3. Filter: Category = "Conference"
4. Sort: Price (Low to High)
5. Click first result

### Scenario 4: Cancel Booking

1. Go to My Bookings
2. Find an upcoming booking
3. Click **"Cancel Booking"**
4. Confirm cancellation
5. Check status changes to "CANCELLED"

---

## 🧪 Test Mock Data

### Mock Events (6 total)

1. **Tech Innovation Summit** - Rs. 1,500 (Conference)
2. **Annual Cultural Festival** - Rs. 2,000 (Cultural)
3. **Hackathon 2025** - Rs. 1,000 (Hackathon)
4. **Business Leadership Workshop** - Rs. 500 (Workshop)
5. **Inter-University Sports Meet** - Free (Sports)
6. **Charity Concert** - Rs. 1,200 (Cultural)

### Mock Bookings (3 total)

1. **BK001** - Tech Summit (Upcoming, Confirmed)
2. **BK002** - Cultural Festival (Upcoming, Confirmed)
3. **BK003** - Web Workshop (Past, Attended)

---

## 🎯 Features to Test

### Must Test

- ✅ Search events by name
- ✅ Filter events by category
- ✅ Sort events by price
- ✅ View event details
- ✅ Book ticket (complete flow)
- ✅ View QR ticket
- ✅ Download PDF
- ✅ Cancel booking
- ✅ Dashboard statistics
- ✅ Responsive design (resize browser)

### Nice to Test

- ✅ Empty states (clear all filters)
- ✅ Form validation (submit empty form)
- ✅ Countdown timers (check upcoming events)
- ✅ Tab switching (Upcoming/Past bookings)
- ✅ Navigation breadcrumbs
- ✅ Share buttons on event details
- ✅ Quick action buttons

---

## 🐛 Common Issues & Solutions

### Issue: Port 5174 Already in Use

**Solution**:

```bash
# Kill the process or use different port
npm run dev -- --port 3000
```

### Issue: Page Not Loading

**Solution**:

1. Check if dev server is running
2. Clear browser cache (Ctrl + Shift + R)
3. Check console for errors (F12)

### Issue: Login Not Working

**Solution**:

- Any credentials work (mock auth)
- Just select "Student" role
- If redirecting incorrectly, clear localStorage

### Issue: QR Code Not Showing

**Solution**:

- Refresh the page
- Check if `qrcode.react` is installed
- Try a different browser

### Issue: PDF Download Not Working

**Solution**:

- Check browser's download settings
- Try Chrome (best compatibility)
- Disable pop-up blocker

---

## 🔧 Developer Tools

### Chrome DevTools Shortcuts

- **F12** - Open DevTools
- **Ctrl + Shift + C** - Inspect element
- **Ctrl + Shift + M** - Toggle device toolbar (mobile view)
- **Ctrl + Shift + R** - Hard refresh

### React DevTools

If installed:

- Check component props and state
- View AuthContext values
- Debug re-renders

### Vite DevTools

- Check HMR (Hot Module Replacement)
- View build time
- Check bundle size

---

## 📊 Test Coverage Matrix

| Feature        | Mobile | Tablet | Desktop |
| -------------- | ------ | ------ | ------- |
| Landing Page   | ✅     | ✅     | ✅      |
| Events Listing | ✅     | ✅     | ✅      |
| Event Details  | ✅     | ✅     | ✅      |
| Booking Flow   | ✅     | ✅     | ✅      |
| Dashboard      | ✅     | ✅     | ✅      |
| My Bookings    | ✅     | ✅     | ✅      |
| QR Ticket      | ✅     | ✅     | ✅      |

---

## 🎨 Visual Test Points

### Color Consistency

- Primary blue (#0ea5e9) on buttons and links
- Success green on confirmed bookings
- Danger red on cancel actions

### Typography

- Headings use Poppins font
- Body text uses Inter font
- Consistent sizing (text-sm, text-base, text-lg, etc.)

### Spacing

- Consistent padding in cards
- Proper margins between sections
- Aligned elements

### Animations

- Smooth hover effects on cards
- Fade-in for modals
- Button loading spinners

---

## ⚡ Performance Test

### Load Times (Target)

- Landing page: < 2 seconds
- Events listing: < 2 seconds
- Event details: < 1 second
- Dashboard: < 2 seconds

### Smooth Interactions

- Search typing: No lag
- Filter changes: Instant
- Sort changes: Instant
- Navigation: Instant

---

## 📱 Mobile Testing

### Test on Different Screen Sizes

1. **iPhone SE** (375px): Smallest mobile
2. **iPhone 12 Pro** (390px): Standard mobile
3. **iPad** (768px): Tablet
4. **iPad Pro** (1024px): Large tablet
5. **Desktop** (1280px+): Full desktop

### Mobile-Specific Features

- Touch-friendly button sizes (min 44px)
- Swipeable tabs
- Collapsible filters
- Bottom-aligned modals

---

## 🎯 Success Criteria

Phase 1 is successful if:

- ✅ All 6 main features work
- ✅ No console errors
- ✅ Responsive on all devices
- ✅ Forms validate correctly
- ✅ QR codes generate
- ✅ PDFs download
- ✅ Navigation works smoothly
- ✅ UI looks professional

---

## 📞 Quick Troubleshooting

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Check for updates
npm outdated

# Rebuild
npm run build
```

---

## 🚀 Ready to Test!

**Start Testing in 3 Steps**:

1. `npm run dev`
2. Open http://localhost:5174
3. Follow the 5-minute test guide above

**Enjoy testing EventSphere!** 🎉

---

_Quick Start Guide - Phase 1_  
_EventSphere University Event Management Platform_  
_December 2025_
