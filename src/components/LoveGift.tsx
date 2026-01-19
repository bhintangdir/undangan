'use client';

import { useState } from 'react';

interface LoveGiftProps {
    transferName: string;
    bankName: string;
    accountNumber: string;
    qrisName: string;
    giftName: string;
    giftPhone: string;
    giftAddress: string;
}

export default function LoveGift({
    transferName,
    bankName,
    accountNumber,
    qrisName,
    giftName,
    giftPhone,
    giftAddress,
}: LoveGiftProps) {
    const [showTransfer, setShowTransfer] = useState(false);
    const [showQris, setShowQris] = useState(false);
    const [showGift, setShowGift] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Berhasil disalin!');
    };

    return (
        <section className="pb-3 bg-light-dark">
            <div className="container text-center">
                <h2 className="font-esthetic pt-3 mb-4 text-theme-auto" style={{ fontSize: '2.25rem' }}>
                    Love Gift
                </h2>
                <p className="mb-1 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                    Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada kami, dapat melalui:
                </p>

                {/* Transfer */}
                <div className="rounded-4 shadow p-3 mx-4 mt-4 text-start bg-theme-auto">
                    <i className="fa-solid fa-money-bill-transfer text-theme-auto" />
                    <p className="d-inline ms-2 text-theme-auto">Transfer</p>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <p className="m-0 p-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                            <i className="fa-regular fa-user fa-sm me-1" />
                            {transferName}
                        </p>
                        <button
                            className="btn btn-outline-auto btn-sm shadow-sm rounded-4 py-0"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setShowTransfer(!showTransfer)}
                        >
                            <i className="fa-solid fa-circle-info fa-sm me-1" />
                            Info
                        </button>
                    </div>

                    {showTransfer && (
                        <div className="mt-2">
                            <hr className="my-2 py-1" />
                            <p className="m-0 text-theme-auto" style={{ fontSize: '0.9rem' }}>
                                <i className="fa-solid fa-building-columns me-1" />
                                {bankName}
                            </p>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <p className="m-0 p-0 text-theme-auto" style={{ fontSize: '0.85rem' }}>
                                    <i className="fa-solid fa-credit-card me-1" />
                                    {accountNumber}
                                </p>
                                <button
                                    className="btn btn-outline-auto btn-sm shadow-sm rounded-4 py-0"
                                    style={{ fontSize: '0.75rem' }}
                                    onClick={() => copyToClipboard(accountNumber)}
                                >
                                    <i className="fa-solid fa-copy" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* QRIS */}
                <div className="rounded-4 shadow p-3 mx-4 mt-4 text-start bg-theme-auto">
                    <i className="fa-solid fa-qrcode fa-lg text-theme-auto" />
                    <p className="d-inline ms-2 text-theme-auto">Qris</p>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <p className="m-0 p-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                            <i className="fa-regular fa-user fa-sm me-1" />
                            {qrisName}
                        </p>
                        <button
                            className="btn btn-outline-auto btn-sm shadow-sm rounded-4 py-0"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setShowQris(!showQris)}
                        >
                            <i className="fa-solid fa-circle-info fa-sm me-1" />
                            Info
                        </button>
                    </div>

                    {showQris && (
                        <div className="mt-2">
                            <hr className="my-2 py-1" />
                            <div className="d-flex justify-content-center align-items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/assets/images/donate.png"
                                    alt="QRIS"
                                    className="img-fluid rounded-3 mx-auto bg-white"
                                    style={{ maxWidth: '200px' }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Gift */}
                <div className="rounded-4 shadow p-3 mx-4 mt-4 text-start bg-theme-auto">
                    <i className="fa-solid fa-gift fa-lg text-theme-auto" />
                    <p className="d-inline ms-2 text-theme-auto">Gift</p>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <p className="m-0 p-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                            <i className="fa-regular fa-user fa-sm me-1" />
                            {giftName}
                        </p>
                        <button
                            className="btn btn-outline-auto btn-sm shadow-sm rounded-4 py-0"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setShowGift(!showGift)}
                        >
                            <i className="fa-solid fa-circle-info fa-sm me-1" />
                            Info
                        </button>
                    </div>

                    {showGift && (
                        <div className="mt-2">
                            <hr className="my-2 py-1" />
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <p className="m-0 p-0 text-theme-auto" style={{ fontSize: '0.85rem' }}>
                                    <i className="fa-solid fa-phone-volume me-1" />
                                    {giftPhone}
                                </p>
                                <button
                                    className="btn btn-outline-auto btn-sm shadow-sm rounded-4 py-0"
                                    style={{ fontSize: '0.75rem' }}
                                    onClick={() => copyToClipboard(giftPhone)}
                                >
                                    <i className="fa-solid fa-copy" />
                                </button>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="my-0 p-0 text-truncate me-2 text-theme-auto" style={{ fontSize: '0.85rem' }}>
                                    <i className="fa-solid fa-location-dot me-1" />
                                    {giftAddress}
                                </p>
                                <button
                                    className="btn btn-outline-auto btn-sm shadow-sm rounded-4 py-0"
                                    style={{ fontSize: '0.75rem' }}
                                    onClick={() => copyToClipboard(giftAddress)}
                                >
                                    <i className="fa-solid fa-copy" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
