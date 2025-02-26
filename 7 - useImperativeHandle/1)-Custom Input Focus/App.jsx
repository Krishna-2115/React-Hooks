import React, { useImperativeHandle } from "react";

const CustomInput = (props) => {
  let inputElement = null;

  useImperativeHandle(props.inputRef, () => ({
    focus: () => {
      if (inputElement) {
        inputElement.focus();
      }
    },
    clear: () => {
      if (inputElement) {
        inputElement.value = "";
      }
    }
  }));

  return <input ref={(el) => (inputElement = el)} type="text" placeholder="Type something..." style={{ border: "1px solid #ccc", padding: "8px" }} />;
};

const ParentComponent = () => {
  let inputMethods = {};

  return (
    <div style={{ padding: "16px" }}>
      <CustomInput inputRef={(methods) => (inputMethods = methods)} />
      <button
        onClick={() => inputMethods?.focus?.()}
        style={{ marginTop: "8px", marginLeft:"8px",padding: "8px 16px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Focus Input
      </button>
      <button
        onClick={() => inputMethods?.clear?.()}
        style={{ marginTop: "8px", marginLeft: "8px", padding: "8px 16px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Clear Input
      </button>
    </div>
  );
};

export default ParentComponent;