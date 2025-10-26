import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const BirthdaySpecial = ({ onBack }) => {
  const [currentSurprise, setCurrentSurprise] = useState(0);
  const [fairyDust, setFairyDust] = useState([]);
  const [messages, setMessages] = useState([]);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cakeRef = useRef(null);
  const messageRef = useRef(null);

  // Magical surprises for your little sister
  const surprises = [
    {
      type: "message",
      content: "You are the most amazing little sister in the whole wide world! 🌟",
      emoji: "💖"
    },
    {
      type: "message", 
      content: "Your smile lights up every room you walk into! ☀️",
      emoji: "😊"
    },
    {
      type: "message",
      content: "You're growing into such a wonderful, kind, and smart person! 🌸",
      emoji: "🧠"
    },
    {
      type: "message",
      content: "The world is brighter and more magical because you're in it! ✨",
      emoji: "🌎"
    },
    {
      type: "interactive",
      content: "Make a wish and blow out the candles! 🎂",
      emoji: "🕯️"
    }
  ];

  // Sweet messages that appear randomly
  const sweetMessages = [
    "You're doing amazing things! 💫",
    "So proud of the person you're becoming! 🌟",
    "You make every day special! ✨",
    "Your kindness touches everyone around you! 💝",
    "You're stronger than you know! 💪",
    "The world needs your bright light! ☀️",
    "You're loved more than you can imagine! 💖",
    "Keep shining, superstar! ⭐",
    "You make magic happen every day! 🎇",
    "You're one in a million! 🌈"
  ];

  // Create fairy dust particles
  const createFairyDust = () => {
    const newDust = [];
    for (let i = 0; i < 20; i++) {
      newDust.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        emoji: ['✨', '🌟', '⭐', '💫'][Math.floor(Math.random() * 4)]
      });
    }
    setFairyDust(newDust);
    setTimeout(() => setFairyDust([]), 3000);
  };

  // Add random floating messages
  const addFloatingMessage = () => {
    const message = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    const newMessage = {
      id: Date.now(),
      text: message,
      left: Math.random() * 70 + 15,
      top: Math.random() * 70 + 15
    };
    setMessages(prev => [...prev.slice(-3), newMessage]);
  };

  // Create custom confetti effect
  const createConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'fixed inset-0 pointer-events-none z-30';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.innerHTML = ['🎉', '🎊', '⭐', '✨', '🎈'][Math.floor(Math.random() * 5)];
      confetti.style.position = 'absolute';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '0%';
      confetti.style.fontSize = `${Math.random() * 20 + 16}px`;
      confetti.style.opacity = '0';
      confetti.style.zIndex = '30';
      
      confettiContainer.appendChild(confetti);

      gsap.to(confetti, {
        duration: Math.random() * 2 + 1,
        y: window.innerHeight,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
          confetti.remove();
        }
      });
    }

    setTimeout(() => {
      confettiContainer.remove();
    }, 3000);
  };

  // Blow out candles animation
  const blowOutCandles = () => {
    if (cakeRef.current && !candlesBlown) {
      setCandlesBlown(true);
      
      gsap.to(".candle-flame", {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(".candle-smoke", {
        duration: 1,
        y: -50,
        opacity: 1,
        stagger: 0.1,
        ease: "power1.out"
      });

      createFairyDust();
      createConfetti();
      
      setTimeout(() => {
        addFloatingMessage();
        setShowBirthdayMessage(true);
        
        // Animate the birthday message
        if (messageRef.current) {
          gsap.fromTo(messageRef.current,
            { scale: 0, opacity: 0, rotation: -180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
          );
        }
      }, 1000);
    }
  };

  // Initial animations
  useEffect(() => {
    // Grand entrance animation
    gsap.fromTo(titleRef.current,
      { y: -100, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }
    );

    gsap.fromTo(".birthday-element",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: "power2.out" }
    );

    // Initial effects
    createConfetti();
    createFairyDust();

    // Continuous fairy dust
    const dustInterval = setInterval(createFairyDust, 5000);
    
    // Random messages
    const messageInterval = setInterval(addFloatingMessage, 6000);

    return () => {
      clearInterval(dustInterval);
      clearInterval(messageInterval);
    };
  }, []);

  // Handle surprise clicks
  const handleNextSurprise = () => {
    if (surprises[currentSurprise].type === "interactive") {
      blowOutCandles();
    } else {
      createFairyDust();
      createConfetti();
      addFloatingMessage();
      setCurrentSurprise(prev => (prev + 1) % surprises.length);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Fairy Dust */}
      {fairyDust.map(dust => (
        <div
          key={dust.id}
          className="fairy-dust-particle absolute text-2xl z-10 pointer-events-none"
          style={{
            left: `${dust.left}%`,
            animationDelay: `${dust.delay}s`
          }}
        >
          {dust.emoji}
        </div>
      ))}

      {/* Floating Messages */}
      {messages.map(message => (
        <div
          key={message.id}
          className="floating-message fixed bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-pink-300 shadow-lg z-20 pointer-events-none"
          style={{
            left: `${message.left}%`,
            top: `${message.top}%`,
          }}
        >
          <p className="text-purple-800 font-bold text-sm text-center">
            {message.text}
          </p>
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center space-y-8 max-w-4xl mx-auto z-20 w-full">
        {/* Title */}
        <div ref={titleRef} className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 birthday-element">
            Happy Birthday! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 birthday-element">
            To the most wonderful little sister in the universe!
          </p>
        </div>

        {/* Cake */}
        <div ref={cakeRef} className="birthday-element relative mb-8">
          <div className="relative w-64 h-64 mx-auto">
            {/* Cake Plate */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-gray-300 rounded-full shadow-lg"></div>
            
            {/* Cake */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-lg shadow-xl">
              {/* Frosting */}
              <div className="absolute top-0 w-full h-4 bg-pink-200 rounded-t-lg"></div>
              
              {/* Decorations */}
              <div className="absolute top-2 left-4 w-32 h-2 bg-purple-400 rounded-full"></div>
              <div className="absolute top-6 left-6 w-28 h-2 bg-blue-400 rounded-full"></div>
              
              {/* Candles */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {[1, 2, 3, 4, 5].map((candle) => (
                  <div key={candle} className="relative">
                    {/* Candle */}
                    <div className="w-2 h-12 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-t"></div>
                    {/* Flame */}
                    {!candlesBlown && (
                      <div className="candle-flame absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full animate-flicker"></div>
                    )}
                    {/* Smoke */}
                    <div className="candle-smoke absolute -top-8 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gray-300 rounded-full opacity-0"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Birthday Message after blowing candles */}
        {showBirthdayMessage && (
          <div 
            ref={messageRef}
            className="birthday-element bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 border-2 border-yellow-300 shadow-2xl mb-6"
          >
            <div className="text-4xl mb-3">🎊</div>
            <p className="text-white text-xl md:text-2xl font-bold">
              Your wish is coming true! 🪄✨
            </p>
            <p className="text-yellow-100 text-lg mt-2">
              This is going to be your most magical year yet!
            </p>
          </div>
        )}

        {/* Current Surprise */}
        <div className="birthday-element bg-white/20 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/30 shadow-2xl mb-6">
          <div className="text-4xl mb-4">{surprises[currentSurprise].emoji}</div>
          <p className="text-white text-xl md:text-2xl font-bold mb-6">
            {surprises[currentSurprise].content}
          </p>
          
          {surprises[currentSurprise].type === "interactive" && !candlesBlown && (
            <button
              onClick={blowOutCandles}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300 border-2 border-yellow-300 hover:shadow-2xl"
            >
              🎂 Make a Wish & Blow! 🎂
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="birthday-element flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleNextSurprise}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl"
          >
            Next Magical Surprise ✨
          </button>
          
          <button
            onClick={createFairyDust}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded-full font-bold shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl"
          >
            More Fairy Dust! 🧚
          </button>

          <button
            onClick={createConfetti}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl"
          >
            More Confetti! 🎊
          </button>

          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full font-bold shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl"
            >
              ← Back to Countdown
            </button>
          )}
        </div>

        {/* Special Messages Grid */}
        <div className="birthday-element grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { emoji: "💝", text: "You're incredibly loved" },
            { emoji: "🌟", text: "You shine so bright" },
            { emoji: "🎨", text: "You're so creative" },
            { emoji: "🤗", text: "Your hugs are the best" },
            { emoji: "🌈", text: "You bring color to life" },
            { emoji: "⚡", text: "You're full of energy" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center hover:scale-105 transform transition-all duration-300 cursor-pointer"
              onClick={createFairyDust}
            >
              <div className="text-2xl mb-2">{item.emoji}</div>
              <p className="text-white font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Final Message */}
        <div className="birthday-element bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 border-2 border-white/40 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            You Are Amazing! 💖
          </h2>
          <p className="text-pink-100 text-lg md:text-xl leading-relaxed">
            Remember how special you are every single day. Keep being your wonderful self!
            The world is lucky to have you, and I'm so lucky to have you as my little sister! 
            This is your year to shine brighter than ever! ✨
          </p>
          <div className="text-4xl mt-6 flex justify-center space-x-4">
            🎁 🎈 🎂 🎊 🦄 ✨
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-emoji absolute text-2xl opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 16}px`
            }}
          >
            {['🎈', '🎉', '🎁', '⭐', '✨', '🌟', '💖', '🎀'][i % 8]}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes fairy-dust-fall {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .floating-emoji {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-message {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-flicker {
          animation: flicker 1s ease-in-out infinite;
        }
        
        .fairy-dust-particle {
          animation: fairy-dust-fall 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default BirthdaySpecial; 