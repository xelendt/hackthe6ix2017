import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
} from 'react-vr';
import TimerMixin from 'react-timer-mixin';

var g_x = 0;
var g_y = 0;
var g_z = 0;

export default class WelcomeToVR extends React.Component {

  // constructor()
  // {
  //   super();
  //   console.log("init vr class");
  //   // fetch('https://privo.serveo.net/stateById/59a20c47ea48642c64d7a425'//, {
  //   //   //method: 'GET',
  //   //   // headers: {
  //   //   //   //'Accept': 'application/json',
  //   //   // },
  //   // ).then((response) => response.json())
  //   //   .then((responseJson) => {
  //   //     console.log(responseJson);
  //   //     this.setState({x:0, y:0, z:-2});
  //   //     g_x = responseJson.x;
  //   //     g_y = responseJson.y;
  //   //     g_z = responseJson.z;
  //   //   });
  //     this.xp = 0;
  //     setInterval(this.render, 2000);
  // }

  // ComponentWillMount(){
  //   p = fetch('https://privo.serveo.net/stateById/59a20c47ea48642c64d7a425'//, {
  //   //   //method: 'GET',
  //   //   // headers: {
  //   //   //   //'Accept': 'application/json',
  //   //   // },
  //    ).then((response) => response.json())
  //      .then((responseJson) => {
  //        console.log(responseJson);
  //        if(responseJson == undefined)
  //        {
  //        console.log( "UNDEFINED RESPONSE ??");
  //        }
  //        g_x = responseJson.x;
  //        g_y = responseJson.y;
  //        g_z = responseJson.z;
        
  //        console.log("finished after the rest");
  //      });
  // }

  render() {

    //g_x += 1;
    // g_y += 1;
    // g_z += 1;
    // console.log( g_x );
    //xp = -1;
    //this.x = 0;
    //this.y = 0;
    //this.z = 0;
    // p = fetch('https://privo.serveo.net/stateById/59a20c47ea48642c64d7a425'//, {
    //   //method: 'GET',
    //   // headers: {
    //   //   //'Accept': 'application/json',
    //   // },
    // ).then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //     if(responseJson == undefined)
    //     {
    //       console.log( "UNDEFINED RESPONSE ??");
    //     }
    //     g_x = responseJson.x;
    //     g_y = responseJson.y;
    //     g_z = responseJson.z;
        
    //     console.log("finished after the rest");
    //   });

    //console.log(this.xp);

    //Promise.all([p]).then({});

    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        
        <VrButton
          style={{width: 1.5}}
          onClick={()=>console.log("clicked")}>
          <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -2]}],
          }}>
          hi
        </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
