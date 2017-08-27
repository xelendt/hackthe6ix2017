import numpy as np
import cv2

import requests

cap = cv2.VideoCapture(0)

cellWidth = 120
cellHeight = 75
svmSize = cellWidth*cellHeight*6

step = 50

#URL = "http://10.129.21.246:3001/stateById/59a1d31bf81c891c66871114"
#URL = "http://42e31213.ngrok.io/stateById/59a1d31bf81c891c66871114"
URL = "http://localhost:3001/stateById/59a20c47ea48642c64d7a425"

svm = cv2.ml.SVM_load("svm_data.txt")

while(True):
	print ("frame")
	#capture frame
	ret, frame = cap.read()

	# do the check on the frame


	DATA = { 'moving': False, 'x': 0, 'y': 0.123, 'z':0 }

	# send the http request
	r = requests.put(URL, json=DATA)

	print( r.status_code )
	print( r.reason )

	break

	print( len(frame) ) 
	print( len(frame[0]) )

	loc_x = []
	loc_y = []

	for x in range( 0, int( (len(frame[0])-cellWidth) / step)-1 ):
		for y in range( 0, int( (len(frame)-cellHeight) / step)-1 ):
			cell = []
			for i in range( 0, cellHeight ):
				cell.append(frame[i+step*y][step*x:step*x+cellWidth])

			cell = np.array(cell, dtype=np.float32)
			#cell = frame[50:50, 100:100]
			#print(frame[0][0])
			#print(len(frame[50:50, 100:100]))
			#cv2.imshow('frame', np.array(cell))

			gx = cv2.Sobel( cell, cv2.CV_32F, 1, 0 )
			gy = cv2.Sobel( cell, cv2.CV_32F, 0, 1 )

			#cv2.imshow('frame', frame)
			cv2.imshow('gx', gx)
			cv2.imshow('gy', gy)
			data = np.hstack((cell, cell))

			

			#print(svmSize)

			if(svm.predict(data.reshape(-1, svmSize))[1][0] > 0 ):
			    print( "FOUND IT", x, y)
			    loc_x.append(x)
			    loc_y.append(y)
			    cv2.rectangle(frame, (x*step, y*step), (step*x+cellWidth, step*y+cellHeight), (0,255,0))

			#cv2.imshow('data', data)
	
	loc_x = np.array(loc_x, dtype=np.float32)
	loc_y = np.array(loc_y, dtype=np.float32)
	z = np.hstack((loc_x, loc_y))

	#print(z)

	criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
	ret,label,center=cv2.kmeans(z,2,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)
	#print(center[:,0])
	#print(center[:,1])
	#print(ret)
	print(len(center[0]))
	cv2.circle(frame, (int(center[0][0]*step), int(center[1][0]*step)), 50, (255, 0, 0), -1)

	cv2.imshow('frame', frame)

	if( cv2.waitKey(1) & 0xFF == ord('q') ):
		break

cap.release()
cv2.destroyAllWindows()
