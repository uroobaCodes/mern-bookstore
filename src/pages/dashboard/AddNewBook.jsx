import { useBookStore } from "../../store/bookStore.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "./InputField.jsx";
import SelectField from "./SelectField.jsx";

const AddNewBook = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const { createBook, isLoading, error } = useBookStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!imageFile) {
      alert("Please upload a cover image.");
      return;
    }

    try {
      // Create FormData for the image
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=191606285577059ff5e059855c35f9c9`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error("Image upload failed");
      }

      const imageUrl = result.data.url; // Get the uploaded image URL

      // Now create the book with the image URL
      const newBook = {
        ...data,
        coverImage: imageUrl, // Store the URL in your database
      };

      await createBook(newBook);
      alert("Book added successfully.");
      console.log(newBook);
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to add new book");
    }
  };

  // handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <>
      <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

        {/* Form starts here */}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Reusable Input Field for Title */}
          <InputField
            label="Title"
            name="title"
            placeholder="Enter book title"
            register={register}
          />

          {/* Reusable Textarea for Description */}
          <InputField
            label="Description"
            name="description"
            placeholder="Enter book description"
            type="textarea"
            register={register}
          />

          {/* Reusable Select Field for Category */}
          <SelectField
            label="Category"
            name="category"
            options={[
              { value: "", label: "Choose A Category" },
              { value: "business", label: "Business" },
              { value: "technology", label: "Technology" },
              { value: "fiction", label: "Fiction" },
              { value: "horror", label: "Horror" },
              { value: "science", label: "Science" },
              { value: "marketing", label: "Marketing" },
              // Add more options as needed
            ]}
            register={register}
          />

          {/* Trending Checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("trending")}
                className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Trending
              </span>
            </label>
          </div>

          {/* Old Price */}
          <InputField
            label="Old Price"
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            register={register}
          />

          {/* New Price */}
          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="New Price"
            register={register}
          />

          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
              className="mb-2 underline text-blue cursor-pointer"
            />

            {imageFileName && (
              <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
          >
            {isLoading ? (
              <span className="">Adding.. </span>
            ) : (
              <span>Add Book</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};
export default AddNewBook;
