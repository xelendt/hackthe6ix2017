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
			-lopencv_videoio \
			-lopencv_ml \
			-lcurl \

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

collect:
	$(CXX) collect.cpp -o collect $(LIBS) $(INCLUDE) $(CXXFLAGS) 

collect-run:
	rm -f collect; make collect; ./collect

generate:
	$(CXX) generate.cpp -o generate $(LIBS) $(INCLUDE) $(CXXFLAGS) 

generate-run:
	rm -f generate; make generate; ./generate

run: 
	make; ./$(EXEC)

clean:
	rm $(EXEC)
