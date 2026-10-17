"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function SweetInvite() {
  const [hasEntered, setHasEntered] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rainIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ==========================================
  // EFEK HUJAN PITA PINK TANPA HENTI (INFINITE)
  // ==========================================
  const startInfinitePinkRain = () => {
    // Bersihkan interval sebelumnya jika ada
    if (rainIntervalRef.current) clearInterval(rainIntervalRef.current);

    // Kirim pita pink secara berkala setiap 150ms agar terus melayang halus
    rainIntervalRef.current = setInterval(() => {
      confetti({
        particleCount: 2, // 2-3 partikel per semprotan agar tetap ringan dan tidak lag
        angle: 90, // Jatuh tegak lurus dari atas
        spread: 120,
        origin: { x: Math.random(), y: -0.1 }, // Muncul acak dari atas luar layar
        colors: ['#FF69B4', '#FFB6C1', '#F06292', '#FF8A80', '#FFF9C4', '#E1BEE7'],
        startVelocity: 12,
        gravity: 0.6,
        scalar: 1.2, // Ukuran pita sedikit lebih besar
        drift: Math.random() - 0.5, // Efek melayang tertiup angin
      });
    }, 150);
  };

  // Clean-up saat komponen di-unmount agar tidak ada memori bocor
  useEffect(() => {
    return () => {
      if (rainIntervalRef.current) clearInterval(rainIntervalRef.current);
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    
    // Mulai hujan pita tanpa henti
    startInfinitePinkRain();

    if (audioRef.current) {
      audioRef.current.currentTime = 160; 
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const kaburDong = () => {
    setNoPosition({
      x: Math.random() * 250 - 125, 
      y: Math.random() * 150 - 75, 
    });
  };

  // ==========================================
  // FUNGSI HANDLE SAAT DIA KLIK "AYO GAS!!"
  // ==========================================
  const handleAccept = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAccepted(true);

    // EFEK KEMBANG API PASTEL DARI KIRI & KANAN
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      const sweetColors = ['#F06292', '#FF8A80', '#FFCDD2', '#FFF9C4', '#B39DDB']; 
      
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: sweetColors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: sweetColors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // NOTIFIKASI RAHASIA KE TELEGRAM
    const telegramToken = "ISI_TOKEN_BOT_DISINI"; 
    const chatId = "ISI_CHAT_ID_DISINI";
    const textMsg = "🚨 ALARM! Indri udah ngeklik 'AYO GAS!!'. Gas mandi dan siap-siap bro!";
    
    try {
      if (telegramToken !== "ISI_TOKEN_BOT_DISINI") {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(textMsg)}`);
      }
    } catch (error) {
      console.log("Notif gagal", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-800 p-4 overflow-hidden relative font-sans">
      
      {/* 1. Wallpaper Background Cerah - Pola Hati Lembut */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/heart-pattern.png')] bg-repeat opacity-10"></div>

      {/* 2. Overlay Gradient Putih-Pink Lembut */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/95 via-pink-100/80 to-white/95"></div>

      <audio ref={audioRef} src="/lagu.mp3" loop />

      <AnimatePresence>
        {!hasEntered ? (
          // ==============================
          // 1. LAYAR PEMBUKA (SWEET SPLASH SCREEN)
          // ==============================
          <motion.div 
            key="welcome-screen"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_10px_40px_rgba(240,98,146,0.15)] border border-pink-100 flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200"></div>

              <h1 className="text-2xl tracking-[0.1em] font-extrabold mb-8 text-center text-pink-700 uppercase drop-shadow-sm">
                 Your lovely dick man 😎
              </h1>
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-10 py-5 bg-pink-400 text-white tracking-widest font-bold uppercase rounded-xl shadow-md hover:bg-pink-500 transition-all font-sans"
              >
               Click Here..
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // ==============================
          // 2. KONTEN UNDANGAN UTAMA (SWEET VIBES)
          // ==============================
          <motion.div 
            key="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="z-10 flex flex-col items-center justify-center w-full max-w-lg"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_rgba(240,98,146,0.1)] border border-pink-100 p-8 sm:p-12 w-full relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl translate-x-10 translate-y-10"></div>

              {accepted ? (
                // TAMPILAN SETELAH "AYO GAS!!" DIKLIK
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full py-10 relative z-10"
                >
                  <motion.h1 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl font-extrabold mb-4 tracking-tight text-pink-700 drop-shadow-sm"
                  >
                    PERMINTAAN MAAF ACCEPTED! ✨
                  </motion.h1>
                  <p className="text-lg text-gray-700 font-medium font-sans mb-10 leading-relaxed px-2">
                    MAKACI SAYANG!! 
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05, translateY: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const noWA = "628889399990"; 
                      const pesanWA =" ";
                      window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(pesanWA)}`, "_blank");
                    }}
                    className="px-10 py-4 bg-pink-500 text-white tracking-widest font-extrabold uppercase rounded-full shadow-lg hover:bg-pink-600 transition-all font-sans"
                  >
                    NEXT {">"} {">"}
                  </motion.button>
                </motion.div>
              ) : (
                // TAMPILAN AWAL UNDANGAN
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* FRAME FOTO INDRI YANG MUTER */}
                  <motion.div 
                    animate={{ rotate: isPlaying ? 360 : 0 }} 
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="w-48 h-48 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(240,98,146,0.2)] mb-8 border-4 border-white ring-4 ring-pink-200/60 relative overflow-hidden"
                  >
                    <img 
                      src="fotoprofil.jpeg" 
                      alt="jea" 
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>

                  {/* Teks Undangan */}
                  <div className="text-center mb-10">
                    <h2 className="text-sm font-bold mb-3 tracking-[0.2em] font-sans text-pink-600 drop-shadow-sm uppercase">
                      ♫ Will You Still Love Me Tomorrow ♫
                    </h2>
                    <h1 className="text-3xl font-extrabold text-pink-700 drop-shadow-sm leading-tight">
                      Hallo , JEA! 🎧
                    </h1>
                    <span className="inline-block text-lg font-bold text-pink-500 mb-4 bg-pink-100/70 px-4 py-1 rounded-full mt-2">
                      
                    </span>
                    
                    <p className="text-base text-gray-700 leading-relaxed font-sans px-2 mb-2 font-medium">
                      PERMINTAAN MAAF DARI AKU  <b> UNTUK JEA </b> 
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans px-2">
                      hi. how’s u feeling today? i hope u feel okay, even if deep down u don’t. btw, i know lately i’ve been acting like a dick towards u, and honestly, i got no excuse for that. ngl, i’ve just been so stressed lately, and i know i’ve been toxic asf. no cap, i hate that i’ve been making things harder for us when all i really want is for us to be okay.
i know saying sorry won’t magically fix everything, and i’m not expecting u to just forget all the shit that happened. but fr, i miss us. i miss the way we used to talk, laugh over the dumbest shit, and just be there for each other without all this tension between us.
sometimes i let my own problems get the best of me, and end up taking it out on the person who means the most to me. and that’s not fair to u, at all. u don’t deserve to catch strays from my bad days, especially when all u ever wanted was to feel loved and understood by me.
i’m not tryna play the victim or make u feel bad for me. i just wanna be real with u for once. i know i fucked up, and if i could take back the moments where i hurt u, i honestly would. i can’t change what’s already happened, but i can try to do better instead of keep giving u the same apologies over and over again.
and listen, i’m not saying all this just because i’m scared of losing u. i’m saying this because, despite all the bullshit lately, i still choose u. i still want u. i still wanna make this work with u, even when things get messy and life gets overwhelming.
i don’t want us to keep acting like strangers when we mean so much to each other. i don’t want my ego, my stress, or my stupid ass attitude to get in the way of something i genuinely care about. we might not be okay rn, but i don’t wanna give up on us just because things have been rough.
i’m not asking u to be okay with me overnight, and i’m not gonna force u to act like nothing happened. take ur time if u need to. i just hope there’s still a little space in ur heart for us to figure this shit out together.
i miss u, and i miss us more than i can put into words. i know i can’t promise i’ll never mess up again, but i can promise that i wanna learn, grow, and stop letting my own shit ruin what we have.
so yeah, if ur still willing, can we start over? not like nothing ever happened, but like two people who still give a damn about each other and are willing to try again. no games, no unnecessary ego, no more pushing each other away when all we really need is to understand each other better.
i still got so much love for u, even on the days when i suck at showing it. and i’m sorry for making u question that. i hope we can find our way back to each other, slowly but surely. no pressure, no bullshit. just me, being real with u, hoping we can be us again. 🖤

maapp kalau ada bad englishnya itu pure aku merangkai sedikit demi sedit walaupun ada sedikit translate HAHAHA
                    </p>
                  </div>

                  {/* Tombol Pilihan */}
                  <div className="flex gap-5 justify-center w-full relative z-20 font-sans">
                    <button 
                      onClick={handleAccept}
                      className="px-10 py-4 bg-pink-400 text-white font-bold uppercase rounded-full shadow-md hover:bg-pink-500 transition-all z-20"
                    >
                      DIMAAFIN
                    </button>

                    <motion.button
                      animate={{ x: noPosition.x, y: noPosition.y }}
                      onMouseEnter={kaburDong}
                      onClick={(e) => {
                        e.stopPropagation();
                        kaburDong();
                      }}
                      className="px-10 py-4 bg-white/60 backdrop-blur-sm text-pink-500 font-bold uppercase rounded-full border-2 border-pink-200 shadow-inner hover:bg-pink-50 transition-colors z-20"
                    >
                      TIDAK🚫😡
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}