import React from 'react'
type SearchProps = {
    searchTerm: string
    setSearchTerm: (searchTerm: string) => void
}
const Search = ({searchTerm,setSearchTerm} : SearchProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />
            <input type="text" placeholder='Search through thousands of movies' value={searchTerm} onChange={handleChange}/>
        </div>
    </div>
  )
}

export default Search