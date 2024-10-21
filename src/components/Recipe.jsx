import { FaRegHeart } from "react-icons/fa";
function Recipe() {

  return (
    <div className="w-full">
        {/* image */}
        <div className="w-full rounded-lg bg-gray-300">
            <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" alt="img" className="w-full h-full object-cover rounded-lg"/>
        </div>

        {/* recipe category */}
        <div className="mt-2 flex gap-4 items-center">
            <h1 className="text-xs font-poppins">Pork</h1>
            <FaRegHeart color='#fe5e80' size={16} />

        </div>

        {/* recipe name */}
        <div className="mt-2">
            <h1 className="text-sm font-poppins-medium">Pork with mushroom</h1>
        </div> 
    </div>
  )
}

export default Recipe
