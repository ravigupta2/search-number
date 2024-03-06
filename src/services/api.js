const API_ENDPOINT =  import.meta.env.VITE_API_ENDPOINT;

export const fetchData = async (searchText) => {
  try {
    console.log(API_ENDPOINT)
    const response = await fetch(`${API_ENDPOINT}/${searchText}?fields=name,flags`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
