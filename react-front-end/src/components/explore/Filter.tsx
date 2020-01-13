import React, { FC, Fragment, useState, useEffect } from 'react';
import styled from "styled-components";

interface FilterProps {
  attractions: Array<any>;
  // handleFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setFilters: any
  // checked?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Button = styled.button`
  text-align: right;
  margin: 20px 10px;
  background-color: 
  border: solid;
  background: #FFD800;
  height: 30px;
  border-radius: 15px;
  text-transform: uppercase;
  padding: 15px 10px;
  font-weight: 400;
  font-size: 10px;
  cursor: cursor;
`;
const FilterTab = styled.div`
  display: flex;
  height: 200px;
`;
const Input = styled.input`
  // display: flex;
  font-size: 10px;
`;
export const Filter: FC<FilterProps> = ({ setFilters, handleSubmit }) => {
  
  const [categoryFilters, setCategoryfilters] = useState<Array<any>>([]);

  useEffect(() => {
    let categoryFilters = [
      { id: 1, category: "SCENERY" },
      { id: 2, category: "SHOPPING" },
      { id: 3, category: "RESTAURANTS/COFFEE SHOPS" },
      { id:4, category: "TRAILS" },
      { id:5, category: "MUSEUM" }
    ];

    setCategoryfilters(
      categoryFilters.map(filter => {
        return {
          select: false,
          id: filter.id,
          category: filter.category
        };
      })
    )
  }, []);

  // console.log(categoryFilters);

  handleSubmit = (e) => {  
    // e.preventDefault();
    let selectedFilters: Array<any>;
    selectedFilters = [];
    categoryFilters.map(filter => {
      if (filter.select === true) {
        selectedFilters.push(filter.category);
      };
      return selectedFilters;
    });
    
    setFilters(selectedFilters);
    
  };

  return (
    <Fragment>
      <Button>Filter</Button>
      <form>
      <FilterTab>
        {categoryFilters.map((filter1) => (
          <div>
            <Input
              key={filter1.id}
              type="checkbox"
              name={`${filter1}`}
              onChange={(e) => {
                let checked = e.target.checked;
                setCategoryfilters(
                  categoryFilters.map(filter2 => {
                    if (filter2.id === filter1.id) {
                      filter2.select = checked;
                    }
                    return filter2;
                  })
                )}
              }
              checked={filter1.select}
            />{filter1.category}
          </div>
        ))}
      </FilterTab>
      </form>
      <Button type="submit" onClick={handleSubmit}>Set Filter</Button>
    </Fragment>
  );
};