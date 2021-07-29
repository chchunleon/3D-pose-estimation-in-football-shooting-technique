import React, { useState, useRef, Suspense, Component } from "react";
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, useTexture, Text } from "@react-three/drei";
import Grid from "./Grid";
// import Controls from "./Controls";
// import "./styles.css";

const Cube = ({ position, rotation, scale = [1, 1, 1], handleClick }) => (
    <group position={position} rotation={rotation} scale={scale}>
        <Box args={[1, 1, 1]} onClick={handleClick}>
            <meshStandardMaterial attach="material" color="white" />
        </Box>
    </group>
);

const Light = ({
    position,
    color,
    intensity,
    orbitalOffset = 0,
    orbitalSpeed = 1
}) => {
    const ref = useRef();
    useFrame(() => {
        let date = Date.now() * orbitalSpeed * 0.001 + orbitalOffset;
        ref.current.position.set(
            Math.cos(date) * 2 + position[0],
            Math.sin(date) * 2 + position[1],
            Math.sin(date) * 2 + position[2]
        );
    });
    const texture = useTexture("lightbulb.png");
    return (
        <group position={position} ref={ref}>
            <sprite>
                <spriteMaterial
                    attach="material"
                    map={texture}
                    transparent
                    opacity={0.7}
                    color={color}
                />
            </sprite>
            <pointLight color={color} intensity={intensity} decay={2} distance={20} />
        </group>
    );
};

class ThreeGrid extends Component {
    constructor () {
        super();
        this.state = {
            xPosition: 0,
            yPosition: 0,
            zPosition: 0,
            xRotation: 0,
            yRotation: 0,
            zRotation: 0,
            xScale: 1,
            yScale: 1,
            zScale: 1
        }

    }



    render() {
        // const [xPosition, setXPosition] = useState(0);
        // const [yPosition, setYPosition] = useState(0);
        // const [zPosition, setZPosition] = useState(0);

        // const [xRotation, setXRotation] = useState(0);
        // const [yRotation, setYRotation] = useState(0);
        // const [zRotation, setZRotation] = useState(0);

        // const [xScale, setXScale] = useState(1);
        // const [yScale, setYScale] = useState(1);
        // const [zScale, setZScale] = useState(1);

        const style = {
            height: "500px"
        };

        return (
            <div style={style}>
                <Canvas camera={{ position: [0, 2, 10] }}>
                    <Suspense
                        fallback={
                            <Text
                                color="white" // default
                                anchorX="center" // default
                                anchorY="middle" // default
                            >
                                Loading
                            </Text>
                        }
                    >
                        <OrbitControls />
                        <directionalLight intensity={0.5} position={[6, 2, 1]} />
                        <ambientLight intensity={0.1} />
                        <Grid size={15} />
                        {/* <Light position={[3, 0, 2]} color="red" intensity={2} offset={200} />
                        <Light
                            position={[2, 2, -2]}
                            color="blue"
                            intensity={2}
                            distance={10}
                            orbitalSpeed={2}
                        />
                        <Light
                            position={[-3, 0, 2]}
                            color="green"
                            intensity={2}
                            orbitalSpeed={3}
                        /> */}

                        <Cube
                            handleClick={() => console.log("clicked on the cube")}
                            rotation={[
                                this.state.xRotation * Math.PI,
                                this.state.yRotation * Math.PI,
                                this.state.zRotation * Math.PI
                            ]}
                            position={[this.state.xPosition, this.state.yPosition, this.state.zPosition]}
                            scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                        />
                    </Suspense>
                </Canvas>
                {/* <Controls
        controls={{
          xPosition,
          yPosition,
          zPosition,
          xRotation,
          yRotation,
          zRotation,
          xScale,
          yScale,
          zScale,
          setXPosition,
          setYPosition,
          setZPosition,
          setXRotation,
          setYRotation,
          setZRotation,
          setXScale,
          setYScale,
          setZScale
        }}
      /> */}
            </div >
        );
    }
}

// ReactDOM.render(
//     <ThreeGrid />,
//     document.getElementById('threegrid'),
// );

export default ThreeGrid;
