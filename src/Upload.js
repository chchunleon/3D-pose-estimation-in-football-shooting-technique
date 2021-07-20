import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Space, Divider, Radio, Row, Col, Input, Layout, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

// const [value, setValue] = React.useState(2);


class UploadVideo extends Component {
    constructor () {
        super();
        this.file = null;
        this.shootingFoot = "right";
    }

    changeVideo = (e) => {
        console.log('changeVideo', e)
    }

    beforeUpload = (file, fileList) => {
        this.file = file
        console.log('beforeupload', file, fileList, this.file)
        return false
    }

    changeFoot = e => {
        this.shootingFoot = e.target.value
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
                >
                    <Button icon={<UploadOutlined />}>Upload your video</Button>
                </Upload>
                <br />
                <Row>
                    <Col span={12}>Your height:</Col>
                    <Col span={12}>
                        <Input placeholder="cm" />
                    </Col>
                </Row>
                <br />
                <Row type="flex" align="middle">
                    <Col span={12}>Your shooting foot:</Col>
                    <Col span={12}>
                        <Radio.Group onChange={this.changeFoot}>
                            <Radio value={"left"}>Left</Radio>
                            <Radio value={"right"}>Right</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <br />
                <Row type="flex" align="middle">
                    <Col>
                        <Button type="primary" shape="round" onClick={this.clickAnalysis}>
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
