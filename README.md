# 📌 Overview
This project is a technical assessment demonstrating a full-stack approach to user management. It integrates a mock REST API into a modern, type-safe Next.js environment, ensuring that data remains persistent across sessions using custom React Context logic.

# ✨ Features

- Full-Stack Type Safety: End-to-end typesafe APIs using tRPC.

- Persistent State: Global user context.

- Modern UI: Built with shadcn/ui and Tailwind CSS.

- API Integration: Seamless integration with JSONPlaceholder for mock data handling.

- Documentation: Integrated OpenAPI/Swagger support for backend procedures (Still working).

# 🛠️ Technology StackLayer

| Syntax        | Description |
| -----------   | ----------- |
| Framework     | [create-t3-app] (https://create.t3.gg/)      |
| Type-Safe API | [tRPC](https://trpc.io)      |
| Styling | [Tailwind CSS](https://tailwindcss.com)      |
| UI Components | [shadcn/ui]([https://ui.shadcn.com/])      |
| Validation | [Zod]([https://tailwindcss.com](https://ui.shadcn.com/))      |
| State Management | React Context API     |

# 🚀 Getting Started

## Prerequisites

- Node.js installed

- pnpm `(npm install -g pnpm)`

Installation

1. Clone the repository

```
git clone https://github.com/fava2020/exercise.git
cd exercise
```

2. Install dependencies

```
pnpm install
```

3. Environment Setup

```
cp .env.example .env
```

4. Run the development server

```
pnpm dev
```


Open http://localhost:3000 in your browser to see the result. ✨

# 📁 Project Structure

src/types - app

src/context - Logic for data persistence and global user state.

src/server - tRPC router definitions, OpenAPI configurations and schema definitions.

src/components - Reusable shadcn/ui and collection reusable user components.

src/trpc - server tRPC, query client tRPC

src/types - user interface

# 🎀 Development Aesthetic

Styling: Tailwind CSS with a focus on accessibility and mobile design.

Linting: Strict TypeScript rules to ensure "Clean Code" principles.

UX: Skeleton screens for loading states and toast notifications for CRUD actions.