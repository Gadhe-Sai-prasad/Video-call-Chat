import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import "../Styles/videoComponent.css"
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";



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

    let [username,setUserName] = useState("");

    const videoRef = useRef([]);

    let [videos,setVideos] = useState([]);

    // if(isChrome() === false) {

    // }


    // let connections = useRef({}); general way for creating connections 
    // connections.current

    const getPermissions = async() => {
       try {
        const videoPermission = await navigator.mediaDevices.getUserMedia({video:true}) // tincton permission 
          if (videoPermission) {
            setVideoAvailable(true);
          }
          else {
             setVideoAvailable(false);
          }

           const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true}) // tincton permission 
          if (audioPermission) {
            setAudioAvailable(true);
          }
          else {
             setAudioAvailable(false);
          }
          if(navigator.mediaDevices.getDisplayMedia) {
            setScreenAvailable(true) 
          }
          else{
            setScreenAvailable(false);
          }

          if(videoAvailable || audioAvailable) {
            const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable});

            if(userMediaStream) {
              window.localStream = userMediaStream;

              if(localVideoRef.current) {
                localVideoRef.current.srcObject =userMediaStream;        }
            }
          }
       } catch (err) {
        console.log(err);

       }  
    }
    useEffect (()=> {
          getPermissions();
    },[])

    let getUserMedia = () => {
      if(video && videoAvailable) 

    }
    useEffect(()=> {
      if(video !== undefined  && audio !== undefined) {
        getUserMedia();
      }
    },[audio,video])

    let getMedia = () => {
      setVideo(videoAvailable);
      setAudio(audioAvailable);
      connectToSocketServer();
    }
  return (
     
    <div>
 
     {askForUserName === true ? 
     <div>
          <h2>Enter into Lobby </h2>
          <TextField id="outlined-basic" label="username" value ={username} onChange={e => setUserName(e.target.value)} variant="outlined" />
            <Button variant="contained">Connect</Button>
          <div>
            <video  ref = {localVideoRef} autoPlay muted></video>
          </div>
        </div> : <></>
     }
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

 
