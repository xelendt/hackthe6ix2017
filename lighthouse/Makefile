CXX = g++
CXXFLAGS = -g \
			-Wno-deprecated \
			-std=c++11


LIBS = -L/usr/local/lib \
			-L/usr/local/Cellar/opencv3/3.2.0/lib \
			-lopencv_highgui \
			-lopencv_core \
			-lopencv_imgcodecs \
			-lopencv_imgproc \
			-lopencv_videoio

			#-L/usr/local/Cellar/opencv3/3.2.0/share/OpenCV/3rdparty/lib \

INCLUDE = -I/usr/local/Cellar/opencv3/3.2.0/include

TARGETS = server.cpp
			
EXEC = display

all: 
	$(CXX) $(TARGETS) -o $(EXEC) $(LIBS) $(INCLUDE) $(CXXFLAGS)

train:
	$(CXX) train.cpp -o train $(LIBS) $(INCLUDE) $(CXXFLAGS) 

train-run:
	rm -f train; make train; ./train

run: 
	make; ./$(EXEC)

clean:
	rm $(EXEC)
