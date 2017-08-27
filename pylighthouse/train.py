import numpy as np
import cv2

size = 20

svm_params = dict( kernel_type = cv2.ml.SVM_LINEAR,
                    svm_type = cv2.ml.SVM_C_SVC,
                    C=2.67, gamma=5.383 )

affine_flags = cv2.WARP_INVERSE_MAP|cv2.INTER_LINEAR

# load in the data
fgrad = open( "../lighthouse/grad_data.txt", "r" )
fres = open( "../lighthouse/grad_results.txt", "r" )

training_data = []
training_results = []

fname = fgrad.readline() 
fname1 = fname
while( len( fname ) > 0 ):
	#print( ("Users/max/Desktop/hackthe6ix/lighthouse/"+fname)[:-1] )
	img = cv2.imread(("../lighthouse/"+fname)[:-1]) 

	training_data.append(img.flatten())
	#print(len(img.flatten()))
	fname = fgrad.readline()

	#training_data.append(a)

r = fres.readline()
while( len(r) > 0 ):

	training_results.append( int(r) )

	r = fres.readline()

print( training_results )

# train
# https://stackoverflow.com/questions/37038861/creating-svm-with-opencv-3-0-1-python-2-7
svm = cv2.ml.SVM_create()
svm.setType(cv2.ml.SVM_C_SVC)
svm.setKernel(cv2.ml.SVM_LINEAR)
svm.setTermCriteria((cv2.TERM_CRITERIA_COUNT, 10, 1.e-06))

print( len(training_data) )
print( len(training_data[0]))

svm.train(np.array(training_data, dtype=np.float32), cv2.ml.ROW_SAMPLE, np.array(training_results))
svm.save("svm_data.txt")

'''
print(fname1)
test = cv2.imread("../lighthouse/train_grad/644449426.png")
cv2.imshow('test', test)
cv2.waitKey(0)

test = test.reshape(-1, 54000);

print(svm.predict(np.array(test, dtype=np.float32))[1])
#print( svm.getSupportVectors() )
'''

print( "Done!") 

# test


# check accuracy
