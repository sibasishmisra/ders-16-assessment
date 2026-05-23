# Quick Start Guide

Get the DERS-16 Assessment Platform running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
```

The default `.env` file works for local development. For production, update:
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your production URL

### 3. Initialize Database
```bash
npx prisma migrate dev
```

This creates the SQLite database and applies all migrations.

### 4. Create Admin User
```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

⚠️ **Important**: Change this password after first login!

### 5. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## What to Test

### Candidate Flow
1. Go to http://localhost:3000
2. Click "Start Assessment"
3. Enter name and email
4. Complete all 16 questions
5. View results

### Admin Dashboard
1. Go to http://localhost:3000/admin
2. Login with admin credentials
3. View assessment results
4. Try search, filter, and export features

## Next Steps

- [ ] Change admin password
- [ ] Customize branding and colors
- [ ] Review questions in `lib/questions.ts`
- [ ] Test on mobile devices
- [ ] Deploy to Vercel (see DEPLOYMENT.md)

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Database Locked
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev
npm run seed
```

### Prisma Client Not Generated
```bash
npx prisma generate
```

## File Locations

- **Questions**: `lib/questions.ts`
- **Scoring Logic**: `lib/scoring.ts`
- **Database Schema**: `prisma/schema.prisma`
- **Environment Config**: `.env`
- **Admin Credentials**: Created by `npm run seed`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Create admin user
npm run seed

# Lint code
npm run lint
```

## Project Structure

```
ders-16-assessment/
├── app/              # Pages and API routes
├── lib/              # Utilities and logic
├── prisma/           # Database schema and migrations
├── scripts/          # Utility scripts
└── public/           # Static assets
```

## Need Help?

- 📖 Read `README.md` for detailed documentation
- 🚀 Check `DEPLOYMENT.md` for deployment guides
- 📋 See `PROJECT_SUMMARY.md` for complete overview
- 🐛 Open an issue for bugs or questions

## Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Run migrations: vercel exec npx prisma migrate deploy
# Seed admin: vercel exec npm run seed
```

---

**You're all set!** 🎉

Start building your assessment platform or deploy to production.
