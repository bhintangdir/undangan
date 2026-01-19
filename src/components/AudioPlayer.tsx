'use client';

import { useRef, useState } from 'react';

interface AudioPlayerProps {
    src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={src} loop preload="auto" />
            <button
                onClick={togglePlay}
                className="btn btn-transparent btn-sm rounded-circle shadow position-fixed d-flex justify-content-center align-items-center"
                style={{
                    width: '3rem',
                    height: '3rem',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 1050,
                }}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                <i className={`fa-solid ${isPlaying ? 'fa-pause spin-button' : 'fa-play'}`} />
            </button>
        </>
    );
}
