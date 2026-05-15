# AGENCY-PORTFOLIO

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form storage and email

Contact form submissions are saved to a JSON file in GitHub and shown in the
admin panel at `/admin`. In production, add these Vercel environment variables:

```bash
GITHUB_TOKEN=github_pat_or_fine_grained_token
GITHUB_REPO=balaji3245/AGENCY-PORTFOLIO
GITHUB_CONTACTS_PATH=data/contact-submissions.json
GITHUB_BRANCH=main
RESEND_API_KEY=resend_api_key
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL="YJ DEVELOPERS <noreply@your-domain.com>"
```

The GitHub token needs contents read/write access to this repository. For email,
verify your sending domain in Resend before using a custom `CONTACT_FROM_EMAIL`.

## Admin image uploads

Admin panel image uploads use Supabase Storage instead of storing raw image data
inside the `site_content` row. Add these environment variables in production:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET=site-assets
```

Create a public storage bucket named `site-assets` or change
`SUPABASE_STORAGE_BUCKET` to match your bucket name.
