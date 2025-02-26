import React, { useState } from "react";

const Folder = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.folder}>
      <div style={styles.folderHeader} onClick={toggleFolder}>
        <span style={styles.icon}>{isOpen ? "📂" : "📁"}</span> {folder.name}
      </div>
      {isOpen && (
        <div style={styles.childFolders}>
          {folder.children &&
            folder.children.map((child, index) => {
              if (child.type === "folder") {
                return <Folder key={index} folder={child} />;
              } else {
                return <File key={index} file={child} />;
              }
            })}
        </div>
      )}
    </div>
  );
};

const File = ({ file }) => {
  return (
    <div style={styles.file}>
      <span style={styles.icon}>📄</span> {file.name}
    </div>
  );
};

const FileExplorer = () => {
  const data = {
    name: "Root",
    type: "folder",
    children: [
      {
        name: "Documents",
        type: "folder",
        children: [
          { name: "file1.txt", type: "file" },
          { name: "file2.txt", type: "file" },
        ],
      },
      {
        name: "Pictures",
        type: "folder",
        children: [
          { name: "pic1.jpg", type: "file" },
          { name: "pic2.jpg", type: "file" },
        ],
      },
      { name: "readme.txt", type: "file" },
    ],
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>File Explorer</h2>
      <Folder folder={data} />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    background: "linear-gradient(to right, #00b4d8, #0077b6)",
    borderRadius: "10px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "36px",
    color: "#ffffff",
    marginBottom: "30px",
  },
  folder: {
    marginLeft: "20px",
    padding: "10px 0",
    transition: "all 0.3s ease",
  },
  folderHeader: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    transition: "color 0.3s",
  },
  icon: {
    marginRight: "10px",
    fontSize: "20px",
  },
  childFolders: {
    marginLeft: "30px",
    marginTop: "10px",
    paddingLeft: "20px",
    borderLeft: "2px solid #ffffff",
  },
  file: {
    marginLeft: "40px",
    color: "#ffffff",
    fontSize: "16px",
    padding: "5px 0",
    display: "flex",
    alignItems: "center",
  },
};

export default FileExplorer;
