import React from 'react'

const SearchBar = ({value, onChange}:{value:string, onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void}) => {
  return (
    <input
      className="border border-gray-300 rounded-md py-2 px-4 w-64"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Rechercher"
    />
  )
}

export default SearchBar
