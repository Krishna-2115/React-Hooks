import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
//npm install gasp
const AnimatedBox = () => {
    const boxRef = useRef(null);

    useLayoutEffect(() => {
        gsap.fromTo(
            boxRef.current,
            { opacity: 0, scale: 0.5, y: -50 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
        );
    }, []);

    return (
        <div
            ref={boxRef}
            style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#3498db",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "10px",
            }}
        >
            GSAP Box
        </div>
    );
};

export default AnimatedBox;
