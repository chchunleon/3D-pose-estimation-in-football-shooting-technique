import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Space, Divider, Radio, Row, Col, Input, InputNumber, Layout, Upload, Button, Slider, Image, notification, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import ThreeGrid from './ThreeGrid';
// import { Storage, API } from 'aws-amplify';
// import { createVideoFile } from './graphql/mutations';
// import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

const { Header, Footer, Sider, Content } = Layout;

// const [value, setValue] = React.useState(2);


class UploadVideo extends Component {
    constructor () {
        super();
        this.state = {
            file: null,
            height: 170,
            shootingFoot: "right",
            isAnalysed: false,
            isUploading: false,
            videoObjectURL: null,
            frames: 2,
            selectedFrame: "error"
        }
        this.clickAnalysis = this.clickAnalysis.bind(this)
    }

    changeVideo = (file) => {
        console.log('changeVideo', file)
        this.setState({ file: file.file, videoObjectURL: URL.createObjectURL(file.file), isAnalysed: false })
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

    changeFoot = e => {
        this.setState({ shootingFoot: e.target.value })
        // setValue(e.target.value);
    }

    playVideo = () => {
        if (!this.state.videoObjectURL)
            return
        console.log('playvidoe', this.state.videoObjectURL, this.state.file)
        var video = document.getElementById('video-player');
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
        this.setState({ isUploading: true, isAnalysed: false })

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
            shootingFoot: this.state.shootingFoot
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
        bodyFormData.append('shootingFoot', this.state.shootingFoot);
        bodyFormData.append('file', uploadFile.file);
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
                this.setState({ frames: response.data.frames, selectedFrame: 'data:image/png;base64,' + JSON.parse(response.data.frame0)['img'].toString() })
                // var image = new Image();
                var image = document.getElementById('img-frame')
                image.src = 'data:image/png;base64,' + JSON.parse(response.data.frame0)['img'].toString();
                // document.body.appendChild(image);
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log('err res', response);
            })
            .finally(function (response) {
                this.setState({ isUploading: false, isAnalysed: true })
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

    changeFrameSlider = (value) => {
        var bodyFormData = new FormData();
        bodyFormData.append('frames', value);
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
                // var image = document.getElementById('img-frame')
                // image.src = 'data:image/png;base64,' + JSON.parse(response.data.img)['img'].toString();
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log('err res', response);
            })
    }

    openNotification = position => {
        notification.info({
            message: `Analysing ${this.state.file.name}`,
            description:
                ` ${this.state.file.name} is being analysing ...`,
            position,
            // onClick: () => {
            //     console.log('Notification Clicked!');
            // },
        });
        // message.info(`Analysing ${this.state.file.name} ... `);
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

    render() {
        const style = {
            display: 'flex',
            justifyContent: 'flex-end'
        };

        return (
            // <AmplifyAuthenticator>
            <div>
                <Row>
                    <Col span={12}><h1>3D pose estimation in football shooting technique</h1></Col>
                </Row>
                <Divider />

                <Row>
                    <Col span={12}>
                        <Upload
                            accept="video/mp4,video/x-m4v,video/*"
                            beforeUpload={this.beforeUpload}
                            action="http://3.0.100.43:8080/videostest"
                            onChange={this.changeVideo}
                            multiple={false}
                            maxCount={1}
                            onRemove={this.removeVideo}
                        >
                            <Button icon={<UploadOutlined />}>Select a Video</Button>
                        </Upload>
                    </Col>
                    <Col span={12}>
                        <div style={{ display: this.state.file ? "block" : "none" }}>
                            <video id="video-player" width="320" height="240" controls>
                                {/* <source id="video-source"></source> */}
                            </video>
                        </div>
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col span={12}>Your height:</Col>
                    <Col span={12}>
                        <InputNumber min={130} max={200} defaultValue={170} onChange={this.changeHeight} /> cm
                    </Col>
                </Row>
                <br />
                <Row type="flex" align="middle">
                    <Col span={12}>Your shooting foot:</Col>
                    <Col span={12}>
                        <Radio.Group onChange={this.changeFoot} defaultValue={this.state.shootingFoot}>
                            <Radio value={"left"}>Left</Radio>
                            <Radio value={"right"}>Right</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <br />
                <Row type="flex" align="middle">
                    <Col>
                        <Button type="primary" shape="round" onClick={this.clickAnalysis} disabled={this.state.file == null || this.state.height == null} loading={this.state.isUploading}
                            onClick={() => this.openNotification('bottomLeft')}>
                            Analyse
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <div style={{ display: this.state.isAnalysed ? "block" : "none" }}>
                    <Row>
                        <Col span={18}>
                            <ThreeGrid />
                        </Col>
                        <Col span={6}>
                            <Slider defaultValue={0} max={this.state.frames - 1} min={0} tooltipVisible onAfterChange={this.changeFrameSlider} />
                            {/* <img id="img-frame" width="320" height="240"></img> */}
                            <Image
                                id="img-frame"
                                width={450}
                                src={this.state.selectedFrame}
                                fallback="data:image/png;base64,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"
                            />
                        </Col>
                    </Row>
                </div>



                {/* <Divider /> */}

                {/* <Row>
                    <Col span={24}><AmplifySignOut style={style} /></Col>
                </Row> */}
            </div >
            /* </AmplifyAuthenticator> */
        );
    }
}

ReactDOM.render(
    <UploadVideo />,
    document.getElementById('container'),
);

export default UploadVideo;
