import React, { useState, useMemo } from "react";

// Sample Large Folder Structure
const fileTree = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Documents",
      type: "folder",
      children: [
        { name: "Resume.pdf", type: "file" },
        { name: "Project.docx", type: "file" },
      ],
    },
    {
      name: "Pictures",
      type: "folder",
      children: [
        { name: "Vacation.jpg", type: "file" },
        { name: "Family.png", type: "file" },
      ],
    },
    {
      name: "Music",
      type: "folder",
      children: [
        { name: "Song1.mp3", type: "file" },
        { name: "Song2.mp3", type: "file" },
      ],
    },
  ],
};

// Styles (Inline)
const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  folder: {
    fontWeight: "bold",
    cursor: "pointer",
    margin: "5px 0",
  },
  file: {
    paddingLeft: "20px",
    margin: "3px 0",
  },
};

const FileExplorer = ({ node, expandedNodes, toggleNode }) => {
  // Memoized Visible Nodes Calculation
  const visibleChildren = useMemo(() => {
    return expandedNodes[node.name] ? node.children || [] : [];
  }, [expandedNodes, node.name]);

  return (
    <div>
      <div
        style={styles.folder}
        onClick={() => toggleNode(node.name)}
      >
        {node.type === "folder" ? (expandedNodes[node.name] ? "📂" : "📁") : "📄"} {node.name}
      </div>

      {/* Render Children if Folder is Expanded */}
      {visibleChildren.length > 0 && (
        <div style={{ paddingLeft: "20px" }}>
          {visibleChildren.map((child) => (
            <FileExplorer key={child.name} node={child} expandedNodes={expandedNodes} toggleNode={toggleNode} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorerApp = () => {
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleNode = (nodeName) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeName]: !prev[nodeName],
    }));
  };

  return (
    <div style={styles.container}>
      <h2>📂 File Explorer</h2>
      <FileExplorer node={fileTree} expandedNodes={expandedNodes} toggleNode={toggleNode} />
    </div>
  );
};

export default FileExplorerApp;
