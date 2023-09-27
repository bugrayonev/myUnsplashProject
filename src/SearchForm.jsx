import { useGlobalContext } from "./context"
const SearchForm = () => {

 
  const {setSearchTerm} = useGlobalContext()

  const handleSubmit = (e)=>{
e.preventDefault()
// console.log(e.target.elements); //inputun  name in içindeki search e ulaşabiliyoruz
const searchValue = e.target.elements.search.value

if(!searchValue)return


    setSearchTerm(searchValue)
   
  }


  return (
    <section>
      <h1 className='title'>unsplash images</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input className='form-input search-input' name='search' type="text"  placeholder="cat" />
        <button type='submit' className='btn' >
          Search
        </button>
      </form>
    </section>
  )
}

export default SearchForm
