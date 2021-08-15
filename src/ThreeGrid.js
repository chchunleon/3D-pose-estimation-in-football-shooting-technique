import React, { useState, useRef, Suspense, Component } from "react";
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, useTexture, Text, Stars, Sphere } from "@react-three/drei";
// import { Physics, usePlane, useBox } from "use-cannon";
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

function Box0() {
    // const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
    return (
        <mesh
            onClick={() => {
                // api.velocity.set(0, 2, 0);
                console.log('click box0')
            }}
            // ref={ref}
            // position={[-1, 2, 3]}
            position={[-1.706357, -1.706357, 80.698447]}
            geometry={'center'}
        >
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    );
}

function Box1() { return (<mesh position={[-8.764608, -8.764608, 8.003581 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box2() { return (<mesh position={[-8.5411995, -8.5411995, 8.1282007 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box3() { return (<mesh position={[-29.119528, -29.119528, 8.050225 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box4() { return (<mesh position={[29.70169, 29.70169, 7.9915107 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box5() { return (<mesh position={[29.42871, 29.42871, 8.1786313 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box6() { return (<mesh position={[-42.754874, -42.754874, 8.0746484 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box7() { return (<mesh position={[69.51268, 69.51268, 7.9710547 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box8() { return (<mesh position={[67.28458, 67.28458, 8.174715 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box9() { return (<mesh position={[-49.028882, -49.028882, 8.0835376 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box10() { return (<mesh position={[73.990967, 73.990967, 8.0034517 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box11() { return (<mesh position={[71.9583, 71.9583, 8.267031 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box12() { return (<mesh position={[-69.41545, -69.41545, 8.061889 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box13() { return (<mesh position={[-60.638855, -60.638855, 7.9844834 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box14() { return (<mesh position={[-59.60382, -59.60382, 8.14195 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box15() { return (<mesh position={[-74.61096, -74.61096, 8.1001846 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box16() { return (<mesh position={[-60.21713, -60.21713, 7.9008384 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box17() { return (<mesh position={[-58.100134, -58.100134, 8.237662 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box18() { return (<mesh position={[-36.32269, -36.32269, 7.8676577 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box19() { return (<mesh position={[-35.15169, -35.15169, 8.315413 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box20() { return (<mesh position={[-11.9520996, -11.9520996, 7.889534 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box21() { return (<mesh position={[-12.64083, -12.64083, 8.390143 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box22() { return (<mesh position={[-3.7141502, -3.7141502, 7.8675166 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
function Box23() { return (<mesh position={[-5.4825035, -5.4825035, 8.421123 - 8]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }


function Plane() {
    // const [ref] = usePlane(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    // }));
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshLambertMaterial attach="material" color="lightblue" />
        </mesh>
    );
}

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
            xScale: 6,
            yScale: 6,
            zScale: 6
        }

    }

    render() {
        const style = {
            height: "500px"
        };

        console.log('props threeD', this.props.threeD)

        // var has3D = this.props.threeD
        var has3D = this.props.threeD.substring(0, this.props.threeD.length - 2).substring(2).split("', '")

        // JSON.parse('[' + this.props.threeD + ']')
        console.log('has3d', has3D[0])
        console.log('check has3d 0 ', has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2])
        has3D.map((p, i) => {
            console.log(parseFloat(p.split(',')[0]))
        })

        let three = null

        if (has3D == "") {
            three = <Cube
                position={[-5, -5, 5]}
                scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                geometry={'center'}
                handleClick={() => console.log("clicked on the cube -5 -5 5")}
            >
            </Cube>
        } else {
            has3D.map((p, i) => {
                three = ''
                three +=
                    <Cube position={[parseFloat(p.split(',')[0]), parseFloat(p.split(',')[1]), parseFloat(p.split(',')[2])]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                        handleClick={() => console.log("clicked on the cube ", i)}
                    ></Cube>
            })
        }

        console.log('check three', three)

        return (
            <div style={style}>
                <Canvas camera={{
                    position: [500, 700, 10500]
                }}>
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
                        <OrbitControls
                        />
                        <directionalLight intensity={0.5}
                            // position={[6, 2, 1]} 
                            position={[-170.6357, -170.6357, 8069.8447]}
                        />
                        <ambientLight intensity={0.1} />

                        <Sphere position={[331.01685, -561.23645, 10222.217]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[254.81538, -478.3606, 10233.464]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[412.6761, -486.35312, 10246.264]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[326.03165, -678.25024, 10157.063]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[217.19934, -138.4968, 10395.575]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[417.6854, -113.135826, 10350.798]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[314.91245, -818.504, 10168.545]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[311.0685, 137.53406, 10121.064]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[393.63687, 289.69696, 10352.685]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[311.10843, -885.3395, 10158.344]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[300.55313, 301.00992, 10168.3125]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[397.9433, 323.9816, 10506.975]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[300.19684, -1100.0782, 10028.903]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[216.77505, -994.4293, 10073.0625]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[390.58954, -997.9498, 10076.061]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[300.42072, -1182.7812, 10073.451]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[117.95553, -965.86053, 10073.34]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[487.0962, -975.7543, 10074.732]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[116.92792, -716.172, 10157.134]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[519.0441, -724.8773, 10155.3545]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[107.214134, -500.88776, 10277.932]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[556.0301, -503.52115, 10282.353]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[98.54169, -425.1823, 10308.472]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[571.6212, -430.86304, 10323.148]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        )
                    </Suspense>
                </Canvas>

            </div >
        );
    }
}

// ReactDOM.render(
//     <ThreeGrid />,
//     document.getElementById('threegrid'),
// );

export default ThreeGrid;
