import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { getBookRecommendations } from "./services/aiService";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const fetchBooks = async (title) => {
    if (!title.trim()) {
      setError("⚠️ Please enter a book title.");
      setBooks([]);
      setAiRecommendation("");
      return;
    }

    setError("");
    setLoading(true);
    setAiRecommendation("");
    setAiLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${title}`
      );
      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("❌ No books found. Try another title.");
        setBooks([]);
        setAiRecommendation("");
      } else {
        setBooks(data.docs.slice(0, 20));

        // AI recommendations
        const aiText = await getBookRecommendations(title);
        setAiRecommendation(aiText);
      }
    } catch (err) {
      setError("🚨 Network error. Please try again later.");
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen p-6 text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <button
          onClick={toggleDarkMode}
          className="fixed top-6 right-6 bg-gray-200 dark:bg-gray-700 p-2 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <h1 className="text-5xl font-extrabold mb-8 text-blue-900 dark:text-blue-400 drop-shadow-xl animate-pulse">
          📚 Book Finder
        </h1>

        <SearchBar onSearch={fetchBooks} />

        {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}

        {loading && (
          <div className="flex justify-center mt-10">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && books.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">
              Showing Results:
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              {books.map((book, index) => (
                <li
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition duration-300"
                >
                  <img
                    src={
                      book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : "https://via.placeholder.com/150?text=No+Cover"
                    }
                    alt={book.title}
                    className="w-full h-56 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-400">
                    {book.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {book.author_name
                      ? book.author_name.join(", ")
                      : "Unknown Author"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    First Published: {book.first_publish_year || "N/A"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {aiLoading && (
          <p className="mt-6 font-medium">🤖 Loading AI recommendations...</p>
        )}
        {!aiLoading && aiRecommendation && (
          <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-xl p-6 mt-10 mx-auto max-w-3xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-3">
              🤖 AI Recommendations
            </h3>
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line text-sm">
              {aiRecommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
