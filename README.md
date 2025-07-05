# Would You Wather App

A fully-featured "Would You Rather?" web application built with React and Redux. The app supports user authentication, question answering, question creation, and a leaderboard ranking system.

## 🔗 Live Demo
➡️ [Try the app](https://wouldyouwatherapp.netlify.app/)

---

## 🚀 Features

### 🔒 Authentication
- Users can log in from a dropdown (select tag).
- Only authenticated users can access routes like Home, New Question, and Leaderboard.
- Logout functionality with dropdown UI.

### 🏠 Home Page
- Hero section with `.hero` class always visible.
- Navigation bar with `.navbar` class post-login.
- Tabs for "Unanswered Questions" and "Answered Questions".

### ✍️ New Question
- Two inputs: `optionOneText` and `optionTwoText`.
- Submit button with `.button.is-dark`.
- New questions appear under the "Unanswered Questions" tab.

### ✅ QuestionCard
- Questions displayed in a `.card.question-panel`.
- Two radio buttons for voting.
- Submit button with class `.button` and label `Submit`.

### 📊 Leaderboard
- Displayed in `.card.leadboard-panel`.
- Shows user avatars (`.img.is-rounded`), usernames, number of questions answered/asked.
- Scores shown in `.score-panel`.

### 🔁 Routing & Navigation
- Routes: `/` (Home), `/add` (New Question), `/leaderboard`, and `404` handler.
- PrivateRoute protection redirects unauthenticated users to login.
- "You are trying to access an Invalid URL" for unknown routes.

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux, React Router
- **State Management:** Redux with custom actions and reducers
- **Styling:** CSS, Bulma-based class names like `.card`, `.navbar`, `.is-rounded`
- **Deployment:** Netlify

---

## 📂 Redux Actions Used

```js
export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'SAVE_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const GET_USERS = 'GET_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';
