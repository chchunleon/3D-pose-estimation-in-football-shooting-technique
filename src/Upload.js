import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Space, Divider, Radio, Row, Col, Input, InputNumber, Layout, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

// const [value, setValue] = React.useState(2);


class UploadVideo extends Component {
    constructor () {
        super();
        this.state = {
            file: null,
            height: 170,
            shootingFoot: "right",
            isAnalysing: false
        }
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

    clickAnalysis = e => {
        console.log('clickAnalysis', e)
    }

    render() {
        return (
            <div>
                {/* <Layout> */}
                {/* <Header></Header> */}
                {/* <Content> */}
                <h1>3D pose estimation in football shooting technique</h1>
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
                        <Button type="primary" shape="round" onClick={this.clickAnalysis} disabled={this.state.file == null || this.state.height == null}>
                            Analyse
                        </Button>
                    </Col>
                </Row>

                {/* </Content> */}
                {/* <Footer>Footer</Footer> */}
                {/* </Layout> */}
            </div >
        );
    }
}

ReactDOM.render(
    <UploadVideo />,
    document.getElementById('container'),
);

export default Upload;
