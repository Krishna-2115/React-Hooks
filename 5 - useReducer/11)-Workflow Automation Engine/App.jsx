import React, { useReducer } from "react";
import { motion } from "framer-motion";

// Workflow Steps
const steps = [
  { id: 1, name: "Start", description: "Initiate the workflow" },
  { id: 2, name: "Processing", description: "Task is being processed" },
  { id: 3, name: "Review", description: "Review the task output" },
  { id: 4, name: "Completed", description: "Workflow finished" },
];

// Initial State
const initialState = {
  currentStep: 0,
  errors: {},
  isCompleted: false,
};

// Reducer to Manage Workflow
const workflowReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      if (state.currentStep < steps.length - 1) {
        return { ...state, currentStep: state.currentStep + 1, errors: {} };
      } else {
        return { ...state, isCompleted: true };
      }
    case "PREV_STEP":
      if (state.currentStep > 0) {
        return { ...state, currentStep: state.currentStep - 1, errors: {}, isCompleted: false };
      }
      return state;
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Workflow Component
const WorkflowAutomation = () => {
  const [state, dispatch] = useReducer(workflowReducer, initialState);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <h2 style={styles.title}>🚀 Workflow Automation Engine</h2>

      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            animate={{
              backgroundColor: state.currentStep >= index ? "#3498db" : "#d3d3d3",
              scale: state.currentStep === index ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={styles.progressStep}
          />
        ))}
      </div>

      {/* Step Display */}
      {!state.isCompleted ? (
        <motion.div
          key={steps[state.currentStep].id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            ...styles.step,
            backgroundColor: "#3498db",
          }}
        >
          <h3>{steps[state.currentStep].name}</h3>
          <p>{steps[state.currentStep].description}</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={styles.successMessage}
        >
          🎉 Workflow Completed Successfully!
        </motion.div>
      )}

      {/* Buttons */}
      <div style={styles.buttons}>
        {!state.isCompleted ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: "PREV_STEP" })}
              style={styles.button}
              disabled={state.currentStep === 0}
            >
              ⬅ Previous
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: "NEXT_STEP" })}
              style={styles.button}
            >
              {state.currentStep === steps.length - 1 ? "✅ Finish" : "Next ➡"}
            </motion.button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: "RESET" })}
            style={{ ...styles.button, backgroundColor: "#e67e22" }}
          >
            🔄 Restart Workflow
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#2c3e50",
    marginBottom: "20px",
  },
  progressBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    padding: "10px",
  },
  progressStep: {
    width: "20%",
    height: "10px",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  step: {
    padding: "20px",
    borderRadius: "8px",
    color: "#fff",
    transition: "all 0.3s",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#2ecc71",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
    fontWeight: "bold",
  },
  successMessage: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#27ae60",
    fontWeight: "bold",
  },
};

export default WorkflowAutomation;
