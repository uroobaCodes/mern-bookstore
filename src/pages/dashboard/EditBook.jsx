import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import InputField from "./InputField.jsx";
import SelectField from "./SelectField.jsx";
import { useBookStore } from "../../store/bookStore.js";
import { useState, useEffect } from "react";

const EditBook = () => {
  // we get the id from the url when we click on the edit button
  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();
  const {
    fetchSingleBook,
    singleBook,
    updateBook,
    bookData,
    isLoading,
    error,
  } = useBookStore();

  // get the single book by using the id from url
  useEffect(() => {
    fetchSingleBook(id);
  }, [id, fetchSingleBook]);

  // useEffect
  useEffect(() => {
    // fill the form fields with setValue
    if (singleBook && singleBook.data) {
      const data = singleBook.data;
      reset({
        title: data.title,
        description: data.description,
        category: data.category,
        trending: data.trending,
        oldPrice: data.oldPrice,
        newPrice: data.newPrice,
        coverImage: data.coverImage,
      });
    }
  }, [singleBook, reset]);
  //

  const onSubmit = async (data) => {
    // console.log(data.trending);
    try {
      await updateBook(id, data);
      alert("Book updated successfully");
    } catch (error) {
      console.log(`Failed to update book: ${error.message}`);
      alert("Failed to update book");
    }
  };
  if (isLoading) {
    return (
      <>
        <div className="mx-auto w-24 mt-20">
          Loading...
          <div className="mr-3 size-20 border-2 border-slate-700 border-t-slate-200 rounded-full animate-spin"></div>
        </div>
      </>
    );
  }
  if (error) {
    return <div>Error fetch book data</div>;
  }
  return (
    <>
      <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Title"
            name="title"
            placeholder="Enter book title"
            register={register}
          />

          <InputField
            label="Description"
            name="description"
            placeholder="Enter book description"
            type="textarea"
            register={register}
          />

          <SelectField
            label="Category"
            name="category"
            options={[
              { value: "", label: "Choose A Category" },
              { value: "business", label: "Business" },
              { value: "technology", label: "Technology" },
              { value: "fiction", label: "Fiction" },
              { value: "horror", label: "Horror" },
              { value: "marketing", label: "Marketing" },
            ]}
            register={register}
          />
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

          <InputField
            label="Old Price"
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            register={register}
          />

          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="New Price"
            register={register}
          />

          <InputField
            label="Cover Image URL"
            name="coverImage"
            type="text"
            placeholder="Cover Image URL"
            register={register}
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
          >
            Update Book
          </button>
        </form>
      </div>
    </>
  );
};
export default EditBook;
