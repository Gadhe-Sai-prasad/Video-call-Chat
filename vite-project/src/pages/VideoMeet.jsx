import React, { useState } from 'react'
import { useRef } from 'react';

const server_url ="http://local:3000";

var connections = {}; 
const peerConfigConnections = {
    "iceServers": [
        {"urls":"stun:stun.l.google.com:19302"}
    ]
}


export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef=useRef();

    let [videoAvailable,setVideoAvailable]= useState(true);

    let [audioAvailable,setAudioAvailable] = useState(true);

    let [video,setVideo] = useState();

    let [audio,setAudio] = useState();

    let [screen,setScreen] = useState();

    let  [showModal,setModal] = useState();

    let [screenAvailable,setScreenAvailable] = useState();

    let [messages,setMessages] = useState([])

    let [message,setMessage] = useState("");

    let [newMessages,setNewMessages] = useState(0);

    let [askForUserName, setAskForUserName] = useState(true);

    let [username,serUserName] = useState("");

    const videoRef = useRef([]);

    let [videos,setVideos] = useState([]);

    // if(isChrome() === false) {

    // }







    // let connections = useRef({}); general way for creating connections 
    // connections.current
  return (
    <div>
        videomeet
    </div>
    // <div>

    //     videomeet
    //  {askForUserName === true ? 
    //  <div>

    //     </div> : <></>
    //  }
    // </div>
  )
}

 
