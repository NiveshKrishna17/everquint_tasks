# Everquint Tasks

A modern task management web application built with React, TypeScript, and Vite.

## How to Run the Project

1. **Navigate to the core workspace:**
   ```bash
   cd workboard
   ```
2. **Install all dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   > The application will typically start locally on `http://localhost:5173/`.
4. **Run the testing suite (Vitest + React Testing Library):**
   ```bash
   npm run test
   ```

---

## Architecture Overview

### Application Structure
The codebase follows a modular, feature-oriented structure explicitly designed to scale:
- `src/components/ui/`: Atomic, reusable, and completely presentation blocks (e.g., Buttons, Alerts, Badges, Modals).
- `src/components/board/`: Composed domain-specific containers handling Kanban logic (e.g., Columns, Tasks, Filters).
- `src/context/`: Centralized state providers (`BoardContext.tsx`).
- `src/hooks/`: Reusable logic encapsulated independently from rendering operations (e.g., `useTaskFilters.ts`).
- `src/__tests__/`: Complete integration and unit test coverage for all Components and Pages.

### Rational for Key Decisions
- **State Management:** Rather than utilizing Redux or Zustand, the state layer uses a single React Context. Due to the limited size of the domain, Context prevents immense boilerplate while efficiently passing the data stream down without egregious prop drilling. 
- **Component Design:** Components follow strict separation of presentation and business logic. Additionally, to feel like Jira/Linear, specialized `<EditableText>` and `<EditableSelect>` blocks are isolated in `src/components/board/inline`, optimizing exactly which part of a card initiates form interactions.
- **Data Layer (LocalStorage Persistence):** Storage explicitly operates local-first via browser `localStorage`. No external backend exists. There are schema-migrations (`v1` to `v3`) naturally embedded inside the `BoardContext` that automatically inject historical timestamps (`createdAt`, `updatedAt`) bridging data formats continuously between reloads seamlessly.

---

## Known Limitations or Trade-offs

1. **Limited Browser Persistence Capacity:** Because `localStorage` typically enforces a hard ~5MB limit, excessive task descriptions or data loads could exceed memory limits. Transient state alerts have been wired to catch quota exceptions, but a backend database structure would be required to genuinely scale.
2. **Local-first Conflicts:** Application state utilizes only standard single-client writes. No conflict resolution/CRDT logic exists for true multi-tab or potential multi-player syncs.
3. **Frontend Search is Exact/Sub-string:** Filtering utilizes `useTaskFilters`, evaluating `.includes()` synchronously. Performance starts to bottleneck aggressively if scaling iteratively above ~5,000 tasks alongside rendering drops absent of virtualization.
