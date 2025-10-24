import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { images } from "../images.js";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [easterEggsFound, setEasterEggsFound] = useState([]);
  const [secretMode, setSecretMode] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);

  const timerRef = useRef(null);
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const surpriseModalRef = useRef(null);
  const birthdayButtonRef = useRef(null);
  const imageRef = useRef(null);
  const buttonContainerRef = useRef(null);

  // Your images array
  const funnyImages = images || [];

  // Easter Egg Messages
  const easterEggs = {
    secret_dance: { name: "Secret Dance Party 🕺", found: false },
    rainbow_unicorn: { name: "Rainbow Unicorn Mode 🌈", found: false },
    disco_lights: { name: "Disco Lights 💃", found: false },
    time_travel: { name: "Time Traveler ⏰", found: false },
    confetti_storm: { name: "Confetti Storm 🎊", found: false }
  };

  // Funny messages
  const funnyMessages = [
    "Whoa! Hands off the confetti cannon! 🎉 Not yet!",
    "Patience, tiny human! The cake is plotting its entrance. 🍰",
    "Trying to teleport to your presents? Nice try, magician! 🪄🎁",
    "Okay okay, don't faint from excitement yet! 💝 Breathe…",
    "You're so hyped, even the candles are sweating! 🕯️🥵",
    "Keep tapping! You might find magical secrets! ✨",
    "Birthday vibes detected! Warning: Extreme happiness ahead! 💖",
    "The suspense is real… someone get a drumroll! 🥁⭐",
    "Stop making me excited too! My circuits can't handle this! 🤖😄",
    "Shhh… I think the birthday fairies are watching! 🧚‍♀️"
  ];

  // Calculate time until November 4th
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    const birthday = new Date(currentYear, 10, 4);
    
    if (now > birthday) {
      birthday.setFullYear(currentYear + 1);
    }
    
    const difference = birthday.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }, []);

  // Get random surprise
  const getRandomSurprise = useCallback(() => {
    if (funnyImages.length === 0) return { image: "", message: "No images found! 😢" };

    const randomImageIndex = Math.floor(Math.random() * funnyImages.length);
    const randomMessageIndex = Math.floor(Math.random() * funnyMessages.length);
    
    return {
      image: funnyImages[randomImageIndex],
      message: funnyMessages[randomMessageIndex]
    };
  }, [funnyImages, funnyMessages]);

  // EASTER EGGS! 🥚 - SUPER EASY MODE
  const triggerEasterEgg = useCallback((eggName) => {
    if (easterEggsFound.includes(eggName)) return;

    setEasterEggsFound(prev => [...prev, eggName]);
    
    switch(eggName) {
      case 'secret_dance':
        setSecretMode(true);
        gsap.to("body", {
          duration: 2,
          rotation: 360,
          scale: 1.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
        break;
        
      case 'rainbow_unicorn':
        setRainbowMode(true);
        gsap.to(".time-unit", {
          duration: 1,
          background: "linear-gradient(45deg, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)",
          stagger: 0.1,
          repeat: 3,
          yoyo: true
        });
        break;
        
      case 'disco_lights':
        gsap.to(".floating-element", {
          duration: 0.5,
          scale: 2,
          rotation: 180,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          stagger: 0.1,
          repeat: 5,
          yoyo: true
        });
        break;
        
      case 'time_travel':
        gsap.to(timerRef.current, {
          duration: 2,
          x: "100vw",
          rotation: 720,
          ease: "power4.inOut",
          yoyo: true,
          repeat: 1
        });
        break;
        
      case 'confetti_storm':
        gsap.to(".confetti", {
          duration: 1,
          scale: 1,
          opacity: 1,
          y: -100,
          rotation: 360,
          stagger: 0.02,
          ease: "power2.out"
        });
        break;
    }

    // Show easter egg notification
    gsap.to(".easter-egg-notification", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(".easter-egg-notification", {
            opacity: 0,
            y: -50,
            duration: 0.5
          });
        }, 3000);
      }
    });
  }, [easterEggsFound]);

  // SUPER EASY MODE: Check for secret codes
  const checkSecretCodes = useCallback((count) => {
    // VERY EASY: Low tap counts
    if (count === 4 && !easterEggsFound.includes('secret_dance')) {
      triggerEasterEgg('secret_dance');
      return true;
    }
    
    if (count === 6 && !easterEggsFound.includes('rainbow_unicorn')) {
      triggerEasterEgg('rainbow_unicorn');
      return true;
    }
    
    if (count === 8 && !easterEggsFound.includes('disco_lights')) {
      triggerEasterEgg('disco_lights');
      return true;
    }
    
    if (count === 10 && !easterEggsFound.includes('time_travel')) {
      triggerEasterEgg('time_travel');
      return true;
    }
    
    if (count === 12 && !easterEggsFound.includes('confetti_storm')) {
      triggerEasterEgg('confetti_storm');
      return true;
    }
    
    return false;
  }, [easterEggsFound, triggerEasterEgg]);

  // Redirect to birthday page
  const redirectToBirthdayPage = () => {
    window.location.href = "/birthday-special";
  };

  // GSAP Animations
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    if (timerRef.current) {
      gsap.fromTo(timerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    const timeUnits = [daysRef.current, hoursRef.current, minutesRef.current, secondsRef.current];
    if (timeUnits.every(unit => unit !== null)) {
      gsap.fromTo(timeUnits,
        { opacity: 0, scale: 0.5, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
        setIsButtonEnabled(true);
        
        if (timerRef.current) {
          gsap.to(timerRef.current, {
            scale: 1.05,
            duration: 0.5,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut"
          });
        }

        setTimeout(() => {
          if (birthdayButtonRef.current) {
            gsap.fromTo(birthdayButtonRef.current,
              { opacity: 0, scale: 0, y: 50 },
              { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                duration: 1, 
                ease: "back.out(1.7)"
              }
            );
          }
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Number change animation
  useEffect(() => {
    const timeUnits = [daysRef.current, hoursRef.current, minutesRef.current, secondsRef.current];
    if (timeUnits.every(unit => unit !== null)) {
      gsap.to(timeUnits, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  }, [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]);

  // SUPER EASY TAPPING: Completely new approach
  const handleSurpriseClick = useCallback(() => {
    if (isButtonEnabled) {
      redirectToBirthdayPage();
      return;
    }

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    console.log(`Tap count: ${newTapCount}`); // Debug

    // Check for easter eggs FIRST
    const foundEasterEgg = checkSecretCodes(newTapCount);

    // If easter egg found, don't show normal surprise
    if (foundEasterEgg) {
      return;
    }

    // Show normal surprise only at exactly 3 taps
    if (newTapCount === 3) {
      const surprise = getRandomSurprise();
      setCurrentImage(surprise.image);
      setCurrentMessage(surprise.message);
      setShowSurprise(true);
      
      if (surpriseModalRef.current) {
        gsap.fromTo(surpriseModalRef.current, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
      
      // Reset counter after showing surprise
      setTimeout(() => setTapCount(0), 1000);
    } else {
      // Button shake animation for feedback
      gsap.to(".surprise-btn", {
        x: 10,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut"
      });
    }
  }, [isButtonEnabled, tapCount, getRandomSurprise, checkSecretCodes]);

  // Close surprise modal
  const closeSurpriseModal = useCallback(() => {
    if (surpriseModalRef.current) {
      gsap.to(surpriseModalRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setShowSurprise(false)
      });
    } else {
      setShowSurprise(false);
    }
  }, []);

  // TimeUnit component
  const TimeUnit = React.memo(({ label, value, color, unitRef }) => {
    const gradientMap = {
      "from-purple-500 to-blue-500": "linear-gradient(135deg, #8b5cf6, #3b82f6)",
      "from-pink-500 to-purple-500": "linear-gradient(135deg, #ec4899, #8b5cf6)",
      "from-indigo-500 to-blue-400": "linear-gradient(135deg, #6366f1, #60a5fa)",
      "from-green-400 to-teal-400": "linear-gradient(135deg, #34d399, #2dd4bf)"
    };

    return (
      <div 
        ref={unitRef}
        className="time-unit relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
        style={{
          background: rainbowMode 
            ? `linear-gradient(45deg, hsl(${Math.random() * 360}, 100%, 60%), hsl(${Math.random() * 360}, 100%, 60%))`
            : 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div 
          className="absolute inset-0 rounded-xl opacity-75"
          style={{
            background: gradientMap[color],
            filter: 'blur(6px)',
            zIndex: -1
          }}
        />
        
        <div 
          className="absolute inset-1 rounded-lg flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
          }}
        >
          <div 
            className="text-2xl md:text-3xl font-bold mb-1"
            style={{
              background: gradientMap[color],
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-medium text-gray-300 uppercase tracking-wider">
            {label}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
      secretMode ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600' :
      rainbowMode ? 'bg-gradient-to-br from-red-400 via-green-400 to-blue-400 animate-pulse' :
      'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600'
    }`}>
      {/* Easter Egg Notifications */}
      <div className="easter-egg-notification fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-bold text-lg shadow-2xl opacity-0 -translate-y-50 z-50">
        🥚 Easter Egg Found! Check the collection! 🎉
      </div>

      {/* Easter Egg Collection */}
      {easterEggsFound.length > 0 && (
        <div className="fixed top-4 right-4 bg-white/20 backdrop-blur-lg rounded-lg p-3 border border-white/30 max-w-xs">
          <p className="text-white text-sm font-bold mb-2">🎯 Easter Eggs: {easterEggsFound.length}/5</p>
          <div className="flex flex-wrap gap-1">
            {easterEggsFound.map(egg => (
              <span key={egg} className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                {easterEggs[egg]?.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Secret Tap Counter */}
      {!isButtonEnabled && tapCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded text-sm">
          Taps: {tapCount} 👆<br/>
          Next egg at: {4 - tapCount} taps
        </div>
      )}

      <div 
        ref={timerRef}
        className="timer-container relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 bg-gradient-to-br from-white/20 via-pink-100/20 to-purple-100/20 rounded-2xl p-6 md:p-8 shadow-xl border border-white/30 backdrop-blur-lg"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-3">
            <span className="text-3xl">{secretMode ? '🕺' : '🎂'}</span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {secretMode ? 'SECRET DANCE PARTY!' : 'Birthday Countdown!'}
            </h1>
            <span className="text-3xl">{rainbowMode ? '🌈' : '🎉'}</span>
          </div>
          <p className="text-white text-base md:text-lg max-w-md font-medium">
            {secretMode 
              ? "You found the secret dance! Keep tapping for more magic! 💃" 
              : "Counting down to November 4th! Get ready for an amazing day!"
            }
          </p>
          <p className="text-pink-200 text-sm md:text-base">
            For my awesome little sister! {rainbowMode ? '✨🌈✨' : '💖'}
          </p>
        </div>

        {/* Time Units */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <TimeUnit 
            label="Days" 
            value={timeLeft.days} 
            color="from-purple-500 to-blue-500"
            unitRef={daysRef}
          />
          <TimeUnit 
            label="Hours" 
            value={timeLeft.hours} 
            color="from-pink-500 to-purple-500"
            unitRef={hoursRef}
          />
          <TimeUnit 
            label="Minutes" 
            value={timeLeft.minutes} 
            color="from-indigo-500 to-blue-400"
            unitRef={minutesRef}
          />
          <TimeUnit 
            label="Seconds" 
            value={timeLeft.seconds} 
            color="from-green-400 to-teal-400"
            unitRef={secondsRef}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-2">
          <div className="flex justify-between text-xs text-white mb-1">
            <span>Excitement Level</span>
            <span>{Math.round(((12 - timeLeft.days) / 12) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${((12 - timeLeft.days) / 12) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col gap-3 mt-4 w-full max-w-md items-center">
          {/* Main Surprise Button */}
          <button 
            onClick={handleSurpriseClick}
            className={`surprise-btn w-full px-5 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 ${
              isButtonEnabled 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 cursor-pointer' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-70'
            }`}
          >
            <span className="fas fa-gift mr-2" />
            {isButtonEnabled ? 'View Surprises!' : 'View Surprises'}
          </button>

          {/* Birthday Special Page Button */}
          {isButtonEnabled && (
            <button 
              ref={birthdayButtonRef}
              onClick={redirectToBirthdayPage}
              className="birthday-special-btn w-full px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-yellow-300"
            >
              <span className="fas fa-star mr-2" />
              🎊 Enter Birthday Wonderland! 🎊
              <span className="fas fa-star ml-2" />
            </button>
          )}
        </div>

        {/* Tap Instructions */}
        {!isButtonEnabled && (
          <div className="text-center">
            <p className="text-pink-200 text-sm italic">
              {tapCount > 0 ? `Taps: ${tapCount}/3 (Keep going! 🎯)` : "Tap the button multiple times! 👆"}
            </p>
            <p className="text-pink-100 text-xs mt-1">
              Easter eggs unlock at 4, 6, 8, 10, 12 taps!
            </p>
          </div>
        )}

        {/* Message */}
        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-white text-sm md:text-base italic">
            {isButtonEnabled 
              ? "🎉 IT'S YOUR BIRTHDAY! Click to celebrate! 🎉" 
              : `Only ${timeLeft.days} days until November 4th! 🎈`
            }
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute text-lg opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['🎈', '🎂', '🎁', '⭐'][i % 4]}
            </div>
          ))}
        </div>

        {/* Confetti */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti absolute text-xl opacity-0 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'scale(0)',
              color: `hsl(${Math.random() * 360}, 100%, 60%)`
            }}
          >
            {['🎉', '🎊', '⭐', '✨', '💫', '🌟'][i % 6]}
          </div>
        ))}
      </div>

      {/* RESPONSIVE FULL SCREEN SURPRISE MODAL */}
      {showSurprise && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4">
          <div 
            ref={surpriseModalRef}
            className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-4 md:mb-6 px-4">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                {isButtonEnabled ? "Happy Birthday! 🎉" : currentMessage}
              </h3>
            </div>

            {/* Full Screen Image Container */}
            <div className="flex-1 w-full flex items-center justify-center p-2 md:p-4 max-h-[60vh]">
              {currentImage ? (
                <img 
                  ref={imageRef}
                  src={currentImage} 
                  alt="Funny surprise" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  loading="lazy"
                  onError={(e) => {
                    console.error("Image failed to load");
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    gsap.fromTo(imageRef.current, 
                      { scale: 0.8, opacity: 0 },
                      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
                    );
                  }}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg">
                  <p className="text-gray-600 font-bold text-xl">🎁 Loading surprise... 🎁</p>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="text-center my-4 md:my-6 px-4">
              <p className="text-white text-base md:text-lg">
                {isButtonEnabled 
                  ? "Ready for your birthday adventure?" 
                  : "Found a secret surprise! 😄"
                }
              </p>
            </div>

            {/* ALWAYS VISIBLE BUTTONS */}
            <div 
              ref={buttonContainerRef}
              className="w-full flex flex-col sm:flex-row gap-3 justify-center items-center px-4 pb-4 md:pb-8"
            >
              <button 
                onClick={isButtonEnabled ? redirectToBirthdayPage : closeSurpriseModal}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-transform min-h-[50px] flex items-center justify-center"
              >
                {isButtonEnabled ? "Let's Go! 🎊" : "Close"}
              </button>
              {isButtonEnabled && (
                <button 
                  onClick={redirectToBirthdayPage}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-transform min-h-[50px] flex items-center justify-center"
                >
                  Special Page ✨
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Countdown;