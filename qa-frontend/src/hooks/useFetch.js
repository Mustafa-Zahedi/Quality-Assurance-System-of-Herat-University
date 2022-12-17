import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (path) => {
    setLoading(true);
    try {
      const data = await fetch(`${API_URL}/${path}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const json = await data.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(path);
  }, [path]);

  function refetch() {
    fetchData(path);
  }

  return { data, error, loading, refetch };
};

export default useFetch;
