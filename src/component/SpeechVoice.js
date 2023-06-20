import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const SpeechVoice = () => {
    const [keyword, setKeyword] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const navigate = useNavigate();

    const startLinstening = () => SpeechRecognition.startListening({continuous: true, language: 'vi-VN'})
    const stopListening = () => SpeechRecognition.stopListening()
    const {transcript, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition()
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
// Phương thức đợi 2 giây
    const wait = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 2000); // Đợi 10 giây (10000 milliseconds)
        });
    };
    const setStateAsync = (state) => {
        return new Promise(resolve => {
            setIsStarted(state) // Truyền callback vào setState
        });
    };

    //Dùng useNavigate routing
    const handleRedirect = () => {
        let url = document.getElementById('search-voice').value
        if (url != "") {
            navigate(`/Search/${url}`);
        }

    };
    const handleStart = async () => {
        /*startVoice()
        //set lại trang thái hidden của input search
        await setStateAsync(true)
        //Thời gian nói
        wait().then(() => {

        //Dừng
            handleStop()
            //set lại trang thái hidden của input search
            setStateAsync(false)
        })*/
        startVoice()

        try {
            await wait();
            document.getElementById("search-voice-stop").click();

        } catch (error) {
            console.error(error);
        }
    };

    const handleStop = () => {
        stopVoice()

    };


    const startVoice = () => {
        resetTranscript()
        startLinstening()
        setIsStarted(true);
        console.log("setHide-start---" + isStarted)
        setHidden()


        console.log("Voice search----------")
    }
    const stopVoice = () => {

        stopListening()
        searchVoice()
        setIsStarted(false)
        console.log("setHide stop----" + isStarted)
        setHidden()
        let value = document.getElementById("search-voice").value
        console.log("Voice stop----------" + value)
    }

    function searchVoice() {
        handleRedirect()
    }

    function setHidden() {
        console.log("setHide----" + isStarted)
        if (!isStarted) document.querySelector('.logo-header .search').style = "display: none";
        if (isStarted) document.querySelector('.logo-header .search').style = "display: inherit";
    }

    return (
        <div className={"search-voice"}>
            {isStarted &&
                <div>
                    <input id={"search-voice"} value={transcript} onChange={(e) => setKeyword(e.target.value)}
                           type={"text"}
                           className={"form-control txt-search"}/>
                </div>
            }
            {isStarted ? (
                <button id={"search-voice-stop"} onClick={handleStop}><i className={"fas fa-stop"}></i></button>
            ) : (
                <button onClick={handleStart}><i className={"fa fa-microphone"}></i></button>
            )}

        </div>
    );
}