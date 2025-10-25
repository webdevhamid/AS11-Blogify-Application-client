const CategoryBadge = ({ category, align }) => {
  return (
    <span
      className={`bg-primary text-primary-content font-medium text-xs absolute  right-0 top-0 px-2 py-1 ${
        align && "left-0 right-auto"
      }`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
