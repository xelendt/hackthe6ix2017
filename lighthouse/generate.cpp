// ------------------------------------------------
// hack the 6ix 2017
// ------------------------------------------------

// Standard library
#include <iostream>
#include <stdlib.h>
#include <fstream>
#include <time.h>
#include <sstream>

// OpenCV
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgcodecs/imgcodecs.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/ml/ml.hpp>

bool clicked = false;
int mouseX = -1;
int mouseY = -1;

std::vector<cv::Mat> pos;
std::vector<cv::Mat> neg;
int pos_count = 0;
cv::Mat frame;

int cellWidth = 120;
int cellHeight = 75;

std::vector<cv::Mat> pos_samples;
std::vector<cv::Mat> neg_samples;
float neg_to_pos = 2.2;
float neg_buffer = 0.8;

std::vector<cv::Point> pos_locs;

std::ofstream fgrad, fres;

cv::Mat gx, gy;
void getGrad( cv::Mat& in, cv::Mat& out )
{
    //cv::Sobel( in, gx, CV_32F, 1, 0, 3, 1, 0, cv::BORDER_DEFAULT );
    //cv::Sobel( in, gy, CV_32F, 0, 1, 3, 1, 0, cv::BORDER_DEFAULT );
    cv::hconcat( in, in, out );
    //cv::imshow( "out", out );
    //cv::waitKey(0);
}

void saveWithResult( cv::Mat& toSave, int result )
{
    std::stringstream ss;

    ss << "train_grad/"
       << rand()
       << ".png";

    std::cout << ss.str() << std::endl;

    cv::imwrite( ss.str(), toSave );
    fgrad << ss.str() << "\n";
    fres << result << "\n";
}

void mouseCallback( int event, int x, int y, int flags, void* userdata )
{
    if( event == cv::EVENT_LBUTTONDOWN )
    {
	// do something with cam_frame
	pos_count ++;
	pos_locs.push_back( cv::Point( x, y ) );

	cv::Mat subframe = frame( cv::Rect( x-cellWidth/2, y-cellHeight/2, cellWidth, cellHeight ) );
	// take the sobel gradients and then to hconcat to get one huge matrix
	cv::Mat concat;
	// Sobel( src, dst, type, xdir, ydir, kernel_size, scale, delta, BORDER_DEFAULT )
	getGrad( subframe, concat );	

	// we want to save out the gradient, and then put a positive result
	saveWithResult( concat, 1 );
	//cv::imshow( "gradients", concat );
	//cv::waitKey(0);
    }
}

int main()
{
    std::cout << "generating..." << std::endl;

    srand( time(NULL) );

    // setup grad and result text files for writing
    fgrad = std::ofstream("grad_data.txt");
    fres = std::ofstream("grad_results.txt");

    // open the list of images
    std::ifstream fin("image_list.txt"); 
    std::vector<std::string> frame_names;
    std::string fname;

    cv::Rect cell(0, 0, 100, 60);

    cv::namedWindow("frame");
    cv::setMouseCallback( "frame", mouseCallback );

    // cell size is going to be 100x60
    while( getline( fin, fname ) ) 
    {
	std::cout << fname << std::endl;

	frame = cv::imread( fname );

	// for each frame, we keep going until we get maybe 5 positive samples, via clicking
	cv::imshow( "frame", frame );
	cv::waitKey(0);

	// generate negative samples outside of the selected area
	int x = -1;
	int y = -1;
	for( int i = 0; i < pos_count * neg_to_pos; i ++ )
	{
	    do 
	    {
		//std::cout << "init for x and y" << std::endl;
		x = rand() % (frame.cols - cellWidth*2) + cellWidth/2 -1;
		y = rand() % (frame.rows - cellHeight*2)+ cellWidth/2 -1;

		std::cout << x << ", " << y << " -- " << frame.cols << ", " << frame.rows << std::endl;

		for( int j = 0; j < pos_locs.size(); j ++ )
		{
		    if( abs(x - pos_locs[j].x) < cellWidth * neg_buffer 
		     && abs(y - pos_locs[j].y) < cellHeight * neg_buffer )
		    {
			//std::cout << "not allowed" << std::endl;
			
			x = rand() % (frame.cols - cellWidth*2) + cellWidth/2 -1 ;
			y = rand() % (frame.rows - cellHeight*2)+ cellWidth/2 -1 ;
			
			j = 0;
			continue;
		    }
		}
	    }while( false );

	    //std::cout << x << ", " << y << std::endl;
	    cv::Mat subframe = frame( cv::Rect( x-cellWidth/2, y-cellHeight/2, cellWidth, cellHeight ) );
	    cv::Mat neg;
	    getGrad( subframe, neg );
	    saveWithResult( neg, -1 );
	    
	    cv::rectangle( frame
			, cv::Point( x-cellWidth/2, y-cellHeight/2 )
			, cv::Point( x+cellWidth/2, y+cellHeight/2 )
			, cv::Scalar( 0, 0, 0 ) );
	}
	for( int i = 0; i < pos_locs.size(); i ++ )
	{
	    //std::cout << pos_locs[i] << std::endl;
	    cv::rectangle( frame
			, cv::Point( pos_locs[i].x-cellWidth/2, pos_locs[i].y-cellHeight/2 )
			, cv::Point( pos_locs[i].x+cellWidth/2, pos_locs[i].y+cellHeight/2 )
			, cv::Scalar( 0, 255, 0 ) );
	}
	cv::imshow("frame", frame);
	cv::waitKey(0);
	pos_count = 0;
	pos_locs = std::vector<cv::Point>();
    }

    fin.close();

    fgrad.close();
    fres.close();

    std::cout << "done generating" << std::endl;
    return 0;
}
