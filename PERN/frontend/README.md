# Notes App - Frontend

## Set Up the Frontend

### 1.1 Initialize the Project

1. Create a new directory for your project:

```bash
cd notes-app
mkdir frontend
```

2. Initialize the frontend:

```bash
pnpm create vite@latest . --template react-ts
cd frontend
```

3. Install dependencies:

```bash
pnpm install
```

`Note:` Vite is a build tool that provides a fast development server and optimized production build. The `--template react-ts` flag creates a React project with TypeScript support.

4. Add tailwindcss:

```bash
pnpm install tailwindcss @tailwindcss/vite
```

5. `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

```

6. `index.css`:

```css
@import "tailwindcss";
```

7. Run the frontend:

```bash
pnpm run dev
```

`Note:` The frontend should be running on `http://localhost:5173`.

---

### 1.2 Folder Structure

```
📂 frontend
├── 📂 public
│   ├── index.html
├── 📂 src
│   ├── 📂 components
│   │   ├── [ComponentName].tsx
│   ├── 📂 pages
│   │   ├── [PageName].tsx
│   ├── 📂 services
│   │   ├── [api].ts
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── main.tsx
│   └── types.ts
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

### 1.3 API URL and Usage

1. Create a `.env` file in the frontend directory:

```bash
VITE_API_URL=http://localhost:5000/api
```

`Note:` Replace `http://localhost:5000/api` with your backend API URL.

--

1. `/register` : on backend (`/api/auth/register`)
- Files Used: `Register.tsx`
- Usage: Register a new user

2. `/login` : on backend (`/api/auth/login`)
- Files Used: `Login.tsx`
- Usage: Login with the registered user

3. `/` : on backend 

4. `/users` : on backend (`/api/users`)
- Files Used: `Users.tsx`,
- Usage: Get all users

5. `/all-notes` : on backend (`/api/notes/all`)
- Files Used: `AllNotes.tsx`,
- Usage: Get all notes

---