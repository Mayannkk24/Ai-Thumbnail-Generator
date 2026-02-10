# AI Thumbnail Generator with like and dislike option

A full-stack AI-powered web application that generates thumbnails and continuously improves them
based on user feedback (like / dislike) until the user is satisfied.

---

## 🚀 How It Works

1. User requests a thumbnail
2. AI generates a thumbnail using Hugging Face
3. User clicks **Like** or **Dislike**
4. If **Liked** → thumbnail is accepted
5. If **Disliked** → AI regenerates an improved thumbnail
6. Process repeats until the user likes the result

---

## ✨ Features

- AI-based thumbnail generation
- Like / Dislike feedback loop
- Automatic thumbnail improvement
- Hugging Face inference integration
- Modern and responsive UI

---

## 🛠 Tech Stack

- React + Vite
- TypeScript
- Node.js + Express
- Hugging Face Inference API
- Git & GitHub

---

## 📁 Project Structure
├── public
├── src
│ ├── components # UI components
│ ├── pages # Application pages
│ ├── context # Global state management
│ ├── services # API calls
│ └── utils # Helper functions
├── server
│ ├── controllers # Request handling logic
│ ├── routes # API routes
│ ├── services # AI & business logic
│ └── config # Environment & setup
├── package.json
└── README.md
