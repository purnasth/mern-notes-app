# Notes App - Backend

## Set Up the Backend

### 1.1 Initialize the Project

Create a new directory for your project:

```bash
mkdir notes-app
cd notes-app
```

Initialize the backend:

```bash
mkdir backend
cd backend
pnpm init
```

Install dependencies:

```bash
pnpm install express pg cors bcryptjs jsonwebtoken dotenv
pnpm install --save-dev typescript @types/node @types/express @types/cors ts-node nodemon
```

`Note:` express is a web framework for Node.js, pg is a PostgreSQL client, cors is a middleware for enabling CORS with various options, bcryptjs is a library for hashing passwords, jsonwebtoken is a library for generating JWTs, and dotenv is a library for loading environment variables from a .env file.

Set up TypeScript:

```bash
npx tsc --init
```

Update the tsconfig.json file:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

`Note:` The **tsconfig.json** file is updated to specify the target version of ECMAScript, the module system, the output directory, the root directory of input files, and other compiler options.

Create the folder structure:

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.ts
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

### 1.2 Set Up the Database PostgreSQL

1. Install PostgreSQL and create a new database:

```bash
createdb notes_app;
```

2. Create a `.env` file in the backend directory:

```bash
DATABASE_URL=postgres://username:password@localhost:5432/notes_app
JWT_SECRET=your_jwt_secret_key
```

`Note:` Replace `username`, `password`, and `your_jwt_secret_key` with your own values.

3. Create a src/models/db.ts file to connect to PostgreSQL:

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
```



### 1.3 Create a Database Schema

1. Create a new table in the database:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Run the SQL commands in the PostgreSQL shell:

```bash
psql -d notes_app -f src/models/setup.sql
```



--- 

OR

---


### Setting up with the psql shell

#### 1.1 Install PostgreSQL & Open psql Shell

- Open the SQL Shell (psql) application (it should be installed with PostgreSQL).
- Enter the following details:
  - Server: Press `Enter` to use the default (`localhost`).
  - Database: Press `Enter` to use the default (`postgres`).
  - Port: Press `Enter` to use the default (`5432`).
  - Username: Press `Enter` to use the default (`postgres`).
  - Password: Enter the `password` you set during installation.
- You should see a prompt like this: `postgres=#`

Once logged in, you’ll see a prompt like this:

```bash
postgres=#
```

1.2 Create a Database

In the psql prompt, run the following command to create a database for your notes app:

```sql
CREATE DATABASE notes_app;
```

To verify the database was created, list all databases:

```sql
\l
```

You should see `notes_app` in the list.

1.3 Create Tables

Now, let’s create the tables (`users` and `notes`) in the `notes_app` database.

Switch to the `notes_app` database:

```sql
\c notes_app
```

Create the `users` table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

Create the `notes` table:

```sql
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Verify the tables were created:

```sql
\dt
```

You should see both `users` and `notes` listed.

1.4 Set Up .env File

In your `backend` folder, create a `.env` file and add the following:

```bash
DATABASE_URL=postgres://postgres:your_password@localhost:5432/notes_app
JWT_SECRET=your_jwt_secret_key
```

Replace `your_password` with the password you set during PostgreSQL installation.

#### Step 2: Run the Backend

Navigate to the `backend` folder in your terminal:

```bash
cd backend
```

Install dependencies:

```bash
pnpm install
```

Start the backend server:

```bash
pnpm run dev
```

Your backend should now be running on `http://localhost:5000`.


---

### Test the API in Postman


