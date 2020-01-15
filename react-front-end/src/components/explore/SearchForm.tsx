import React, { useState, useRef, useEffect } from "react";
import { Suggestions } from "./Suggestion";
import { Input } from "./SearchBox.component";

export const SearchForm = ({ handleInputChange, search, setSearch }: any) => {

  const [focus, setFocus] = useState<boolean>(false)

  const wrapperRef = useRef(null);
  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus(false)
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="SearchBar" ref={wrapperRef}>
      <form>
        <Input
          type="text"
          id="search-input"
          placeholder="Please enter your destination"
          onChange={handleInputChange}
          value={search.query}
          onFocus={() => setFocus(true)}
        />
        {focus && search.results.map((result: any, index: any) => (
          <Suggestions
            key={index}
            style={{ display: focus ? 'block' : 'none' }}
            onClick={() => {
              console.log('sdjfbsjkdbf')
              setSearch({ ...search, query: result })
              setFocus(false)
            }}
            data={result}
          />
        ))}
      </form>
    </div>
  )
}