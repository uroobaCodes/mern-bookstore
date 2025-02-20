import { useState, useEffect } from "react";
import useOpenLibraryStore from "../../store/openLibraryStore.js";

const SearchBooks = () => {
  const [topic, setTopic] = useState("love");
  const { books, loading, error, fetchBooks } = useOpenLibraryStore();

  useEffect(() => {
    fetchBooks(topic);
  }, []);

  const handleSearch = () => {
    fetchBooks(topic);
  };

  return (
    <div className="mt-20 mx-20">
      <h2 className="text-3xl font-semibold mb-6">
        See books on your{" "}
        <span className="inline-block after:content-[''] relative after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:bg-pink after:transition-width after:duration-1000 hover:after:w-full">
          favorite topics:
        </span>{" "}
      </h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g. love)"
        className="bg-slate-100 mr-2 py-2 md:px-8 px-7 rounded focus:outline-none"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-24  sm:w-auto btn-primary"
      >
        {loading ? "Loading..." : "Search"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {books.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {books.map((book) => (
              <li key={book.key} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>

                {/* Display Subject */}
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Subject:</strong>
                  {book.subject && book.subject.slice(0, 6).join(", ")}
                </p>

                {/* Display Year Published */}
                <p className="text-sm text-gray-600 mb-4">
                  <strong>First Published:</strong> {book.first_publish_year}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
