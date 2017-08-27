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
pos = {x:0,
       y:0,
       z:0};

d = new Date();
cal_period = 200;
drift = {x: 0,
         y: 0,
         z: 0};

thresh = 1; // threshold for acceleration

damper = 13; // damper for acceleration


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

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
    // console.log( vr );
    cube.rotation.y += 0.1;
    //console.log( "HELLO FROM RENDER LOOP");
    //console.log( vr.player.camera.rotation );

    cube.position.z = -Math.cos( vr.player.camera.rotation.y );
    cube.position.x = -Math.sin( vr.player.camera.rotation.y ) ;
    if( accel != null && accel.x > 1 )
    {
      cube.position.y = accel.x/10;
    }
    if(accel)
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
    pos.x += vel.x;
    pos.y += vel.y;
    pos.z += vel.z;

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