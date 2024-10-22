import PropTypes from 'prop-types';

function Category({ category, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(category)}
      className={`min-w-6 px-8 py-2 rounded-full flex justify-center items-center cursor-pointer ${
        isSelected ? 'bg-Primary' :'ring-1 ring-Primary' 
      }`}
    >
      <h1 className={`${isSelected ? 'text-white' : 'text-Primary'}  font-poppins-medium`}>{category}</h1>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Category;
