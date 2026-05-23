# Deployment Guide

## Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: DERS-16 Assessment Platform"
```

2. Push to GitHub:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `prisma generate && next build`
   - **Install Command**: `npm install`

### Step 3: Environment Variables

Add these environment variables in Vercel:

```
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://your-app.vercel.app
```

**Important**: Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Step 4: Database Setup

After first deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Functions
2. Enable "Serverless Function Execution Timeout" (if needed)
3. Run migrations via Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
npx prisma migrate deploy
```

4. Seed the admin user:
```bash
vercel exec npm run seed
```

Or manually create an admin via Prisma Studio:
```bash
npx prisma studio
```

### Step 5: Verify Deployment

1. Visit your Vercel URL
2. Test the candidate flow
3. Log in to admin panel with your credentials
4. Verify all features work correctly

## Production Considerations

### Database

For production, consider upgrading from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Get a PostgreSQL database:
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)
   - [Neon](https://neon.tech)

3. Update `DATABASE_URL` in Vercel environment variables

4. Run migrations:
```bash
npx prisma migrate deploy
```

### Security

1. **Change Default Admin Password**:
   - Log in with `admin@example.com` / `admin123`
   - Immediately change the password

2. **Secure NEXTAUTH_SECRET**:
   - Use a strong, randomly generated secret
   - Never commit it to version control

3. **HTTPS Only**:
   - Vercel provides HTTPS by default
   - Ensure `NEXTAUTH_URL` uses `https://`

### Performance

1. **Enable Caching**:
   - Vercel automatically caches static assets
   - Consider adding ISR for dynamic pages if needed

2. **Database Optimization**:
   - Add indexes for frequently queried fields (already done)
   - Monitor query performance

3. **Image Optimization**:
   - Use Next.js Image component for any images
   - Vercel handles optimization automatically

## Alternative Deployment Options

### Railway

1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Import from GitHub
3. Configure build settings
4. Add environment variables
5. Deploy

### Self-Hosted

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start npm --name "ders16" -- start
```

4. Set up reverse proxy (nginx/Apache)
5. Configure SSL certificate (Let's Encrypt)

## Monitoring

### Vercel Analytics

Enable Vercel Analytics for:
- Page views
- Performance metrics
- User behavior

### Error Tracking

Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)
- [Better Uptime](https://betteruptime.com)

## Backup Strategy

### Database Backups

1. **Automated Backups** (PostgreSQL):
   - Most providers offer automatic backups
   - Configure retention period

2. **Manual Backups**:
```bash
# PostgreSQL
pg_dump $DATABASE_URL > backup.sql

# SQLite
cp prisma/dev.db backup/dev-$(date +%Y%m%d).db
```

3. **Export to CSV**:
   - Use admin dashboard export feature
   - Schedule regular exports

## Troubleshooting

### Build Failures

- Check Prisma client generation
- Verify all dependencies are installed
- Review build logs in Vercel dashboard

### Database Connection Issues

- Verify `DATABASE_URL` format
- Check database provider status
- Ensure migrations are applied

### Authentication Problems

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches deployment URL
- Clear browser cookies and try again

## Support

For deployment issues:
1. Check Vercel documentation
2. Review application logs
3. Open an issue in the repository

---

Happy deploying! 🚀
