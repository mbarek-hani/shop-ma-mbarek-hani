import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "@/utils/constants";

function useFetch(url, errorMessage) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL + url);
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [url, errorMessage]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, getData, loading, error };
}

export default useFetch;
