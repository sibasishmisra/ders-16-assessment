# DERS-16 Assessment Platform

A modern, interactive web application for administering the Difficulties in Emotion Regulation Scale (DERS-16) assessment, designed for hiring decisions in modern organizations.

## Features

### Candidate Experience
- **One Question at a Time**: Progressive disclosure pattern for better focus
- **Progress Tracking**: Visual progress bar showing completion status
- **Timer**: Tracks time taken for each assessment
- **Helpful Tooltips**: Examples for each question to guide responses
- **Modern UI/UX**: Clean, calming design with smooth transitions
- **Mobile Responsive**: Works seamlessly on all devices

### Admin Dashboard
- **View All Assessments**: Comprehensive list of all completed assessments
- **Detailed Scoring**: Total scores and subscale breakdowns
- **Search & Filter**: Find candidates by name or email
- **Sort Options**: Sort by date or score
- **Export to CSV**: Download assessment data for further analysis
- **Real-time Stats**: Overview of assessment metrics

### DERS-16 Subscales
The assessment measures six dimensions of emotion regulation:
- **Awareness**: Attention to emotions
- **Clarity**: Understanding emotions
- **Goals**: Difficulty pursuing goals when upset
- **Impulse**: Impulse control difficulties
- **Strategies**: Access to emotion regulation strategies
- **Non-Acceptance**: Non-acceptance of emotional responses

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ders-16-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the values:
- `DATABASE_URL`: Path to SQLite database (default: `file:./prisma/dev.db`)
- `NEXTAUTH_SECRET`: Generate a secure secret (use `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your application URL (default: `http://localhost:3000`)

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Create an admin user:
```bash
npm run seed
```

This creates an admin account with:
- Email: `admin@example.com`
- Password: `admin123`

**⚠️ Important**: Change the admin password after first login!

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Usage

### For Candidates

1. Visit the homepage
2. Click "Start Assessment"
3. Enter your name and email
4. Answer all 16 questions honestly
5. View your results upon completion

### For Administrators

1. Visit `/admin` or click "Admin Login" on the homepage
2. Log in with admin credentials
3. View all assessments in the dashboard
4. Search, filter, and export data as needed

## Deployment to Vercel

1. Push your code to GitHub

2. Import the project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Configure environment variables in Vercel:
   - `DATABASE_URL`: `file:./prisma/dev.db`
   - `NEXTAUTH_SECRET`: Generate a secure secret
   - `NEXTAUTH_URL`: Your Vercel deployment URL

4. Add build command override (if needed):
   ```
   npx prisma generate && next build
   ```

5. Deploy!

**Note**: For production, consider using a more robust database like PostgreSQL. Update the `datasource` in `prisma/schema.prisma` and run migrations.

## Project Structure

```
ders-16-assessment/
├── app/
│   ├── api/
│   │   ├── assessment/submit/    # Assessment submission endpoint
│   │   ├── admin/assessments/    # Admin data endpoint
│   │   └── auth/[...nextauth]/   # NextAuth configuration
│   ├── assessment/
│   │   ├── start/                # Candidate information form
│   │   ├── questions/            # Question flow
│   │   └── complete/             # Results page
│   ├── admin/
│   │   ├── page.tsx              # Admin login
│   │   └── dashboard/            # Admin dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── providers.tsx             # Session provider
├── lib/
│   ├── prisma.ts                 # Prisma client
│   ├── questions.ts              # DERS-16 questions
│   └── scoring.ts                # Scoring logic
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
└── scripts/
    └── seed-admin.ts             # Admin user seeder
```

## Scoring Interpretation

- **16-32**: Low difficulty with emotion regulation
- **33-48**: Moderate difficulty with emotion regulation
- **49-64**: High difficulty with emotion regulation
- **65-80**: Very high difficulty with emotion regulation

Higher scores indicate greater difficulty with emotion regulation.

## Security Considerations

- Admin passwords are hashed using bcrypt
- Session-based authentication with NextAuth.js
- Environment variables for sensitive data
- Input validation on all forms
- SQL injection protection via Prisma

## Customization

### Changing Questions
Edit `lib/questions.ts` to modify questions, examples, or subscales.

### Styling
The application uses Tailwind CSS. Modify colors and styles in:
- `tailwind.config.ts` for theme customization
- Component files for specific styling

### Adding Features
- Add new admin features in `app/admin/dashboard/`
- Extend the API in `app/api/`
- Modify scoring logic in `lib/scoring.ts`

## License

This project is for educational and organizational use.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for modern organizations
# ders-16-assessment
