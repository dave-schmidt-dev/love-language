# Deploying to Azure Static Web Apps (Free Tier + SSL)

## Why Static Web Apps over App Service

Azure App Service free tier (F1) doesn't support SSL on custom domains. You'd need Basic tier (~$13/month). Azure Static Web Apps free tier includes:
- Custom domains
- Free managed SSL certificates (auto-renewed)
- Global CDN
- Direct CLI deployment (no GitHub required)

---

## Prerequisites

- Azure account (free tier works)
- Node.js installed locally
- Access to DNS settings for zerodave.dev

---

## Step 1: Build the App Locally

```bash
cd love-language-app
npm install
npm run build
```

This creates a `dist` folder with your production build.

---

## Step 2: Create the Static Web App in Azure Portal

1. Go to [portal.azure.com](https://portal.azure.com)
2. Search for "Static Web Apps" → Create
3. Fill in:
   - **Subscription**: Your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `love-language-quiz` (or whatever)
   - **Plan type**: Free
   - **Region**: Pick closest to your users
   - **Source**: Other (this skips the GitHub integration)
4. Review + Create

Once created, go to the resource's Overview page and note the URL (something like `https://xxx.azurestaticapps.net`).

---

## Step 3: Deploy with SWA CLI

Install the Azure Static Web Apps CLI:

```bash
npm install -g @azure/static-web-apps-cli
```

Deploy your built app:

```bash
cd love-language-app
swa deploy ./dist --env production
```

First time, it will:
1. Open a browser for Azure login
2. Ask you to select your subscription
3. Ask you to select or create a Static Web App (pick the one you created)

After that, your app is live at the Azure URL.

### Future deployments

```bash
npm run build
swa deploy ./dist --env production
```

That's it—two commands.

---

## Step 3 (Alternative): Deploy via Azure Portal

If you don't want to use the CLI:

1. In Azure Portal, go to your Static Web App
2. Left sidebar → Deployment tokens → Manage deployment token → Copy
3. Use the token with the CLI:

```bash
swa deploy ./dist --deployment-token YOUR_TOKEN --env production
```

---

## Step 4: Verify Initial Deployment

Your app will be live at:
```
https://<generated-name>.azurestaticapps.net
```

Find this URL in the Azure Portal under your Static Web App's Overview page.

---

## Step 4: Configure Custom Domain

### 4a. Add the custom domain in Azure

1. In Azure Portal, go to your Static Web App
2. Left sidebar → Custom domains
3. Click "+ Add"
4. Enter your subdomain: `lovelanguage.zerodave.dev` (or whatever you want)
5. Azure will show you the DNS record to create

### 4b. Configure DNS

In your DNS provider (wherever zerodave.dev is registered):

**For a subdomain like `lovelanguage.zerodave.dev`:**

Add a CNAME record:
```
Type:  CNAME
Name:  lovelanguage
Value: <your-app-name>.azurestaticapps.net
TTL:   3600 (or default)
```

**If using Cloudflare:**
- Add the CNAME record
- Set proxy status to "DNS only" (gray cloud) initially for validation
- After validation completes, you can enable proxying if desired

### 4c. Validate and wait for SSL

1. Back in Azure Portal, click "Validate" next to your custom domain
2. Once DNS propagates (usually 5-15 minutes), validation will succeed
3. Azure automatically provisions a free SSL certificate (can take up to 24 hours, usually ~10 minutes)

---

## Step 5: Verify

Visit `https://lovelanguage.zerodave.dev` (or your chosen subdomain). You should see:
- Your quiz loading
- A valid SSL certificate (padlock icon)
- Certificate issued by "Microsoft Azure TLS Issuing CA"

---

## Updating the App

Build and deploy:

```bash
npm run build
swa deploy ./dist --env production
```

---

## Costs

**Free tier includes:**
- 100 GB bandwidth/month
- 2 custom domains
- Free SSL
- 0.5 GB storage

You won't be charged unless you exceed these limits (unlikely for a simple quiz).

---

## Troubleshooting

**SWA CLI login issues:**
- Run `swa login` separately to authenticate
- Or use deployment token: `swa deploy ./dist --deployment-token YOUR_TOKEN`

**Custom domain validation fails:**
- DNS propagation can take up to 48 hours (usually much faster)
- Use `dig lovelanguage.zerodave.dev` to verify CNAME is set
- Make sure there's no conflicting A record

**SSL certificate not provisioning:**
- Can take up to 24 hours (rare)
- Ensure domain validation succeeded first
- Check that CNAME is pointing to the correct Azure URL

**App shows blank page:**
- Check browser console for errors
- Make sure you ran `npm run build` before deploying
- Verify the `dist` folder contains index.html
