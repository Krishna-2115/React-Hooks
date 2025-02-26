import React, { useState } from "react";

const EditableTable = () => {
  const initialData = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 32 },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", age: 24 },
    { id: 4, name: "Michael Brown", email: "michael@example.com", age: 40 },
    { id: 5, name: "Emma Davis", email: "emma@example.com", age: 35 },
    { id: 6, name: "Oliver Wilson", email: "oliver@example.com", age: 30 },
    { id: 7, name: "Sophia Moore", email: "sophia@example.com", age: 27 },
    { id: 8, name: "Liam Taylor", email: "liam@example.com", age: 22 },
    { id: 9, name: "Charlotte Lee", email: "charlotte@example.com", age: 31 },
    { id: 10, name: "James Harris", email: "james@example.com", age: 29 },
  ];


  const [data, setData] = useState(initialData);
  const [editingRow, setEditingRow] = useState(null);
  const [tempData, setTempData] = useState(null);

  const handleChange = (e, column) => {
    const { value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [column]: value,
    }));
  };

  const handleEdit = (rowIndex) => {
    setEditingRow(rowIndex);
    setTempData({ ...data[rowIndex] });
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editingRow] = tempData;
    setData(updatedData);
    setEditingRow(null);
    setTempData(null);
  };

  const handleRevert = () => {
    setEditingRow(null);
    setTempData(null);
  };

  return (
    <div style={styles.container}>
      <h2>Editable Data Table</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>
                {editingRow === index ? (
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => handleChange(e, "name")}
                    style={styles.input}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {editingRow === index ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleChange(e, "email")}
                    style={styles.input}
                  />
                ) : (
                  row.email
                )}
              </td>
              <td>
                {editingRow === index ? (
                  <input
                    type="number"
                    value={tempData.age}
                    onChange={(e) => handleChange(e, "age")}
                    style={styles.input}
                  />
                ) : (
                  row.age
                )}
              </td>
              <td>
                {editingRow === index ? (
                  <div style={styles.actions}>
                    <button onClick={handleSave} style={styles.button}>Save</button>
                    <button onClick={handleRevert} style={styles.button}>Revert</button>
                  </div>
                ) : (
                  <button onClick={() => handleEdit(index)} style={styles.button}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    background: "#f4f4f9",
    borderRadius: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  th: {
    padding: "12px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "left",
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
  },
  input: {
    padding: "8px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default EditableTable;
