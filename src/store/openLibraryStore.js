import { create } from "zustand";

const useOpenLibraryStore = create((set) => ({
  books: [],
  loading: false,
  error: null,
  fetchBooks: async (topic) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/openlibrary/${topic}`
      );
      const data = await response.json();
      set({ books: data.works, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));

export default useOpenLibraryStore;
