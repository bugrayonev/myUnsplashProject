
import React, { createContext, useContext,useState,useEffect } from 'react'

const AppContext = createContext()


const getInitialDarkMode = ()=> {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches
 const storedDarkMode = localStorage.getItem("darkTheme") === "true"
  return storedDarkMode || prefersDarkMode
}


const AppProvider = ({children}) => {

  const [isDarkTheme ,setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm ,setSearchTerm] = useState("cat")
  
  


  const toggleDarkTheme = ()=>{
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem("darkTheme",newDarkTheme)
  
    
  }
  useEffect(()=> {
    document.body.classList.toggle("dark-theme",isDarkTheme)
  },[isDarkTheme])
  return (
    <AppContext.Provider value={{toggleDarkTheme,isDarkTheme,searchTerm,setSearchTerm}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

 export const useGlobalContext =()=> {
    return useContext(AppContext)
  }

