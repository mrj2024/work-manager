## University Work Manager & Professional Policing Tools Portal

A secure MERN stack platform for university students on policing degrees. The app supports manual account approvals, document uploads with a rich text editor, policing-specific tools, a blog CMS, and admin oversight.

### File Structure

```
project/
├── client/               # React + Vite frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── assets/
│       ├── components/   # Navbar, editor, cards, modal, protected route
│       ├── context/      # Auth context
│       ├── hooks/
│       ├── layouts/      # Dashboard layout
│       ├── pages/        # Auth, Dashboard, Documents, Blog, Admin, Tools
│       └── utils/        # Axios instance + API helpers
└── server/               # Node/Express backend
    ├── package.json
    ├── .env.example
    └── src/
        ├── server.js
        ├── config/db.js
        ├── controllers/  # auth, documents, blog, admin, tools
        ├── middleware/   # auth guard, validators, error handling
        ├── models/       # User, Document, BlogPost, EvidenceEntry
        ├── routes/       # Auth, documents, blog, admin, tools APIs
        ├── services/     # JWT token helpers
        └── utils/        # datasets, sanitization, async handler
```

### Installation

1. **Clone and install dependencies**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. **Configure environment variables**
   - Copy `server/.env.example` to `server/.env`
   - Set the API secrets + URLs:  
     `MONGO_URI=mongodb+srv://sytemAdm1:yvNnMOPTt1LB5IrG@cluster0.xfskkkr.mongodb.net/?appName=Cluster0`  
     `JWT_SECRET=ec94be2d7cf70eef1e7ac82791991f8b149708610c189a58e887a2db0f451fe16258a89c3e979d12e33e36a267319a0ea631547b295e61e9ba0aad55892e567c`  
     `JWT_REFRESH_SECRET=8aff0d7149a701d7218a0280cb259b4273c1e7575bed1b388e4b4f5e8762eb41eac861a46f36a9e0b5bd3b078313f22e81dd9d8c01d669bb76d7c061017f0c96`  
     `CLIENT_URL=https://work-manager-hzw5hwrti-jenometvs-projects.vercel.app,https://work-manager-brown.vercel.app,http://localhost:5173`  
     `UPLOAD_DIR=/opt/render/project/src/server/uploads`
   - Create `client/.env` with `VITE_API_URL=https://work-manager-aipl.onrender.com/api`
3. **Start MongoDB locally** (or point to Atlas/Render cluster)

### Development Commands

Run the backend (port 5000):
```bash
cd server
npm run dev
```

Run the frontend (port 5173):
```bash
cd client
npm run dev
```

The Vite dev server proxies `/api/*` to the Express API.

### Deployment Guide

**Frontend (Vercel)**
1. Push the repository to GitHub/GitLab.
2. In Vercel, create a new project from the repo and set the root to `client`.
3. Build command: `npm run build`, Output directory: `dist`.
4. Configure environment variable `VITE_API_URL` if you proxy to a hosted backend (update `api.js` accordingly).

**Backend (Render)**
1. Create a new Web Service on Render pointing to the repo with root `server`.
2. Build command: `npm install`.
3. Start command: `npm run start`.
4. Set environment variables in Render dashboard (`PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `CLIENT_URL`, `UPLOAD_DIR`).
5. Enable persistent storage if you need to keep uploaded files on disk or switch to S3 for production.

Update the Vercel frontend to point to the Render API base URL (e.g., `VITE_API_URL=https://work-manager-aipl.onrender.com/api`) and redeploy.

### Example API Calls

**Registration**
```js
import axios from 'axios';

await axios.post('/api/auth/register', {
  name: 'Casey Cadet',
  email: 'casey@example.com',
  password: 'secret123'
});
```

**Login + token handling**
```js
const { data } = await axios.post('/api/auth/login', { email, password });
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refreshToken);
```

**Create a document**
```js
const token = localStorage.getItem('accessToken');
const { data } = await axios.post(
  '/api/documents',
  { title: 'NDM Assignment', content: '<p>Draft content</p>' },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

**Upload document via fetch**
```js
const formData = new FormData();
formData.append('file', fileInput.files[0]);

await fetch('/api/documents/upload', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: formData
});
```

**Admin approving a user**
```js
await axios.put(`/api/admin/users/${userId}/approve`, null, {
  headers: { Authorization: `Bearer ${adminToken}` }
});
```

**PACE codes lookup**
```js
const { data } = await axios.get('/api/tools/pace', {
  params: { letter: 'A', search: 'search' },
  headers: { Authorization: `Bearer ${token}` }
});
```

Follow REST routes listed in the requirements for additional operations (blog CRUD, evidence tracker, exports, etc.).
