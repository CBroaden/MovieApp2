export default function SearchBar() {

    return (
        <div className=" w-full h-12 bg-opacity-20 p-1 z-10">
            <form className="w-full" action='/search'>
                <input type="text" placeholder="Search Movies..." name="search" className="border mx-auto font-bold w-full border-black py-1 px-2 rounded-full text-md"></input>
            </form>
        </div>
    )
}