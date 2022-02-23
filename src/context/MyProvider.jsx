import { useState, useEffect, useRef } from 'react';
import { Country, State, City } from 'country-state-city';

import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  //Countries
  const countries = useRef(Country.getAllCountries());
  const [countrySelect, setCountrySelect] = useState({
    country: '',
    flag: '',
    countryCode: '',
  });

  //States
  const [states, setStates] = useState([]);
  const [stateSelect, setStateSelect] = useState({ state: '', stateCode: '' });

  //Cities
  const [cities, setCities] = useState([]);
  const [citySelect, setCitySelect] = useState({ city: '', lat: '', lon: '' });

  //Weather data
  const [results, setResults] = useState({
    data: {},
    loading: true,
    error: null,
  });

  const API_KEY = process.env.REACT_APP_API_KEY;
  const URI = `https://api.openweathermap.org/data/2.5/weather?lat=${citySelect.lat}&lon=${citySelect.lon}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    setStates(State.getStatesOfCountry(countrySelect.countryCode));
    setResults({ data: {}, loading: true, error: null });
  }, [countrySelect]);

  useEffect(() => {
    setCities(
      City.getCitiesOfState(countrySelect.countryCode, stateSelect.stateCode)
    );
    setResults({ data: {}, loading: true, error: null });
  }, [countrySelect, stateSelect]);

  useEffect(() => {
    fetch(URI)
      .then((response) => response.json())
      .then((data) => setResults({ data, loading: false, error: null }))
      .catch((error) => setResults({ data: {}, loading: false, error }));
  }, [URI]);

  return (
    <MyContext.Provider
      value={{
        countries,
        countrySelect,
        setCountrySelect,
        states,
        setStates,
        stateSelect,
        setStateSelect,
        cities,
        setCities,
        citySelect,
        setCitySelect,
        results,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
