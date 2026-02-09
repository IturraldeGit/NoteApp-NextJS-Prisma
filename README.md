# Next.js + Prisma Notes CRUD 🚀

A modern, full-stack Notes application built with **Next.js**, **Prisma**, **PostgreSQL**, and **Tailwind CSS**.

---

## 📝 About the Project

This project is a **CRUD (Create, Read, Update, Delete)** application for managing notes. It was developed specifically for **practice purposes** to explore the integration between Next.js App Router, Prisma ORM, and PostgreSQL.

> [!IMPORTANT]
> This project is intended to be run **locally only**. It serves as a personal laboratory for learning and experimenting with modern web technologies.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## ✨ Key Features

- ✅ **Create Notes:** Add new notes with a title and content.
- 📋 **View Notes:** See a list of all your saved notes.
- ✏️ **Edit Notes:** Update the information of existing notes.
- 🗑️ **Delete Notes:** Remove notes you no longer need.
- 📱 **Responsive Design:** Optimized for different screen sizes.

---

## 🚀 Getting Started

To get this project running on your local machine, follow these steps:

### 1. Prerequisites

- Make sure you have **Node.js** installed.
- Have a **PostgreSQL** instance running (locally or via a service like Docker).

### 2. Clone the Repository

```bash
git clone <your-repository-url>
cd nextjs-prisma-crud
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Variables

Create a `.env` file in the root directory and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### 5. Database Setup

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

### 6. Run the Application

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components`: Reusable UI components (NoteForm, NoteCard).
- `src/context`: React Context for state management.
- `prisma`: Database schema and migrations.
- `src/generated`: Prisma client output.

---

## 🎓 Learning Goals

- Implementation of the App Router in Next.js.
- Handling Server Actions and Client Components.
- Managing relational data with Prisma.
- Building a consistent UI with Tailwind CSS.

---

_Created for practice and learning._ 👨‍💻
