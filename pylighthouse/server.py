import numpy as np
import cv2

import requests

cap = cv2.VideoCapture(0)

while(True):
	#capture frame
	ret, frame = cap.read()

	# do the check on the frame

	# send the http request

	cv2.imshow('frame', frame)
	if( cv2.waitKey(1) & 0xFF == ord('q') ):
		break

cap.release()
cv2.destroyAllWindows()
