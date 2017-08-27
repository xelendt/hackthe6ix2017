// ------------------------------------------------
// hack the 6ix 2017
//
// collect.cpp
// 	collects a photo every mouse click of the world, and saves 
// 	with a well defined name
//
// ------------------------------------------------

// Standard library
#include <iostream>
#include <stdlib.h>
#include <fstream>
#include <sstream>
#include <chrono>

// OpenCV
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgcodecs/imgcodecs.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/ml/ml.hpp>

bool saveFrame = false;

void mouseCallBack( int event, int x, int y, int flags, void* userdata )
{
    if( event == cv::EVENT_LBUTTONDOWN )
    {
	saveFrame = true;
    }
}

int main()
{
    std::cout << "smile for the camera!..." << std::endl;

    std::ofstream f_out("image_list.txt");

    cv::VideoCapture webcam(0);

    if( !webcam.isOpened() )
    {
	std::cout << "Could not open webcam" << std::endl;
    }

    cv::namedWindow("webcam", 1);

    cv::setMouseCallback("webcam", mouseCallBack, NULL) ;


    while( true )
    {
	cv::Mat cam_frame;
	webcam.read( cam_frame );


	if( saveFrame )
	{
	    std::cout << "saving frame" << std::endl;
	    saveFrame = false;
	    std::stringstream ss;
	    int time = (std::chrono::duration_cast< std::chrono::milliseconds >(
		std::chrono::system_clock::now().time_since_epoch()
	    )).count();
	    ss << "training_data/frame_" 
	       << time 
	       << ".png";
	    cv::imwrite( ss.str(), cam_frame );
	    f_out << ss.str() << "\n"; 
	}

	imshow( "webcam", cam_frame );
	if( cv::waitKey( 30 ) == 27 )
	{
	    break;
	}
    }

    f_out.close();

    std::cout << "done collecting" << std::endl;
    return 0;
}
