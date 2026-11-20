import { createContext, useContext } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
export const API_URL = `${API_BASE_URL}/filter.php?c=Ordinary_Drink`;
export const API_SEARCH_URL = `${API_BASE_URL}/search.php`;


const api = {
  async getDrinks(signal) {
    const { data } = await axios.get(API_URL, { signal });
    return data.drinks || [];
  },
  async searchDrinks(name, signal) {
    const { data } = await axios.get(API_SEARCH_URL, {
      params: { s: name },
      signal,
    });
    return data.drinks || [];
  },
  async getDrink(id) {
    const { data } = await axios.get(`${API_BASE_URL}/lookup.php`, {
      params: { i: id },
    });
    return data.drinks?.[0] || null;
  },
  async getIngredient(id) {
    const { data } = await axios.get(`${API_BASE_URL}/lookup.php`, {
      params: { iid: id },
    });
    return data.ingredients?.[0] || null;
  },
};

export const APIContext = createContext(null);

export function APIProvider({ children }) {
  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
}

export function useAPI() {
  const context = useContext(APIContext);
  if (!context) throw new Error('useAPI must be used within APIProvider');
  return context;
}
