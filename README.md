# Movie App 🎬

A sleek and fully responsive **React.js** project built to explore movie data using public APIs.  
The app provides movie listings, detailed views, and interactive filtering with smooth animations and a modern UI powered by **Tailwind CSS** and **Motion One**.  
Live Demo: [Movie App](https://raeef-movie-app.netlify.app)

![Screenshot of Movie App](https://github.com/Raeef-Chowdhury/Movie-App/blob/main/image.png?raw=true)
---

## 🌟 Overview
**Movie App** is a dynamic web application designed to display and explore movie information fetched from an external API.  
It focuses on **data-driven UI**, **API integration**, and **responsive design principles** — continuing my journey from foundational React projects to more real-world, API-connected applications.  

This project refines my ability to handle **asynchronous data**, manage **state and conditional rendering**, and structure a scalable **frontend architecture**.

---

## ✨ Features
- **Dynamic movie listings** fetched from public APIs  
- **Detailed movie pages** with overview, ratings, and genres  
- **Search functionality** to filter movies by title  
- **Responsive design** for all screen sizes  
- **Smooth transitions** using Motion One animations  
- **Error handling UI** for invalid or missing data  

---

## 🎯 Motivation & Goals
This project was built to:
- Strengthen my understanding of **React API integration** and **data fetching**  
- Practice building **real-world, interactive UIs** with dynamic content  
- Explore how to manage **state, conditional rendering**, and **component composition**  
- Learn and apply **Tailwind CSS** and **Motion One** for styling and animation  
- Gain experience deploying and optimizing **React production builds**  

---

## 🛠️ Tech Stack
- **React.js (Vite)** → Component architecture, fast builds & HMR  
- **Tailwind CSS** → Utility-first, responsive styling  
- **JavaScript (ES6)** → Data fetching, logic, and interactivity  
- **Motion One** → Lightweight, smooth animations  
- **TMDB API** → Fetching real movie data  
- **Netlify** → Hosting and continuous deployment  

---

## 🚀 Getting Started

### Clone the Repository & Setup
```bash
git clone https://github.com/Raeef-Chowdhury/Movie-App.git
cd Movie-App
npm install
```
### Set Up Environment Variables
```bash
VITE_MOVIE_API_KEY=your_api_key_here
VITE_API_URL=https://api.themoviedb.org/3
```
### Run the App
``` bash
npm run dev
```

---



# Project Structure
``` markdown
Movie-App/
├── src/
│   ├── components/
│   │   ├── TrendingCard.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── SearchBar.jsx
│   │   └── Header.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── public/
│   └── screenshot.png
│   └── logo.png
│   └── hero-img.png
│   └── hero-background.png
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
└── index.html
└── .env.local

```
## 💡 Challenges Faced

### 🧩 API Integration & Data Handling
- Managing **asynchronous API calls** while keeping UI smooth.  

### ⚙️ Component Communication
- Handling prop flow between **search**, **filter**, and **movie list** components.  
- Improved by organizing **state in parent components** and passing down controlled data.

---

## 🔮 Future Improvements
- Add **user authentication** and personalized favorites  
- Integrate **YouTube trailer embeds** for each movie  
- Introduce **infinite scroll** for large result sets  
- Add **light/dark mode toggle** with Tailwind  
- Expand to include TV Shows

---

## 📖 What I Learned
- Handling **real-time API data** with React and `async/await`  
- Structuring clean, scalable **React component hierarchies**  
- Managing **state and conditional rendering** effectively  
- Using **Tailwind CSS** for rapid UI prototyping  
- Animating **React components** with Motion One  
- Deploying and debugging **React apps** on Netlify  
