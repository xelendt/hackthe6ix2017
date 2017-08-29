// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';

import * as THREE from 'three';

accel = null;
vel = {x:0,
       y:0,
       z:0};
var pos = {x:0,
       y:0,
       z:0};

d = new Date();
cal_period = 200;
drift = {x: 0,
         y: 0,
         z: 0};

initial_size = 4;

thresh = 1; // threshold for acceleration

damper = 1; // damper for acceleration

var sensor_allowance = 0.0;

var prevPos = {'x':0,
               'y':0,
               'z':0};


const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.1,0.1,0.1),
  new THREE.MeshBasicMaterial()
);

startTime = 0;

function init(bundle, parent, options) {
  
  //console.log(accel);
  const scene = new THREE.Scene();

  //console.log( vr );
  const vr = new VRInstance(bundle, 'WelcomeToVR', parent, {
    // Add custom options here
    cursorVisibility: 'visible',
    scene:scene,
  });




  cube.position.z = -1;
  //cube.material.color = {1, 0, 0};
  scene.add( cube );
  console.log( cube );

  api_data = null;

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
     //console.log( vr );

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {

        console.log( prevPos, pos )
        if( prevPos.x != pos.x || prevPos.y != pos.y || prevPos.z || pos.z )
        {
          prevPos = pos;
        }

        api_data = JSON.parse(request.responseText);
        sensor_allowance = 1.0;

      } else {
        //console.log(request);
        
      }
    };

text = "fu";


// request.open('POST', 'https://impedio.serveo.net/state');

// request.setRequestHeader("Content-type", "application/json");
// request.setRequestHeader("X-Requested-With", "origin");

//request.setRequestHeader("Content-length", 2);
//request.setRequestHeader("Connection", "close");        


        // request.send({'moving':false,
        //               'x':0,
        //               'y':0,
        //               'z':0,
        //               'error':'text'});

     request.open('GET', 'https://privo.serveo.net/stateById/59a20c47ea48642c64d7a425');
     request.send();

    // https://www.html5rocks.com/en/tutorials/cors/
    // var xhr = createCORSRequest('GET', 'https://privo.serveo.net/stateById/59a20c47ea48642c64d7a425');

    // console.log( xhr );

    // xhr.onload = function() {
    // var text = xhr.responseText;
    // var title = getTitle(text);
    //   alert('Response from CORS request to ' + url + ': ' + title);
    // };

    // xhr.onerror = function() {
    //   alert('Woops, there was an error making the request.');
    // };

    // xhr.withCredentials = true;
    // xhr.send();
    //console.log( pos, prevPos );

    cube.rotation.y += 0.1;
    //console.log( "HELLO FROM RENDER LOOP");
    //console.log( vr.player.camera.rotation );

    cube.position.z = -Math.cos( vr.player.camera.rotation.y );
    cube.position.x = -Math.sin( vr.player.camera.rotation.y ) ;
    if( accel != null && accel.x > 1 )
    {
      cube.position.y = accel.x/10;
    }
    if(accel && sensor_allowance > 0)
    {
      cube.material.color.r = 0;
      //console.log( accel );
      //vr.player.camera.position.x += 0.1;
      if( Math.abs(accel.x) > thresh ){
        vel.x += (accel.x )/ damper;
      }
      if( Math.abs(accel.y) > thresh ){
        vel.y += (accel.y )/ damper;
      }
      if( Math.abs(accel.z) > thresh ){
        vel.z += (accel.z )/ damper;
      }
    }

    console.log( sensor_allowance );
    if( sensor_allowance > 0 )
    {
      console.log( vel );
      pos.x += (vel.x * 250000000) + Math.sign(vel.x)*25;
      pos.y += (vel.y * 250000000) + Math.sign(vel.x)*40;
      pos.z += (vel.z * 250000000) + Math.sign(vel.x)*25;
      sensor_allowance -= 0.05;
    }
    else
    {
      //vel.x = 0;
      //vel.y = 0;
      //vel.z = 0;
    }

    if( api_data )
    {
      //console.log( "WE GOT DATA" );
      pos.x = api_data.x-640;
      pos.y = api_data.y-360;
      if( initial_size < 0 )
      {
        initial_size = api_data.z;
      }
      size = api_data.z;
      pos.z = 50 * ( initial_size - size );
      vel.x = prevPos.x - pos.x;
      vel.y = prevPos.y - pos.y;
      vel.z = prevPos.z - pos.z;
    }

    vr.player.camera.position.x = pos.x;
    vr.player.camera.position.y = pos.y;
    vr.player.camera.position.z = pos.z;
    // /console.log( cube.position.x );

    d = new Date();
    if( startTime == 0 )
    {
      startTime = d.getTime();
      console.log( startTime );
    }
    else if( startTime > 0 )
    {
      console.log( d.getTime() );
      if( d.getTime() > startTime + cal_period )
      {
        drift.x = pos.x / cal_period / cal_period;
        drift.y = pos.y / cal_period / cal_period;
        drift.z = pos.z / cal_period / cal_period;
        pos = {x: 0,y:0,z:0};
        console.log("done calibration");
        startTime = -1;
      }
    }
  };

  window.addEventListener("deviceorientation", function(event) {
      // process event.alpha, event.beta and event.gamma
      console.log( event.alpha );
  }, true);

  

  // Begin the animation loop
  vr.start();
  return vr;
}

window.addEventListener("devicemotion", function(event) {
          // Process event.acceleration, event.accelerationIncludingGravity,
          // event.rotationRate and event.interval
          accel = event.acceleration;
          cube.scale.x = 2.0;
          
          // cube.scale.y = event.acceleration.y;
          // cube.scale.z = event.acceleration.z;
  }, true);

window.ReactVR = {init};