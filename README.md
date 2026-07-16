# Mr.Farid Learning Portal

An interactive English learning portal designed and developed by **Mr. Mohamed Farid**, English Teacher and Educational Content Designer.

The portal is designed for primary students from **Primary 1 to Primary 6**. Each grade provides access to two curricula:

- English Primary 1–6
- Connect Plus Primary 1–6

## Current features

- Responsive full-screen educational landing page
- Student sign-in and account registration interfaces
- Grade selection during registration
- Student curriculum access screen
- Public curriculum overview for Primary 1–6
- Professional teacher profile page
- About the Portal page
- WhatsApp and Facebook contact links
- Liquid-glass interface across the portal

## Planned integration

The next development phase will connect the portal to Supabase for:

- Secure authentication
- Student profiles and grade assignment
- Curriculum access permissions
- Lesson progress and assessments
- English Primary 1 content

## Run locally

Requirements: Node.js 22 or later.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
```

## Content and security

- Do not commit Supabase service-role keys or other private credentials.
- Keep environment variables in local `.env` files; they are ignored by Git.
- Do not upload copyrighted textbook PDFs to a public repository.

© Mr. Mohamed Farid. All rights reserved.
