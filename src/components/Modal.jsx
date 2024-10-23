import PropTypes from "prop-types";
const Modal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen) return null;

  const ModalInstructions = (instructionSteps) => {
    let stepCounter = 1;

    return (
      <table className="w-full mt-2">
        <tbody>
          {instructionSteps
            .filter((step) => step && step.trim() !== "")
            .map((step) => {
              const cleanedStep = step.replace(/^\d+\.\s*/, "").trim();

              if (cleanedStep && !/^\d+$/.test(cleanedStep)) {
                return (
                  <tr key={stepCounter}>
                    <td className="py-2 px-4 text-lg text-green-600 font-poppins-medium">{stepCounter++}</td>
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{cleanedStep}</td>
                  </tr>
                );
              }

              return null;
            })}
        </tbody>
      </table>
    );
  };

  const combinedIngredients = Object.keys(recipe)
    .filter((key) => key.startsWith("strIngredient") && recipe[key])
    .map((ingredientKey, index) => {
      const ingredient = recipe[ingredientKey];
      const measure = recipe[`strMeasure${index + 1}`];
      return ingredient && measure ? `${ingredient} - ${measure}` : null;
    })
    .filter(Boolean);

    const handleOutsideClick = (event) => {
        const modalContent = document.getElementById("modal-content");
        if (modalContent && !modalContent.contains(event.target)) {
          onClose();
        }
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={handleOutsideClick}
    >
      <div className="relative w-full max-w-2xl max-h-full py-4 bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-700 shadow-md">
          <div className="flex justify-between items-center pb-3 border-b px-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {recipe.strMeal}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div className="overflow-y-auto max-h-[80vh] px-4">
          {/* Image */}
          <img
            src={recipe.strMealThumb}
            alt="meal"
            className="w-full h-48 object-cover mt-4 rounded-lg"
          />

          {/* Category | Area  */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-gray-200">{recipe.strCategory}</span>
              <span className="text-sm text-gray-700 dark:text-gray-200">|</span>
              <span className="text-sm text-gray-700 dark:text-gray-200">{recipe.strArea}</span>
            </div>
          </div>

          {/* Ingredients */}
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
            Ingredients
          </h4>

          <table className="w-full mt-2">
            <tbody>
              {combinedIngredients.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 text-gray-700 dark:text-gray-300 capitalize">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Instructions */}
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
            Instructions
          </h4>
          {ModalInstructions(recipe.strInstructions.split("\n"))}

         
         {/* play videos */}
            <div className="mt-4">
          {  recipe.strYoutube &&   <iframe
                    width="100%"
                    height="315"
                    src={recipe.strYoutube.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>}
            </div>

           
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.strTags && recipe.strTags.split(",").map((tag) => (
              <span
                key={tag}
                className="px-8 py-2 bg-gray-200 text-sm text-gray-700 rounded-full"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    strInstructions: PropTypes.string,
    strTags: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default Modal;
