# 🏥 MediAgent — Netlify Deployment Guide

Deploy your Agentic AI Doctor Booking app to Netlify in **under 10 minutes**, completely free.

---

## 📁 Project Structure

```
mediagent-netlify/
├── public/
│   └── index.html              ← Frontend SPA (served by Netlify CDN)
├── netlify/
│   └── functions/
│       ├── api.js              ← ALL backend API routes (serverless)
│       └── doctors-data.js     ← Doctor data + AI analysis engine
├── netlify.toml                ← Netlify build + redirect config
├── package.json                ← express + serverless-http dependencies
└── .gitignore
```

---

## 🚀 Method 1 — Deploy via GitHub (Recommended, Auto-deploys on push)

### Step 1 — Create a GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `mediagent-app`
3. Set to **Public** (free Netlify works with both, but public is easier)
4. Click **Create repository**

### Step 2 — Push Your Code

Open a terminal in the **`mediagent-netlify/`** folder and run:

```bash
git init
git add .
git commit -m "🏥 MediAgent v2 — Agentic AI Doctor Booking"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mediagent-app.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3 — Connect to Netlify

1. Go to **https://app.netlify.com** and sign in (or sign up free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Search for and select **`mediagent-app`**

### Step 4 — Configure Build Settings

Netlify will auto-detect the `netlify.toml` — just confirm these settings:

| Field | Value |
|-------|-------|
| **Branch to deploy** | `main` |
| **Build command** | *(leave blank — auto-detected from netlify.toml)* |
| **Publish directory** | `public` |

Click **"Deploy site"** ✅

### Step 5 — Wait ~60 seconds

Netlify will:
- Install `express` + `serverless-http`
- Bundle your functions with esbuild
- Deploy frontend to global CDN
- Give you a URL like `https://mediagent-abc123.netlify.app`

**Your app is live! 🎉**

---

## ⚡ Method 2 — Deploy via Netlify CLI (No GitHub needed)

### Step 1 — Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2 — Login to Netlify

```bash
netlify login
# Opens browser to authorize — click Allow
```

### Step 3 — Install Dependencies

```bash
cd mediagent-netlify
npm install
```

### Step 4 — Test Locally First

```bash
netlify dev
# App runs at http://localhost:8888
# API at http://localhost:8888/api/analyze etc.
```

### Step 5 — Deploy to Production

```bash
netlify deploy --prod
# Follow prompts:
# - Create new site? → Yes
# - Site name: mediagent-yourname (or leave blank for random)
# - Publish directory: public (auto-detected)
```

Done! You'll see:
```
✅  Deploy is live!
Unique deploy URL: https://deploy-preview-1--mediagent.netlify.app
Website URL:       https://mediagent-yourname.netlify.app
```

---

## 🌐 Method 3 — Drag & Drop Deploy (Simplest, no CLI needed)

> ⚠️ This method serves only the **static frontend** — the API/backend won't work.
> Use Method 1 or 2 for the full app.

1. Go to **https://app.netlify.com**
2. Scroll to **"Deploy manually"** at the bottom
3. Drag the **`public/`** folder onto the drop zone
4. Done — but API calls will fail without the functions layer

---

## ✅ Verify Your Deployment

Once live, test these URLs in your browser (replace `YOUR-SITE` with your Netlify subdomain):

```
https://YOUR-SITE.netlify.app/                          → Frontend UI
https://YOUR-SITE.netlify.app/api/doctors               → Returns 8 doctors JSON
https://YOUR-SITE.netlify.app/api/analyze               → POST endpoint (use curl)
```

Quick curl test:
```bash
curl -X POST https://YOUR-SITE.netlify.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"chest pain and breathlessness"}'
```

Expected: JSON with `recommendedDoctors`, `confidence`, `urgencyLevel`

---

## 🎨 Add a Custom Domain (Free)

1. In Netlify dashboard → **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g. `mediagent.yourdomain.com`)
4. Netlify provides free SSL automatically via Let's Encrypt

---

## ⚙️ Environment Variables (For Email/WhatsApp in Production)

In **Netlify dashboard → Site settings → Environment variables**, add:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_USER` | `your@gmail.com` |
| `SMTP_PASS` | `your-app-password` |
| `TWILIO_SID` | `ACxxxx...` |
| `TWILIO_TOKEN` | `your-auth-token` |
| `TWILIO_WHATSAPP` | `whatsapp:+14155238886` |

Then update `netlify/functions/api.js` to use `process.env.SMTP_USER` etc.

---

## ⚠️ Important Notes

### Bookings are in-memory only
Since Netlify Functions are stateless serverless lambdas, **bookings reset when the function cold-starts**. For persistent bookings, integrate a free database:
- **Supabase** (free PostgreSQL) — `npm install @supabase/supabase-js`
- **PlanetScale** (free MySQL) — `npm install @planetscale/database`
- **Upstash Redis** (free Redis) — `npm install @upstash/redis`

### Function timeout
Netlify free tier functions timeout after **10 seconds** — more than enough for this app.

### Logs
View live function logs at:
**Netlify Dashboard → Functions → `api` → View logs**

---

## 🔄 Redeploying After Changes

**With GitHub (Method 1):** Just `git push` — Netlify auto-deploys in ~30s.

**With CLI (Method 2):**
```bash
netlify deploy --prod
```

---

## 🆘 Troubleshooting

| Problem | Fix |
|---------|-----|
| `Function invocation failed` | Check function logs in Netlify dashboard |
| `module not found: express` | Run `npm install` before deploying, or push `package.json` to GitHub |
| API returns 404 | Check `netlify.toml` redirects are present |
| White screen on load | Inspect browser console — likely API URL mismatch |
| Bookings disappear | Expected — serverless functions are stateless; add a DB for persistence |

---

## 📞 Support

- Netlify Docs: https://docs.netlify.com
- Netlify Functions: https://docs.netlify.com/functions/overview/
- Express on Netlify: https://docs.netlify.com/frameworks/express/
