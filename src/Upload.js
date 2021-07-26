import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Space, Divider, Radio, Row, Col, Input, InputNumber, Layout, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
            isAnalysing: false,
            isUploading: false
        }
        this.clickAnalysis = this.clickAnalysis.bind(this)
    }

    changeVideo = (e) => {
        console.log('changeVideo', e)
    }

    beforeUpload = (file, fileList) => {
        this.setState({ file: file })
        console.log('beforeupload', file, fileList, this.state.file)
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

    async clickAnalysis(e) {
        this.setState({ isUploading: true })
        console.log('clickAnalysis', e, this.state.file, this.state.file)
        const fileName = this.state.file.name
        // await Storage.put(fileName, this.state.file);
        const uploadFile = {
            file: {
                name: this.state.file.name,
                type: this.state.file.type,
                uid: this.state.file.uid,
                webkitRelativePath: this.state.file.webkitRelativePath,
                lastModified: this.state.file.lastModified.toString(),
                lastModifiedDate: this.state.file.lastModifiedDate,
                size: this.state.file.size,
            },
            height: this.state.height,
            shootingFoot: this.state.shootingFoot
        }

        // try {
        // const uploadStatus = await API.graphql({ query: createVideoFile, variables: { input: uploadFile } })
        // } catch (e) {
        // console.log('Error!', e)
        // } finally {
        // console.log(uploadStatus)

        const arrayBuffer = await this.getArrayBuffer(uploadFile.file);
        console.log('arrayBuffer', arrayBuffer)
        const response =
            fetch(`http://3.0.100.43:8080/videos`, {
                method: 'POST',

                body: JSON.stringify({
                    height: uploadFile.height,
                    shootingFoot: uploadFile.shootingFoot,
                    file: Array.from(new Uint8Array(arrayBuffer)),
                }),
            }).then((res) => {
                if (!res.ok) {
                    throw res.statusText;
                }
                console.log('success', res)
                return res.json()
            })
                .then(({ data }) => console.log('data', data))
                .catch(err => console.log('err', err))

        this.setState({ isUploading: false })
        // }
    }

    getArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            console.log(typeof (file))
            reader.addEventListener('load', () => {
                resolve(reader.result);
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

                <Upload
                    beforeUpload={this.beforeUpload}
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    change={this.changeVideo}
                    multiple={false}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Upload your video</Button>
                </Upload>
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
                        <Button type="primary" shape="round" onClick={this.clickAnalysis} disabled={this.state.file == null || this.state.height == null} loading={this.state.isUploading}>
                            Analyse
                        </Button>
                    </Col>
                </Row>
                <br />

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

export default Upload;
