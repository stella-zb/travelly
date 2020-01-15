import React, { FC, Fragment, useState, useEffect } from "react";
import styled from "styled-components";

import { FilterButton } from "./FilterButton";

interface FilterProps {
  attractions: Array<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setFilters: any;
}
const Button = styled.button`
  text-align: center;
  // margin: 20px 10px;
  border: 0;
  background: #F55D3E;
  height: 30px;
  width: 120px;
  border-radius: 15px;
  text-transform: uppercase;
  padding: 10px 20px;
  font-weight: 400;
  font-size: 10px;
  cursor: cursor;
`;
const FilterTab = styled.div`
  display: block;
  height: 40vh;
  width: 85vw;
  z-index:9999;
  background-color: #fcfcfc;
  border-radius: 15px;
  color: #00000;
  opacity: 1;
  position: absolute;
  margin: 30% auto;
  margin-left: 5vw
  text-align: left;
  // justify-content: center;
  align-items: center;
  padding: 10px 10px;
  visibility
`;
const Input = styled.input`
  font-size: 10px;
  margin: 0;
  justify-content: space-between;
`;
export const Filter: FC<FilterProps> = ({
  setFilters,
  handleSubmit,
  handleToggle
}) => {
  const [categoryFilters, setCategoryfilters] = useState<Array<any>>([]);
  const [show, setShow] = useState<Boolean>(false);

  useEffect(() => {
    let categoryFilters = [
      { id: 1, category: "SCENERY" },
      { id: 2, category: "SHOPPING" },
      { id: 3, category: "RESTAURANTS/COFFEE SHOPS" },
      { id: 4, category: "TRAILS" },
      { id: 5, category: "MUSEUM" }
    ];

    setCategoryfilters(
      categoryFilters.map(filter => {
        return {
          select: false,
          id: filter.id,
          category: filter.category
        };
      })
    );
  }, []);

  // console.log(categoryFilters);

  handleSubmit = e => {
    // e.preventDefault();
    let selectedFilters: Array<any>;
    selectedFilters = [];
    categoryFilters.map(filter => {
      if (filter.select === true) {
        selectedFilters.push(filter.category);
      }
      return selectedFilters;
    });

    setFilters(selectedFilters);
    setShow(false);
  };

  return (
    <Fragment>
      <FilterButton setShow={setShow} onClick={handleToggle}>
        Filter
      </FilterButton>
      {show ? (
        <FilterTab>
          <form>
            <h3>Filtered By:</h3>
            {categoryFilters.map(filter1 => (
              <nav>
                <Input
                  key={filter1.id}
                  type="checkbox"
                  name={`${filter1}`}
                  onChange={e => {
                    let checked = e.target.checked;
                    setCategoryfilters(
                      categoryFilters.map(filter2 => {
                        if (filter2.id === filter1.id) {
                          filter2.select = checked;
                        }
                        return filter2;
                      })
                    );
                  }}
                  checked={filter1.select}
                />
                 {filter1.category}
              </nav>
            ))}
          </form>
          <Button type="submit" onClick={handleSubmit}>
            Set Filter
          </Button>
        </FilterTab>
      ) : (
        <></>
      )}
    </Fragment>
  );
};
