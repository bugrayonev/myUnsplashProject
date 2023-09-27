import axios from "axios"
import { useQuery } from '@tanstack/react-query'
import { useGlobalContext } from './context'


const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`

const Gallery = () => {

const {searchTerm} = useGlobalContext()





  const response = useQuery({
    /* 
    Query key içindeki ["images"] hiç bir zaman degişmeyeceginden ;
      search yaptıgımız güncel bilgi state de oluşmasına ragmen 
    sayfada gözkümeyecek. Bunu düzeltmek için her aramada değişebilen search term i
    ["images",searchTerm] bu sekilde yerleştirmemiz lazım 
    */
    queryKey: ["images",searchTerm],
    queryFn: async()=> {
      const result = await axios.get(`${url}&query=${searchTerm}`)
     
    
      return result.data
      
    }

  }) 
 
  if(response.isLoading){
    return <section className="image-container">
      <h4>Loading...</h4>
    </section>
  }
  if(response.isError){
    return <section className="image-container">
      <h4>There was an error...</h4>
    </section>
  }


  const results = response.data.results
 if(results.length < 1){
  return  <section className="image-container">
  <h4>Not Found...</h4>
</section>
 }
  return (
    <section className="image-container">
      
     {results.map((item)=> {
      const url = item?.urls?.regular
      return <img src={url} alt={item.alt_description} key={item.id} className="img" />
     })}
    </section>
  )
}

export default Gallery
