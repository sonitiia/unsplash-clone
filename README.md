# Mini Unsplash Gallery

React gallery clone powered by the [Unsplash API](https://unsplash.com/documentation).

## Stack

- React + TypeScript + Vite
- SCSS modules
- Axios
- TanStack Query
- Redux Toolkit (column layout preference & search state)

## Setup

1. Create an application at [Unsplash Developers](https://unsplash.com/oauth/applications) and copy the **Access Key**.
2. Copy `.env.example` to `.env` and set:

   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

3. Install dependencies and start the dev server:

   ```bash
   yarn install
   yarn dev
   ```

## Features

- Masonry-style feed (shortest-column layout) with **3 / 5 column** toggle
- Page-based pagination (Previous / Next)
- Photo detail page (author, description, likes, dimensions, tags)
- Tag collections via search (`/tags/:tagName`)
- Global search (`/search?q=…`)
- Responsive layout for 1440, 1024, 768, and 375 px viewports
- Basic registration & login (stored locally in the browser)
- Save / remove photos to your profile collection (`/profile`)

> Auth and collections use **localStorage** (demo-friendly, no backend). Passwords are stored as SHA-256 hashes.
