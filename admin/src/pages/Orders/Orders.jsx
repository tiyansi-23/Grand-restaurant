import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/orders/allorders");
      setOrders(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 All Orders</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={styles.row}>
                <td style={styles.td}>{order._id}</td>
                <td style={styles.td}>{order.userId}</td>
                <td style={styles.td}>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      <span style={styles.itemName}>{item.name}</span>{" "}
                      <span style={styles.itemQty}>x {item.quantity}</span>
                    </div>
                  ))}
                </td>
                <td style={styles.td}>₹{order.amount}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background:
                        order.status === "Food Proccessing"
                          ? "#facc15"
                          : "#22c55e",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={styles.td}>
                  {new Date(order.date).toLocaleString()}
                </td>
                <td style={styles.td}>
                  {/* {order.payment ? (
                    <span style={{ ...styles.badge, background: "#22c55e" }}>
                      ✅ Paid
                    </span>
                  ) : (
                    <span style={{ ...styles.badge, background: "#ef4444" }}>
                      ❌ Not Paid
                    </span>
                  )} */}
                  <span style={{ ...styles.badge, background: "#22c55e" }}>
                      ✅ Paid
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#111827",
  },
  tableWrapper: {
    overflowX: "auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    background: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f3f4f6",
    color: "#374151",
    fontWeight: "600",
    fontSize: "14px",
    borderBottom: "2px solid #e5e7eb",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
    color: "#374151",
  },
  row: {
    transition: "background 0.2s ease",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
  },
  itemName: {
    fontWeight: "500",
    color: "#111827",
  },
  itemQty: {
  },
  color: "#6b7280",
};

export default AdminOrders;
