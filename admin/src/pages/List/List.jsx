// export default List;
import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "", price: "" });

  // Fetch all food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Remove food
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error deleting food");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Start editing
  const startEdit = (item) => {
    setEditItem(item._id);
    setFormData({ name: item.name, category: item.category, price: item.price });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save edited food
  const saveEdit = async () => {
    try {
      const response = await axios.post(`${url}/api/food/update`, {
        id: editItem,
        ...formData,
      });

      if (response.data.success) {
        toast.success("Food updated successfully");
        setEditItem(null);
        fetchList();
      } else {
        toast.error("Error updating food");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />

              {editItem === item._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  <div className="action-buttons">
                    <button className="btn save" onClick={saveEdit}>
                      Save
                    </button>
                    <button className="btn cancel" onClick={() => setEditItem(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>₹{item.price}</p>
                  <div className="action-buttons">
                    <button className="btn edit" onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button className="btn delete" onClick={() => removeFood(item._id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No food items available</p>
        )}
      </div>
    </div>
  );
};

export default List;
