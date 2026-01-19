'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const galleryImages = [
    '/assets/images/galeri-1.jpg',
    '/assets/images/galeri-2.jpg',
    '/assets/images/galeri-3.jpg',
    '/assets/images/galeri-4.JPEG',
    '/assets/images/galeri-5.JPG',
    '/assets/images/galeri-6.JPG',
    '/assets/images/galeri-7.jpg',
    '/assets/images/galeri-8.jpg',
];

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const openModal = (img: string) => {
        setSelectedImage(img);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <section className="pb-5 pt-3 bg-white-black" id="gallery">
            <div className="container">
                <div className="border rounded-5 shadow p-3">
                    <h2 className="font-esthetic text-center py-2 m-0 text-theme-auto" style={{ fontSize: '2.25rem' }}>
                        Galeri
                    </h2>

                    {/* Main Carousel - Portrait Oriented */}
                    <div
                        className={`mt-4 position-relative ${isAnimated ? 'aos-animate' : ''}`}
                        data-aos="fade-up"
                        style={{ borderRadius: '1rem', overflow: 'hidden' }}
                    >
                        {/* Indicators */}
                        <div className="d-flex justify-content-center gap-1 mb-2 flex-wrap">
                            {galleryImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className="rounded-circle border-0"
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: activeIndex === idx ? '#0d6efd' : '#6c757d',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onClick={() => setActiveIndex(idx)}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Image Container - Portrait aspect ratio */}
                        <div className="position-relative mx-auto" style={{ height: '400px', maxWidth: '300px' }}>
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="position-absolute w-100 h-100"
                                    style={{
                                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                                        opacity: activeIndex === idx ? 1 : 0,
                                        transform: activeIndex === idx ? 'scale(1)' : 'scale(0.95)'
                                    }}
                                >
                                    <Image
                                        src={img}
                                        alt={`Gallery image ${idx + 1}`}
                                        fill
                                        className="rounded-4 cursor-pointer shadow"
                                        style={{ objectFit: 'cover' }}
                                        onClick={() => openModal(img)}
                                    />
                                </div>
                            ))}

                            {/* Navigation Arrows */}
                            <button
                                className="position-absolute start-0 top-50 translate-middle-y btn btn-dark btn-sm opacity-75 rounded-circle d-flex justify-content-center align-items-center"
                                onClick={handlePrev}
                                style={{ width: '36px', height: '36px', marginLeft: '-50px' }}
                            >
                                <i className="fa-solid fa-chevron-left" />
                            </button>
                            <button
                                className="position-absolute end-0 top-50 translate-middle-y btn btn-dark btn-sm opacity-75 rounded-circle d-flex justify-content-center align-items-center"
                                onClick={handleNext}
                                style={{ width: '36px', height: '36px', marginRight: '-50px' }}
                            >
                                <i className="fa-solid fa-chevron-right" />
                            </button>
                        </div>

                        {/* Image Counter */}
                        <p className="text-center text-secondary mt-3 mb-0" style={{ fontSize: '0.85rem' }}>
                            {activeIndex + 1} / {galleryImages.length}
                        </p>
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="row g-2 mt-3 px-2">
                        {galleryImages.map((img, idx) => (
                            <div key={idx} className="col-3">
                                <div
                                    className="position-relative rounded-3 overflow-hidden cursor-pointer"
                                    style={{
                                        aspectRatio: '1',
                                        border: activeIndex === idx ? '2px solid #0d6efd' : '2px solid transparent',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="rounded-2"
                                        style={{ objectFit: 'cover', opacity: activeIndex === idx ? 1 : 0.6 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999 }}
                    onClick={closeModal}
                >
                    <div className="position-relative" style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
                        <Image
                            src={selectedImage}
                            alt="Full size image"
                            width={600}
                            height={800}
                            className="rounded-4"
                            style={{ objectFit: 'contain', maxHeight: '90vh', width: 'auto' }}
                        />
                        <button
                            className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                            onClick={closeModal}
                            style={{ width: '40px', height: '40px' }}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
