import Category from "../components/Category"
import Recipe from "../components/Recipe"

function Home() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
        {/* categories btns */}
        <div className="flex items-center gap-8 mt-6 overflow-x-scroll hide-scrollbar">
        <div className="flex gap-8">
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
        </div>
        </div>

        {/* recipes */}
        <div className="grid md:grid-cols-5 md:gap-12 grid-cols-2 gap-4 mt-10">
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
           

        </div>


    </div>
  )
}

export default Home
