import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export const SpeechVoice = () => {
    const [active, setActive] = useState(-1);
    console.log(active);
    const [isStarted, setIsStarted] = useState(false);
    const navigate = useNavigate();

    const startLinstening = () => SpeechRecognition.startListening({continuous: true, language: 'vi-VN'})
    const stopListening = () => SpeechRecognition.stopListening()
    const {transcript, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition({})
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    //Dùng useNavigate routing
    const handleRedirect = () => {
        let keyword = document.getElementById("search-voice").value
        if (keyword != "") {
            navigate(`/Search/${keyword}`);
        }

    };
    const handleStart = () => {
        startVoice()
        setIsStarted(true);

    };

    const handleStop = () => {
        stopVoice()
        setIsStarted(false);

    };


    const startVoice = () => {
        resetTranscript()
        startLinstening()
        setHidden()

        console.log("Voice search----------")
    }
    const stopVoice = () => {

        stopListening()
        searchVoice()
        setHidden()
        let value = document.getElementById("search-voice").value
        console.log("Voice stop----------" + value)
    }

    function searchVoice() {
        handleRedirect()
    }
    function setHidden(){
        if(!isStarted) document.querySelector('.logo-header .search').style ="display: none";
        else document.querySelector('.logo-header .search').style ="display: inherit";
    }

    return (
        <div className={"search-voice"}>
            {isStarted &&
                <div>
                    <input id={"search-voice"} defaultValue={transcript} type={"text"}
                           className={"form-control txt-search"}/>
                </div>
            }
            {isStarted ? (
                <button onClick={handleStop}><i className={"fas fa-stop"}></i></button>
            ) : (
                <button onClick={handleStart}><i className={"fa fa-microphone"}></i></button>
            )}

        </div>
    );
}