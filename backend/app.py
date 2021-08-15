from sys import modules
from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
import pandas as pd
import cv2
import numpy as np
import os
import json
import base64
import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
from matplotlib.patches import Rectangle
from mpl_toolkits.mplot3d import Axes3D
from moviepy.editor import VideoFileClip

import tensorflow as tf

# yolov5
import torch
import re
from waiting import wait

import sys
import time

import torch.backends.cudnn as cudnn



MODEL = None
FRAMES_RESULT = [None, None]
COUNT = [None, None]
VIDEO_INFO = [None, None]

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

VIDEOPATH = r'/home/ubuntu/coordinates3d'
UPLOADEDVIDEOPATH = r'/home/ubuntu/pose3d/uploaded'
SERVER_KEY = r'/etc/nginx/ssl/nginx.key'
SERVER_CRT = r'/etc/nginx/ssl/nginx.crt'

                    
class UploadVideo(Resource):
    @cross_origin()
    def post(self):
        os.system("cd /home/ubuntu/pose3d")
        os.system("rm -rf uploaded" + request.form['tab'])
        os.system("mkdir uploaded" + request.form['tab'])

        print('request', request)
        print('request data', request.form['shootingFoot'])

        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            uploaded_file.save(os.path.join(UPLOADEDVIDEOPATH + request.form['tab'], uploaded_file.filename))
        print(uploaded_file, uploaded_file.filename)
        # return redirect(url_for('index'))

        #*****************************************

        gpus = tf.config.experimental.list_physical_devices('GPU')
        tf.config.experimental.set_virtual_device_configuration(gpus[0], [tf.config.experimental.VirtualDeviceConfiguration(memory_limit=12288)])

        global MODEL
        if MODEL == None:
            print('Setting up model...')
            MODEL = tf.saved_model.load('/home/ubuntu/pose3d/models/metrabs_multiperson_smpl_combined')
        else:
            print('Loaded saved model...')


        os.system("cd /home/ubuntu/pose3d")
        os.system("rm -rf frames" + request.form["tab"])

        clip = VideoFileClip(os.path.join('/home/ubuntu/pose3d/uploaded' + request.form['tab'], uploaded_file.filename))

        vidcap = cv2.VideoCapture(os.path.join('/home/ubuntu/pose3d/uploaded' + request.form['tab'], uploaded_file.filename))
        path = os.path.join('/home/ubuntu/pose3d', 'frames' + request.form['tab'])
        duration = vidcap.get(cv2.CAP_PROP_POS_MSEC)
        frame_count = vidcap.get(cv2.CAP_PROP_FRAME_COUNT)
        os.mkdir(path)
        success,image = vidcap.read()
        count = 0
        while success:
            cv2.imwrite("/home/ubuntu/pose3d/frames" + request.form['tab'] + "/frame%d.jpg" % count, image)     
            success,image = vidcap.read()
            count += 1

#**********************************************************************************
        def cal_angle(points_dict):
    
            angles_for_a_frame = []
                
            for enum, i in enumerate(points_dict):        
        #             return [0,0,0,0,0,0]        
                if len(points_dict[enum][0]) <= 0 or len(points_dict[enum][1]) <= 0 or len(points_dict[enum][2]) <= 0:
                    angles_for_a_frame.append(0) 
                else:
                    a = np.array(points_dict[enum][0])
                    b = np.array(points_dict[enum][1])
                    c = np.array(points_dict[enum][2])
                    ba = a - b
                    bc = c - b

                    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
                    angle = np.arccos(cosine_angle)

                    angles_for_a_frame.append(np.degrees(angle))
            # print('angles_for_a_frame', angles_for_a_frame)
            return angles_for_a_frame

        def mid_point(a,b,D):
            M=[]
            for i in range(D):
                M.append((a[i]+b[i])/2)
            return M

#**********************************************************************************

        key_angles = []
        key_frame_angles = {}
        human_coordinates = {}
        skeleton_2d_coordinates = {}
        global FRAMES_RESULT 
        FRAMES_RESULT[int(request.form['tab'])] = {}
        count = 0
        directory_in_str = "/home/ubuntu/pose3d/frames" + request.form['tab']
        # directory = os.fsencode(directory_in_str)

        file_list = os.listdir(directory_in_str)

        def getKey(x):
            return(int(x.split('.')[0][5:]))

        for filename in sorted(file_list, key = getKey):    
            print(filename)
            
            if filename.endswith(".jpg"):
                if filename == 'frame0.jpg':
                    frame0 = {}
                    with open(os.path.join('/home/ubuntu/pose3d/frames' + request.form['tab'], 'frame0.jpg'), mode='rb') as file:
                        img = file.read()
                    frame0['img'] = base64.encodebytes(img).decode('utf-8')
                count+=1
                image = tf.image.decode_jpeg(tf.io.read_file(os.path.join(directory_in_str, filename)))
                detections, poses3d, poses2d = MODEL.predict_single_image(image)

                threeD_coord=poses3d.numpy()[...]

                # print('poses3d', poses3d)

                point = {}
                pointArray = []
                hipCood = []
                if len(threeD_coord) != 0:
                    for index, keypoint in enumerate(threeD_coord[0]):
                        if index == 0:
                            hipCood.append(str(keypoint[0]/100) + ',' + str(keypoint[1]/100) + ',' + str(keypoint[2]/100))
                        pointArray.append(str(keypoint[0]/100) + ',' + str(keypoint[1]/100) + ',' + str(keypoint[2]/100))
                        point[str(index)] = str(keypoint[0]) + ',' + str(keypoint[1]) + ',' + str(keypoint[2])
                if len(threeD_coord) != 0:
                    midpt = mid_point(threeD_coord[0][1], threeD_coord[0][2],3)
                    # points_dict = [
                    #     [[threeD_coord[0][5][0], threeD_coord[0][5][1], threeD_coord[0][5][2]],[midpt[0], midpt[1], midpt[2]],[threeD_coord[0][4][0], threeD_coord[0][4][1], threeD_coord[0][4][2]]], 
                    #     [[threeD_coord[0][2][0], threeD_coord[0][2][1], threeD_coord[0][2][2]], [threeD_coord[0][5][0], threeD_coord[0][5][1], threeD_coord[0][5][2]],[threeD_coord[0][8][0], threeD_coord[0][8][1], threeD_coord[0][8][2]]],
                    #     [[threeD_coord[0][13][0], threeD_coord[0][13][1], threeD_coord[0][13][2]], [threeD_coord[0][16][0], threeD_coord[0][16][1], threeD_coord[0][16][2]],[threeD_coord[0][18][0], threeD_coord[0][18][1], threeD_coord[0][18][2]]],
                    #     [[threeD_coord[0][1][0], threeD_coord[0][1][1], threeD_coord[0][1][2]], [threeD_coord[0][4][0], threeD_coord[0][4][1], threeD_coord[0][4][2]],[threeD_coord[0][7][0], threeD_coord[0][7][1], threeD_coord[0][7][2]]],
                    #     [[threeD_coord[0][16][0], threeD_coord[0][16][1], threeD_coord[0][16][2]], [threeD_coord[0][18][0], threeD_coord[0][18][1], threeD_coord[0][18][2]],[threeD_coord[0][20][0], threeD_coord[0][20][1], threeD_coord[0][20][2]]],
                    #     [[threeD_coord[0][5][0], threeD_coord[0][5][1], threeD_coord[0][5][2]], [threeD_coord[0][8][0], threeD_coord[0][8][1], threeD_coord[0][8][2]],[threeD_coord[0][11][0], threeD_coord[0][11][1], threeD_coord[0][11][2]]]
                    # ]
                    if str(request.form['shootingFoot']) == 'right':
                        points_dict = [
                            [threeD_coord[0][5] ,  midpt, threeD_coord[0][4]], 
                            [threeD_coord[0][2], threeD_coord[0][5],threeD_coord[0][8]],
                            [threeD_coord[0][13], threeD_coord[0][16],threeD_coord[0][18]],
                            [threeD_coord[0][1], threeD_coord[0][4],threeD_coord[0][7]],
                            [threeD_coord[0][16], threeD_coord[0][18],threeD_coord[0][20]],
                            [threeD_coord[0][5], threeD_coord[0][8],threeD_coord[0][11]]
                        ]
                    else:
                        points_dict = [
                            [threeD_coord[0][4] ,  midpt, threeD_coord[0][5]], 
                            [threeD_coord[0][1], threeD_coord[0][4],threeD_coord[0][7]],
                            [threeD_coord[0][14], threeD_coord[0][17],threeD_coord[0][19]],
                            [threeD_coord[0][8], threeD_coord[0][5],threeD_coord[0][2]],
                            [threeD_coord[0][17], threeD_coord[0][17],threeD_coord[0][21]],
                            [threeD_coord[0][4], threeD_coord[0][7],threeD_coord[0][10]]
                        ]
                else:
                    points_dict = [[[0],[0],[0]],[[0],[0],[0]],[[0],[0],[0]],[[0],[0],[0]],[[0],[0],[0]],[[0],[0],[0]]]

                FRAMES_RESULT[int(request.form['tab'])][str(getKey(filename))] = { 
                    'image': image, 
                    'detections': detections, 
                    'poses3d': poses3d, 
                    'poses2d': poses2d,
                    'key_angles': cal_angle(points_dict)
                }

                key_frame_angles[str(getKey(filename))] = str(cal_angle(points_dict)[0]) + ',' + str(cal_angle(points_dict)[1]) + ',' + str(cal_angle(points_dict)[2]) + ',' + str(cal_angle(points_dict)[3]) + ',' + str(cal_angle(points_dict)[4]) + ',' + str(cal_angle(points_dict)[5])
                human_coordinates[str(getKey(filename))] = str(pointArray)

                # print(human_coordinates)
                pointArray2d = []
                if len(poses2d.numpy()[...]) != 0:
                    for index, keypoint2d in enumerate(poses2d.numpy()[...][0]):
                        pointArray2d.append(str(keypoint2d[0]) + ',' + str(keypoint2d[1]) + ',' + str(keypoint2d[2]))
                skeleton_2d_coordinates[str(getKey(filename))] = str(pointArray2d)

        global COUNT
        COUNT[int(request.form['tab'])] = count

        print(key_frame_angles, key_frame_angles)

        json_human_coordinates = json.dumps(human_coordinates, separators=(',', ':'))
        json_key_frame_angles = json.dumps(key_frame_angles)
        json_skeleton_2d_coordinates = json.dumps(skeleton_2d_coordinates)

#**********************************************************************************

        # angles_variations_dictionary = [[],[],[],[],[],[]]

        # # angles_variations_dictionary = {"hip_angle_variation": [],
        # # "shooting_leg_knee_angle_variation": [],
        # # "balancing_hand_angle_variation": [],
        # # "planting_foot_knee_angle_variation": [],
        # # "balancing_elbow_angle_variation": [],
        # # "shooting_leg_ankle_angle_variation": []}

        # for enum, angle in enumerate(angles_variations_dictionary):
        #     for i in range(count):
        #         angles_variations_dictionary[enum].append(key_angles[i][enum])
                    
        # time= [(i/count)*3 for i in range(count)]
        # # print(count)
        # angles_variations_dictionary

        # # for enum, angle in enumerate(angles_variations_dictionary):
        #     # print(enum, angle)

#**********************************************************************************

        # fig, axs = plt.subplots(3,2, figsize=(20, 20), dpi=80)
        # for enum, angle in enumerate(angles_variations_dictionary):
        #     axs[int(enum/2),int(enum%2!=0)].plot(time, angles_variations_dictionary[enum], label= str(enum))
        # # plt.plot(x3, y3, label= 'line3')
        #     axs[int(enum/2),int(enum%2!=0)].set_title(str(enum))
        #     axs[int(enum/2),int(enum%2!=0)].set_xlabel("time")
        #     axs[int(enum/2),int(enum%2!=0)].set_ylabel("hip angle")
        # #     ax.legend(loc='upper left', bbox_to_anchor=(1, 0.5))
        #     axs[int(enum/2),int(enum%2!=0)].grid()
        #     plt.savefig("angle" + str(enum), dpi=80 )
        # fig.show()

#**********************************************************************************

        os.system("cd /home/ubuntu/pose3d")
        os.system("rm -rf angles" + request.form['tab'])
        os.system("mkdir angles" + request.form['tab'])



#**********************************************************************************
# 2d coordinates
        twoD_coordinates = []

        os.system("cd /home/ubuntu/pose3d")
        os.system("rm -rf skeletons" + request.form['tab'])
        os.system("mkdir skeletons" + request.form['tab'])

#**********************************************************************************

        os.system("cd /home/ubuntu/pose3d")
        os.system("rm -rf frame_changes_joint" + request.form['tab'])
        os.system("mkdir frame_changes_joint" + request.form['tab'])

        os.system("cd /home/ubuntu/pose3d")
        os.system("rm -rf ball_speed" + request.form['tab'])
        os.system("mkdir ball_speed" + request.form['tab'])

        os.system("cd /home/ubuntu/pose3d")
        os.system("rm -rf distance" + request.form['tab'])
        os.system("mkdir distance" + request.form['tab'])


#**********************************************************************************
# img details
        img_details = {}
        # for i in range(count):
        img = cv2.imread(os.path.join('/home/ubuntu/pose3d/frames' + request.form['tab'], 'frame' + str(0) + '.jpg'))
        height, width, channels = img.shape
        img_details = { 'height': str(height), 'width': str(width), 'channels': str(channels), 'duration': str(clip.duration), 'fps': str(clip.fps) }
        # print(img_details)
        json_img_details = json.dumps(img_details)
        global VIDEO_INFO
        VIDEO_INFO[int(request.form['tab'])] = img_details


#**********************************************************************************
# joint edges
        joint_edges = []
        for i in range(len(MODEL.joint_edges.numpy())):
            joint_edges.append(str(MODEL.joint_edges.numpy()[i]))

#**********************************************************************************
       
        return {
            'human_coordinates': json_human_coordinates, 
            'key_frame_angles': json_key_frame_angles, 
            'frameCount': count, 
            'frame0': json.dumps(frame0),
            '2d_coordinates': '',
            'img_details': json_img_details,
            'skeleton_2d_coordinates': json_skeleton_2d_coordinates,
            'joint_edge': json.dumps(joint_edges),
            'ankle': ''
        }, 200    
        # return {'data': str(uploaded_file) }, 200            

class Frames(Resource):
    # testing purpose
    def get(self):
        frame_img = {}
        # with open(os.path.join('/home/ubuntu/pose3d/angles', 'angle3_2.jpg'), mode='rb') as file:
        # with open(os.path.join('/home/ubuntu/pose3d/frames', 'frame0.jpg'), mode='rb') as file:
        # with open(os.path.join('/home/ubuntu/pose3d/ball_speed', 'ballSpeed.jpg'), mode='rb') as file:
        with open(os.path.join('/home/ubuntu/pose3d/distance', 'distanceGraph.png'), mode='rb') as file:
        # with open(os.path.join('/home/ubuntu/pose3d/frame_changes_joint', 'jointChanges.png'), mode='rb') as file:
            img = file.read()
        frame_img['img'] = base64.encodebytes(img).decode('utf-8')

        return {'img': json.dumps(frame_img) }, 200 

    # @cross_origin()
    def post(self):
        parser = reqparse.RequestParser()  # initialize parser
        parser.add_argument('frameNumber', required=True)
        parser.add_argument('imgFilter', required=True)
        parser.add_argument('shootingFoot', required=True)
        parser.add_argument('tab', required=True)
        args = parser.parse_args()  
        print(args['frameNumber'], args['imgFilter'], args['tab'])

        if int(args['imgFilter']) == 0:
            frame = 'frame' + str(args['frameNumber']) + '.jpg'
            if os.path.isfile(os.path.join('/home/ubuntu/pose3d/frames' + args['tab'], frame)):
                frame_img = {}

                with open(os.path.join('/home/ubuntu/pose3d/frames' + args['tab'], frame), mode='rb') as file:
                    img = file.read()
                frame_img['img'] = base64.encodebytes(img).decode('utf-8')

                return {'img': json.dumps(frame_img) }, 200    
            else:
                # otherwise we return 404 not found
                return {
                    'message': frame + " does not exist."
                }, 404
        elif int(args['imgFilter']) == 1:
            skeletonFrame = 'skeletonFrame' + str(args['frameNumber']) + '.png'

            def visualize(frame, number, edges):
                im = frame[number]['image']
                height, width, channels = im.shape
                print('height', height, width)
                detections = frame[str(number)]['detections'].numpy()
                poses3d = frame[str(number)]['poses3d'].numpy()
                poses2d = frame[str(number)]['poses2d'].numpy()
                # fig = plt.figure(figsize=(6.4, 4.8))
                # fig = plt.figure()
                fig = plt.figure(figsize=(height/72, width/72))
                image_ax = fig.add_subplot(1, 1, 1)
                image_ax.imshow(im)

                for pose2d in poses2d:
                    for i_start, i_end in edges:
                        # image_ax.plot(*zip(pose2d[i_start], pose2d[i_end]), marker='o', markersize=12,linewidth=6)
                        image_ax.plot(*zip(pose2d[i_start], pose2d[i_end]), marker='o', markersize=2)
                    image_ax.scatter(pose2d[:, 0], pose2d[:, 1], s=7)

                # fig.tight_layout()
                # plt.show()
                plt.axis('off')
                image_ax.axis('off')
                image_ax.axes.get_xaxis().set_visible(False)
                image_ax.axes.get_yaxis().set_visible(False)
                image_ax.figure.subplots_adjust(left=0,right=1,bottom=0,top=1, hspace = 0, wspace = 0)
                image_ax.figure.savefig('/home/ubuntu/pose3d/skeletons' + args['tab'] + '/skeletonFrame' + number + '.png', bbox_inches='tight', pad_inches = 0)
                # image_ax.figure.savefig('/home/ubuntu/pose3d/skeletons' + args['tab'] + '/skeletonFrame' + number + '.png')
                plt.close(image_ax.figure)

            visualize(FRAMES_RESULT[int(args['tab'])], str(args['frameNumber']), MODEL.joint_edges.numpy())

            if os.path.isfile(os.path.join('/home/ubuntu/pose3d/skeletons' + args['tab'], skeletonFrame)):
                frame_img = {}

                with open(os.path.join('/home/ubuntu/pose3d/skeletons' + args['tab'], skeletonFrame), mode='rb') as file:
                    img = file.read()
                frame_img['img'] = base64.encodebytes(img).decode('utf-8')

                return {'img': json.dumps(frame_img) }, 200    
            else:
                # otherwise we return 404 not found
                return {
                    'message': skeletonFrame + " does not exist."
                }, 404
        else:
            def mid_point(a,b,D):
                M=[]
                for i in range(D):
                    M.append((a[i]+b[i])/2)
                return M

            def show_angles(joint, frame):
                print("show_angle ", joint, str(frame))
                twoD_coord = FRAMES_RESULT[int(args['tab'])][str(frame)]['poses2d'][0]
                print(FRAMES_RESULT[int(args['tab'])][str(frame)]['key_angles'][0])
                key_angles = FRAMES_RESULT[int(args['tab'])][str(frame)]['key_angles']
                # key_angles = FRAMES_RESULT[str(0)]['key_angles'][0][:-2][2:].split(', ')
                index = 0
                coordinates = [0,0,0]
                joint_list =["hip","shooting_knee","balancing_hand","planting_foot_knee","balancing_elbow","shooting_leg_ankle"]
                if str(args['shootingFoot']) == 'right':
                    print('right foot')
                    three_points = [
                                    [5,"m",4],
                                    [2,5,8],
                                    [13,16,18],
                                    [1,4,7],
                                    [16,18,20],
                                    [5,8,11]
                            ]
                else:
                    print('left foot')
                    three_points = [
                                    [4,"m",5],
                                    [1,4,7],
                                    [14,17,19],
                                    [8,5,2],
                                    [17,19,21],
                                    [4,7,10]
                            ]

                for enum, i in enumerate(joint_list):
                    if i ==joint:
                        coordinates[0]=three_points[enum][0]
                        coordinates[1]=three_points[enum][1]
                        coordinates[2]=three_points[enum][2]
                        index = enum

                img = cv2.imread('/home/ubuntu/pose3d/frames' + args['tab'] + '/frame%d.jpg' % frame)

                if coordinates[1] == "m":
                    M= mid_point(twoD_coord[1], twoD_coord[2],2)
                    cv2.line(img,(int(twoD_coord[coordinates[0]][0]),int(twoD_coord[coordinates[0]][1])),(int(M[0]),int(M[1])),(255,255,255),3)
                    cv2.line(img,(int(twoD_coord[coordinates[2]][0]),int(twoD_coord[coordinates[2]][1])),(int(M[0]),int(M[1])),(255,255,255),3)
                    org = (int(M[0]) + 40,int(M[1]) + 40)

                else:
                    print(int(twoD_coord[coordinates[0]][0]),int(twoD_coord[coordinates[0]][1]), int(twoD_coord[coordinates[1]][0]),int(twoD_coord[coordinates[1]][1]))
                    cv2.line(img,(int(twoD_coord[coordinates[0]][0]),int(twoD_coord[coordinates[0]][1])),(int(twoD_coord[coordinates[1]][0]),int(twoD_coord[coordinates[1]][1])),(255,255,255),3)
                    cv2.line(img,(int(twoD_coord[coordinates[2]][0]),int(twoD_coord[coordinates[2]][1])),(int(twoD_coord[coordinates[1]][0]),int(twoD_coord[coordinates[1]][1])),(255,255,255),3)
                    org = (int(twoD_coord[coordinates[1]][0]) + 40,int(twoD_coord[coordinates[1]][1]) + 40)
                    # org = (1000, 500)
                    print(org)

                font = cv2.FONT_HERSHEY_SIMPLEX
                fontScale = 0.7
                color = (255,255,255)
                thickness=2
                angle_j = key_angles[index]
                # angle_j = 100
                print(str(angle_j))
                image = cv2.putText(img, str("{:.2f}".format(round(float(angle_j), 2))) + ' degree', org, font, fontScale, color, thickness, cv2.LINE_AA)
                # cv2_imshow(img)
                cv2.imwrite("/home/ubuntu/pose3d/angles" + args['tab'] + "/angleFrame" + str(frame) + "_" + str(index+1) + ".jpg", img)

                print('angle', index, angle_j)

            if int(args['imgFilter']) == 2:
                show_angles("hip",int(args['frameNumber']))
            elif int(args['imgFilter']) == 3:
                show_angles("shooting_knee",int(args['frameNumber']))
            elif int(args['imgFilter']) == 4:
                show_angles("balancing_hand",int(args['frameNumber']))
            elif int(args['imgFilter']) == 5:
                show_angles("planting_foot_knee",int(args['frameNumber']))
            elif int(args['imgFilter']) == 6:
                show_angles("balancing_elbow",int(args['frameNumber']))
            elif int(args['imgFilter']) == 7:
                show_angles("shooting_leg_ankle",int(args['frameNumber']))
            # show_angles("hip",3)

            angleFrame = 'angleFrame' + str(args['frameNumber']) + "_" + str(int(args['imgFilter'])-1) + '.jpg'
            print(angleFrame)

            if os.path.isfile(os.path.join('/home/ubuntu/pose3d/angles' + args['tab'], angleFrame)):
                frame_img = {}

                with open(os.path.join('/home/ubuntu/pose3d/angles' + args['tab'], angleFrame), mode='rb') as file:
                    img = file.read()
                frame_img['img'] = base64.encodebytes(img).decode('utf-8')

                return {'img': json.dumps(frame_img) }, 200    
            else:
                # otherwise we return 404 not found
                return {
                    'message': angleFrame + " does not exist."
                }, 404
           

class Joints(Resource):

# @cross_origin()
    def post(self):
        parser = reqparse.RequestParser()  # initialize parser
        parser.add_argument('frameNumber')
        parser.add_argument('shootingFoot', required=True)
        parser.add_argument('height', required=True)
        parser.add_argument('weight', required=True)
        parser.add_argument('fileName', required=True)
        parser.add_argument('tab', required=True)
        args = parser.parse_args()  
        print(args['frameNumber'], args['shootingFoot'],args['height'], args['fileName'])


        #*****************************************

        # torch.cuda.empty_cache()

        # yolov5
        def waitForYoloReady(ready):
            if ready == 1:
                return True
            return False

        # print(f"Using torch {torch.__version__} ({torch.cuda.get_device_properties(0).name if torch.cuda.is_available() else 'CPU'})")

        os.system('rm -rf /home/ubuntu/pose3d/yolov5/ball_detections' + args['tab'])

        detectBall = 'python3 /home/ubuntu/pose3d/yolov5/yolov5/detect.py --weights /home/ubuntu/pose3d/yolov5/yolov5/ballDetectionV2.pt --save-txt --save-conf --img 640 --conf 0.3 --source ' + '/home/ubuntu/pose3d/uploaded' + args['tab'] + '/' + str(args['fileName']) + ' --project /home/ubuntu/pose3d/yolov5 --name ball_detections' + args['tab']

        os.system(detectBall)
        # CUDA_LAUNCH_BLOCKING=1

        ready = 1

        wait(lambda: waitForYoloReady(ready), timeout_seconds=120, waiting_for="wait for yolov5 to be ready")
        print('Setup YOLOv5 complete')

         #*****************************************

        print("video_info", VIDEO_INFO)

        directory_in_str = "/home/ubuntu/pose3d/yolov5/ball_detections" + args['tab'] + "/labels"
        directory = os.fsencode(directory_in_str)
        file_list = os.listdir(directory)
        print(file_list, len(file_list))
        # file_list_str= [str(file_list[i]) for i in range(len(file_list))]

        def number(x):
            match = re.findall("(?<=_)\d*(?=\.)", str(x))
            return int(match[0])

        ball_coord_per_video = {}
        for filename in sorted(file_list, key = number):    
            #      if filename.endswith(".jpg"):
            file = open(directory_in_str+"/"+str(filename)[2:-1], 'r')
            lines = file.readlines()
            max =0
            tmp =[]
            for i in lines:
                if float(i.split()[-1]) > max:
                    max = float(i.split()[-1])
            for i in lines:
                if float(i.split()[-1]) >= max:
                    tmp.append(float(i.split()[1]))
                    tmp.append(float(i.split()[2]))
                    break
                else:
                    continue 
                
            ball_coord_per_video.update({number(filename)-1:tmp})

        # print('ball_coord_per_video', ball_coord_per_video,len(ball_coord_per_video))
        # print(ball_coord_per_video[5])


        ball_coord2D_per_video = []

        for frame in range(int(COUNT[int(args['tab'])])):
            try:
                x_coord, y_coord = ball_coord_per_video[frame][0] * int(VIDEO_INFO[int(args['tab'])]['width']), ball_coord_per_video[frame][1] * int(VIDEO_INFO[int(args['tab'])]['height'])
                ball_coord2D_per_video.append([int(x_coord),int(y_coord)])
            except:
                ball_coord2D_per_video.append([float('inf'), float('inf')])

        def distance(p0,p1):
            return ((p0[0]-p1[0])**2 + (p0[1]-p1[1])**2)**0.5

        angleCoord2d = []
        for i in range(COUNT[int(args['tab'])]):
            # print(FRAMES_RESULT[str(i)]['poses3d'])
            if  len(FRAMES_RESULT[int(args['tab'])][str(i)]['poses2d']) == 0:
                angleCoord2d.append([0,0])
            elif args['shootingFoot'] == 'right':
                angleCoord2d.append([float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses2d'][0][8][0]),float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses2d'][0][8][1])])
            elif args['shootingFoot'] == 'left':
                angleCoord2d.append([float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses2d'][0][7][0]),float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses2d'][0][7][1])])
        # print('angleCoord2d', angleCoord2d)

        distances = []
        for i in range(int(COUNT[int(args['tab'])])):
            try:
                distances.append(distance(ball_coord2D_per_video[i], angleCoord2d[i]))
            except:
                distances.append(None)

        # print('distances', distances)
        
        minDistanceIndex = 0
        minDistance = float('inf')
        for (i, d) in enumerate(distances):
            if (d is not None and d < minDistance):
                minDistanceIndex = i
                minDistance = d

        # print('min distance', distances.index(min(distances)))
        # print('min distance', minDistance, minDistanceIndex)

        # if (minDistanceIndex == 0):
        #     shooting_frame = 0
        # else:
        shooting_frame = minDistanceIndex

 #****************************************************************

        # save joint graph
        angleCoord = []
        hipCoo = []
        for i in range(COUNT[int(args['tab'])]):
            # print(FRAMES_RESULT[str(i)]['poses3d'])
            if  len(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d']) == 0:
                angleCoord.append([float('inf'),float('inf'),float('inf')])
            elif args['shootingFoot'] == 'right':
                hipCoo = np.array(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][0])
                angleCoord.append([float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][8][0] - float(hipCoo[0])),float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][8][1] - float(hipCoo[1])),float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][8][2] - float(hipCoo[2]))])
            elif args['shootingFoot'] == 'left':
                hipCoo = np.array(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][0])
                angleCoord.append([float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][7][0] - float(hipCoo[0])),float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][7][1] - float(hipCoo[1])),float(FRAMES_RESULT[int(args['tab'])][str(i)]['poses3d'][0][7][2] - float(hipCoo[2]))])
        print('angleCoord', angleCoord)

        jointX = np.array([-angleCoord[j][1] for j in range(len(angleCoord))])
        jointY = np.array([y for y in range(len(angleCoord))])
        print(jointX, jointY)

        jointFig, jointAx = plt.subplots( nrows=1, ncols=1 ) 
        jointAx.plot(jointY, jointX)
        plt.xlabel('Frames')
        plt.ylabel('y_coord in metric 3D Space')
        plt.text(int(shooting_frame)+5, np.min(jointX), s='Ball Contact', c='r')
        plt.axvline(x=int(shooting_frame), color="r", linestyle='--', marker=11,)
        plt.title("Ankle y_coordinates across the video", fontdict = {'fontsize': 15},)
        jointFig.savefig('/home/ubuntu/pose3d/frame_changes_joint' + args['tab'] + '/jointChanges.png',)  
        plt.close(jointFig) 

        print('min jointx', np.min(jointX))

        joint_changes_img = {}
        with open(os.path.join('/home/ubuntu/pose3d/frame_changes_joint' + args['tab'] + '/', 'jointChanges.png'), mode='rb') as file:
            img = file.read()
        joint_changes_img['img'] = base64.encodebytes(img).decode('utf-8')

#****************************************************************

        # distance graph
        distanceX = np.array(distances)
        distanceY = np.array([i for i in range(int(COUNT[int(args['tab'])]))])

        distanceFig, distanceAx = plt.subplots( nrows=1, ncols=1 ) 
        distanceAx.plot(distanceY, distanceX)
        distanceFig.savefig('/home/ubuntu/pose3d/distance' + args['tab'] + '/distanceGraph.png', bbox_inches='tight', pad_inches = 0)  
        plt.close(distanceFig) 


# *************************************************************8
        
        print('framesssss', FRAMES_RESULT[int(args['tab'])][str(shooting_frame)]['poses3d'])

        if (len(FRAMES_RESULT[int(args['tab'])][str(shooting_frame-1)]['poses3d']) != 0):
            threeDcoord_frame = FRAMES_RESULT[int(args['tab'])][str(shooting_frame-1)]['poses3d'][0]
            threeDcoord_frame2 = FRAMES_RESULT[int(args['tab'])][str(shooting_frame)]['poses3d'][0]
            print('angular_velocity_coord', threeDcoord_frame)

            if args['shootingFoot'] == 'right':
                toe0= threeDcoord_frame[8] 
                toe1= threeDcoord_frame2[8] 
                Hip0 = threeDcoord_frame[2] 
                Hip1 = threeDcoord_frame2[2]
            else:
                toe0= threeDcoord_frame[7] 
                toe1= threeDcoord_frame2[7] 
                Hip0 = threeDcoord_frame[1] 
                Hip1 = threeDcoord_frame2[1]

            print (toe0, Hip0, toe1, Hip1)
        else:
            threeDcoord_frame = []
            threeDcoord_frame2 = []

            print('angular_velocity_coord nullll', threeDcoord_frame)

            toe0= [0,0,0]
            toe1= [0,0,0]
            Hip0 = [0,0,0]
            Hip1 = [0,0,0]
            print (toe0, Hip0, toe1, Hip1)

        def cal_velocity_angle(toe0, Hip0, toe1, Hip1 ):
            Toe0 = np.array(toe0)
            Hip0 = np.array(Hip0)
            Toe1 = np.array(toe1)

            # L0 = (Toe0 ) - (Hip0 )
            # L1 = (Toe1 ) - (Hip0 )
            L0 = (Toe0 - np.array(threeDcoord_frame[0])) - (Hip0 - np.array(threeDcoord_frame[0]))
            L1 = (Toe1 - np.array(threeDcoord_frame2[0])) - (Hip0 - np.array(threeDcoord_frame[0]))

            cosine_angle = np.dot(L0, L1) / (np.linalg.norm(L0) * np.linalg.norm(L1))
            angle = np.arccos(cosine_angle)

            return  angle

# 2d testing
        # if (len(FRAMES_RESULT[int(args['tab'])][str(shooting_frame-1)]['poses2d']) != 0):
        #     threeDcoord_frame = FRAMES_RESULT[int(args['tab'])][str(shooting_frame-1)]['poses2d'][0]
        #     threeDcoord_frame2 = FRAMES_RESULT[int(args['tab'])][str(shooting_frame)]['poses2d'][0]
        #     print('angular_velocity_coord', threeDcoord_frame)

        #     if args['shootingFoot'] == 'right':
        #         toe0= threeDcoord_frame[8] 
        #         toe1= threeDcoord_frame2[8] 
        #         Hip0 = threeDcoord_frame[2] 
        #         Hip1 = threeDcoord_frame2[2]
        #     else:
        #         toe0= threeDcoord_frame[7] 
        #         toe1= threeDcoord_frame2[7] 
        #         Hip0 = threeDcoord_frame[1] 
        #         Hip1 = threeDcoord_frame2[1]

        #     print (toe0, Hip0, toe1, Hip1)
        # else:
        #     threeDcoord_frame = []
        #     threeDcoord_frame2 = []

        #     print('angular_velocity_coord nullll', threeDcoord_frame)

        #     toe0= [0,0]
        #     toe1= [0,0]
        #     Hip0 = [0,0]
        #     Hip1 = [0,0]
        #     print (toe0, Hip0, toe1, Hip1)

        # def cal_velocity_angle(toe0, Hip0, toe1, Hip1 ):
        #     Toe0 = np.array(toe0)
        #     Hip0 = np.array(Hip0)
        #     Toe1 = np.array(toe1)

        #     L0 = Toe0 - Hip0
        #     L1 = Toe1 - Hip0

        #     cosine_angle = np.dot(L0, L1) / (np.linalg.norm(L0) * np.linalg.norm(L1))
        #     angle = np.arccos(cosine_angle)

        #     return  angle





        angular_d = cal_velocity_angle(toe0, Hip0, toe1, Hip1)
        print(np.degrees(angular_d), angular_d)

        angular_v = angular_d/(1/float(VIDEO_INFO[int(args['tab'])]['fps']))
        print(angular_v, "radian/s")


        # estimated length of the leg 
        # l = float(args['height'])/100/(1+1/1.4)
        l = float(args['height'])/100*0.491 # from a public dataset (Winter, 2009) 
        # print('l', l)

        ankle_linear_v = l*angular_v 
        print(ankle_linear_v, "m/s")
        print((ankle_linear_v/(1000))/(1/3600), "km/h")

        # ball velocity
        percentage_of_effective_mass = 2.29/85 #from a research paper by Peacock, 2016
        ball_weight = 0.41 # from FIFA public dataset
        cor = 0.6
        effective_mass= float(args['weight'])*percentage_of_effective_mass
        m_Mm = effective_mass/(ball_weight+effective_mass)
        ball_v = ((ankle_linear_v/(1000))/(1/3600)) * m_Mm*(1+cor)
        print(ball_v, "km/h")


        # ball speed image
        # img= cv2.imread("/content/yolov5/frames/frame%d.jpg" % (shooting_frame+1))
        frameImg = cv2.imread(os.path.join('/home/ubuntu/pose3d/frames' + args['tab'], 'frame' + str(shooting_frame) + '.jpg'))

        cv2.circle(frameImg,(ball_coord2D_per_video[shooting_frame][0], ball_coord2D_per_video[shooting_frame][1]), 8, (0,0,255), -1)
        font = cv2.FONT_HERSHEY_SIMPLEX
        cv2.putText(frameImg,'Ball Speed: '+ str("{:.2f}".format(round(ball_v, 2)))+' km/h',(ball_coord2D_per_video[shooting_frame][0]-300, ball_coord2D_per_video[shooting_frame][1]), font, 1,(255,255,255),2,cv2.LINE_AA)
        # cv2_imshow(frameImg)
        cv2.imwrite("/home/ubuntu/pose3d/ball_speed" + args['tab'] + "/ballSpeed.jpg", frameImg)

        ball_speed_img = {}
        with open(os.path.join('/home/ubuntu/pose3d/ball_speed' + args['tab'] + '/', 'ballSpeed.jpg'), mode='rb') as file:
            img = file.read()
        ball_speed_img['img'] = base64.encodebytes(img).decode('utf-8')
  

        #********************************************

        return {
            'angular_degree': str(np.degrees(angular_d)),
            'angular_d': str(angular_d),
            'angular_v': str(angular_v),
            'ankle_linear_v_ms': str(ankle_linear_v),
            'ankle_linear_v_kmh': str((ankle_linear_v/(1000))/(1/3600)),
            'ball_v': str(ball_v),
            'detected_frame': str(shooting_frame),
            'min_distance_frame': str(minDistanceIndex),
            'ball_speed_img': json.dumps(ball_speed_img),
            'joint_changes_img': json.dumps(joint_changes_img)
         }, 200  
        
       


api.add_resource(UploadVideo, '/uploadvideo')
api.add_resource(Frames, '/frames')
api.add_resource(Joints, '/joint')

# setup_app()
# SetUp = UploadVideo()

if __name__ == '__main__':
    # app.run()  # run our Flask app
    # app.run('0.0.0.0', debug=True, port=8080)
    # app.run('0.0.0.0', debug=True, port=8080, ssl_context='adhoc')
    app.run('0.0.0.0', port=8080, ssl_context=(SERVER_CRT, SERVER_KEY))
