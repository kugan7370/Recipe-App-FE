import Recipe from "../components/Recipe"

function Favourite() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">

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

export default Favourite
