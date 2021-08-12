import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Progress, Statistic, Space, Divider, Radio, Row, Col, Input, InputNumber, Layout, Upload, Button, Slider, Image, notification, message, Badge, Tabs, Result, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import ThreeGrid from './ThreeGrid';
// import { Storage, API } from 'aws-amplify';
// import { createVideoFile } from './graphql/mutations';
// import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

import * as THREE from 'three';
import Dashboard from './Dashboard';
import { LeftCircleTwoTone, RightCircleTwoTone, ArrowLeftOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const { Text, Link } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const IMG_FILTER_INDEX = ['Skeleton', 'Hip angle', 'Shooting Knee Angle', 'Balancing Hand Angle', 'Planting Foot Knee Angle', 'Balancing Elbow Angle', 'Shooting Leg Ankle Angle']

// const [value, setValue] = React.useState(2);


class UploadVideo extends Component {
    constructor () {
        super();
        this.state = {
            file: null,
            height: 170,
            weight: 60,
            shootingFoot: "right",
            isAnalysed: false,
            isUploading: false,
            videoObjectURL: null,
            frameCount: 2,
            selectedFrame: "error",
            human_coordinates: [],
            key_frame_angles: '',
            skeleton_2d_coordinates: [],
            imgFilter: 0,
            frameNumber: 0,
            joint_edges: [],
            imgDetails: { height: '', width: '', duration: 0, channels: '', fps: '' },
            displayTime: '',
            angularDegree: '',
            angularVelocity: '',
            ankleLinearVelocity: '',
            ballVelocity: '',
            ballSpeedFrame: "error",
            joinChangesGraph: "error",
            isCalculated: false,
            isCalculating: false,
            shootingFrame: ''
        }
        this.clickAnalysis = this.clickAnalysis.bind(this)
    }

    changeVideo = (file) => {
        console.log('changeVideo', file)
        if (file.fileList.length == 0)
            this.setState({ file: file.file, videoObjectURL: null, isAnalysed: false, isCalculated: false })
        else
            this.setState({ file: file.file, videoObjectURL: URL.createObjectURL(file.file), isAnalysed: false, isCalculated: false })
        this.props.onRemoveVideo2(1)
        console.log('videoObjectURL', this.state.videoObjectURL);

        this.playVideo()
    }

    beforeUpload = (file, fileList) => {
        this.setState({ file: file })
        console.log('beforeupload', file, fileList, this.state.file, JSON.stringify(JSON.parse(file)))
        this.setState({ videoObjectURL: URL.createObjectURL(fileList[0]) });
        console.log('videoObjectURL', this.state.videoObjectURL);

        return false
    }

    changeHeight = e => {
        this.setState({ height: e })
        console.log(this.state.height, this.state.shootingFoot, this.state.file, e)
        if (this.state.height == null)
            console.log('height null')
        if (this.state.shootingFoot == null)
            console.log('shootingFoot null')
        if (!this.state.file && this.state.file == null)
            console.log('file null')
    }

    changeWeight = e => {
        this.setState({ weight: e })
    }

    changeFoot = e => {
        this.setState({ shootingFoot: e.target.value })
        // setValue(e.target.value);
    }

    playVideo = () => {
        if (!this.state.videoObjectURL)
            return
        console.log('playvidoe', this.state.videoObjectURL, this.state.file)
        var video = document.getElementById('video-player1');
        video.src = this.state.videoObjectURL
        video.play()
        // video.querySelectorAll('*').forEach(n => n.remove());
        // var source = document.createElement('source');
        // // var source = document.getElementById('video-source')

        // source.setAttribute('src', this.state.videoObjectURL);

        // video.appendChild(source);
        // video.play();

        // // setTimeout(function () {
        // //     video.pause();

        // //     source.setAttribute('src', this.state.videoObjectURL);

        // //     video.load();
        // //     video.play();
        // // }.bind(this), 3000);
    }

    removeVideo = e => {
        this.setState({ file: null })
        console.log('remove vil', e, this.state.file)
    }

    async clickAnalysis(e) {
        this.setState({ isUploading: true, isAnalysed: false, isCalculated: false, isCalculating: false })

        this.openNotification('Analysing')

        const fileName = this.state.file.name
        // await Storage.put(fileName, this.state.file);

        const arrayBuffer = await this.getArrayBuffer(this.state.file);
        console.log('arrayBuffer', arrayBuffer)

        var fileDetails = {
            name: this.state.file.name,
            type: this.state.file.type,
            uid: this.state.file.uid,
            webkitRelativePath: this.state.file.webkitRelativePath,
            lastModified: this.state.file.lastModified.toString(),
            lastModifiedDate: this.state.file.lastModifiedDate,
            size: this.state.file.size,
        }

        const uploadFile = {
            // file: this.state.videoObjectURL,
            file: this.state.file,
            // file: Array.from(new Uint8Array(arrayBuffer)).toString(),
            // file: JSON.stringify(fileDetails),
            height: this.state.height,
            weight: this.state.weight,
            shootingFoot: this.state.shootingFoot,
            tab: "1"
        }
        // name: this.state.file.name,
        //     type: this.state.file.type,
        //         uid: this.state.file.uid,
        //             webkitRelativePath: this.state.file.webkitRelativePath,
        //                 lastModified: this.state.file.lastModified.toString(),
        //                     lastModifiedDate: this.state.file.lastModifiedDate,
        //                         size: this.state.file.size,

        console.log('clickAnalysis', e, this.state.file, uploadFile, fileDetails)

        // try {
        // const uploadStatus = await API.graphql({ query: createVideoFile, variables: { input: uploadFile } })
        // } catch (e) {
        // console.log('Error!', e)
        // } finally {
        // console.log(uploadStatus)



        // let headers = new Headers();

        // // headers.append('Content-Type', 'application/json');
        // // headers.append('Accept', 'application/json');
        // // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        // headers.append('Origin', 'http://localhost:3000');
        // const response =
        //     fetch(`http://3.0.100.43:8080/videos`, {
        //         method: 'POST',

        //         body: JSON.stringify({
        //             height: uploadFile.height,
        //             shootingFoot: uploadFile.shootingFoot,
        //             file: Array.from(new Uint8Array(arrayBuffer)),
        //         }),
        //         credentials: true,
        //         headers: headers
        //     }).then((res) => {
        //         if (!res.ok) {
        //             throw res.statusText;
        //         }
        //         console.log('success', res)
        //         return res.json()
        //     })
        //         .then(({ data }) => console.log('data', data))
        //         .catch(err => console.log('err', err))

        // console.log('response', response)

        var bodyFormData = new FormData();
        bodyFormData.append('height', this.state.height);
        bodyFormData.append('weight', this.state.weight);
        bodyFormData.append('shootingFoot', this.state.shootingFoot);
        bodyFormData.append('file', uploadFile.file);
        bodyFormData.append('tab', "1");
        axios({
            method: "post",
            // url: "http://3.1.100.43:8080/uploadvideo",
            url: "http://3.1.81.36:8080/uploadvideo",
            data: bodyFormData,
            credentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then(function (response) {
                //handle success
                console.log('success res', response, JSON.parse(response.data.frame0));
                this.setState({
                    human_coordinates: (JSON.parse(response.data.human_coordinates)),
                    key_frame_angles: JSON.parse(response.data.key_frame_angles),
                    skeleton_2d_coordinates: JSON.parse(response.data.skeleton_2d_coordinates),
                    frameCount: response.data.frameCount,
                    selectedFrame: 'data:image/png;base64,' + JSON.parse(response.data.frame0)['img'].toString(),
                    joint_edges: JSON.parse(response.data.joint_edge),
                    imgDetails: JSON.parse(response.data.img_details)
                })
                // var image = new Image();
                var image = document.getElementById('img-frame')
                image.src = 'data:image/png;base64,' + JSON.parse(response.data.frame0)['img'].toString();
                // document.body.appendChild(image);
                console.log('response.data.human_coordinates', JSON.parse(JSON.stringify(JSON.parse(response.data.human_coordinates)['0'])), typeof (JSON.parse(JSON.stringify(JSON.parse(response.data.human_coordinates)['0']))))
                console.log('rrr ', JSON.parse(JSON.stringify(JSON.parse(response.data.human_coordinates)['0']))['0'])
                console.log('imgdetail', JSON.parse(response.data.img_details))
                this.openNotification('AnalysisSuccess')
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log('err res', response);
                this.openNotification('AnalysisError')
            }.bind(this))
            .finally(function (response) {
                this.setState({ isUploading: false, isAnalysed: true, isCalculating: false })
                this.convertTime()
                this.calulateVelocity()
            }.bind(this));

        // const response = await axios.post("http://3.0.100.43:8080/videos", uploadFile, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(function (res) {
        //         //handle success
        //         console.log('success res', res, uploadFile)
        //     })
        //     .catch(function (er) {
        //         //handle error
        //         console.log('err res', er)
        //     });
        // console.log('response', response)

        // }
    }

    calulateVelocity = () => {
        this.setState({ isCalculating: true })
        var bodyFormData = new FormData();
        bodyFormData.append('frameNumber', 41);
        bodyFormData.append('shootingFoot', this.state.shootingFoot);
        bodyFormData.append('height', this.state.height);
        bodyFormData.append('weight', this.state.weight);
        bodyFormData.append('fileName', this.state.file.name);
        bodyFormData.append('tab', "1");
        console.log('calculateVelocity', this.state.file.name)
        axios({
            method: "post",
            url: "http://3.1.81.36:8080/joint",
            data: bodyFormData,
            credentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then(function (response) {
                //handle success
                console.log('success res', response);
                // this.setState({ ballSpeedFrame: 'data:image/png;base64,' + JSON.parse(response.data.img)['img'] })
                // var image = document.getElementById('img-frame')
                this.setState({
                    angularDegree: (response.data.angular_degree),
                    angularVelocity: (response.data.angular_v),
                    ankleLinearVelocity: (response.data.ankle_linear_v_kmh),
                    ballVelocity: (response.data.ball_v),
                    isCalculated: true,
                    ballSpeedFrame: 'data:image/png;base64,' + JSON.parse(response.data.ball_speed_img)['img'],
                    joinChangesGraph: 'data:image/png;base64,' + JSON.parse(response.data.joint_changes_img)['img'],
                    shootingFrame: response.data.min_distance_frame.toString()
                })
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log('err res', response);
                this.openNotification('CalculationError')
            }.bind(this))
            .finally(function (response) {
                this.setState({ isCalculating: false })
                this.props.onVideo2Change({
                    videoLength: parseFloat(this.state.imgDetails.duration),
                    frameCounts: this.state.frameCount,
                    selectedFrame: this.state.frameNumber,
                    hip: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[this.state.frameNumber].split(',')[0]).toFixed(2),
                    shootingKnee: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[this.state.frameNumber].split(',')[1]).toFixed(2),
                    balancingHand: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[this.state.frameNumber].split(',')[2]).toFixed(2),
                    plantingFootKnee: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[this.state.frameNumber].split(',')[3]).toFixed(2),
                    balancingElbow: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[this.state.frameNumber].split(',')[4]).toFixed(2),
                    shootLegAnkle: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[this.state.frameNumber].split(',')[5]).toFixed(2),
                    shootingFrame: this.state.shootingFrame,
                    angularDegree: parseFloat(this.state.angularDegree).toFixed(2),
                    angularVelocity: parseFloat(this.state.angularVelocity).toFixed(2),
                    ankleLinearVelocity: parseFloat(this.state.ankleLinearVelocity).toFixed(2),
                    ballVelocity: parseFloat(this.state.ballVelocity).toFixed(2),
                    videoObjectURL: this.state.videoObjectURL
                }, 1)
            }.bind(this));
    }

    changeTabs = (e) => {
        console.log('changeTabgs', e, 1)
        if (e == 1) {
            this.setState({ imgFilter: 0 })
            this.getFrame('imgFilter', 0)
        } else if (e == 2) {
            this.setState({ imgFilter: 1 })
            this.getFrame('imgFilter', 1)
        } else if (e == 3) {
            this.setState({ imgFilter: 2 })
            this.getFrame('imgFilter', 2)
            // if (document.getElementById('angleFilters')) {
            // document.getElementById('angleFilters').value = 2
            // console.log('ddd', document.getElementById('angleFilters'))
            // }
        }
    }

    increaseFrameButton = (value) => {
        if (this.state.frameNumber != this.state.frameCount - 1) {
            this.setState({ frameNumber: this.state.frameNumber + 1 })
            this.getFrame('frame', this.state.frameNumber + 1)
        }
    }

    decreaseFrameButton = (value) => {
        if (this.state.frameNumber != 0) {
            this.setState({ frameNumber: this.state.frameNumber - 1 })
            this.getFrame('frame', this.state.frameNumber - 1)
        }
    }

    changeFrameSlider = (value) => {
        this.setState({ frameNumber: value })
        this.getFrame('frame', value)
        this.props.onVideo2Change({
            videoLength: parseFloat(this.state.imgDetails.duration),
            frameCounts: this.state.frameCount,
            selectedFrame: this.state.frameNumber,
            hip: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[value].split(',')[0]).toFixed(2),
            shootingKnee: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[value].split(',')[1]).toFixed(2),
            balancingHand: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[value].split(',')[2]).toFixed(2),
            plantingFootKnee: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[value].split(',')[3]).toFixed(2),
            balancingElbow: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[value].split(',')[4]).toFixed(2),
            shootLegAnkle: this.state.key_frame_angles == '' ? 'NaN' : parseFloat(this.state.key_frame_angles[value].split(',')[5]).toFixed(2),
            shootingFrame: this.state.shootingFrame,
            angularDegree: parseFloat(this.state.angularDegree).toFixed(2),
            angularVelocity: parseFloat(this.state.angularVelocity).toFixed(2),
            ankleLinearVelocity: parseFloat(this.state.ankleLinearVelocity).toFixed(2),
            ballVelocity: parseFloat(this.state.ballVelocity).toFixed(2),
            videoObjectURL: this.state.videoObjectURL
        }, 1)
    }

    changeImgFilter = (e) => {
        this.setState({ imgFilter: e.target.value })
        this.getFrame('imgFilter', e.target.value)
    }

    getFrame = (type, value) => {
        var bodyFormData = new FormData();
        if (type == 'frame') {
            bodyFormData.append('frameNumber', value);
            bodyFormData.append('imgFilter', this.state.imgFilter);
        } else if (type == 'imgFilter') {
            bodyFormData.append('frameNumber', this.state.frameNumber);
            bodyFormData.append('imgFilter', value);
        }
        bodyFormData.append('shootingFoot', this.state.shootingFoot);
        bodyFormData.append('tab', "1");
        console.log(this.state.frameNumber, this.state.imgFilter, type, value, bodyFormData, 1)
        axios({
            method: "post",
            url: "http://3.1.81.36:8080/frames",
            data: bodyFormData,
            credentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then(function (response) {
                //handle success
                console.log('success res', response, JSON.parse(response.data.img));
                this.setState({ selectedFrame: 'data:image/png;base64,' + JSON.parse(response.data.img)['img'] })
                this.convertTime()
                // var image = document.getElementById('img-frame')
                // image.src = 'data:image/png;base64,' + JSON.parse(response.data.img)['img'].toString();
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log('err res', response);
                this.setState({ selectedFrame: 'null' })
                // this.openNotification('getFrameError')
            }.bind(this))

        // var canvas = document.getElementById('canvas')
        // ctx = canvas.getContext('2d')
        // ctx = canvas.drawImage()

    }

    getImg = () => {
        axios({
            method: "get",
            url: "http://3.1.81.36:8080/frames",
            credentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then(function (response) {
                //handle success
                console.log('success res', response, JSON.parse(response.data.img));
                this.setState({ selectedFrame: 'data:image/png;base64,' + JSON.parse(response.data.img)['img'] })
                // var image = document.getElementById('img-frame')
                // image.src = 'data:image/png;base64,' + JSON.parse(response.data.img)['img'].toString();
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log('err res', response);
            })

        console.log('show human_coordinates', this.state.human_coordinates)
        console.log('show key_frame_angles', this.state.key_frame_angles)
        console.log('show skeleton_2d_coordinates', this.state.skeleton_2d_coordinates)
        console.log('show imgFilter', this.state.imgFilter)
        console.log('show joint edege', this.state.joint_edges)
        // console.log(this.state.human_coordinates[70])
        console.log(this.state.skeleton_2d_coordinates[0])

        var ankleCoord = [];
        for (var i = 0; i < this.state.frameCount; i++) {
            var a = this.state.skeleton_2d_coordinates[i].substring(0, this.state.skeleton_2d_coordinates[i].length - 2).substring(2).split("', '")
            // console.log(i, a[8])
            // console.log(a[8].split(","))
            // if(i == 8)
            var arr = []
            arr.push(a[11])
            // arr.push(parseFloat(a[8].split(',')[0]))
            // arr.push(parseFloat(a[8].split(',')[1]))
            // arr.push(parseFloat(a[8].split(',')[2]))
            ankleCoord.push(arr)
        }
        console.log('anklecorrd', ankleCoord)
    }

    testGetUploadVideo = () => {
        axios({
            method: "get",
            url: "http://3.1.81.36:8080/uploadvideo",
            credentials: true,
            // headers: { "Content-Type": "multipart/form-data" },
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then(function (response) {
                //handle success
                console.log('success res', response.data, JSON.stringify(JSON.parse(response.data.human_coordinates)));
                console.log('rr', JSON.parse(response.data.human_coordinates)['0'])
                console.log('aa', JSON.parse(response.data.key_frame_angles)['0'])
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log('err res', response);
            })
    }

    openNotification = type => {
        if (type == 'Analysing') {
            notification.info({
                message: `Analysing ${this.state.file.name}`,
                description:
                    `Usually it takes around 30 seconds`,
                // position,
                // onClick: () => {
                //     console.log('Notification Clicked!');
                // },
            });
            // message.info(`Analysing ${this.state.file.name} ... `);
        } else if (type == 'AnalysisError') {
            notification.error({
                message: `Analysing Error!`,
                description:
                    `Cannot Analyse ${this.state.file.name}!`,
                // position,
                // onClick: () => {
                //     console.log('Notification Clicked!');
                // },
            });
            // message.info(`Analysing ${this.state.file.name} ... `);
        } else if (type == 'AnalysisSuccess') {
            notification.success({
                message: `Success!`,
                description:
                    `${this.state.file.name} is successfully analysed!`,
                // position,
                // onClick: () => {
                //     console.log('Notification Clicked!');
                // },
            });
            // message.info(`Analysing ${this.state.file.name} ... `);
        } else if (type == 'CalculationError') {
            notification.error({
                message: `Calculation Error!`,
                description:
                    `Cannot calculate ${this.state.file.name}!`,
                // position,
                // onClick: () => {
                //     console.log('Notification Clicked!');
                // },
            });
        } else if (type == 'getFrameError') {
            notification.error({
                message: `Frame Error!`,
                description:
                    `Cannot get ${IMG_FILTER_INDEX[parseInt(this.state.imgFilter) - 1]} at Frame ${this.state.frameNumber} due to expected error!`,
                // position,
                // onClick: () => {
                //     console.log('Notification Clicked!');
                // },
            });
        }
    }

    getArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            console.log(typeof (file))
            reader.addEventListener('load', () => {
                resolve(reader.result);
                console.log('file', reader.result)
            });
            reader.readAsArrayBuffer(new Blob([JSON.stringify(file)]));
        })
    }

    convertTime = () => {
        var frameRatio = parseInt(this.state.frameNumber) / parseInt(this.state.frameCount)
        var seconds = parseFloat(this.state.imgDetails.duration)
        // var seconds = frameRatio * duration * 60
        var hr = Math.floor(seconds / 3600).toString().padStart(2, '0'),
            mins = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(seconds % 60).toString().padStart(2, '0');
        console.log(hr + ':' + mins + ':' + s)
        this.setState({ displayTime: hr + ':' + mins + ':' + s })
        // return hr + ':' + mins + ':' + s;
        //return `${h}:${m}:${s}`;
    }

    render() {
        const style = {
            display: 'flex',
            justifyContent: 'flex-end'
        };

        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // const renderer = new THREE.WebGLRenderer();
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // // document.getElementById('threeboard').appendChild(renderer.domElement);
        // document.body.appendChild(renderer.domElement);

        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        // camera.position.z = 5;

        return (
            // <AmplifyAuthenticator>
            <div>


                <Row>
                    <Col span={12}>
                        <Row>
                            <Upload
                                accept="video/mp4,video/x-m4v,video/*"
                                beforeUpload={this.beforeUpload}
                                // action="http://3.0.100.43:8080/videostest"
                                onChange={this.changeVideo}
                                multiple={false}
                                maxCount={1}
                                onRemove={this.removeVideo}
                            >
                                <Button icon={<UploadOutlined />}>Select a Video</Button>
                            </Upload>
                        </Row>
                        <Row>
                            <Badge color={'grey'} text={'The recommended duration of the video is less than one minute.'} style={{ margin: "10px", color: "grey" }} />
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>Your height:</Col>
                            <Col span={6}>
                                <InputNumber min={50} max={200} defaultValue={170} onChange={this.changeHeight} /> cm
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>Your weight:</Col>
                            <Col span={6}>
                                <InputNumber min={20} max={200} defaultValue={60} onChange={this.changeWeight} /> kg
                            </Col>
                        </Row>
                        <br />
                        <Row type="flex" align="middle">
                            <Col span={6}>Your shooting foot:</Col>
                            <Col span={6}>
                                <Radio.Group onChange={this.changeFoot} defaultValue={this.state.shootingFoot}>
                                    <Radio value={"left"}>Left</Radio>
                                    <Radio value={"right"}>Right</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row type="flex" align="middle">
                            <Col>
                                {this.state.isUploading ? (<Button type="primary" shape="round" onClick={this.clickAnalysis} disabled={this.state.file == null || this.state.height == null || this.state.weight == null} loading={this.state.isUploading}>
                                    Analysing
                                </Button>) : (<Button type="primary" shape="round" onClick={this.clickAnalysis} disabled={this.state.file == null || this.state.height == null || this.state.weight == null} loading={this.state.isUploading}>
                                    Analyse
                                </Button>)}

                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <div style={{ display: this.state.file ? "block" : "none" }}>
                            {/* <video id="video-player" width="320" height="240" controls> */}
                            <video id="video-player1" width="500" controls>
                                {/* <source id="video-source"></source> */}
                            </video>
                        </div>
                    </Col>
                </Row>



                <Divider />




                <div style={{ display: this.state.isAnalysed ? "block" : "none" }}>
                    <h2>Analysis Result:</h2>

                    <div>There are a total of {this.state.frameCount} frames parsed from the video</div>
                    {/* <Badge color={'grey'} text={'There are a total of ' + this.state.frameCount + ' frames parsed from the video'} style={{ margin: "10px", color: "grey" }} /> */}
                    <div>Video Length: {parseFloat(this.state.imgDetails.duration)} seconds</div>
                    {/* <Badge color={'grey'} text={parseFloat(this.state.imgDetails.duration) + ' seconds'} style={{ margin: "10px", color: "grey" }} /> */}

                    {/* <div>{this.state.displayTime}</div> */}

                    <Badge color={'grey'} text={'Please select a video frame!'} style={{ margin: "10px", color: "grey" }} />

                    <Row>
                        <Col span={10}></Col>
                        <Text code style={{ fontSize: '18px', margin: '10px' }}>Selected Video Frame: {this.state.frameNumber}</Text>
                    </Row>

                    <Row>
                        <Col span={5}></Col>
                        <LeftCircleTwoTone style={{ fontSize: '24px', margin: '8px' }} onClick={this.decreaseFrameButton} />
                        <Col span={12}><Slider defaultValue={0} max={this.state.frameCount - 1} min={0} onChange={this.changeFrameSlider} value={this.state.frameNumber} /></Col>
                        <RightCircleTwoTone style={{ fontSize: '24px', margin: '8px' }} onClick={this.increaseFrameButton} />
                    </Row>

                    <Row>
                        <Tabs defaultActiveKey="1" size={'large'} style={{ marginBottom: 32, width: '100%' }} onChange={this.changeTabs}>
                            <TabPane tab="Original Image" key="1">
                                <Col span={24}>
                                    <Image
                                        id="img-frame"
                                        // width={window.innerWidth - 300}
                                        src={this.state.selectedFrame}
                                        // preview={false}
                                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                    />
                                </Col>
                            </TabPane>
                            <TabPane tab="Skeleton" key="2">
                                <Col span={24}>
                                    <Image
                                        id="img-frame"
                                        // width={window.innerWidth - 300}
                                        src={this.state.selectedFrame}
                                        // preview={false}
                                        fallback="data:image/png;base64,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"
                                    />
                                </Col>
                            </TabPane>
                            <TabPane tab="Angle" key="3">
                                <Col span={24}>
                                    <Radio.Group id="angleFilters1" name="radiogroup" defaultValue={2} value={this.state.imgFilter} onChange={this.changeImgFilter}>
                                        {/* <Radio value={0}>Normal</Radio> */}
                                        {/* <Radio value={1}>Skeleton</Radio> */}
                                        <Radio value={2}>Hip Angle</Radio>
                                        <Radio value={3}>Shooting Knee Angle</Radio>
                                        <Radio value={4}>Balancing hand Angle</Radio>
                                        <Radio value={5}>Planting Foot Knee Angle</Radio>
                                        <Radio value={6}>Balancing Elbow Angle</Radio>
                                        <Radio value={7}>Shoot Leg Ankle Angle</Radio>
                                    </Radio.Group>
                                    <br />
                                    <br />

                                    {/* <img id="img-frame" width="320" height="240"></img> */}

                                    {this.state.selectedFrame == 'null' ?
                                        (<Result
                                            // style={{ display: showError == '' ? "block" : "none" }}
                                            title={IMG_FILTER_INDEX[this.state.imgFilter - 1] + " is not available for this frame!"}
                                        // extra={
                                        //     <Button type="primary" key="console">
                                        //         Please select another frame
                                        //     </Button>
                                        // }
                                        />) :
                                        (<Image
                                            id="img-frame"
                                            // width={window.innerWidth - 300}
                                            src={this.state.selectedFrame}
                                            // preview={false}
                                            fallback="data:image/png;base64,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"
                                        />)}

                                </Col>
                            </TabPane>
                            <TabPane tab="3D Model" key="4">
                                <Col span={24}>
                                    {(this.state.human_coordinates.length == 0 || (this.state.human_coordinates[this.state.frameNumber]) == '[]') ? (<Result
                                        // style={{ display: showError == '' ? "block" : "none" }}
                                        title="3D Model is not available for this frame!"
                                    // extra={
                                    //     <Button type="primary" key="console">
                                    //         Please select another frame
                                    //     </Button>
                                    // }
                                    />) : (<Dashboard tabNumber={1} threeD={this.state.human_coordinates.length == 0 ? '' : JSON.parse(JSON.stringify(this.state.human_coordinates[this.state.frameNumber]))} jointEdges={this.state.joint_edges.length == 0 ? '' : this.state.joint_edges}></Dashboard>
                                    )}
                                </Col>

                            </TabPane>
                        </Tabs>

                        {/* <Col span={12}>
                            <Dashboard threeD={this.state.human_coordinates.length == 0 ? '' : JSON.parse(JSON.stringify(this.state.human_coordinates[this.state.frameNumber]))} jointEdges={this.state.joint_edges.length == 0 ? '' : this.state.joint_edges}></Dashboard>
                        </Col> */}
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <h2>Speed of various speed values at ball contact</h2>
                            <h4>This part is for calculating the angular velocity, linear velocity of ankle and hence the ball velocity of between the shooting frame x and the next x+n frame.</h4>
                            {this.state.isCalculating ? (<Button type="primary" shape="round" onClick={this.calulateVelocity} loading={this.state.isCalculating}>Calculating</Button>) : (<Button type="primary" shape="round" onClick={this.calulateVelocity} loading={this.state.isCalculating}>Calculate</Button>)}
                        </Col>
                    </Row>
                    <br />
                    <div style={{ display: this.state.isCalculated ? "block" : "none" }}>
                        <br />
                        <Row gutter={16}>
                            <Col span={6}>
                                <Statistic title="Angular Degree" value={parseFloat(this.state.angularDegree).toFixed(2)} />
                                <br />
                                {/* <Progress type="circle" strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={(parseFloat(this.state.angularDegree) / 360 * 100).toFixed(2)} /> */}
                            </Col>
                            <Col span={6}>
                                <Statistic title="Angular Velocity (rad/s)" value={parseFloat(this.state.angularVelocity).toFixed(2)} />
                                <br />
                                <Progress type="circle" strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={(parseFloat(this.state.angularVelocity) / 25 * 100).toFixed(2)} />
                            </Col>
                            <Col span={6}>
                                <Statistic title="Ankle Linear Velocity (km/h)" value={parseFloat(this.state.ankleLinearVelocity).toFixed(2)} />
                                <br />
                                {/* suffix="/ 100" */}
                                <Progress type="circle" strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={(parseFloat(this.state.ankleLinearVelocity) / 90 * 100).toFixed(2)} />
                            </Col>
                            <Col span={6}>
                                <Statistic title="Ball Velocity (km/h)" value={parseFloat(this.state.ballVelocity).toFixed(2)} />
                                <br />
                                <Progress type="circle" strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }} percent={(parseFloat(this.state.ballVelocity) / 150 * 100).toFixed(2)} />
                            </Col>
                        </Row>

                        <br />

                        <Text code style={{ fontSize: '18px' }}>Detected Shooting Frame: {this.state.shootingFrame}</Text>

                        <br />
                        <br />

                        <Row>
                            <Col span={24}>
                                <Image
                                    id="img-frame"
                                    // width={window.innerWidth - 300}
                                    src={this.state.ballSpeedFrame}
                                    // preview={false}
                                    fallback="data:image/png;base64,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"
                                />
                                <br />
                                <br />
                                <h2>Below shows how your {this.state.shootingFoot} foot changes over frames:</h2>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        id="img-frame"
                                        // width={window.innerWidth - 600}
                                        src={this.state.joinChangesGraph}
                                        // preview={false}
                                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Divider />

                </div>

                {/* <Button onClick={this.getImg}>get image</Button>
                <Button onClick={this.testGetUploadVideo}>uploadvideo get method</Button> */}
                {/* <div id="canvas"></div> */}



                {/* <Row>
                    <Col span={24}><AmplifySignOut style={style} /></Col>
                </Row> */}
            </div >
            /* </AmplifyAuthenticator> */
        );
    }
}

// ReactDOM.render(
//     <UploadVideo />,
//     document.getElementById('container'),
// );

export default UploadVideo;
