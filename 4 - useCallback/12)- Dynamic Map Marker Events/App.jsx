import React, { useState, useCallback, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/visgl/react-simple-maps/master/topojson-maps/world-110m.json";

const DraggableMarkerMap = () => {
  const [position, setPosition] = useState([0, 0]); // Initial position at [0, 0]
  const [dragging, setDragging] = useState(false); // Track dragging state
  const [zoom, setZoom] = useState(200); // Default zoom level

  const mapRef = useRef(null);

  // Function to prevent the marker from being dragged outside the map boundaries
  const constrainPosition = (lat, lng) => {
    const maxLat = 85; // Latitude boundary
    const minLat = -85;
    const maxLng = 180; // Longitude boundary
    const minLng = -180;
    return [
      Math.min(Math.max(lat, minLat), maxLat),
      Math.min(Math.max(lng, minLng), maxLng),
    ];
  };

  // Drag start event
  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  // Mouse move event for dragging the marker
  const handleMouseMove = useCallback(
    (e) => {
      if (dragging) {
        const deltaX = e.clientX - mapRef.current.offsetLeft;
        const deltaY = e.clientY - mapRef.current.offsetTop;
        const newLat = (deltaY - 250) / zoom; // Adjust for scaling sensitivity
        const newLng = (deltaX - 250) / zoom; // Adjust for scaling sensitivity

        // Constrain the position to avoid going off the map
        const [constrainedLat, constrainedLng] = constrainPosition(newLat, newLng);
        setPosition([constrainedLat, constrainedLng]);
      }
    },
    [dragging, zoom]
  );

  // Mouse up event to stop dragging
  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Zoom in
  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 20, 300)); // Max zoom level is 300
  };

  // Zoom out
  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 20, 100)); // Min zoom level is 100
  };

  // Reset map to original position
  const resetMap = () => {
    setPosition([0, 0]);
    setZoom(200);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ height: "500px", position: "relative" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: zoom }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          ref={mapRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>

          {/* Marker */}
          <Marker coordinates={position} onMouseDown={handleDragStart}>
            <circle
              cx={position[1]}
              cy={position[0]}
              r={12}
              fill="#FF5722"
              style={{
                cursor: "pointer",
                transition: "transform 0.1s ease", // Smooth transition
              }}
            />
          </Marker>
        </ComposableMap>

        {/* UI Controls */}
        <div style={styles.controls}>
          <div style={styles.buttonContainer}>
            <button onClick={zoomIn} style={styles.button}>Zoom In</button>
            <button onClick={zoomOut} style={styles.button}>Zoom Out</button>
            <button onClick={resetMap} style={styles.button}>Reset Map</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  controls: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "10px",
    borderRadius: "8px",
    zIndex: 10,
  },
  buttonContainer: {
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    margin: "5px",
    backgroundColor: "#FF5722",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default DraggableMarkerMap;
