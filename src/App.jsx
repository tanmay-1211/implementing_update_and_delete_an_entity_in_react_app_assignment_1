import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`; // Fetching a specific door
console.log("Fetching from:", API_URI);

function App() {
  // State to store the fetched item
  const [item, setItem] = useState(null);

  // Fetch the existing item when the component mounts
  useEffect(() => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("Error fetching item:", error));
  }, []);

  return <>{item ? <UpdateItem item={item} /> : <p>Loading...</p>}</>;
}

export default App;