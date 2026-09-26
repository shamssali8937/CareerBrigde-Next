# CareerBridge

> **A modern, two-sided hiring platform connecting tech talent directly with forward-thinking companies.**

CareerBridge removes traditional recruitment friction by pairing upfront compensation transparency and structured candidate screening with an intuitive applicant tracking dashboard for employers.

---

## 🌟 Key Highlights

- **Role-Based Experience**: Tailored dashboards and workflows for **Job Seekers** and **Job Providers (Employers)**.
- **Custom Screening Questions**: Employers attach role-specific questions to filter high-signal applicants before scheduling interviews.
- **Transparent Compensation**: Real salary and equity expectations presented upfront on every listing.
- **Interactive Applicant Pipeline**: Providers can review rich applicant dossiers (education, experience, portfolio links, and CV preview) and update application status (`Pending`, `Reviewed`, `Accepted`, `Rejected`).
- **Direct Email Outreach**: Send communications and updates to candidates directly from the applicant review drawer via Nodemailer.
- **Media Storage**: Seamless resume (PDF/Doc) and profile avatar uploads powered by Cloudinary.
- **Modern Authentication**: Credentials-based JWT authentication with refresh token rotation alongside Google OAuth via NextAuth.js.
- **Refined Tech Indigo Design System**: Built with Tailwind CSS v4, Material UI (MUI), and Framer Motion—free of AI-generated cliches or pulsing distractions.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & React 19 |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Material UI (MUI)](https://mui.com/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) & React Redux |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/), JWT (`jsonwebtoken` / `jose`), `bcryptjs` |
| **File & Media Storage** | [Cloudinary](https://cloudinary.com/) |
| **Email Delivery** | [Nodemailer](https://nodemailer.com/) (OTP Verification & Outreach) |

---

## 📂 Project Structure

```text
careerbrigde/
├── app/
│   ├── layout.js                     # Root layout with ReduxProvider & Inter typography
│   ├── globals.css                   # Tailwind v4 theme tokens & glassmorphic utilities
│   ├── page.js                       # Landing page inspired by Wellfound & Remote
│   ├── Auth/
│   │   ├── Signin/page.js            # User login page
│   │   ├── Signup/page.js            # Account creation (Job Seeker / Provider selection)
│   │   ├── SignupDetail/page.js      # Basic profile info & password setup
│   │   ├── ForgotPassword/page.js    # OTP-based password reset flow
│   │   └── OAuthRedirectPage/page.js # Google OAuth session handler
│   ├── Seeker/
│   │   ├── HomePage/page.js          # Job discovery feed, search filters & company drawers
│   │   ├── AppliedJobs/page.js       # Candidate application tracking & status chips
│   │   └── SignupSeeker/page.js      # Onboarding experience for job seekers
│   ├── Provider/
│   │   ├── HomePage/page.js          # Employer job feed, Post Job & Edit Job modals
│   │   ├── JobApplications/page.js   # Applicant pipeline, screening review & email dialog
│   │   └── SignupProvider/page.js    # Onboarding experience for employers
│   └── api/
│       ├── auth/[...nextauth]/       # NextAuth Google OAuth handler
│       ├── users/                    # Public authentication endpoints (SignIn, Signup)
│       ├── Protected/                # Authenticated endpoints (Jobs, Profiles, Applications)
│       ├── SendMail/                 # Direct email outreach endpoint
│       └── SendOtp/                  # OTP delivery endpoint
├── components/
│   ├── Navbar.js                     # Sticky glassmorphic header with role-aware navigation
│   ├── AccountMenu.js                # Profile avatar & signout dropdown
│   ├── TextInput.js                  # Standardized responsive input with password toggle
│   ├── ProfileAvatar.js              # Circular user avatar with upload badge
│   ├── SeekerForm.js                 # Seeker profile builder (Skills, Education, Experience, CV)
│   ├── ProviderForm.js               # Employer profile builder (Company details, position)
│   ├── UpdateUserInfoForm.js         # Name & credentials management
│   ├── NewPasswordBox.js             # Password change drawer
│   └── CustomizedSnackbars.js        # Feedback toast notifications
├── layouts/
│   └── Layout.js                     # Split layout for onboarding & authentication pages
├── models/                           # Mongoose schemas
│   ├── user.js                       # User credentials, roles, avatar
│   ├── seeker.js                     # Seeker bio, education, experience, CV URL
│   ├── provider.js                   # Company info, position, website
│   ├── postJob.js                    # Job title, requirements, screening questions, salary
│   ├── jobApplication.js             # Candidate application status, answers & CV
│   └── otp.js                        # OTP verification cache
├── redux/
│   ├── store.js                      # Central Redux store
│   ├── provider.js                   # Client Redux provider wrapper
│   └── slices/                       # signupSlice & userDetailSlice
└── public/                           # Static SVG icons and assets
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (v18.18.0 or higher recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`) or `npm`
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB instance)
- A [Cloudinary](https://cloudinary.com/) account for file uploads
- A Google Cloud Console project for OAuth (optional for local dev)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CareerBridge.git
cd CareerBridge/careerbrigde
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root of `careerbrigde/`:

```env
# Database
MONGO_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/careerbridge"

# JWT Secrets
JWT_SECRET="your_strong_jwt_access_secret"
JWT_REFRESH_SECRET="your_strong_jwt_refresh_secret"

# Cloudinary (Media Uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Nodemailer / Email Service
MAIL="your_verified_email@gmail.com"
PASS_CODE="your_google_app_password"

# NextAuth / Google OAuth (Optional)
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Application Base API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

---

### 4. Run the Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 5. Build for Production

To create an optimized production build:

```bash
pnpm build
# or
npm run build
```

Then start the production server:

```bash
pnpm start
# or
npm run start
```

---

## 🔒 API Endpoints Overview

### Public & Authentication Endpoints
- `POST /api/users/Signup` — Register account with role selection (`jobseeker` or `provider`).
- `POST /api/users/SignIn` — Authenticate user and issue JWT tokens.
- `POST /api/SendOtp` — Generate and dispatch OTP code for password recovery.
- `POST /api/Protected/VerifyOtp` — Verify code and allow password reset.
- `POST /api/Protected/ResetPassword` — Update password after successful verification.

### Job Seeker Endpoints
- `GET /api/Protected/GetSeekerProfile` — Retrieve seeker bio, skills, education, and CV.
- `POST /api/Protected/UpdateSeeker` — Create or update full seeker profile and upload CV.
- `GET /api/Protected/GetAllJobsForSeekerProfile` — Fetch matched and available job opportunities.
- `POST /api/Protected/ApplyJob` — Submit application with CV and screening question responses.
- `GET /api/Protected/GetAllJobApplicationOfSeeker` — Retrieve submitted applications and live review statuses.
- `DELETE /api/Protected/DeleteJobApplication/[appId]` — Withdraw a previously submitted application.

### Job Provider (Employer) Endpoints
- `GET /api/Protected/GetProviderProfile` — Fetch company details and provider metadata.
- `POST /api/Protected/UpdateProvider` — Create or update company information.
- `POST /api/Protected/PostJob` — Publish a new job with requirements and screening questions.
- `PUT /api/Protected/EditJob` — Edit existing job details and criteria.
- `DELETE /api/Protected/DeleteJob/[jobId]` — Remove a posted job listing.
- `GET /api/Protected/GetJobsOfSpecificProvider` — Retrieve all jobs posted by the employer.
- `GET /api/Protected/GetApplicationForSpecificJob/[jobId]` — List applicants for a specific position.
- `PUT /api/Protected/ChangeApplicationStatus/[appId]` — Update candidate status (`Reviewed`, `Accepted`, `Rejected`).
- `POST /api/SendMail` — Dispatch direct email outreach to a candidate.

---

## 🎨 Design System & Theme

CareerBridge utilizes a **Modern Tech Indigo** palette designed for visual clarity:

- **Primary**: Deep Indigo (`#4f46e5`, `#4338ca`)
- **Secondary**: Violet Accent (`#7c3aed`, `#6d28d9`)
- **Surface**: Ultra-clean Slate backgrounds (`#ffffff`, `#f8fafc`, `#f1f5f9`)
- **Text**: High-contrast Slate typography (`#0f172a`, `#334155`, `#64748b`)
- **Status Badges**:
  - `Accepted` / `Success`: Emerald (`#10b981`, `bg-emerald-50 text-emerald-700`)
  - `Reviewed` / `Active`: Sky / Indigo (`#6366f1`, `bg-indigo-50 text-indigo-700`)
  - `Pending` / `Notice`: Amber (`#f59e0b`, `bg-amber-50 text-amber-700`)
  - `Rejected` / `Warning`: Rose (`#f43f5e`, `bg-rose-50 text-rose-700`)

---

## 🤝 Contributing

Contributions are welcome! If you would like to contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
