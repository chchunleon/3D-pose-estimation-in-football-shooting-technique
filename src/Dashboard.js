import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Space, Divider, Radio, Row, Col, Input, InputNumber, Layout, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Canvas } from '@react-three/fiber'


const { Header, Footer, Sider, Content } = Layout;

// const [value, setValue] = React.useState(2);


class Dashboard extends Component {
    constructor () {
        super();
        this.state = {

        }

    }



    render() {
        const style = {
            display: 'flex',
            justifyContent: 'flex-end'
        };

        return (
            <div>
                <Row>
                    <Col span={12}><h1>Dashboard</h1></Col>
                </Row>
                <Divider />
                <Canvas />

            </div >
        );
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('dashboard'),
);

export default Dashboard;
