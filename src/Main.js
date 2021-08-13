import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import { Table, Tag, Divider, Row, Col, Button, Tabs } from 'antd';
import axios from 'axios';
import UploadView from './Upload';
import UploadView1 from './Upload1'

const { TabPane } = Tabs;

const { Column, ColumnGroup } = Table;

const columns = [
    {
        title: 'Metrics',
        dataIndex: 'metrics',
        key: 'metrics',
        width: 280,
        render: text => <a>{text}</a>,
    },
    {
        title: 'Video 1',
        dataIndex: 'video1',
        key: 'video1',
        width: 280,
        render: text => <Tag color={'geekblue'}>{text}</Tag>
    },
    {
        title: 'Video 2',
        dataIndex: 'video2',
        key: 'video2',
        width: 280,
        render: text => <Tag color={'green'}>{text}</Tag>
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: tags => (
    //         <>
    //             {tags.map(tag => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

function Main() {
    const [tabs, setTabs] = useState([{}]);
    const [isCompare, setIsCompare] = useState(false)
    const [hasVideo1, setHasVideo1] = useState(false)
    const [hasVideo2, setHasVideo2] = useState(false)
    // const [video1, setVideo1] = useState(null)
    // const [video2, setVideo2] = useState(null)
    const [video1, setVideo1] = useState({
        videoLength: 'nil',
        frameCounts: 'nil',
        selectedFrame: 'nil',
        hip: 'nil',
        shootingKnee: 'nil',
        balancingHand: 'nil',
        plantingFootKnee: 'nil',
        balancingElbow: 'nil',
        shootLegAnkle: 'nil',
        shootingFrame: 'nil',
        angularDegree: 'nil',
        angularVelocity: 'nil',
        ankleLinearVelocity: 'nil',
        ballVelocity: 'nil',
    })
    const [video2, setVideo2] = useState({
        videoLength: 'nil',
        frameCounts: 'nil',
        selectedFrame: 'nil',
        hip: 'nil',
        shootingKnee: 'nil',
        balancingHand: 'nil',
        plantingFootKnee: 'nil',
        balancingElbow: 'nil',
        shootLegAnkle: 'nil',
        shootingFrame: 'nil',
        angularDegree: 'nil',
        angularVelocity: 'nil',
        ankleLinearVelocity: 'nil',
        ballVelocity: 'nil',
    })
    const [data, setData] = useState()
    // const [data, setData] = useState([
    //     {
    //         key: '1',
    //         metrics: 'Video Length (s)',
    //         // tags: ['nice', 'developer'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'New York No. 1 Lake Park',
    //     },
    //     {
    //         key: '2',
    //         metrics: 'Frame counts',
    //         // tags: ['loser'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'London No. 1 Lake Park',
    //     },
    //     {
    //         key: '3',
    //         metrics: 'Selected Video Frame',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '4',
    //         metrics: 'Hip Angle (Degree)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '5',
    //         metrics: 'Shooting Knee Angle (Degree)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '6',
    //         metrics: 'Balancing hand Angle (Degree)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '7',
    //         metrics: 'Planting Foot Knee Angle (Degree)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '8',
    //         metrics: 'Balancing Elbow Angle (Degree)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '9',
    //         metrics: 'Shooting Leg Ankle Angle (Degree)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '10',
    //         metrics: 'Shooting Frame',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '11',
    //         metrics: 'Angular Degree (Degree)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '12',
    //         metrics: 'Angular Velocity (rad/s)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '13',
    //         metrics: 'Ankle Linear Velocity (km/h)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '14',
    //         metrics: 'Ball Velocity (km/h)',
    //         // tags: ['cool', 'teacher'],
    //         video1: 'Sidney No. 1 Lake Park',
    //         video2: 'Sidney No. 1 Lake Park',
    //     },
    // ])


    console.log('tabs', tabs)



    useEffect(() => {
        // 使用瀏覽器 API 更新文件標題
        // document.title = `You clicked ${tabs} times`;
        console.log('useeff', tabs, video1)
        if (hasVideo1 || hasVideo2)
            setData([
                {
                    key: '1',
                    metrics: 'Video Length (s)',
                    video1: video1['videoLength'],
                    video2: video2['videoLength'],
                    render: text => <video id="video-player0" width="500" controls src="">{text}</video>
                },
                {
                    key: '2',
                    metrics: 'Frame counts',
                    video1: video1['frameCounts'],
                    video2: video2['frameCounts'],
                },
                {
                    key: '3',
                    metrics: 'Selected Video Frame',
                    video1: video1['selectedFrame'],
                    video2: video2['selectedFrame'],
                    // render: text => <InputNumber>{text}</InputNumber>,
                    render: text => <a>{text}</a>
                    // min={ 20} max={ 200} defaultValue={ 60} onChange={ this.changeWeight }
                },
                {
                    key: '4',
                    metrics: 'Hip Angle (Degree)',
                    video1: video1['hip'],
                    video2: video2['hip'],
                },
                {
                    key: '5',
                    metrics: 'Shooting Knee Angle (Degree)',
                    video1: video1['shootingKnee'],
                    video2: video2['shootingKnee'],
                },
                {
                    key: '6',
                    metrics: 'Balancing hand Angle (Degree)',
                    video1: video1['balancingHand'],
                    video2: video2['balancingHand'],
                },
                {
                    key: '7',
                    metrics: 'Planting Foot Knee Angle (Degree)',
                    video1: video1['plantingFootKnee'],
                    video2: video2['plantingFootKnee'],
                },
                {
                    key: '8',
                    metrics: 'Balancing Elbow Angle (Degree)',
                    video1: video1['balancingElbow'],
                    video2: video2['balancingElbow'],
                },
                {
                    key: '9',
                    metrics: 'Shooting Leg Ankle Angle (Degree)',
                    video1: video1['shootLegAnkle'],
                    video2: video2['shootLegAnkle'],
                },
                {
                    key: '10',
                    metrics: 'Shooting Frame',
                    video1: video1['shootingFrame'],
                    video2: video2['shootingFrame'],
                },
                {
                    key: '11',
                    metrics: 'Angular Degree',
                    video1: video1['angularDegree'],
                    video2: video2['angularDegree'],
                },
                {
                    key: '12',
                    metrics: 'Angular Velocity (rad/s)',
                    video1: video1['angularVelocity'],
                    video2: video2['angularVelocity'],
                },
                {
                    key: '13',
                    metrics: 'Ankle Linear Velocity (km/h)',
                    video1: video1['ankleLinearVelocity'],
                    video2: video2['ankleLinearVelocity'],
                },
                {
                    key: '14',
                    metrics: 'Ball Velocity (km/h)',
                    video1: video1['ballVelocity'],
                    video2: video2['ballVelocity'],
                },
            ])
    }, [video1, video2]);

    function clickCompare() {
        if (isCompare)
            setIsCompare(false)
        else
            setIsCompare(true)
    }

    function handleRemoveVideo(tab) {
        console.log('handle remove video', tab)
        if (tab == 0)
            setHasVideo1(false)
        else
            setHasVideo2(false)
        setIsCompare(false)
    }

    function handleVideoChange(value, tab) {
        console.log('value ', tab, value, video1, video2)
        if (tab == 0) {
            setVideo1(prevState => ({
                ...prevState,
                videoLength: value['videoLength'],
                frameCounts: value['frameCounts'],
                selectedFrame: value['selectedFrame'],
                hip: value['hip'],
                shootingKnee: value['shootingKnee'],
                balancingHand: value['balancingHand'],
                plantingFootKnee: value['plantingFootKnee'],
                balancingElbow: value['balancingElbow'],
                shootLegAnkle: value['shootLegAnkle'],
                shootingFrame: value['shootingFrame'],
                angularDegree: value['angularDegree'],
                angularVelocity: value['angularVelocity'],
                ankleLinearVelocity: value['ankleLinearVelocity'],
                ballVelocity: value['ballVelocity']
            }))
            setHasVideo1(true)
        }
        else {
            setVideo2(prevState => ({
                ...prevState,
                videoLength: value['videoLength'],
                frameCounts: value['frameCounts'],
                selectedFrame: value['selectedFrame'],
                hip: value['hip'],
                shootingKnee: value['shootingKnee'],
                balancingHand: value['balancingHand'],
                plantingFootKnee: value['plantingFootKnee'],
                balancingElbow: value['balancingElbow'],
                shootLegAnkle: value['shootLegAnkle'],
                shootingFrame: value['shootingFrame'],
                angularDegree: value['angularDegree'],
                angularVelocity: value['angularVelocity'],
                ankleLinearVelocity: value['ankleLinearVelocity'],
                ballVelocity: value['ballVelocity']
            }))
            setHasVideo2(true)
        }

        // console.log('aa', video1, video2, data)

    }

    return (
        <div>
            <Row>
                <Col span={24} ><h1 /*style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}*/>3D Pose Estimation in Football Shooting Technique</h1></Col>
            </Row>

            {/* <Row>
                <Col span={12} style={{ margin: '10px' }}>
                    <UploadView />
                </Col>
                <Col span={12} style={{ margin: '10px' }}>
                    <UploadView />
                </Col>
            </Row > */}
            <Tabs defaultActiveKey="1" size={'large'} style={{ marginBottom: 32, width: '100%' }}>
                <TabPane tab="Video 1" key="1">
                    <Col span={24} >
                        <UploadView onVideo1Change={handleVideoChange} onRemoveVideo1={handleRemoveVideo} />
                    </Col>
                </TabPane>
                <TabPane tab="Video 2" key="2">
                    <Col span={24} >
                        <UploadView1 onVideo2Change={handleVideoChange} onRemoveVideo2={handleRemoveVideo} />
                    </Col>
                </TabPane>
            </Tabs>


            {hasVideo1 && hasVideo2 ? (
                <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button type="primary" shape="round" onClick={clickCompare}>Compare Both Video</Button>
                    </Col>
                </Row>
            ) : (<div></div>)}

            <br />

            {hasVideo1 && hasVideo2 && isCompare ? (<Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Table columns={columns} dataSource={data} pagination={false} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />

                <Divider />

            </Row>)
                : (<Row />)}


        </div >
    )
}

export default Main;