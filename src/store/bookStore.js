import { create } from "zustand";

// we will make the base url and also get authorization token
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/books`;

const bookStore = (set, get) => ({
  bookData: [],
  singleBook: null,
  weeklyBook: {},
  isLoading: false,
  error: null,

  // here we will grab the token and set Authorization header
  getAuthHeaders: () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  // fetch books from mongoDB
  fetchBooks: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${BASE_URL}/`, {
        headers: {
          "Content-Type": "application/json",
          ...get().getAuthHeaders(),
        },
      });
      const data = await response.json();

      if (data.success) {
        set({ isLoading: false, error: null });
        set({ bookData: data.data });
      } else {
        set({ isLoading: false, error: null });
        set({ bookData: [] });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  //   fetch a single book
  fetchSingleBook: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${BASE_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          ...get().getAuthHeaders(),
        },
      });
      const data = await response.json();

      if (data.success) {
        set({ isLoading: false, error: null, singleBook: data });
      } else {
        set({ isLoading: false, error: "Failed to fetch a single book" });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  // get/fetch a weekly book
  fetchWeeklyBook: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${BASE_URL}/weekly-book`);
      const data = await response.json();
      if (data.success) {
        set({ isLoading: false, error: null, weeklyBook: data });
      } else {
        set({ isLoading: false, error: "Failed to fetch a single book" });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  //   create a book document
  createBook: async (payload) => {
    if (
      !payload.title ||
      !payload.description ||
      !payload.category ||
      payload.trending === undefined ||
      !payload.coverImage ||
      payload.oldPrice === undefined ||
      payload.newPrice === undefined
    ) {
      return { success: false, message: "Please fill all the fields" };
    }
    try {
      const response = await fetch(`${BASE_URL}/create-book`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          ...get().getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      set((state) => ({ bookData: [...state.bookData, data.data] }));
      return {
        success: true,
        data: data,
        message: "Product created successfully",
      };
    } catch (error) {
      return { success: false, message: error.message };
      // the return statements here can be accessed in the frontend like this:
      // const result = await createBook(payload);
      // console.log(result.message); this is the return statement message
    }
  },
  updateBook: async (id, editedBook) => {
    try {
      set({ isLoading: true, error: null }); // Show loading state
      const res = await fetch(`${BASE_URL}/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...get().getAuthHeaders(),
        },
        body: JSON.stringify(editedBook),
      });

      const data = await res.json();

      if (!data.success) {
        set({ isLoading: false, error: data.message });
        return { success: false, message: data.message };
      }

      // Update book data if the edit is successful
      set((state) => ({
        bookData: state.bookData.map((book) =>
          book._id === id ? data.data : book
        ),
        isLoading: false,
      }));

      set({ isLoading: false });
      return { success: true, message: "Book updated successfully" };
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return { success: false, message: "An error occurred" };
    }
  },
  deleteBook: async (id) => {
    try {
      set({ isLoading: true, error: null }); // Show loading state
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...get().getAuthHeaders(),
        },
      });

      const data = await res.json();

      if (!data.success) {
        set({ isLoading: false, error: data.message });
        return { success: false, message: data.message };
      }

      set((state) => ({
        bookData: state.bookData.filter((book) => book._id !== id),
        isLoading: false,
      }));

      return { success: true, message: data.message };
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return {
        success: false,
        message: "An error occurred while deleting the book.",
      };
    }
  },
});

export const useBookStore = create(bookStore);
