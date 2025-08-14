# Resource Explorer – React.js Assessment Task

A single-page React (Next.js + TypeScript) application that lists characters from the **Rick & Morty API**, with features for search, pagination, favorites, and detail view.

## 🚀 Live Demo
[**View Deployed App**](https://resource-explore-task.netlify.app/?page=1)

---

## 📂 Features

- **Paginated List View** – Displays characters with pagination controls.
- **Search** – Debounced search (400ms) bound to the URL for shareable state.
- **Favorites** – Toggle favorite status from list or detail view, persisted in `localStorage`.
- **Detail View** – Route `/characters/[id]` shows character info and episodes.
- **Error & Loading States** – Graceful fallback with retry option.
- **Responsive Design** – Works seamlessly across desktop and mobile devices.
- **URL State Sync** – Page and search query persist in the URL for reload safety.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (Pages Router) with TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack Query (React Query)
- **API:** [Rick and Morty API](https://rickandmortyapi.com/)
- **State Management:** React hooks + `localStorage`
- **Deployment:** Netlify

---

## 📦 Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Preethi-Balasubramaniyam/resource-explorer-task.git
   cd resource-explorer-task

2.**Install dependencies**

    npm install

3.**Run the development server**

     run dev


4.**Open in browser**

    http://localhost:3000
