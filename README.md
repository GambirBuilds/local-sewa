# Local Sewa — Nepal Local Service Marketplace

> **"Trusted Local Services, Right When You Need Them."**

Local Sewa is a modern, responsive web application tailored for **Kathmandu Valley, Nepal** (Kathmandu, Lalitpur, and Bhaktapur). It connects households and commercial establishments with verified local tradespeople and technical specialists—including electricians, plumbers, carpenters, mechanics, home cleaning teams, IT technicians, appliance repairers, and locksmiths.

---

![alt text](image.png)

## 1. Problem Statement

Across Nepal’s urban centers, finding reliable, skilled local service providers has historically been challenging:

- Relying on word-of-mouth or random roadside stickers
- Inconsistent and arbitrary pricing with no benchmark
- Uncertainty regarding technician trustworthiness and background
- Inability to schedule or track emergency requests (e.g., midnight short-circuits, burst pipes, flat bike tyres)

## 2. Solution

**Local Sewa** organizes Kathmandu Valley's informal trade economy into an accessible, transparent digital marketplace:

1. **Search & Filter**: Find providers by service category and hierarchical locality (District → Municipality → Area).
2. **Compare & Verify**: View transparent labor pricing in Nepalese Rupees (NPR), verified ratings, response times, and customer feedback.
3. **Request & Schedule**: Submit structured service requests with problem descriptions, dates, and times.
4. **Track & Review**: Real-time status tracking for customers and full job lifecycle management for service providers.

---

## 3. Key Features

- **Kathmandu Valley Location Engine**:
  - Full hierarchical dependent selector: Province (Bagmati) → District (Kathmandu, Lalitpur, Bhaktapur) → Municipality / Palika → Local Area / Tole.
  - Covers all 11 Kathmandu municipalities, 6 Lalitpur municipalities, and 4 Bhaktapur municipalities.
- **15 Local Service Categories**:
  - Electrician, Plumber, Cleaner, Carpenter, Painter, Computer Technician, Mobile Repair, Appliance Repair, AC/Fridge Technician, Bike/Car Mechanic, Locksmith, Moving Service, Gardener, Laundry, and Home Maintenance.
- **"Need Help Now?" 24/7 Emergency Service**:
  - Quick-request banner for urgent lockouts, electrical hazards, water overflows, and roadside tyre punctures with ~10–15 min response times.
- **Customer Dashboard**:
  - Active, pending, and completed service request tracking.
  - Review and 1–5 star rating submission (enabled strictly for completed services).
  - Spend tracking in NPR (Rs.).
- **Provider Partner Portal**:
  - Dedicated dashboard with incoming job requests, accept/decline actions, and earnings metrics.
  - Stepwise job workflow management: `Accepted` → `On the Way` → `In Progress` → `Completed`.
  - Live "Emergency Availability" toggle.
- **Instant Role Switcher**:
  - Convenient header switch allowing instant toggle between **Customer mode** (Aayush Sharma) and **Provider mode** (Ram Electrical) for testing and demonstration.
- **Persistent State**:
  - Seamless persistence using browser `localStorage` for bookings, reviews, and provider registrations.

---

## 4. Technology Stack

- **Framework**: React.js 19 (JavaScript only, no TypeScript, functional components, hooks)
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React (`lucide-react`)
- **Build Tool**: Vite 8

---

## 5. Project Structure

```text
/
├── index.html                  # HTML entry point with metadata and fonts
├── metadata.json               # Applet identity and capabilities
├── package.json                # Dependencies and build scripts
├── README.md                   # Complete documentation
├── src/
│   ├── assets/
│   │   └── images/             # Generated high-fidelity Nepal service photography
│   ├── components/
│   │   ├── Badge.jsx           # Clean metadata badge
│   │   ├── Button.jsx          # Accessible button variants
│   │   ├── CategoryCard.jsx    # Service category card with pricing
│   │   ├── EmergencyBanner.jsx # "Need Help Now?" 24/7 quick service component
│   │   ├── EmptyState.jsx      # Fallback empty states
│   │   ├── Footer.jsx          # Nepal contact, coverage, and quick links
│   │   ├── Hero.jsx            # Hero section with Kathmandu Valley search
│   │   ├── LoadingSpinner.jsx  # Paced loading indicator
│   │   ├── LocationSelector.jsx# Dependent dropdowns (District -> Municipality -> Area)
│   │   ├── Modal.jsx           # Accessible dialog component
│   │   ├── Navbar.jsx          # Top bar with role switcher and mobile drawer
│   │   ├── ProviderCard.jsx    # Provider card with rating, pricing, and actions
│   │   ├── ProviderGrid.jsx    # Responsive provider card grid
│   │   ├── Rating.jsx          # Star rating display and interactive input
│   │   ├── RequestForm.jsx     # Booking form with location & price estimate
│   │   ├── ReviewCard.jsx      # Customer review with verified booking badge
│   │   ├── SearchBar.jsx       # Multi-attribute search bar
│   │   └── StatusBadge.jsx     # Visual request status indicators
│   ├── context/
│   │   └── AppContext.jsx      # Global state, persistence, and action handlers
│   ├── data/
│   │   ├── locations.js        # Kathmandu Valley administrative hierarchy
│   │   ├── providers.js        # 18 rich verified Nepali provider profiles
│   │   ├── reviews.js          # Realistic customer reviews
│   │   └── services.js         # 15 detailed service categories
│   ├── pages/
│   │   ├── About.jsx           # Mission, story, and core values
│   │   ├── BecomeProvider.jsx  # Partner recruitment & registration CTA
│   │   ├── Contact.jsx         # Help center and Kathmandu office contact
│   │   ├── Dashboard.jsx       # Customer booking portal & review center
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Sign in with quick demo accounts
│   │   ├── NotFound.jsx        # 404 page
│   │   ├── ProviderDashboard.jsx # Provider job management & earnings
│   │   ├── ProviderDetails.jsx # Detailed provider profile with menu & reviews
│   │   ├── Providers.jsx       # Discovery page with multi-facet filters & sorting
│   │   ├── Register.jsx        # Dual-mode customer and provider registration
│   │   ├── RequestService.jsx  # Standalone request booking flow
│   │   └── Services.jsx        # Full 15-category directory
│   ├── App.jsx                 # App routing and shell
│   ├── index.css               # Global Tailwind CSS and typography
│   └── main.jsx                # React root mount
└── vite.config.ts              # Vite configuration
```

---

## 6. Getting Started Locally

### Prerequisites

Node.js (v18+ recommended) and npm.

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
```

---

## 7. Future Backend Architecture Roadmap

The frontend is modularized to easily connect with a production backend:

- **Database**: PostgreSQL / MongoDB for users, service catalogs, requests, and transactions.
- **Authentication**: JWT / Firebase Auth with SMS OTP verification for Nepal (+977) mobile numbers.
- **Payments**: Direct integration with eSewa, Khalti, and Fonepay APIs.
- **Mapping**: Google Maps / OpenStreetMap integration for live GPS tracking.
- **Nepali Localization**: Full Nepali language toggle (नेपाली भाषा सहयोग).

---

## 8. Author & License

- **Developed for**: Local Sewa Nepal Pvt. Ltd.
- **Target Market**: Kathmandu Valley, Nepal
- **License**: MIT
