import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Space, Divider, Radio, Row, Col, Input, InputNumber, Layout, Upload, Button, Result } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { GUI } from 'dat.gui'


const { Header, Footer, Sider, Content } = Layout;

class Dashboard extends Component {
    constructor () {
        super();
        this.state = {

        }

    }

    // useEffect(() => {
    // })

    componentDidMount() {
        // this.generateModel()
    }

    generateModel = () => {

        if (this.props.jointEdges == '')
            var jointEdges = ''
        else {
            var jointEdges = this.props.jointEdges
        }

        if (this.props.threeD == '') {
            var has3D = ''

            if (document.getElementById('threeboard' + this.props.tabNumber.toString())) {
                document.getElementById('threeboard' + this.props.tabNumber.toString()).innerHTML = ''
            }
        }
        else {
            var has3D = this.props.threeD.substring(0, this.props.threeD.length - 2).substring(2).split("', '")

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            // Perspective camera
            const aspect = window.innerWidth / window.innerHeight;
            // const camera = new THREE.PerspectiveCamera(
            //     45, // field of view in degrees
            //     aspect, // aspect ratio
            //     0, // near plane
            //     1000 // far plane
            // );


            // Orthographic camera
            const width = 25;
            const height = width * (window.innerHeight / window.innerWidth);
            // console.log('height', height)
            const camera = new THREE.OrthographicCamera(
                width / -1, // left
                width / 1, // right
                height / 1, // top
                height / -1, // bottom
                0, // near
                100000 // far
            )


            const renderer = new THREE.WebGLRenderer();
            // renderer.setSize(802.5, 451.41)
            const windowRatio = window.innerHeight / window.innerWidth
            var ww = window.innerWidth - 300
            var hh = ww * windowRatio
            renderer.setSize(ww, hh);
            if (document.getElementById('threeboard' + this.props.tabNumber.toString())) {
                document.getElementById('threeboard' + this.props.tabNumber.toString()).innerHTML = ''
                document.getElementById('threeboard' + this.props.tabNumber.toString()).appendChild(renderer.domElement)
            }


            const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);

            var controls = new OrbitControls(camera, renderer.domElement);

            // skeleton
            const materialSkeleton = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const geometrySkeleton = new THREE.SphereGeometry(.25)

            if (has3D != '') {
                var meshSkeleton = []
                has3D.map((p, i) => {
                    meshSkeleton[i] = new THREE.Mesh(geometrySkeleton, materialSkeleton)
                    if (i == 0) {
                        controls.target.set(-1 * parseFloat(p.split(',')[0]), -1 * parseFloat(p.split(',')[1]), parseFloat(p.split(',')[2]));
                        controls.update();
                    }
                    meshSkeleton[i].position.set(-1 * parseFloat(p.split(',')[0]), -1 * parseFloat(p.split(',')[1]), parseFloat(p.split(',')[2]))
                    scene.add(meshSkeleton[i]);
                })
            }

            //line
            const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
            if (has3D != '') {
                var pointsLine = [];
                var joints = jointEdges.map((p, i) => {
                    return p.substring(0, p.length - 1).substring(1).split(" ").filter((j => { return j != '' }))
                })
                joints.map((j, i) => {
                    var points = []
                    var coord1 = has3D[parseInt(j[0])]
                    var coord2 = has3D[parseInt(j[1])]
                    // console.log('ss', j, coord1, coord2)
                    points.push(new THREE.Vector3(-1 * parseFloat(coord1.split(',')[0]), -1 * parseFloat(coord1.split(',')[1]), parseFloat(coord1.split(',')[2])))
                    points.push(new THREE.Vector3(-1 * parseFloat(coord2.split(',')[0]), -1 * parseFloat(coord2.split(',')[1]), parseFloat(coord2.split(',')[2])))
                    pointsLine[i] = new THREE.BufferGeometry().setFromPoints(points);
                    var line = new THREE.Line(pointsLine[i], materialLine);
                    scene.add(line);
                })

            }

            const cameraHelper = new THREE.CameraHelper(camera);
            scene.add(cameraHelper);

            const w = 100;
            const h = 100;
            const fullWidth = w * 3;
            const fullHeight = h * 2;

            const axesHelper = new THREE.AxesHelper(12000);
            scene.add(axesHelper);

            // const animate = function () {
            //     requestAnimationFrame(animate);

            //     cube.rotation.x += 0.01;
            //     cube.rotation.y += 0.01;

            //     // controls.update();

            //     // camera.fov *= 0.1;
            //     // camera.updateProjectionMatrix();

            //     renderer.render(scene, camera);
            // };

            // animate();

            // const canvas = document.querySelector('#c');
            // const view1Elem = document.querySelector('#view1');
            // const view2Elem = document.querySelector('#view2');
            // const renderer = new THREE.WebGLRenderer({ canvas });
        }
    }


    render() {
        const style = {
            display: 'flex',
            justifyContent: 'flex-end'
        };

        const styleWidth = {
            width: '500px'
        }

        if (this.props.threeD == '') {
            var showError = 'Error'
            if (document.getElementById('threeboard' + this.props.tabNumber.toString())) {
                document.getElementById('threeboard' + this.props.tabNumber.toString()).innerHTML = ''
            }
        } else {
            var showError = ''
        }

        this.generateModel()
        // console.log('props threeD', this.props.threeD)
        // console.log('props jointEdges', this.props.jointEdges)

        setTimeout(() => {
            this.generateModel();
            // console.log('timout 3D')
        }, 500)

        document.addEventListener("DOMContentLoaded", function (event) {
            //we ready baby
            console.log('ready')
        });

        return (
            <div >
                <Row>
                    <Col span={24}>
                        {showError == 'Error' ? (
                            <div></div>
                        ) : (this.props.tabNumber == 0 ? (<div id='threeboard0'></div>) : (<div id='threeboard1'></div>)
                        )}

                    </Col>

                </Row>

                {/* <div id="c">canvas</div>
                <div id="view1">view1</div>
                <div id="view2">view2</div> */}
            </div >
        );
    }
}

// ReactDOM.render(
//     <Dashboard />,
//     document.getElementById('dashboard'),
// );

export default Dashboard;
