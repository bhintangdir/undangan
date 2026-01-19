'use client';

import { useRef, useState } from 'react';

interface AudioPlayerProps {
    src: string;
    shouldPlay?: boolean;
}

export default function AudioPlayer({ src, shouldPlay = false }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasAttemptedAutoplay = useRef(false);

    // Effect to handle autoplay trigger
    if (shouldPlay && !isPlaying && !hasAttemptedAutoplay.current && audioRef.current) {
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
                hasAttemptedAutoplay.current = true;
            })
            .catch((e) => {
                console.log("Autoplay blocked:", e);
                // Don't mark as attempted so we might try again or let user click
            });
    }

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
                    bottom: '5.5rem',
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
