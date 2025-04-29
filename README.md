# 🌍 Globetrotter – Frontend

Welcome to the **Globetrotter frontend**, a fun and interactive travel trivia game where players guess famous destinations based on cryptic clues and earn points with every correct answer!

---

## 🔧 Tech Stack

- **React.js** — Modern component-based frontend library
- **Redux Toolkit** — Global state management (authentication, score tracking, city progress)
- **React Router** — Route handling (login, game, invite flow)
- **Styled Components** — CSS-in-JS for component-level styling
- **Framer Motion** — Smooth animations and transitions
- **React Confetti** — Confetti effect for correct answers
- **@uidotdev/usehooks** — Utility hooks for window size and responsiveness

---

## 🧱 Features & Layout

### 📜 Game Flow

- ✍️ Displays 1–2 cryptic clues about a destination.
- 🔹 4 multiple-choice options in a 2x2 grid layout.
- ✅ Instant feedback upon selection:
  - Confetti for correct answers
  - Sad-face feedback for wrong answers
- 🏋️ User's name, score (correct/incorrect) always visible.
- ⏩ "Next" button loads a new random city to guess.
- 🤝 "Challenge a Friend" button opens a modal to generate a WhatsApp invite link.

### 🖌️ Styling and UX

- Mobile-responsive design
- Glassmorphism-styled game container
- Smooth confetti transition using `setTimeout`
- Loading shimmer effects while waiting for API responses

---

## 🛠️ Setup Instructions

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔐 Environment Variables (.env)

```env
VITE_API_URL=https://your-backend-server.com
```

- `VITE_API_URL` should point to your deployed backend server URL.

---

## 📊 Project Structure

```bash
client/
├── src/
│   ├── api/              # API calls (get city, answer, etc.)
│   ├── components/       # Reusable components (Game, InviteModal, ToastProvider)
│   ├── slices/           # Redux slices (authSlice)
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component with routing
│   ├── main.jsx          # React entry point
│   └── assets/           # Fonts, Images, etc.
├── public/
├── .env
├── index.html
├── package.json
```

---

## 📖 Key Concepts Used

- **State Management**: Redux Toolkit stores user profile, score, and visited cities.
- **Protected Routes**: Certain pages require login (token check).
- **Optimistic UI Updates**: Immediate feedback before full server confirmation.
- **Confetti Celebration**: `react-confetti` customized with smooth fading.
- **Invite a Friend**: Generates a WhatsApp shareable link with dynamic user data.
- **Animations**: Framer Motion for smooth element entry and exit.

---

## 💪 Future Enhancements

- Add timer-based gameplay option.
- Image-based clue support.
- User leaderboard.
- Save/share game highlights.

---

Built with passion for travelers and trivia lovers! 💛