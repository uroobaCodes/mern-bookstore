function getUniqueCategories(arr) {
  const categories = arr.map((item) => {
    return item.category;
  });
  const uniqueCategories = Array.from(new Set(categories));

  return uniqueCategories;
}

export { getUniqueCategories };
