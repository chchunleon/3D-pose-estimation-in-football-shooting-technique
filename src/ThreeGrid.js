import React, { useState, useRef, Suspense, Component } from "react";
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, useTexture, Text, Stars, Sphere } from "@react-three/drei";
// import { Physics, usePlane, useBox } from "use-cannon";
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
{/* 0: '-170.6357,-170.6357,8069.8447', 1: '-87.64608,-87.64608,8003.581', 2: '-85.411995,-85.411995,8128.2007', 3: '-291.19528,-291.19528,8050.225', 
    4: '297.0169,297.0169,7991.5107', 5: '294.2871,294.2871,8178.6313', 6: '-427.54874,-427.54874,8074.6484', 7: '695.1268,695.1268,7971.0547', 
    8: '672.8458,672.8458,8174.715', 9: '-490.28882,-490.28882,8083.5376', 10: '739.90967,739.90967,7996.5483', 11: '719.583,719.583,8267.031', 
    12: '-694.1545,-694.1545,8061.889', 13: '-606.38855,-606.38855,7984.4834', 14: '-596.0382,-596.0382,8141.95', 15: '-746.1096,-746.1096,8100.1846', 
    16: '-602.1713,-602.1713,7900.8384', 17: '-581.00134,-581.00134,8237.662', 18: '-363.2269,-363.2269,7867.6577', 19: '-351.5169,-351.5169,8315.413', 
    20: '-119.520996,-119.520996,7889.534', 21: '-126.4083,-126.4083,8390.143', 22: '-37.141502,-37.141502,7867.5166', 23: '-54.825035,-54.825035,8421.123' */}
// function Box0() { return (<mesh position={[this.props.human_coordinates.split(',')[0], this.props.human_coordinates.split(',')[1], this.props.human_coordinates.split(',')[2]]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box1() { return (<mesh position={[-0.8764608, -0.8764608, 80.03581]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box2() { return (<mesh position={[-0.85411995, -0.85411995, 81.282007]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box3() { return (<mesh position={[-2.9119528, -2.9119528, 80.50225]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box4() { return (<mesh position={[2.970169, 2.970169, 79.915107]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box5() { return (<mesh position={[2.942871, 2.942871, 81.786313]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box6() { return (<mesh position={[-4.2754874, -4.2754874, 80.746484]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box7() { return (<mesh position={[6.951268, 6.951268, 79.710547]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box8() { return (<mesh position={[6.728458, 6.728458, 81.74715]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box9() { return (<mesh position={[-4.9028882, -4.9028882, 80.835376]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box10() { return (<mesh position={[7.3990967, 7.3990967, 80.034517]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box11() { return (<mesh position={[7.19583, 7.19583, 82.67031]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box12() { return (<mesh position={[-6.941545, -6.941545, 80.61889]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box13() { return (<mesh position={[-6.0638855, -6.0638855, 79.844834]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box14() { return (<mesh position={[-5.960382, -5.960382, 81.4195]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box15() { return (<mesh position={[-7.461096, -7.461096, 81.001846]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box16() { return (<mesh position={[-6.021713, -6.021713, 79.008384]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box17() { return (<mesh position={[-5.8100134, -5.8100134, 82.37662]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box18() { return (<mesh position={[-3.632269, -3.632269, 78.676577]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box19() { return (<mesh position={[-3.515169, -3.515169, 83.15413]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box20() { return (<mesh position={[-1.19520996, -1.19520996, 78.89534]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box21() { return (<mesh position={[-1.264083, -1.264083, 83.90143]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box22() { return (<mesh position={[-0.37141502, -0.37141502, 78.675166]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }
// function Box23() { return (<mesh position={[-0.54825035, -0.54825035, 84.21123]} ><boxBufferGeometry attach="geometry" /><meshLambertMaterial attach="material" color="hotpink" /></mesh>); }



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
                {/* <Canvas>
                    <OrbitControls />
                    <Stars />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[-1, -1, 85]} angle={0.3} />
                    <Box0 />
                    <Box1 />
                    <Box2 />
                    <Box3 />
                    <Box4 />
                    <Box5 />
                    <Box6 />
                    <Box7 />
                    <Box8 />
                    <Box9 />
                    <Box10 />
                    <Box11 />
                    <Box12 />
                    <Box13 />
                    <Box14 />
                    <Box15 />
                    <Box16 />
                    <Box17 />
                    <Box18 />
                    <Box19 />
                    <Box20 />
                    <Box21 />
                    <Box22 />
                    <Box23 />
                    <Plane />
                </Canvas> */}


                <Canvas camera={{
                    // position: [30, 30, 30],
                    // position: [500, 500, 4169.8447],
                    position: [500, 700, 10500]
                    // geometry: "center"
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
                        // target={[-170.6357, -170.6357, 8069.8447]}
                        // target0={[-170.6357, -170.6357, 8069.8447]}
                        />
                        <directionalLight intensity={0.5}
                            // position={[6, 2, 1]} 
                            position={[-170.6357, -170.6357, 8069.8447]}
                        />
                        <ambientLight intensity={0.1} />
                        <Grid size={100} />
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

                        {/* <Cube
                            handleClick={() => console.log("clicked on the cube")}
                            rotation={[
                                this.state.xRotation * Math.PI,
                                this.state.yRotation * Math.PI,
                                this.state.zRotation * Math.PI
                            ]}
                            position={[this.state.xPosition, this.state.yPosition, this.state.zPosition]}
                            scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                        /> */}
                        {/* <Cube
                            position={[-5, -5, 5]}
                            scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                            geometry={'center'}
                        >
                        </Cube> */}
                        {/* <Cube
                            // position={[-170.6357, -170.6357, 8069.8447]}
                            position={[0, 0, 0]}
                            // position={[-1.706357, -1.706357, 80.698447]}
                            scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                            geometry={'center'}
                        >
                        </Cube> */}
                        {/* {three} */}
                        {/* {has3D == ''} ? (<Cube
                            position={[-5, -5, 5]}
                            scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                            geometry={'center'}
                            handleClick={() => console.log("clicked on the cube -5 -5 5")}
                        >
                        </Cube>) : ( {has3D.map((p, i) => {
                            <Sphere position={[parseFloat(p.split(',')[0]), parseFloat(p.split(',')[1]), parseFloat(p.split(',')[2])]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]}
                                handleClick={() => console.log("clicked on the cube ", i)}
                            ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        })} */}

                        {/* <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[1].split(',')[0], has3D[1].split(',')[1], has3D[1].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[2].split(',')[0], has3D[2].split(',')[1], has3D[2].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[3].split(',')[0], has3D[3].split(',')[1], has3D[3].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[4].split(',')[0], has3D[4].split(',')[1], has3D[4].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[5].split(',')[0], has3D[5].split(',')[1], has3D[5].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[6].split(',')[0], has3D[6].split(',')[1], has3D[6].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[7].split(',')[0], has3D[7].split(',')[1], has3D[7].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[8].split(',')[0], has3D[8].split(',')[1], has3D[8].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[9].split(',')[0], has3D[9].split(',')[1], has3D[9].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[10].split(',')[0], has3D[10].split(',')[1], has3D[10].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube>
                        <Cube position={[has3D[0].split(',')[0], has3D[0].split(',')[1], has3D[0].split(',')[2]]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ></Cube> */}
                        {/* '0': '-17.063569641113283,-17.063569641113283,69.8447265625', '1': '-8.764608001708984,-8.764608001708984,3.5810546875', 
                        '2': '-8.541199493408204,-8.541199493408204,128.20068359375', '3': '-29.119528198242186,-29.119528198242186,50.22509765625', 
                        '4': '29.701690673828125,29.701690673828125,-8.4892578125', '5': '29.4287109375,29.4287109375,178.63134765625', 
                        '6': '-42.75487365722656,-42.75487365722656,74.6484375', '7': '69.51267700195312,69.51267700195312,-28.9453125', 
                        '8': '67.28458251953126,67.28458251953126,174.71484375', '9': '-49.0288818359375,-49.0288818359375,83.53759765625', 
                        '10': '73.990966796875,73.990966796875,-3.45166015625', '11': '71.95830078125,71.95830078125,267.03125', 
                        '12': '-69.41544799804687,-69.41544799804687,61.88916015625', '13': '-60.63885498046875,-60.63885498046875,-15.5166015625', 
                        '14': '-59.60382080078125,-59.60382080078125,141.9501953125', '15': '-74.6109619140625,-74.6109619140625,100.1845703125', 
                        '16': '-60.217132568359375,-60.217132568359375,-99.16162109375', '17': '-58.10013427734375,-58.10013427734375,237.662109375', 
                        '18': '-36.322689819335935,-36.322689819335935,-132.34228515625', '19': '-35.15169067382813,-35.15169067382813,315.4130859375', 
                        '20': '-11.952099609375,-11.952099609375,-110.4658203125', '21': '-12.64083023071289,-12.64083023071289,390.142578125', 
                        '22': '-3.714150238037109,-3.714150238037109,-132.4833984375', '23': '-5.482503509521484,-5.482503509521484,421.123046875' */}
                        {/* <Sphere position={[-115.48059, -115.48059, 4000.8027]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-39.94573, -39.94573, 4058.213]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-40.023422, -40.023422, 3938.181]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-218.9277, -218.9277, 3981.605]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[362.2199, 362.2199, 4081.4758]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[335.97818, 335.97818, 3971.2493]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-351.2414, -351.2414, 4000.3867]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[749.4921, 749.4921, 4037.8625]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[739.4334, 739.4334, 3969.4497]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-412.8452, -412.8452, 4003.5835]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[804.337, 804.337, 4122.71]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[804.0158, 804.0158, 3993.9915]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-611.1909, -611.1909, 3974.6184]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-523.0093, -523.0093, 4074.225]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-517.80066, -517.80066, 3896.4297]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-666.3439, -666.3439, 3987.684]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-538.8924, -538.8924, 4169.869]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-523.3457, -523.3457, 3790.1245]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-348.22836, -348.22836, 4275.9863]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-370.91095, -370.91095, 3672.0044]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-260.08804, -260.08804, 4252.9663]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-193.9899, -193.9899, 3750.4375]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-238.00406, -238.00406, 4245.5986]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere>
                        <Sphere position={[-141.6365, -141.6365, 3746.618]} scale={[this.state.xScale, this.state.yScale, this.state.zScale]} ><meshStandardMaterial attach="material" color="#000000" /></Sphere> */}
                        {/* ['-115.48059,-115.48059,4000.8027', '-39.94573,-39.94573,4058.213', '-40.023422,-40.023422,3938.181', '-218.9277,-218.9277,3981.605', 
                        '362.2199,362.2199,4081.4758', '335.97818,335.97818,3971.2493', '-351.2414,-351.2414,4000.3867', '749.4921,749.4921,4037.8625', 
                        '739.4334,739.4334,3969.4497', '-412.8452,-412.8452,4003.5835', '804.337,804.337,4122.71', '804.0158,804.0158,3993.9915', 
                        '-611.1909,-611.1909,3974.6184', '-523.0093,-523.0093,4074.225', '-517.80066,-517.80066,3896.4297', '-666.3439,-666.3439,3987.684', 
                        '-538.8924,-538.8924,4169.869', '-523.3457,-523.3457,3790.1245', '-348.22836,-348.22836,4275.9863', '-370.91095,-370.91095,3672.0044', 
                        '-260.08804,-260.08804,4252.9663', '-193.9899,-193.9899,3750.4375', '-238.00406,-238.00406,4245.5986', '-141.6365,-141.6365,3746.618'] */}


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
                        {/* #  ['331.01685,-561.23645,10222.217', '254.81538,-478.3606,10233.464', '412.6761,-486.35312,10246.264', '326.03165,-678.25024,10157.063',
                        #  '217.19934,-138.4968,10395.575', '417.6854,-113.135826,10350.798', '314.91245,-818.504,10168.545', '311.0685,137.53406,10121.064',
                        #  '393.63687,289.69696,10352.685', '311.10843,-885.3395,10158.344', '300.55313,301.00992,10168.3125', '397.9433,323.9816,10506.975',
                        #  '300.19684,-1100.0782,10028.903', '216.77505,-994.4293,10073.0625', '390.58954,-997.9498,10076.061', '300.42072,-1182.7812,10073.451',
                        #  '117.95553,-965.86053,10073.34', '487.0962,-975.7543,10074.732', '116.92792,-716.172,10157.134', '519.0441,-724.8773,10155.3545',
                        #  '107.214134,-500.88776,10277.932', '556.0301,-503.52115,10282.353', '98.54169,-425.1823,10308.472', '571.6212,-430.86304,10323.148'] */}
                        )
                    </Suspense>
                </Canvas>
                {/* 0: '-170.6357,-170.6357,8069.8447', 1: '-87.64608,-87.64608,8003.581', 2: '-85.411995,-85.411995,8128.2007', 3: '-291.19528,-291.19528,8050.225', 
                4: '297.0169,297.0169,7991.5107', 5: '294.2871,294.2871,8178.6313', 6: '-427.54874,-427.54874,8074.6484', 7: '695.1268,695.1268,7971.0547', 
                8: '672.8458,672.8458,8174.715', 9: '-490.28882,-490.28882,8083.5376', 10: '739.90967,739.90967,7996.5483', 11: '719.583,719.583,8267.031', 
                12: '-694.1545,-694.1545,8061.889', 13: '-606.38855,-606.38855,7984.4834', 14: '-596.0382,-596.0382,8141.95', 15: '-746.1096,-746.1096,8100.1846', 
                16: '-602.1713,-602.1713,7900.8384', 17: '-581.00134,-581.00134,8237.662', 18: '-363.2269,-363.2269,7867.6577', 19: '-351.5169,-351.5169,8315.413', 
                20: '-119.520996,-119.520996,7889.534', 21: '-126.4083,-126.4083,8390.143', 22: '-37.141502,-37.141502,7867.5166', 23: '-54.825035,-54.825035,8421.123' */}
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
