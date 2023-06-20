import React, { useState, useEffect } from 'react';
//import axios from 'axios';
export  const NewSpeak =()=>{
    const handleNewSpeak=()=>{

        let text = "Tôi tên là Trang"
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN'; // Đặt ngôn ngữ là tiếng Việt
        window.speechSynthesis.speak(utterance);
    }

    return(
        <>
<button onClick={handleNewSpeak}>Speak</button>
        </>
    )
}


export const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        // Lấy danh sách các giọng đọc hiện có
        const getVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            // Lọc danh sách giọng đọc tiếng Việt
            const vietnameseVoices = allVoices.filter((voice) =>
                voice.lang.includes('vi-VN'),
            );
            setVoices(vietnameseVoices);
        };

        if ('speechSynthesis' in window) {
            // Khi danh sách giọng đọc có sẵn thay đổi
            window.speechSynthesis.onvoiceschanged = getVoices;
        }
    }, []);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            /*let text = "Tôi tên là Logan"*/
            const utterance = new SpeechSynthesisUtterance(text);
            // Chọn giọng đọc đầu tiên trong danh sách giọng đọc tiếng Việt
            utterance.voice = voices[0];
            window.speechSynthesis.speak(utterance);
        } else {
            console.log('Text-to-speech not supported');
        }
    };

    return (
        <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button onClick={handleSpeak}>Speak</button>
        </div>
    );
};


export const VoiceRSS = (props) =>{
    const apiKey = '7c6a7e181116466ba4e27aa84f81d607';
    const apiUrl = `http://api.voicerss.org/?key=${apiKey}&hl=vi-vn&src=${props.text}`;
    const audioRef = React.useRef(null);
// Hàm gửi yêu cầu chuyển đổi văn bản thành giọng nói
     const convertTextToSpeech=()=> {
         audioRef.current.src = apiUrl;
         audioRef.current.play();
    }
return(
    <div>

        <button className={"btn btn-audio"} onClick={convertTextToSpeech}>Đọc</button>
        <audio className={"audio-rss"} ref={audioRef} controls />;
    </div>
)
}




