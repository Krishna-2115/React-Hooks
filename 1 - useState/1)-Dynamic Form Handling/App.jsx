import React, { useState } from "react";

const DynamicForm = () => {
  const [fields, setFields] = useState([]);

  const [simpleForm, setSimpleForm] = useState({
    name: "",
    email: "",
  });

  const handleSimpleFormChange = (e) => {
    const { name, value } = e.target;
    setSimpleForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const addField = () => {
    const fieldName = prompt("Enter the name of the field:");
    const fieldType = prompt(
      "Enter the type of the field (e.g., text, number, email, password):"
    );

    if (fieldName && fieldType) {
      setFields((prevFields) => [
        ...prevFields,
        { id: Date.now(), name: fieldName, type: fieldType, value: "" },
      ]);
    } else {
      alert("Both name and type are required to add a field.");
    }
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleInputChange = (id, newValue) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dynamicFormData = fields.reduce((data, field) => {
      data[field.name] = field.value;
      return data;
    }, {});
    const formData = {
      ...simpleForm,
      dynamicFields: dynamicFormData,
    };
    console.log("Form Data:", formData);
    alert(JSON.stringify(formData, null, 2));
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
    color: "#fff",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  };

  const formStyle = {
    maxWidth: "500px",
    width: "90%",
    padding: "20px",
    background: "linear-gradient(145deg, #1e293b, #3b4255)",
    borderRadius: "12px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.7)",
    zIndex: "2",
  };

  const inputStyle = {
    width: "94%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "2px solid #444",
    background: "#111",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s ease",
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#00ff99",
    boxShadow: "0px 0px 8px #00ff99",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#00ffcc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  };

  const addButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(145deg, #00ff99, #00cc88)",
    color: "#000",
    marginBottom: "15px",
    marginRight:"10px"
  };

  const removeButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(145deg, #ff0055, #cc0044)",
    color: "#fff",
  };

  const submitButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(145deg, #0066ff, #0055cc)",
    color: "#fff",
    marginTop: "20px",
  };

  const glowingAnimationStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "1000px",
    height: "1000px",
    background: "radial-gradient(circle, rgba(0,255,132,0.1), transparent 60%)",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    filter: "blur(100px)",
    animation: "pulse 6s infinite alternate",
  };

  return (
    <div style={containerStyle}>
      <div style={glowingAnimationStyle}></div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ fontSize:"2rem", textAlign: "center", marginBottom: "20px" }}>
          Dynamic Form
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={simpleForm.name}
            onChange={handleSimpleFormChange}
            placeholder="Enter your name"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={simpleForm.email}
            onChange={handleSimpleFormChange}
            placeholder="Enter your email"
            style={inputStyle}
          />
        </div>

        {fields.map((field) => (
          <div key={field.id} style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>{field.name}:</label>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={`Enter ${field.name}`}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => removeField(field.id)}
              style={removeButtonStyle}
            >
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addField} style={addButtonStyle}>
          Add Field
        </button>
        <button type="submit" style={submitButtonStyle}>
          Submit
        </button>
      </form>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.7; transform: scale(1); }
            100% { opacity: 0.3; transform: scale(1.2); }
          }
        `}
      </style>
    </div>
  );
};

export default DynamicForm;
