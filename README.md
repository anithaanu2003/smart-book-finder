# Smart Book Finder 📚

Smart Book Finder is a simple and user-friendly web app to search for books and get recommendations. This project is built using **React** for the frontend and **Node.js/Express** for the backend.  

> ⚠️ Note: AI recommendation integration (Gemini API) is included in the backend structure, but API keys are not included for security reasons. Future developers can add their own keys to enable AI features.

---

## 🛠️ Technologies Used

- **Frontend:** React, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **APIs:** (Optional) Gemini API for AI-powered book recommendations  
- **Environment Variables:** `.env` file for secure keys  

---

## ⚡ Features

- Search for books by title, author, or genre.  
- Get personalized book recommendations (AI feature setup ready for Gemini API).  
- Responsive and user-friendly interface.  
- Lightweight and fast book lookup experience.  

---

## 🔧 Project Structure

smart-book-finder/
│
├─ backend/ # Node.js & Express backend
│ ├─ index.js # Main server file
│ ├─ .env # Environment variables (API keys, port)
│ └─ gemini-key.json # Placeholder for Gemini API key
│
├─ frontend/ # React frontend
│ ├─ public/
│ │ ├─ book.png # Project favicon
| | |_ manifest.json
│ │ └─ index.html # Main HTML file
│ ├─ src/
| | |_ componens/
| | |  |_SearchBar.js
| | |_ services/
| | |  |_aiService.js
│ │ ├─ App.js # Main React component
│ │ ├─ index.js # Entry point
│ │ └─ index.css # Global styles
| | |_postcss.config.js
| | |_tailwind.config.js
│ └─ package.json # React project config
│
|
|_ package-lock.json
|
|_ package.json
└─ README.md # Project documentation

---

## ⚙️ Setup Instructions

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd smart-book-finder

2. Backend Setup:
cd backend
npm install
# Create a .env file with:
# GOOGLE_APPLICATION_CREDENTIALS=./gemini-key.json
# PORT=5000
node index.js
The backend will run on http://localhost:5000.

3. Frontend Setup:
cd frontend
npm install
npm start
The frontend will run on http://localhost:3000.

✅ The app is now accessible in your browser.

🔑 Gemini API Integration (Optional)

Place your Gemini service account JSON in backend/gemini-key.json.

Add this in .env:
GOOGLE_APPLICATION_CREDENTIALS=./gemini-key.json
Update index.js to call the Gemini model for AI book recommendations.

Note: The current project is submission-ready without any real keys. Future developers can add their own API keys to enable AI features.


📌 How to Contribute

Fork the repository.

Create your feature branch: git checkout -b feature/new-feature

Commit your changes: git commit -m "Add new feature"

Push to the branch: git push origin feature/new-feature

Create a pull request.

📚 Future Enhancements

Fully integrate Gemini API for AI-powered book recommendations.

Add user authentication for saving favorite books.

Allow users to create custom book lists.

Enhance UI/UX with animations and better accessibility