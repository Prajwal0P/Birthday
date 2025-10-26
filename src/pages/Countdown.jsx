import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { images } from "../images.js";

// Memoized TimeUnit component
const TimeUnit = React.memo(({ label, value, color, unitRef, comfortMode, dramaticMode, rainbowMode, partyMode }) => {
  const gradientMap = useMemo(() => ({
    "from-purple-500 to-blue-500": "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    "from-pink-500 to-purple-500": "linear-gradient(135deg, #ec4899, #8b5cf6)",
    "from-indigo-500 to-blue-400": "linear-gradient(135deg, #6366f1, #60a5fa)",
    "from-green-400 to-teal-400": "linear-gradient(135deg, #34d399, #2dd4bf)"
  }), []);

  const backgroundStyle = useMemo(() => {
    if (comfortMode) return `linear-gradient(135deg, #ffd6e0, #c4f0ff)`;
    if (rainbowMode) return `linear-gradient(45deg, hsl(${Math.random() * 360}, 100%, 60%), hsl(${Math.random() * 360}, 100%, 60%))`;
    if (partyMode) return `linear-gradient(135deg, hsl(${value * 15}, 80%, 60%), hsl(${value * 15 + 60}, 80%, 60%))`;
    if (dramaticMode) return `linear-gradient(135deg, hsl(${Math.random() * 360}, 100%, 60%), hsl(${Math.random() * 360}, 100%, 60%))`;
    return 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))';
  }, [comfortMode, rainbowMode, partyMode, dramaticMode, value]);

  const innerBackground = useMemo(() => {
    if (comfortMode) return 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))';
    if (dramaticMode) return `linear-gradient(135deg, hsla(${Math.random() * 360}, 100%, 50%, 0.8), hsla(${Math.random() * 360}, 100%, 50%, 0.8))`;
    return 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))';
  }, [comfortMode, dramaticMode]);

  const textStyle = useMemo(() => {
    if (comfortMode) return 'linear-gradient(135deg, #ff6b6b, #4ecdc4)';
    if (dramaticMode) return 'linear-gradient(135deg, #ffffff, #ffff00)';
    return gradientMap[color];
  }, [comfortMode, dramaticMode, color, gradientMap]);

  return (
    <div 
      ref={unitRef}
      className="time-unit relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
      style={{
        background: backgroundStyle,
        backdropFilter: 'blur(12px)',
        border: comfortMode 
          ? '2px solid rgba(255, 255, 255, 0.5)' 
          : dramaticMode 
          ? '3px solid white' 
          : '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div 
        className="absolute inset-0 rounded-xl opacity-75"
        style={{
          background: comfortMode 
            ? `linear-gradient(135deg, #ffb6c1, #87ceeb)`
            : gradientMap[color],
          filter: 'blur(8px)',
          zIndex: -1
        }}
      />
      
      <div 
        className="absolute inset-1 rounded-lg flex flex-col items-center justify-center"
        style={{ background: innerBackground }}
      >
        <div 
          className="text-2xl md:text-3xl font-bold mb-1"
          style={{
            background: textStyle,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: comfortMode ? '0 2px 4px rgba(0,0,0,0.1)' : dramaticMode ? '0 0 10px #ffff00' : 'none'
          }}
        >
          {value.toString().padStart(2, '0')}
        </div>
        <div className={`text-xs font-medium uppercase tracking-wider ${
          comfortMode ? 'text-pink-600' : dramaticMode ? 'text-white' : 'text-gray-300'
        }`}>
          {label}
        </div>
      </div>
    </div>
  );
});

export default function Countdown() {
  const navigate = useNavigate();

  // State optimizations
  const [state, setState] = useState({
    timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    isButtonEnabled: false,
    showSurprise: false,
    currentImage: "",
    currentMessage: "",
    easterEggsFound: [],
    secretMode: false,
    rainbowMode: false,
    partyMode: false,
    dramaticMode: false,
    comfortMode: false,
    fairyDustMode: false,
    magicalMessages: [],
    keySequence: [],
    shakeCount: 0,
    touchStart: null,
    tapPattern: []
  });

  // Helper to update state
  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Refs
  const timerRef = useRef(null);
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const surpriseModalRef = useRef(null);
  const birthdayButtonRef = useRef(null);
  const fairyContainerRef = useRef(null);
  const comfortModeActivated = useRef(false);
  const dramaticModeActivated = useRef(false);
  const intervalsRef = useRef([]);

  // Memoized constants
  const funnyImages = useMemo(() => images || [], []);
  
  const easterEggs = useMemo(() => ({
    konami_code: { name: "Konami Code! ⬆️⬆️⬇️⬇️", found: false },
    birthday_typing: { name: "Birthday Typing 🎂", found: false },
    shake_celebration: { name: "Shake Celebration 📱", found: false },
    rainbow_unicorn: { name: "Rainbow Unicorn Mode 🌈", found: false },
    disco_lights: { name: "Disco Lights 💃", found: false },
    cosmic_dance: { name: "Cosmic Dance 🌟", found: false },
    swipe_magic: { name: "Swipe Magic ✨", found: false },
    comfort_mode: { name: "Comfort Mode 🛋️", found: false },
    fairy_dust: { name: "Fairy Dust Mode 🧚", found: false }
  }), []);

  const secretSequences = useMemo(() => ({
    konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
    birthday: ['KeyB', 'KeyI', 'KeyR', 'KeyT', 'KeyH', 'KeyD', 'KeyA', 'KeyY'],
    comfort: ['KeyC', 'KeyO', 'KeyM', 'KeyF', 'KeyO', 'KeyR', 'KeyT']
  }), []);

  const tapPatterns = useMemo(() => ({
    rainbow: [1, 1, 2],
    disco: [2, 1, 2],
    cosmic: [1, 2, 1],
    comfort: [1, 1, 1],
    fairy: [2, 2, 1]
  }), []);

  const comfortingMessages = useMemo(() => [
    "You're the most amazing little sister in the whole universe! 🌟",
    "Every moment brings us closer to your special magical day! ✨",
    "The birthday fairies are preparing something wonderful for you! 🧚‍♀️",
    "You make every day brighter just by being you! ☀️",
    "So much love and happiness is waiting for you! 💖",
    "You deserve all the magic and wonder in the world! 🎇",
    "The stars are aligning to make your birthday perfect! 🌠",
    "Your smile lights up our whole world! 😊",
    "You're growing into such an incredible person! 🌸",
    "The world is a better place because you're in it! 🌎"
  ], []);

  const magicalEncouragements = useMemo(() => [
    "Almost there, superstar! Your special day is dawning! 🌅",
    "Can you feel the magic building? It's almost time! ✨",
    "The birthday fairies are putting the final touches! 🧚",
    "Get ready for the most wonderful day ever! 🎉",
    "Your amazing adventure is about to begin! 🚀",
    "The whole universe is excited for your birthday! 🌌",
    "Take a deep breath... magic is happening! 💫",
    "You've waited so patiently - your reward is here! 🎁",
    "The stars are dancing in anticipation! 💃",
    "This is it! Your moment to shine! ⭐"
  ], []);

  // Memoized calculations
  const calculateTimeLeft = useCallback(() => {
    const targetDate = new Date("2025-11-04T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      updateState({ isButtonEnabled: true });
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }, [updateState]);

  const isLast3Hours = useCallback((timeLeft) => 
    timeLeft.days === 0 && timeLeft.hours < 3, []);

  const isLastHour = useCallback((timeLeft) => 
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 60, []);

  // Optimized functions
  const createFairyDust = useCallback(() => {
    if (!fairyContainerRef.current) return;
    const fairyContainer = fairyContainerRef.current;
    const fairyCount = 30;

    for (let i = 0; i < fairyCount; i++) {
      const fairy = document.createElement('div');
      fairy.innerHTML = '✨';
      fairy.style.position = 'absolute';
      fairy.style.left = `${Math.random() * 100}%`;
      fairy.style.top = `${Math.random() * 100}%`;
      fairy.style.fontSize = `${Math.random() * 20 + 10}px`;
      fairy.style.opacity = '0';
      fairy.style.zIndex = '10';
      fairy.className = 'fairy-dust';
      fairyContainer.appendChild(fairy);

      gsap.to(fairy, {
        duration: Math.random() * 3 + 2,
        y: -100,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        opacity: 1,
        ease: "power1.out",
        onComplete: () => {
          if (fairy.parentNode === fairyContainer) {
            fairy.remove();
          }
        }
      });
    }
  }, []);

  const activateComfortMode = useCallback(() => {
    if (comfortModeActivated.current) return;
    comfortModeActivated.current = true;
    updateState({ comfortMode: true, dramaticMode: false });

    gsap.to("body", {
      duration: 4,
      background: `linear-gradient(135deg, #ffb6c1 0%, #ffd1dc 25%, #e6e6fa 50%, #d8bfd8 75%, #b19cd9 100%)`,
      ease: "sine.inOut"
    });

    gsap.to(timerRef.current, {
      duration: 3,
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".time-unit", {
      duration: 2,
      boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "sine.inOut"
    });

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (!comfortModeActivated.current) {
        clearInterval(messageInterval);
        return;
      }
      const newMessage = {
        id: Date.now(),
        text: magicalEncouragements[messageIndex % magicalEncouragements.length],
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`
      };
      updateState(prev => ({ 
        magicalMessages: [...prev.magicalMessages.slice(-3), newMessage] 
      }));
      messageIndex++;
    }, 8000);

    intervalsRef.current.push(messageInterval);
  }, [magicalEncouragements, updateState]);

  const activateDramaticMode = useCallback(() => {
    if (dramaticModeActivated.current) return;
    dramaticModeActivated.current = true;
    updateState({ dramaticMode: true });

    gsap.to("body", {
      duration: 3,
      background: `linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(timerRef.current, {
      duration: 1.5,
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".time-unit", {
      duration: 2,
      y: -15,
      rotation: 5,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [updateState]);

  const triggerEasterEgg = useCallback((eggName) => {
    if (state.easterEggsFound.includes(eggName)) return;
    
    updateState(prev => ({ 
      easterEggsFound: [...prev.easterEggsFound, eggName] 
    }));
    
    const eggAnimations = {
      konami_code: () => {
        updateState({ secretMode: true });
        createFairyDust();
        gsap.to(".time-unit", {
          duration: 1,
          y: -20,
          rotation: 360,
          stagger: 0.1,
          ease: "back.out(1.7)",
          repeat: 1,
          yoyo: true
        });
      },
      birthday_typing: () => {
        createFairyDust();
        gsap.to(".timer-container", {
          duration: 1,
          scale: 1.05,
          backgroundColor: "rgba(255, 223, 0, 0.2)",
          yoyo: true,
          repeat: 2,
          ease: "power2.inOut"
        });
      },
      shake_celebration: () => {
        updateState({ partyMode: true });
        createFairyDust();
        gsap.to(timerRef.current, {
          duration: 0.2,
          rotation: 5,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut"
        });
      },
      rainbow_unicorn: () => {
        updateState({ rainbowMode: true });
        createFairyDust();
        gsap.to(".time-unit", {
          duration: 2,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
          stagger: 0.2,
          repeat: 2,
          yoyo: true
        });
      },
      disco_lights: () => {
        createFairyDust();
        gsap.to(timerRef.current, {
          duration: 0.5,
          filter: "brightness(1.5)",
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut"
        });
      },
      cosmic_dance: () => {
        createFairyDust();
        gsap.to(".time-unit", {
          duration: 1,
          scale: 1.2,
          yoyo: true,
          repeat: 2,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)"
        });
      },
      swipe_magic: () => {
        createFairyDust();
        gsap.to(".floating-element", {
          duration: 2,
          x: "100vw",
          rotation: 360,
          stagger: 0.2,
          ease: "power2.out"
        });
      },
      comfort_mode: () => {
        updateState({ comfortMode: true });
        createFairyDust();
        gsap.to("body", {
          duration: 2,
          background: "linear-gradient(135deg, #e0f7fa, #f8bbd0, #fff9c4)",
          ease: "sine.inOut"
        });
      },
      fairy_dust: () => {
        updateState({ fairyDustMode: true });
        createFairyDust();
      }
    };

    if (eggAnimations[eggName]) {
      eggAnimations[eggName]();
    }

    // Show notification
    const notification = document.querySelector('.easter-egg-notification');
    if (notification) {
      gsap.to(notification, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(notification, {
              opacity: 0,
              y: -50,
              duration: 0.5
            });
          }, 3000);
        }
      });
    }
  }, [state.easterEggsFound, createFairyDust, updateState]);

  // Event handlers - FIXED WITH event.preventDefault()
  const handleKeyPress = useCallback((event) => {
    const newSequence = [...state.keySequence, event.code].slice(-10);
    updateState({ keySequence: newSequence });
    
    if (newSequence.join(',') === secretSequences.konami.join(',')) {
      triggerEasterEgg('konami_code');
    }
    if (newSequence.join(',') === secretSequences.birthday.join(',')) {
      triggerEasterEgg('birthday_typing');
    }
    if (newSequence.join(',') === secretSequences.comfort.join(',')) {
      triggerEasterEgg('comfort_mode');
    }
  }, [state.keySequence, secretSequences, triggerEasterEgg, updateState]);

  const handleShake = useCallback(() => {
    const newShakeCount = state.shakeCount + 1;
    updateState({ shakeCount: newShakeCount });
    
    if (newShakeCount >= 3) {
      triggerEasterEgg('shake_celebration');
      updateState({ shakeCount: 0 });
    }
    
    setTimeout(() => updateState({ shakeCount: 0 }), 3000);
  }, [state.shakeCount, triggerEasterEgg, updateState]);

  const handleTouchStart = useCallback((e) => {
    updateState({
      touchStart: {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      }
    });
  }, [updateState]);

  const handleTouchEnd = useCallback((e) => {
    if (!state.touchStart) return;
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    };
    const swipeDistance = {
      x: touchEnd.x - state.touchStart.x,
      y: touchEnd.y - state.touchStart.y
    };
    const swipeTime = touchEnd.time - state.touchStart.time;

    if (swipeTime < 500) {
      if (Math.abs(swipeDistance.x) > 50 && Math.abs(swipeDistance.y) < 50) {
        if (swipeDistance.x > 0) triggerEasterEgg('swipe_magic');
      }
      if (Math.abs(swipeDistance.y) > 50 && Math.abs(swipeDistance.x) < 50) {
        if (swipeDistance.y < 0) triggerEasterEgg('rainbow_unicorn');
        else if (swipeDistance.y > 0) triggerEasterEgg('fairy_dust');
      }
    }
    updateState({ touchStart: null });
  }, [state.touchStart, triggerEasterEgg, updateState]);

  const handleTap = useCallback((isLongPress = false) => {
    const tapType = isLongPress ? 2 : 1;
    const newPattern = [...state.tapPattern, tapType].slice(-3);
    updateState({ tapPattern: newPattern });

    const patternString = newPattern.join(',');
    if (patternString === tapPatterns.rainbow.join(',')) triggerEasterEgg('rainbow_unicorn');
    else if (patternString === tapPatterns.disco.join(',')) triggerEasterEgg('disco_lights');
    else if (patternString === tapPatterns.cosmic.join(',')) triggerEasterEgg('cosmic_dance');
    else if (patternString === tapPatterns.comfort.join(',')) triggerEasterEgg('comfort_mode');
    else if (patternString === tapPatterns.fairy.join(',')) triggerEasterEgg('fairy_dust');

    setTimeout(() => updateState({ tapPattern: [] }), 2000);
  }, [state.tapPattern, tapPatterns, triggerEasterEgg, updateState]);

  const handleLongPress = useCallback(() => handleTap(true), [handleTap]);

  const getRandomSurprise = useCallback(() => {
    if (funnyImages.length === 0) return { image: "", message: "You're amazing! 😊" };
    const randomImageIndex = Math.floor(Math.random() * funnyImages.length);
    const randomMessageIndex = Math.floor(Math.random() * comfortingMessages.length);
    
    return {
      image: funnyImages[randomImageIndex],
      message: comfortingMessages[randomMessageIndex]
    };
  }, [funnyImages, comfortingMessages]);

  // FIXED: Added event.preventDefault() to prevent page refresh
  const redirectToBirthdayPage = useCallback((event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate("/birthday-special");
  }, [navigate]);

  // FIXED: Added event.preventDefault() to prevent page refresh
  const handleSurpriseClick = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (state.isButtonEnabled) {
      redirectToBirthdayPage(event);
      return;
    }
    const surprise = getRandomSurprise();
    updateState({ 
      currentImage: surprise.image,
      currentMessage: surprise.message,
      showSurprise: true
    });
    
    if (surpriseModalRef.current) {
      gsap.fromTo(surpriseModalRef.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [state.isButtonEnabled, getRandomSurprise, redirectToBirthdayPage, updateState]);

  // FIXED: Added event.preventDefault() to prevent page refresh
  const closeSurpriseModal = useCallback((event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (surpriseModalRef.current) {
      gsap.to(surpriseModalRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => updateState({ showSurprise: false })
      });
    } else {
      updateState({ showSurprise: false });
    }
  }, [updateState]);

  // Main effects
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      updateState({ timeLeft: newTimeLeft });
      
      if (isLastHour(newTimeLeft) && !comfortModeActivated.current) activateComfortMode();
      else if (isLast3Hours(newTimeLeft) && !dramaticModeActivated.current && !comfortModeActivated.current) activateDramaticMode();
    }, 1000);

    intervalsRef.current.push(timer);

    // Initial animations
    if (timerRef.current) {
      gsap.fromTo(timerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
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
          duration: 1, 
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }

    // Event listeners
    window.addEventListener('keydown', handleKeyPress);
    
    // Shake detection
    let lastAcceleration = { x: 0, y: 0, z: 0 };
    const handleDeviceMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
      const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
      const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);
      if (deltaX + deltaY + deltaZ > 25) handleShake();
      lastAcceleration = acceleration;
    };
    
    if (window.DeviceMotionEvent) window.addEventListener('devicemotion', handleDeviceMotion);

    // Tap detection
    let lastClickTime = 0;
    const handleDoubleClick = (event) => {
      event.preventDefault();
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < 300) handleTap();
      lastClickTime = currentTime;
    };
    
    document.addEventListener('click', handleDoubleClick);

    let pressTimer;
    const handlePressStart = (event) => {
      event.preventDefault();
      pressTimer = setTimeout(handleLongPress, 800);
    };
    const handlePressEnd = (event) => {
      event.preventDefault();
      clearTimeout(pressTimer);
    };
    
    document.addEventListener('mousedown', handlePressStart);
    document.addEventListener('mouseup', handlePressEnd);
    document.addEventListener('touchstart', handlePressStart);
    document.addEventListener('touchend', handlePressEnd);

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('devicemotion', handleDeviceMotion);
      document.removeEventListener('click', handleDoubleClick);
      document.removeEventListener('mousedown', handlePressStart);
      document.removeEventListener('mouseup', handlePressEnd);
      document.removeEventListener('touchstart', handlePressStart);
      document.removeEventListener('touchend', handlePressEnd);
    };
  }, [calculateTimeLeft, isLastHour, isLast3Hours, activateComfortMode, activateDramaticMode, handleKeyPress, handleShake, handleTap, handleLongPress]);

  // Birthday celebration effect
  useEffect(() => {
    if (state.isButtonEnabled) {
      createFairyDust();
      gsap.to("body", {
        duration: 3,
        background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff6b6b)",
        repeat: -1,
        yoyo: true
      });

      gsap.to(".time-unit", {
        duration: 1,
        scale: 1.3,
        rotation: 360,
        stagger: 0.1,
        repeat: -1,
        yoyo: true
      });
      
      gsap.to(timerRef.current, {
        scale: 1.1,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      setTimeout(() => {
        if (birthdayButtonRef.current) {
          gsap.fromTo(birthdayButtonRef.current,
            { opacity: 0, scale: 0, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "back.out(1.7)" }
          );
        }
      }, 1000);
    }
  }, [state.isButtonEnabled, createFairyDust]);

  // Destructure state for cleaner access
  const { 
    timeLeft, isButtonEnabled, showSurprise, currentImage, currentMessage, 
    easterEggsFound, secretMode, rainbowMode, partyMode, dramaticMode, 
    comfortMode, fairyDustMode, magicalMessages 
  } = state;

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
        comfortMode ? 'comfort-mode' :
        dramaticMode ? 'emergency-mode' :
        secretMode ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600' :
        partyMode ? 'bg-gradient-to-br from-yellow-400 via-red-400 to-pink-500' :
        rainbowMode ? 'bg-gradient-to-br from-red-400 via-green-400 to-blue-400' :
        'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fairy Dust Container */}
      <div ref={fairyContainerRef} className="fixed inset-0 pointer-events-none z-40" />

      {/* Comfort Mode Alert */}
      {comfortMode && (
        <div className="comfort-alert fixed top-0 left-0 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white text-center py-3 font-bold text-lg z-50">
          💖 You're Amazing! {timeLeft.minutes}m {timeLeft.seconds}s Until Your Special Day! 💖
        </div>
      )}

      {/* Dramatic Mode Alert */}
      {dramaticMode && (
        <div className="emergency-alert fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 font-bold text-lg z-50 animate-pulse">
          🚨 BIRTHDAY COUNTDOWN CRITICAL! {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s REMAINING! 🚨
        </div>
      )}

      {/* Magical Floating Messages */}
      {magicalMessages.map(message => (
        <div
          key={message.id}
          className="magical-message fixed text-white text-lg font-bold text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 z-30"
          style={{
            top: message.top,
            left: message.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {message.text}
        </div>
      ))}

      {/* Easter Egg Notifications */}
      <div className="easter-egg-notification fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-bold text-lg shadow-2xl opacity-0 -translate-y-50 z-50">
        🥚 Easter Egg Found! Check the collection! 🎉
      </div>

      {/* Easter Egg Collection */}
      {easterEggsFound.length > 0 && (
        <div className="fixed top-4 right-4 bg-white/20 backdrop-blur-lg rounded-lg p-3 border border-white/30 max-w-xs">
          <p className="text-white text-sm font-bold mb-2">🎯 Easter Eggs: {easterEggsFound.length}/9</p>
          <div className="flex flex-wrap gap-1">
            {easterEggsFound.map(egg => (
              <span key={egg} className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                {easterEggs[egg]?.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Easter Egg Instructions */}
      <div className="fixed bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded text-sm max-w-xs">
        <p className="font-bold">Easter Egg Hunt! 🥚</p>
        <p className="text-xs mt-1">
          <strong>Desktop:</strong><br/>
          • Konami code: ↑↑↓↓←→←→BA<br/>
          • Type "BIRTHDAY"<br/>
          • Type "COMFORT"<br/><br/>
          <strong>Mobile:</strong><br/>
          • Shake phone<br/>
          • Swipe right →<br/>
          • Swipe up ↑ / down ↓<br/>
          • Tap patterns (S=short, L=long)
        </p>
      </div>

      {/* Main Timer Container */}
      <div 
        ref={timerRef}
        className={`timer-container relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 rounded-2xl p-6 md:p-8 shadow-xl border backdrop-blur-lg ${
          comfortMode 
            ? 'bg-white/40 border-white/50 comfort-glow' 
            : dramaticMode 
            ? 'bg-red-500/20 border-red-500/50 emergency-glow'
            : 'bg-gradient-to-br from-white/20 via-pink-100/20 to-purple-100/20 border-white/30'
        }`}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-3">
            <span className="text-3xl">
              {comfortMode ? '💖' :
               dramaticMode ? '🚨' : 
               secretMode ? '🎮' : 
               partyMode ? '📱' : 
               rainbowMode ? '🌈' : '🎂'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {comfortMode ? 'Almost There, Superstar! 💫' :
               dramaticMode ? 'EMERGENCY COUNTDOWN!' :
               secretMode ? 'KONAMI CODE!' : 
               partyMode ? 'SHAKE IT!' : 
               rainbowMode ? 'RAINBOW MODE!' : 
               'Birthday Countdown!'}
            </h1>
            <span className="text-3xl">
              {comfortMode ? '⭐' :
               dramaticMode ? '⚠️' :
               secretMode ? '👾' : 
               partyMode ? '🎉' : 
               rainbowMode ? '🦄' : '🎁'}
            </span>
          </div>
          <p className="text-white text-base md:text-lg max-w-md font-medium">
            {comfortMode 
              ? `You're doing amazing! ${timeLeft.minutes}m ${timeLeft.seconds}s until your special day begins! 💖` 
              : dramaticMode 
              ? `🚨 CRITICAL: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s UNTIL BIRTHDAY! 🚨` 
              : secretMode 
              ? "You found the legendary Konami code! Legendary! 🎮" 
              : partyMode
              ? "Woohoo! Shake it like a polaroid picture! 📱"
              : "Counting down to November 2nd, 2025! Get ready for an amazing day!"
            }
          </p>
          <p className="text-pink-200 text-sm md:text-base">
            For my awesome little sister! {comfortMode ? '💖✨💖' : rainbowMode ? '✨🌈✨' : '💖'}
          </p>
        </div>

        {/* Time Units */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <TimeUnit 
            label="Days" 
            value={timeLeft.days} 
            color="from-purple-500 to-blue-500"
            unitRef={daysRef}
            comfortMode={comfortMode}
            dramaticMode={dramaticMode}
            rainbowMode={rainbowMode}
            partyMode={partyMode}
          />
          <TimeUnit 
            label="Hours" 
            value={timeLeft.hours} 
            color="from-pink-500 to-purple-500"
            unitRef={hoursRef}
            comfortMode={comfortMode}
            dramaticMode={dramaticMode}
            rainbowMode={rainbowMode}
            partyMode={partyMode}
          />
          <TimeUnit 
            label="Minutes" 
            value={timeLeft.minutes} 
            color="from-indigo-500 to-blue-400"
            unitRef={minutesRef}
            comfortMode={comfortMode}
            dramaticMode={dramaticMode}
            rainbowMode={rainbowMode}
            partyMode={partyMode}
          />
          <TimeUnit 
            label="Seconds" 
            value={timeLeft.seconds} 
            color="from-green-400 to-teal-400"
            unitRef={secondsRef}
            comfortMode={comfortMode}
            dramaticMode={dramaticMode}
            rainbowMode={rainbowMode}
            partyMode={partyMode}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-2">
          <div className="flex justify-between text-xs text-white mb-1">
            <span>Excitement Level</span>
            <span>{Math.round(((365 - timeLeft.days) / 365) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                comfortMode 
                  ? 'bg-gradient-to-r from-pink-400 to-blue-400' 
                  : dramaticMode 
                  ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-pulse'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500'
              }`}
              style={{
                width: `${((365 - timeLeft.days) / 365) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col gap-3 mt-4 w-full max-w-md items-center">
          {/* Main Surprise Button */}
          <button 
            onClick={handleSurpriseClick}
            type="button" // ← Added type="button" to prevent form submission
            className={`surprise-btn w-full px-5 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 ${
              isButtonEnabled 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 cursor-pointer' 
                : comfortMode
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white cursor-pointer hover:scale-105 comfort-glow'
                : dramaticMode
                ? 'bg-red-500 text-white cursor-pointer hover:scale-105 animate-pulse'
                : 'bg-white/30 text-white cursor-pointer hover:scale-105'
            }`}
          >
            <span className="fas fa-gift mr-2" />
            {comfortMode ? '💖 You Are Amazing! 💖' : 
             dramaticMode ? '🚨 GET READY! 🚨' : 
             isButtonEnabled ? 'View Surprises!' : 'Get Random Surprise!'}
          </button>

          {/* Birthday Special Page Button */}
          {isButtonEnabled && (
            <button 
              ref={birthdayButtonRef}
              onClick={redirectToBirthdayPage}
              type="button" // ← Added type="button" to prevent form submission
              className="birthday-special-btn w-full px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-yellow-300"
            >
              <span className="fas fa-star mr-2" />
              🎊 Enter Birthday Wonderland! 🎊
              <span className="fas fa-star ml-2" />
            </button>
          )}
        </div>

        {/* Easter Egg Instructions */}
        {!isButtonEnabled && !dramaticMode && !comfortMode && (
          <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm max-w-md">
            <p className="text-white text-sm italic">
              Discover hidden easter eggs! Try gestures, shaking, or secret codes! 🥚
            </p>
          </div>
        )}

        {/* Message */}
        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-white text-sm md:text-base italic">
            {comfortMode 
              ? `You're handling the wait like a champion! So proud of you! 💫` 
              : dramaticMode
              ? `🚨 ALERT: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s REMAINING! 🚨`
              : isButtonEnabled 
              ? "🎉 IT'S YOUR BIRTHDAY! Click to celebrate! 🎉" 
              : `Only ${timeLeft.days} days until November 2nd, 2025! 🎈`
            }
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(comfortMode ? 15 : dramaticMode ? 20 : 12)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute text-lg opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: comfortMode ? '1.2rem' : dramaticMode ? '1.5rem' : '1rem',
                opacity: comfortMode ? 0.6 : dramaticMode ? 0.8 : 0.5
              }}
            >
              {comfortMode 
                ? ['💖', '⭐', '✨', '🌟', '🎀'][i % 5]
                : dramaticMode 
                ? ['🚨', '⚠️', '💥', '🎊', '🔥', '⚡'][i % 6]
                : ['🎈', '🎂', '🎁', '⭐'][i % 4]
              }
            </div>
          ))}
        </div>
      </div>

      {/* SURPRISE MODAL */}
      {showSurprise && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4">
          <div 
            ref={surpriseModalRef}
            className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto"
          >
            <div className="text-center mb-4 md:mb-6 px-4">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                {isButtonEnabled ? "Happy Birthday! 🎉" : currentMessage}
              </h3>
            </div>

            <div className="flex-1 w-full flex items-center justify-center p-2 md:p-4 max-h-[60vh]">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt="Funny surprise" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg">
                  <p className="text-gray-600 font-bold text-xl">🎁 Loading surprise... 🎁</p>
                </div>
              )}
            </div>

            <div className="text-center my-4 md:my-6 px-4">
              <p className="text-white text-base md:text-lg">
                {isButtonEnabled 
                  ? "Ready for your birthday adventure?" 
                  : "Found a secret surprise! 😄"
                }
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3 justify-center items-center px-4 pb-4 md:pb-8">
              <button 
                onClick={isButtonEnabled ? redirectToBirthdayPage : closeSurpriseModal}
                type="button" // ← Added type="button" to prevent form submission
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-transform min-h-[50px] flex items-center justify-center"
              >
                {isButtonEnabled ? "Let's Go! 🎊" : "Close"}
              </button>
              {isButtonEnabled && (
                <button 
                  onClick={redirectToBirthdayPage}
                  type="button" // ← Added type="button" to prevent form submission
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
        
        @keyframes emergency-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes emergency-glow {
          0%, 100% { box-shadow: 0 0 20px red; }
          50% { box-shadow: 0 0 40px yellow, 0 0 60px red; }
        }
        
        @keyframes comfort-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 182, 193, 0.5); }
          50% { box-shadow: 0 0 50px rgba(135, 206, 235, 0.5); }
        }
        
        @keyframes fairy-dust {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
        
        .emergency-mode {
          animation: emergency-pulse 1s ease-in-out infinite;
        }
        
        .emergency-glow {
          animation: emergency-glow 2s ease-in-out infinite;
        }
        
        .comfort-glow {
          animation: comfort-glow 2s ease-in-out infinite;
        }
        
        .emergency-alert {
          animation: emergency-pulse 0.5s ease-in-out infinite;
        }
        
        .comfort-alert {
          animation: comfort-glow 2s ease-in-out infinite;
        }
        
        .fairy-dust {
          animation: fairy-dust 3s ease-out forwards;
        }
        
        .magical-message {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}