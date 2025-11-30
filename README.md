# Love Language Assessment

<div align="center">
  
  **A React-based assessment tool deployed to Azure Static Web Apps via GitHub Actions**
  
  [![Azure](https://img.shields.io/badge/Azure-Static%20Web%20Apps-blue)](https://azure.microsoft.com/en-us/products/app-service/static)
  [![React](https://img.shields.io/badge/React-18.2-61DAFB)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
</div>

---

## 🎯 Overview

A lightweight, single-page application (SPA) that calculates a user's primary "Love Language" based on a weighted assessment. The project serves as a portfolio demonstration of **Azure Static Web Apps (SWA)** infrastructure, utilizing **GitHub Actions** for a fully automated CI/CD pipeline.

## ✨ Features

- 🧠 **Methodological Rigor** - Balanced sampling across 10 language pairings
- 🎲 **Bias Elimination** - Position randomization and gender-neutral phrasing
- ⚡ **High Performance** - Scaffolded with Vite for near-instant load times
- 📱 **Responsive UI** - Mobile-first React design
- 🔒 **Privacy Focused** - 100% client-side execution (no database/backend)
- 🔄 **Automated CI/CD** - Zero-touch deployment via GitHub Actions
- 💰 **Cost Optimized** - Designed to stay $0/month on Azure Free Tier

## 🏗️ Architecture

**Deployment Pipeline:**

```
Developer Push (Main) → GitHub Actions R# Love Language Assessment

<div align="center">
  
  **A React-based assessment tool deployed to Azure Static Web Apps via GitHub Actions**
  
  [![Azure](https://img.shields.io/badge/Azure-Static%20Web%20Apps-blue)](https://azure.microsoft.com/en-us/products/app-service/static)
  [![React](https://img.shields.io/badge/React-18.2-61DAFB)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
</div>

---

## 🎯 Overview

A lightweight, single-page application (SPA) that calculates a user's primary "Love Language" based on a weighted assessment. The project serves as a portfolio demonstration of **Azure Static Web Apps (SWA)** infrastructunner (Linux)
          ↓
    Build (Vite) → Generate /dist Artifact
          ↓
Azure Static Web Apps → Global Edge Distribution
```

**Runtime Flow:**

```
User Browser → Azure Edge (HTTPS) → React SPA → Local Calculation
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone [https://github.com/dave-schmidt-dev/love-language.git](https://github.com/dave-schmidt-dev/love-language.git)
   cd love-language
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Tech Stack

- **Frontend:** React 18 (Vite)
- **Language:** JavaScript (ES6+)
- **Hosting:** Azure Static Web Apps (Free Tier)
- **CI/CD:** GitHub Actions
- **DNS:** Porkbun (Custom CNAME)
- **SSL:** Azure Managed Certificates

## 🛠️ Deployment

This project uses **GitHub Actions** for Continuous Deployment.

**Workflow File:** `.github/workflows/azure-static-web-apps-gentle-mushroom-057c8ee0f.yml`

**Triggers:**
- Push to `main` branch
- Pull Requests to `main`

**Process:**
1. GitHub triggers the workflow.
2. Ubuntu-latest runner checks out the code.
3. Node.js environment builds the React app.
4. `Azure/static-web-apps-deploy@v1` uploads the `dist/` folder to Azure.

## 📊 Azure Resources

- **Resource Type:** Static Web App
- **Plan:** Free Tier
- **Region:** East US 2
- **Custom Domain:** `lovelanguages.zerodave.dev`

## 📈 Usage & Costs

**Typical Monthly Usage:**
- **Hosting Cost:** $0.00 (Free Tier)
- **SSL Cost:** $0.00 (Managed by Azure)
- **Build Minutes:** ~2 mins per deploy (Free GitHub Actions quota)

**Azure Free Tier Limits (SWA):**
- Bandwidth: 100 GB / month
- Storage: 250 MB per app
- Custom Domains: 2 per app

## 🔒 Security

- **HTTPS Enforced:** All traffic served over SSL/TLS.
- **Client-Side Only:** No user data is stored, transmitted, or logged.
- **Dependency Scanning:** Dependabot enabled for npm vulnerability checks.

## 📝 Known Limitations

- **State Persistence:** Results are not saved after refreshing the page (by design).
- **Offline Mode:** Requires initial connection to load the app bundle.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 📁 Repository Files

Complete index of key files in this repository.

### 📄 Documentation & Config

| File | Description |
|------|-------------|
| `README.md` | Project documentation and setup |
| `package.json` | Dependencies and build scripts |
| `vite.config.js` | Vite build configuration |
| `.gitignore` | Git exclusions |

### 💻 Source Code

| File | Description |
|------|-------------|
| `src/main.jsx` | Application entry point |
| `src/App.jsx` | Main application logic and state management |
| `index.html` | HTML entry template |

### ⚙️ CI/CD

| File | Description |
|------|-------------|
| `.github/workflows/*.yml` | Azure Static Web Apps deployment workflow |

---

<div align="center">
  <sub>Built for portfolio demonstration | Azure Cloud Architecture | Free Tier Optimized</sub>
</div>
