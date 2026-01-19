'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Countdown from '@/components/Countdown';
import Gallery from '@/components/Gallery';


import AudioPlayer from '@/components/AudioPlayer';
import WaveSeparator from '@/components/WaveSeparator';
import LoveAnimation from '@/components/LoveAnimation';
import BottomNav from '@/components/BottomNav';

// Wedding configuration
const weddingConfig = {
  groomName: 'Deky Suparman',
  brideName: 'Nia Setiawati',
  groomShortName: 'Deky',
  brideShortName: 'Nia',
  groomParents: {
    father: 'Bapak Alm. Abdurrahman Hamid',
    mother: 'Ibu Hj. Fatimah',
    childOrder: 'Putra ke-5',
  },
  brideParents: {
    father: 'Bapak Sapri',
    mother: 'Ibu Asiyah',
    childOrder: 'Putri ke-1',
  },
  events: {
    begawe: {
      name: 'Begawe Beleq Besile',
      date: 'Sabtu, 24 Januari 2026',
      time: 'Pukul 10.00 WITA - Selesai',
    },
    nyongkolan: {
      name: 'Nyongkolan',
      date: 'Minggu, 25 Januari 2026',
      time: 'Pukul 16.00 WITA - Selesai',
    },
  },
  countdownDate: '2026-01-24 10:00:00',
  mapsUrl: 'https://google.com/maps?q=-8.766398429870605,116.23773956298828&z=17&hl=en',
  address: 'Dusun Masjuring, Desa Bonder, Kec. Praya Barat, Kab. Lombok Tengah, Nusa Tenggara Barat 83572 ',
  music: '/assets/music/SampaiJadiDebu-BandaNeira.mp3',
};



function MainInvitation() {
  const searchParams = useSearchParams();
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);

  // Convert to Sentence Case (e.g., "nama_undangan" -> "Nama Undangan")
  const toSentenceCase = (str: string): string => {
    return str
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    const untuk = searchParams.get('untuk');
    if (untuk) {
      setGuestName(toSentenceCase(untuk));
    }
  }, [searchParams]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isWelcomeVisible) {
      // Trigger animations after welcome screen is dismissed
      setTimeout(() => setIsAnimated(true), 100);
    }
  }, [isWelcomeVisible]);

  const handleOpenInvitation = () => {
    setIsWelcomeVisible(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleGoogleCalendar = () => {
    const formatDate = (d: string) =>
      new Date(d.replace(' ', 'T') + ':00Z').toISOString().replace(/[-:]/g, '').split('.').shift();

    const url = new URL('https://calendar.google.com/calendar/render');
    const data = new URLSearchParams({
      action: 'TEMPLATE',
      text: `The Wedding of ${weddingConfig.groomShortName} and ${weddingConfig.brideShortName}`,
      dates: `${formatDate('2026-01-24 10:00')}/${formatDate('2026-01-24 11:00')}`,
      details:
        'Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami. Terima kasih atas perhatian dan doa restu Anda.',
      location: weddingConfig.address,
      ctz: 'Asia/Makassar',
    });
    url.search = data.toString();
    window.open(url.toString(), '_blank');
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="loading-page d-flex flex-column justify-content-center align-items-center bg-white-black">
        <div className="width-loading d-flex flex-column align-items-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <small className="text-theme-auto">Loading...</small>
        </div>
      </div>
    );
  }

  // Welcome screen
  if (isWelcomeVisible) {
    return (
      <div className="loading-page d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
        {/* Background Image with Overlay */}
        <Image
          src="/assets/images/bg.JPG"
          alt="background"
          fill
          className="position-absolute"
          style={{ objectFit: 'cover', opacity: 0.15 }}
          priority
        />

        {/* Content Container */}
        <div className="d-flex flex-column text-center position-relative z-1 px-4" style={{ maxWidth: '400px' }}>
          {/* Decorative Top Line */}
          <div className="mx-auto mb-3" style={{ width: '60px', height: '2px', backgroundColor: 'rgba(212, 175, 55, 0.6)' }} />

          {/* Title */}
          <p className="mb-2 text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.6)' }}>
            Undangan Pernikahan
          </p>
          <h2 className="font-esthetic mb-4" style={{ fontSize: '2.5rem', color: '#d4af37' }}>
            The Wedding Of
          </h2>

          {/* Couple Photo with Golden Border */}
          <div className="position-relative mx-auto mb-4" style={{ width: '10rem', height: '10rem', padding: '4px', background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)', borderRadius: '50%' }}>
            <div className="position-relative w-100 h-100 rounded-circle overflow-hidden">
              <Image
                src="/assets/images/bg.JPG"
                alt="couple"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Couple Names */}
          <h2 className="font-esthetic mb-1" style={{ fontSize: '2.25rem', color: '#ffffff' }}>
            {weddingConfig.groomShortName}
          </h2>
          <span style={{ fontSize: '1.5rem', color: '#d4af37' }}>&amp;</span>
          <h2 className="font-esthetic mt-1 mb-3" style={{ fontSize: '2.25rem', color: '#ffffff' }}>
            {weddingConfig.brideShortName}
          </h2>

          {/* Decorative Divider */}
          <div className="mx-auto mb-4" style={{ width: '120px', height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.4)' }} />

          {/* Guest Invitation Text */}
          <div className="mb-3">
            <p className="mb-1" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              Kepada Yth Bapak/Ibu/Saudara/i
            </p>
            {guestName && (
              <p className="mb-0 fw-semibold" style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                {guestName}
              </p>
            )}
          </div>

          {/* Open Button */}
          <button
            onClick={handleOpenInvitation}
            className="btn shadow-lg mx-auto px-4 py-2 mt-2"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
              border: 'none',
              borderRadius: '25px',
              color: '#1a1a1a',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            <i className="fa-solid fa-envelope-open fa-bounce me-2" />
            Buka Undangan
          </button>
        </div>

        {/* Footer Credit */}
        <div className="text-center position-absolute w-100" style={{ bottom: '5%', left: 0 }}>
          <div className="d-flex flex-column">
            <small style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>Created by</small>
            <small style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
              <i className="fa-brands fa-instagram me-1" />
              @bhintangdir
            </small>
          </div>
        </div>

        <AudioPlayer src={weddingConfig.music} />
      </div>
    );
  }

  return (
    <>
      {/* Side Background Images for Desktop */}
      <div className="d-none d-md-block position-fixed start-0 top-0 h-100" style={{ width: 'calc((100vw - 480px) / 2)', zIndex: -1 }}>
        <Image
          src="/assets/images/galeri-2.jpg"
          alt="bg-left"
          fill
          style={{ objectFit: 'cover', opacity: 0.25 }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} />
      </div>
      <div className="d-none d-md-block position-fixed end-0 top-0 h-100" style={{ width: 'calc((100vw - 480px) / 2)', zIndex: -1 }}>
        <Image
          src="/assets/images/galeri-1.jpg"
          alt="bg-right"
          fill
          style={{ objectFit: 'cover', opacity: 0.25 }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} />
      </div>

      <div className="invitation-wrapper">
        {/* Audio Player */}
        <AudioPlayer src={weddingConfig.music} />

        {/* Home Section */}
        <section id="home" className="bg-light-dark position-relative overflow-hidden p-0 m-0" style={{ minHeight: '100vh' }}>
          <Image
            src="/assets/images/bg.JPG"
            alt="bg"
            fill
            className="position-absolute bg-cover-home"
            style={{ objectFit: 'cover', opacity: 0.25 }}
            priority
          />

          <div className="position-relative text-center" style={{ backgroundColor: 'transparent', paddingTop: '3rem' }}>
            <h1 className="font-esthetic pt-5 pb-4 fw-medium text-theme-auto" style={{ fontSize: '2.25rem' }}>
              Undangan Pernikahan
            </h1>

            <div className="position-relative mx-auto my-4" style={{ width: '13rem', height: '13rem' }}>
              <Image
                src="/assets/images/bg.JPG"
                alt="bg"
                fill
                className="rounded-circle border border-3 border-light shadow cursor-pointer"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <h2 className="font-esthetic my-4 text-theme-auto" style={{ fontSize: '2.25rem' }}>
              {weddingConfig.groomShortName} &amp; {weddingConfig.brideShortName}
            </h2>
            <p className="my-2 text-theme-auto" style={{ fontSize: '1.25rem' }}>
              {weddingConfig.events.begawe.name} {weddingConfig.events.begawe.date}
              <br />
              {weddingConfig.events.nyongkolan.name} {weddingConfig.events.nyongkolan.date}
            </p>

            <button
              onClick={handleGoogleCalendar}
              className="btn btn-outline-auto btn-sm shadow rounded-pill px-3 py-1"
              style={{ fontSize: '0.825rem' }}
            >
              <i className="fa-solid fa-calendar-check me-2" />
              Save Google Calendar
            </button>

            <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
              <div className="mouse-animation border border-secondary border-2 rounded-5 px-2 py-1 opacity-50">
                <div className="scroll-animation rounded-4 bg-secondary" />
              </div>
            </div>

            <p className="pb-4 m-0 text-secondary" style={{ fontSize: '0.825rem' }}>
              Scroll Down
            </p>
          </div>
        </section>

        <WaveSeparator direction="down" fillColor="#000000" containerColor="#212529" />

        {/* Bride Section */}
        <section className="text-center py-4 bg-white-black" id="bride">
          <h2 className="font-arabic py-4 m-0 text-theme-auto" style={{ fontSize: '2rem' }}>
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
          <h2 className="font-esthetic py-4 m-0 text-theme-auto" style={{ fontSize: '2rem' }}>
            Assalamualaikum Warahmatullahi Wabarakatuh
          </h2>
          <p className="pb-4 px-2 m-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
            Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan
            kami:
          </p>

          <div className="overflow-x-hidden pb-4">
            {/* Groom */}
            <div className="position-relative">
              <div className="position-absolute" style={{ top: '0%', right: '5%' }}>
                <LoveAnimation />
              </div>

              <div className={`pb-1 ${isAnimated ? 'aos-animate' : ''}`} data-aos="fade-right">
                <div className="position-relative mx-auto my-4" style={{ width: '13rem', height: '13rem' }}>
                  <Image
                    src="/assets/images/cowo.jpg"
                    alt="groom"
                    fill
                    className="rounded-circle border border-3 border-light shadow cursor-pointer"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h2 className="font-esthetic m-0 text-theme-auto" style={{ fontSize: '2.125rem' }}>
                  {weddingConfig.groomName}
                </h2>
                <p className="mt-3 mb-1 text-theme-auto" style={{ fontSize: '1.25rem' }}>
                  {weddingConfig.groomParents.childOrder}
                </p>
                <p className="mb-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  {weddingConfig.groomParents.father}
                </p>
                <p className="mb-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  dan
                </p>
                <p className="mb-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  {weddingConfig.groomParents.mother}
                </p>
              </div>
            </div>

            <h2 className="font-esthetic mt-4 text-theme-auto" style={{ fontSize: '4.5rem' }}>
              &amp;
            </h2>

            {/* Bride */}
            <div className="position-relative">
              <div className="position-absolute" style={{ top: '0%', right: '5%' }}>
                <LoveAnimation />
              </div>

              <div className={`pb-1 ${isAnimated ? 'aos-animate' : ''}`} data-aos="fade-left">
                <div className="position-relative mx-auto my-4" style={{ width: '13rem', height: '13rem' }}>
                  <Image
                    src="/assets/images/cewe.jpg"
                    alt="bride"
                    fill
                    className="rounded-circle border border-3 border-light shadow cursor-pointer"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h2 className="font-esthetic m-0 text-theme-auto" style={{ fontSize: '2.125rem' }}>
                  {weddingConfig.brideName}
                </h2>
                <p className="mt-3 mb-1 text-theme-auto" style={{ fontSize: '1.25rem' }}>
                  {weddingConfig.brideParents.childOrder}
                </p>
                <p className="mb-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  {weddingConfig.brideParents.father}
                </p>
                <p className="mb-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  dan
                </p>
                <p className="mb-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  {weddingConfig.brideParents.mother}
                </p>
              </div>
            </div>
          </div>
        </section>

        <WaveSeparator direction="up" fillColor="#000000" containerColor="#212529" />

        {/* Quran Verses */}
        <section className="pt-2 pb-4 bg-light-dark">
          <div className="container text-center">
            <h2 className="font-esthetic pt-2 pb-1 m-0 text-theme-auto" style={{ fontSize: '2rem' }}>
              Allah Subhanahu Wa Ta&apos;ala berfirman
            </h2>

            <div
              className={`mt-4 p-3 shadow rounded-4 bg-theme-auto ${isAnimated ? 'aos-animate' : ''}`}
              data-aos="fade-down"
            >
              <p className="p-1 mb-2 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).
              </p>
              <p className="m-0 p-0 text-secondary" style={{ fontSize: '0.95rem' }}>
                QS. Adh-Dhariyat: 49
              </p>
            </div>

            <div
              className={`mt-4 p-3 shadow rounded-4 bg-theme-auto ${isAnimated ? 'aos-animate' : ''}`}
              data-aos="fade-down"
            >
              <p className="p-1 mb-2 text-theme-auto" style={{ fontSize: '0.95rem' }}>
                dan sesungguhnya Dialah yang menciptakan pasangan laki-laki dan perempuan,
              </p>
              <p className="m-0 p-0 text-secondary" style={{ fontSize: '0.95rem' }}>
                QS. An-Najm: 45
              </p>
            </div>
          </div>
        </section>

        <WaveSeparator direction="down" fillColor="#000000" containerColor="#212529" />

        {/* Wedding Date */}
        <section className="pb-2 bg-white-black" id="wedding-date">
          <div className="container text-center">
            <h2 className="font-esthetic py-4 m-0 text-theme-auto" style={{ fontSize: '2.25rem' }}>
              Moment Bahagia
            </h2>

            <Countdown targetDate={weddingConfig.countdownDate} />

            <p className="py-2 m-0 text-theme-auto" style={{ fontSize: '0.95rem' }}>
              Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, insyaAllah kami akan
              menyelenggarakan acara:
            </p>

            <div className="position-relative">
              <div className="position-absolute" style={{ top: '0%', right: '5%' }}>
                <LoveAnimation />
              </div>
            </div>

            <div className="overflow-x-hidden">
              <div className={`py-2 ${isAnimated ? 'aos-animate' : ''}`} data-aos="fade-right">
                <h2 className="font-esthetic m-0 py-2 text-theme-auto" style={{ fontSize: '2rem' }}>
                  {weddingConfig.events.begawe.name}
                </h2>
                <p className="text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  {weddingConfig.events.begawe.date}
                  <br />
                  {weddingConfig.events.begawe.time}
                </p>
              </div>

              <div className={`py-2 ${isAnimated ? 'aos-animate' : ''}`} data-aos="fade-left">
                <h2 className="font-esthetic m-0 py-2 text-theme-auto" style={{ fontSize: '2rem' }}>
                  {weddingConfig.events.nyongkolan.name}
                </h2>
                <p className="text-theme-auto" style={{ fontSize: '0.95rem' }}>
                  {weddingConfig.events.nyongkolan.date}
                  <br />
                  {weddingConfig.events.nyongkolan.time}
                </p>
              </div>
            </div>

            <div className={`py-2 ${isAnimated ? 'aos-animate' : ''}`} data-aos="fade-down">
              <a
                href={weddingConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-auto btn-sm rounded-pill shadow mb-2 px-3"
              >
                <i className="fa-solid fa-map-location-dot me-2" />
                Lihat Google Maps
              </a>
              <small className="d-block my-1 text-theme-auto">{weddingConfig.address}</small>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <Gallery />

        <WaveSeparator direction="down" fillColor="#000000" containerColor="#000000" />

        {/* End Section */}
        <section className="py-2 bg-white-black">
          <div className="container text-center">
            <p className="pb-2 pt-4 text-theme-auto" style={{ fontSize: '0.95rem' }}>
              Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan
              besar bagi kami.
            </p>

            <h2 className="font-esthetic text-theme-auto" style={{ fontSize: '2rem' }}>
              Wassalamualaikum Warahmatullahi Wabarakatuh
            </h2>
            <h2 className="font-arabic pt-4 text-theme-auto" style={{ fontSize: '2rem' }}>
              اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ
            </h2>

            <hr className="my-4" />

            <div className="d-flex flex-column pb-4">
              <small className="text-secondary">Created by</small>
              <small className="text-theme-auto">
                <i className="fa-brands fa-instagram me-1" />
                @bhintangdir
              </small>
            </div>

            <small className="d-block pb-3 text-secondary">
              <i className="fa-solid fa-music me-1" />
              Sampai Jadi Debu - Banda Neira
            </small>
          </div>
        </section>

        {/* Bottom Navigation */}
        <BottomNav visible={true} />

        {/* Spacer for bottom nav */}
        <div style={{ height: '60px' }} />
      </div>
    </>
  );
}


export default function Home() {
  return (
    <Suspense fallback={
      <div className="loading-page d-flex flex-column justify-content-center align-items-center bg-white-black">
        <div className="width-loading d-flex flex-column align-items-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <small className="text-theme-auto">Loading...</small>
        </div>
      </div>
    }>
      <MainInvitation />
    </Suspense>
  );
}
