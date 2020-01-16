import React, { FC, useState, Fragment } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Wrapper, DatePick, Button, Header, Error } from "./SearchBox.component";
import { SearchForm } from "./SearchForm";
import './SearchBox.css';

interface SearchProps {
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: string | null;
  date?: Date | null;
  city?: string | null;
};

interface SearchObj {
  query: string | number | string[] | undefined;
  results: Array<any>;
};

export const SearchBar: FC<SearchProps> = ({ handleInputChange, handleSubmit }) => {

  //user city input
  const [search, setSearch] = useState<SearchObj>({ query: "", results: [] });

  //user date input
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [itinerariesId, setItinerariesId] = useState<number | null>();

  const [error, setError] = useState<String | null>('');

  handleInputChange = (e) => {
    const city = e.target.value
    axios.get(`/api/itineraries/`, {
      params: {
        city: e.target.value
      }
    })
      .then(res => {
        let result: Array<any>;
        let suggestion: Array<any>;
        result = res.data.predictions
        suggestion = [];
        result.map(each => {
          // suggestion.push(each.description.split(',')[0])
          suggestion.push(each.description)
        })
        setSearch({ query: city, results: suggestion })
      })
  };

  handleSubmit = () => {
    axios.defaults.baseURL = "http://localhost:8081";
    const city = search.query;

    //convert to UTC timezone - UNIX

    let convertStart = startDate.toString().slice(4, 15);
    let convertEnd = endDate.toString().slice(4, 15);
    const timezoneStart = "00:00:00 GMT";
    const timezoneEnd = "11:59:59 GMT";
    convertStart = convertStart.concat(" ", timezoneStart);
    convertEnd = convertEnd.concat(" ", timezoneEnd);
    let tripStart = Date.parse(convertStart);
    let tripEnd = Date.parse(convertEnd);

    //valid date and city check

    const dateVerified = Date.now() - 28800000;
    console.log(dateVerified)
    if (!city) {
      setError(`Destination cannot be blank`)
    } else if (tripStart <= dateVerified || tripEnd <= dateVerified || tripStart > tripEnd) {
      setError(`Please double check your date`);
    } else {
      tripStart = tripStart / 1000;
      tripEnd = tripEnd / 1000;
      Promise.all([
        axios(`/api/itineraries`, {
          method: "post",
          data: {
            city,
            tripStart,
            tripEnd
          },
          withCredentials: true,
          params: {
            user: localStorage.userID
          }
        }),
      ])
        .then((res) => {
          setItinerariesId(res[0].data);
        })
    }
  };

  return (
    itinerariesId ? <Redirect to={`/explore/${itinerariesId}`} />
      :
      <Wrapper>
        <Fragment>
          <Header>Where do you travel to next?</Header>
          <SearchForm
            handleInputChange={handleInputChange}
            search={search}
            setSearch={setSearch}
          />
          <DatePick>
            <div>
              <h4>Start Date</h4>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
          </DatePick>
          <DatePick>
            <div>
              <h4>End Date</h4>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
              />
            </div>
          </DatePick>
          <Error>{error}</Error>
          <Button type="button" onClick={handleSubmit}>Search</Button>
        </Fragment>
      </Wrapper>
  );
};
