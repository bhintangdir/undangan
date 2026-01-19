'use client';

import { useState, useEffect, useCallback } from 'react';

interface CountdownProps {
    targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    const pad = useCallback((num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    }, []);

    useEffect(() => {
        const count = new Date(targetDate.replace(' ', 'T')).getTime();

        const updateCountdown = () => {
            const distance = Math.abs(count - Date.now());

            setTimeLeft({
                days: pad(Math.floor(distance / (1000 * 60 * 60 * 24))),
                hours: pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                minutes: pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
                seconds: pad(Math.floor((distance % (1000 * 60)) / 1000)),
            });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [targetDate, pad]);

    return (
        <div className="border rounded-pill shadow py-2 px-4 mt-2 mb-4" style={{ display: 'inline-block' }}>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
                <div className="text-center p-1">
                    <p className="d-inline m-0 p-0 fw-bold text-theme-auto" style={{ fontSize: '1.25rem' }}>{timeLeft.days}</p>
                    <small className="ms-1 me-0 my-0 p-0 d-inline text-secondary">Hari</small>
                </div>
                <div className="text-center p-1">
                    <p className="d-inline m-0 p-0 fw-bold text-theme-auto" style={{ fontSize: '1.25rem' }}>{timeLeft.hours}</p>
                    <small className="ms-1 me-0 my-0 p-0 d-inline text-secondary">Jam</small>
                </div>
                <div className="text-center p-1">
                    <p className="d-inline m-0 p-0 fw-bold text-theme-auto" style={{ fontSize: '1.25rem' }}>{timeLeft.minutes}</p>
                    <small className="ms-1 me-0 my-0 p-0 d-inline text-secondary">Menit</small>
                </div>
                <div className="text-center p-1">
                    <p className="d-inline m-0 p-0 fw-bold text-theme-auto" style={{ fontSize: '1.25rem' }}>{timeLeft.seconds}</p>
                    <small className="ms-1 me-0 my-0 p-0 d-inline text-secondary">Detik</small>
                </div>
            </div>
        </div>
    );
}
