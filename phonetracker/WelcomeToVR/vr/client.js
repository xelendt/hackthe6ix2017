// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';

import {THREE} from "three";

function init(bundle, parent, options) {
  
  //const scene = new THREE.Scene();

  //console.log( vr );
  const vr = new VRInstance(bundle, 'WelcomeToVR', parent, {
    // Add custom options here
    cursorVisibility: 'visible',
  });

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial()
    );
  cube.position.z = -1;
  scene.add( cube );

  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
    // console.log( vr );
    console.log( "HELLO FROM RENDER LOOP");
    console.log( vr );
  };

  window.addEventListener("deviceorientation", function(event) {
      // process event.alpha, event.beta and event.gamma
      console.log( event.alpha );
  }, true);

  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};