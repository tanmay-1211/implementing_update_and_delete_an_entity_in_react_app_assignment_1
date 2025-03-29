import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
  // Ensure formData initializes properly
  const [formData, setFormData] = useState({ name: "" });
  const [message, setMessage] = useState(""); // For success messages

  // Load item data when it is available
  useEffect(() => {
    if (item) {
      setFormData({ name: item.name });
    }
  }, [item]);

  // Handle input change
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update item");

      setMessage("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      setMessage("Failed to update item.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateItem;