// ------------------------------------------------
// hack the 6ix 2017
// ------------------------------------------------

// Standard library
#include <iostream>
#include <stdlib.h>

// OpenCV
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>

int main()
{
    cv::VideoCapture webcam(0);

    if( !webcam.isOpened() )
    {
	std::cout << "Could not open webcam" << std::endl;
    }

    while( true )
    {
	cv::Mat cam_frame;
	webcam.read( cam_frame );
	imshow( "webcam", cam_frame );
	if( cv::waitKey(30) >= 0 )
	{
	    break;
	}
    }
   
    return 0;
}
