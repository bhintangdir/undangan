'use client';

import { useState } from 'react';

interface LoveStoryProps {
    stories: {
        title: string;
        content: string;
        emoji: string;
    }[];
}

export default function LoveStory({ stories }: LoveStoryProps) {
    const [isVisible, setIsVisible] = useState(false);

    const handleShowStory = () => {
        setIsVisible(true);
    };

    return (
        <section className="pt-2 pb-4 bg-light-dark">
            <div className="container">
                <div className="rounded-5 shadow p-3 bg-theme-auto">
                    <h2 className="font-esthetic text-center py-2 mb-2 text-theme-auto" style={{ fontSize: '2.125rem' }}>
                        Kisah Cinta
                    </h2>

                    <div className="position-relative">
                        {!isVisible && (
                            <div
                                className="position-absolute d-flex justify-content-center align-items-center top-50 start-50 translate-middle w-100 h-100 z-3"
                                style={{ opacity: 1 }}
                            >
                                <button
                                    className="btn btn-outline-auto btn-sm rounded-4 shadow-sm"
                                    onClick={handleShowStory}
                                >
                                    <i className="fa-solid fa-heart fa-bounce me-2" />
                                    Lihat Story
                                </button>
                            </div>
                        )}

                        <div
                            className="overflow-y-scroll overflow-x-hidden p-2 with-scrollbar"
                            style={{ height: '15rem', filter: isVisible ? 'none' : 'blur(5px)' }}
                        >
                            {stories.map((story, index) => (
                                <div className="row" key={index}>
                                    <div className="col-auto position-relative">
                                        <p
                                            className="position-relative d-flex justify-content-center align-items-center border border-secondary border-2 opacity-100 rounded-circle m-0 p-0 z-1 bg-theme-auto text-theme-auto"
                                            style={{ width: '2rem', height: '2rem' }}
                                        >
                                            {index + 1}
                                        </p>
                                        {index < stories.length - 1 && (
                                            <hr className="position-absolute top-0 start-50 translate-middle-x border border-secondary h-100 z-0 opacity-100 m-0 rounded-4 shadow-none" />
                                        )}
                                    </div>
                                    <div className="col mt-1 mb-3 ps-0">
                                        <p className="fw-bold mb-2 text-theme-auto">{story.emoji} {story.title}</p>
                                        <p className="small mb-0 text-theme-auto">{story.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
