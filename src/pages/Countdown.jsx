import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { images } from "../images.js";

// Enhanced TimeUnit component with more magical elements
const TimeUnit = React.memo(({ label, value, color, unitRef, comfortMode, dramaticMode, sparkle }) => {
  const backgroundStyle = useMemo(() => {
    if (comfortMode) return `linear-gradient(135deg, #ffd6e0, #c4f0ff)`;
    if (dramaticMode) return `linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))`;
    return 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))';
  }, [comfortMode, dramaticMode]);

  const innerBackground = useMemo(() => {
    if (comfortMode) return 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))';
    if (dramaticMode) return 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))';
    return 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))';
  }, [comfortMode, dramaticMode]);

  const textStyle = useMemo(() => {
    if (comfortMode) return 'linear-gradient(135deg, #ff6b6b, #4ecdc4)';
    if (dramaticMode) return 'linear-gradient(135deg, #ffffff, #ffff00)';
    return 'linear-gradient(135deg, #8b5cf6, #3b82f6)';
  }, [comfortMode, dramaticMode]);

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
          ? '2px solid rgba(255, 255, 0, 0.3)' 
          : '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Subtle sparkle effect */}
      {sparkle && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full opacity-60"></div>
      )}
      
      <div 
        className="absolute inset-0 rounded-xl opacity-75"
        style={{
          background: comfortMode 
            ? `linear-gradient(135deg, #ffb6c1, #87ceeb)`
            : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
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
            textShadow: dramaticMode ? '0 0 8px rgba(255,255,0,0.3)' : 'none'
          }}
        >
          {value.toString().padStart(2, '0')}
        </div>
        <div className={`text-xs font-medium uppercase tracking-wider ${
          comfortMode ? 'text-pink-600' : dramaticMode ? 'text-yellow-300' : 'text-gray-300'
        }`}>
          {label}
        </div>
      </div>
    </div>
  );
});

export default function Countdown() {
  const navigate = useNavigate();

  // Enhanced state with more magical elements
  const [state, setState] = useState({
    timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    isButtonEnabled: false,
    showSurprise: false,
    currentImage: "",
    currentMessage: "",
    magicalMessages: [],
    nightMode: false,
    tapCount: 0,
    comfortMode: false,
    dramaticMode: false,
    unicornMode: false,
    sparkleUnits: { days: false, hours: false, minutes: false, seconds: false }
  });

  // Helper to update state
  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Refs for tracking
  const timerRef = useRef(null);
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const surpriseModalRef = useRef(null);
  const birthdayButtonRef = useRef(null);
  const fairyContainerRef = useRef(null);
  const unicornRef = useRef(null);
  const comfortModeActivated = useRef(false);
  const dramaticModeActivated = useRef(false);
  const unicornModeActivated = useRef(false);
  const intervalsRef = useRef([]);
  
  // Mobile-specific refs
  const lastTapTimeRef = useRef(0);
  const longPressTimerRef = useRef(null);
  const shakeLastTimeRef = useRef(0);
  const shakeLastXRef = useRef(null);
  const shakeLastYRef = useRef(null);
  const shakeLastZRef = useRef(null);

  // Memoized constants with more magical content
  const funnyImages = useMemo(() => images || [], []);

  const comfortingMessages = useMemo(() => [
    "You're the most amazing little sister in the whole universe! 🌟",
    "Every moment brings us closer to your special magical day! ✨",
    "The birthday fairies are preparing something wonderful for you! 🧚‍♀️",
    "You make every day brighter just by being you! ☀️",
    "So much love and happiness is waiting for you! 💖",
    "The world is a better place because you're in it! 🌈",
    "You're a shining star that brightens everyone's day! ⭐",
    "Your birthday is going to be absolutely magical! 🎠"
  ], []);

  // Core functions
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

  // Enhanced animation functions - more subtle
  const createConfetti = useCallback(() => {
    if (!fairyContainerRef.current) return;
    const container = fairyContainerRef.current;
    const confettiCount = 30; // Reduced from 50
    const emojis = ['✨', '🌟', '💖', '🎉', '🎊'];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.position = 'absolute';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.fontSize = `${Math.random() * 15 + 12}px`; // Smaller
      confetti.style.opacity = '0';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      confetti.className = 'confetti';
      container.appendChild(confetti);

      gsap.to(confetti, {
        duration: Math.random() * 1.5 + 1, // Shorter duration
        y: -150, // Less movement
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        opacity: 0.8, // Less opaque
        ease: "power1.out",
        onComplete: () => {
          if (confetti.parentNode === container) {
            container.removeChild(confetti);
          }
        }
      });
    }
  }, []);

  const showFloatingMessage = useCallback((message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      top: `${Math.random() * 60 + 20}%`,
      left: `${Math.random() * 60 + 20}%`
    };
    updateState(prev => ({ 
      magicalMessages: [...prev.magicalMessages, newMessage] 
    }));

    setTimeout(() => {
      updateState(prev => ({
        magicalMessages: prev.magicalMessages.filter(msg => msg.id !== newMessage.id)
      }));
    }, 3000);
  }, [updateState]);

  // Create a magical unicorn
  const createUnicorn = useCallback(() => {
    if (!fairyContainerRef.current || unicornModeActivated.current) return;
    
    const container = fairyContainerRef.current;
    const unicorn = document.createElement('div');
    unicorn.innerHTML = '🦄';
    unicorn.style.position = 'absolute';
    unicorn.style.left = '-100px';
    unicorn.style.top = `${Math.random() * 70 + 15}%`;
    unicorn.style.fontSize = '50px'; // Smaller
    unicorn.style.zIndex = '999';
    unicorn.style.pointerEvents = 'none';
    unicorn.style.opacity = '0.8'; // More subtle
    unicorn.className = 'unicorn';
    unicorn.ref = unicornRef;
    container.appendChild(unicorn);

    gsap.to(unicorn, {
      duration: 10, // Slower
      x: '120vw',
      rotation: 180, // Less rotation
      ease: "power1.inOut",
      onComplete: () => {
        if (unicorn.parentNode === container) {
          container.removeChild(unicorn);
        }
      }
    });
  }, []);

  // FIXED MOBILE EASTER EGGS

  // 1. Fixed Triple Tap on Title
  const handleTitleTap = useCallback((event) => {
    event.stopPropagation();
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTapTimeRef.current;
    
    if (timeDiff > 1000) {
      // Reset if too much time passed
      updateState({ tapCount: 1 });
    } else {
      updateState(prev => ({ tapCount: prev.tapCount + 1 }));
    }
    
    lastTapTimeRef.current = currentTime;

    // Check for triple tap (3 taps within 1 second)
    if (state.tapCount >= 2) {
      console.log("🎉 Title triple tap easter egg!");
      createConfetti();
      showFloatingMessage("Triple tap magic! ✨");
      updateState({ tapCount: 0 });
      
      gsap.to(".timer-container", {
        duration: 0.3, // Shorter
        scale: 1.05, // Less scale
        yoyo: true,
        repeat: 1, // Less repeats
        ease: "elastic.out(1, 0.5)"
      });
    }

    // Auto-reset tap count after 1 second
    setTimeout(() => {
      updateState({ tapCount: 0 });
    }, 1000);
  }, [state.tapCount, createConfetti, showFloatingMessage, updateState]);

  // 2. FIXED Shake Detection for Mobile
  const handleShake = useCallback(() => {
    console.log("📱 Shake easter egg triggered!");
    createConfetti();
    showFloatingMessage("Whoa! Shake it! 📱✨");
    
    gsap.to(".time-unit", {
      duration: 0.2, // Shorter
      rotation: 3, // Less rotation
      yoyo: true,
      repeat: 2, // Less repeats
      ease: "sine.inOut"
    });
  }, [createConfetti, showFloatingMessage]);

  // Improved shake detection
  const setupShakeDetection = useCallback(() => {
    if (typeof window === 'undefined' || !window.DeviceMotionEvent) {
      console.log("Device motion not supported");
      return;
    }

    const shakeThreshold = 15; // sensitivity
    const minShakeInterval = 2000; // minimum time between shakes (ms)
    let lastShakeTime = 0;

    const handleDeviceMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const currentTime = Date.now();
      
      // Prevent too frequent shaking
      if (currentTime - lastShakeTime < minShakeInterval) return;

      const { x, y, z } = acceleration;
      
      // Calculate total force
      const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);
      
      // Check if it's a shake (high force)
      if (totalForce > shakeThreshold) {
        console.log("Shake detected with force:", totalForce);
        lastShakeTime = currentTime;
        handleShake();
      }
    };

    // Request permission for iOS 13+
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion, false);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS devices
      window.addEventListener('devicemotion', handleDeviceMotion, false);
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [handleShake]);

  // 3. FIXED Long Press for Mobile
  const handleLongPress = useCallback(() => {
    console.log("⏰ Long press easter egg!");
    const surpriseImages = funnyImages.length > 0 ? funnyImages : [""];
    const randomImage = surpriseImages[Math.floor(Math.random() * surpriseImages.length)];
    
    updateState({ 
      currentImage: randomImage,
      currentMessage: "Long press magic! 🎩✨",
      showSurprise: true
    });
    
    if (surpriseModalRef.current) {
      gsap.fromTo(surpriseModalRef.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" } // Shorter
      );
    }
  }, [funnyImages, updateState]);

  // Fixed Long Press Handlers
  const handlePressStart = useCallback((event) => {
    event.stopPropagation();
    
    // Clear any existing timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    
    // Set new timer for long press (800ms for better mobile experience)
    longPressTimerRef.current = setTimeout(() => {
      handleLongPress();
    }, 800);
  }, [handleLongPress]);

  const handlePressEnd = useCallback((event) => {
    event.stopPropagation();
    
    // Clear the long press timer if it exists
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  // 4. FIXED Double Tap on Progress Bar
  const handleProgressBarTap = useCallback((event) => {
    event.stopPropagation();
    
    const currentTime = Date.now();
    if (currentTime - lastTapTimeRef.current < 500) { // Double tap within 500ms
      console.log("🦄 Unicorn mode activated!");
      activateUnicornMode();
    }
    lastTapTimeRef.current = currentTime;
  }, []);

  // Mode functions - more subtle dramatic mode
  const activateComfortMode = useCallback(() => {
    if (comfortModeActivated.current) return;
    comfortModeActivated.current = true;
    updateState({ comfortMode: true, dramaticMode: false, unicornMode: false });

    gsap.to("body", {
      duration: 3, // Shorter
      background: `linear-gradient(135deg, #ffb6c1 0%, #ffd1dc 50%, #e6e6fa 100%)`, // Simpler gradient
      ease: "sine.inOut"
    });

    gsap.to(timerRef.current, {
      duration: 4, // Slower
      y: -5, // Less movement
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Add floating hearts - fewer
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        showFloatingMessage("💖");
      }, i * 600);
    }
  }, [updateState, showFloatingMessage]);

  const activateDramaticMode = useCallback(() => {
    if (dramaticModeActivated.current) return;
    dramaticModeActivated.current = true;
    updateState({ dramaticMode: true, comfortMode: false, unicornMode: false });

    // More subtle background animation
    gsap.to("body", {
      duration: 4,
      background: `linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`, // Darker, more dramatic
      ease: "power2.inOut"
    });

    // Add subtle sparkle effects to time units
    updateState({
      sparkleUnits: { days: true, hours: true, minutes: true, seconds: true }
    });

    // Subtle pulse effect instead of flashy animation
    gsap.to(timerRef.current, {
      duration: 2,
      scale: 1.02,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, [updateState]);

  const activateUnicornMode = useCallback(() => {
    if (unicornModeActivated.current) return;
    unicornModeActivated.current = true;
    updateState({ unicornMode: true, comfortMode: false, dramaticMode: false });

    gsap.to("body", {
      duration: 3,
      background: `linear-gradient(135deg, #ffafbd 0%, #ffc3a0 50%, #a0c4ff 100%)`, // Simpler gradient
      ease: "sine.inOut"
    });

    // Create fewer unicorns
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createUnicorn();
      }, i * 1500);
    }

    // Add fewer messages
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        showFloatingMessage(["🌈", "🦄", "✨", "🌟"][i]);
      }, i * 600);
    }
  }, [updateState, createUnicorn, showFloatingMessage]);

  const getRandomSurprise = useCallback(() => {
    if (funnyImages.length === 0) return { image: "", message: "You're amazing! 😊" };
    const randomImageIndex = Math.floor(Math.random() * funnyImages.length);
    const randomMessageIndex = Math.floor(Math.random() * comfortingMessages.length);
    
    return {
      image: funnyImages[randomImageIndex],
      message: comfortingMessages[randomMessageIndex]
    };
  }, [funnyImages, comfortingMessages]);

  const redirectToBirthdayPage = useCallback((event) => {
    if (event) {
      event.stopPropagation();
    }
    navigate("/birthday-special");
  }, [navigate]);

  const handleSurpriseClick = useCallback((event) => {
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
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" } // Shorter
      );
    }
  }, [state.isButtonEnabled, getRandomSurprise, redirectToBirthdayPage, updateState]);

  const closeSurpriseModal = useCallback((event) => {
    if (event) {
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

  // Main useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      updateState({ timeLeft: newTimeLeft });
      
      if (isLastHour(newTimeLeft) && !comfortModeActivated.current) activateComfortMode();
      else if (isLast3Hours(newTimeLeft) && !dramaticModeActivated.current && !comfortModeActivated.current) activateDramaticMode();
    }, 1000);

    intervalsRef.current.push(timer);

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

    // Setup shake detection
    const cleanupShake = setupShakeDetection();

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
      if (cleanupShake) cleanupShake();
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [calculateTimeLeft, isLastHour, isLast3Hours, activateComfortMode, activateDramaticMode, setupShakeDetection]);

  useEffect(() => {
    if (state.isButtonEnabled) {
      createConfetti();
      
      // More subtle celebration background
      gsap.to("body", {
        duration: 4,
        background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
        ease: "sine.inOut"
      });

      // More subtle time unit animation
      gsap.to(".time-unit", {
        duration: 1.5,
        scale: 1.1, // Less scale
        rotation: 180, // Less rotation
        stagger: 0.2,
        repeat: 1, // Less repeats
        yoyo: true
      });
      
      gsap.to(timerRef.current, {
        scale: 1.05, // Less scale
        duration: 1,
        yoyo: true,
        repeat: 1, // Less repeats
        ease: "sine.inOut"
      });

      setTimeout(() => {
        if (birthdayButtonRef.current) {
          gsap.fromTo(birthdayButtonRef.current,
            { opacity: 0, scale: 0, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)" } // Shorter
          );
        }
      }, 500);
    }
  }, [state.isButtonEnabled, createConfetti]);

  const { 
    timeLeft, isButtonEnabled, showSurprise, currentImage, currentMessage, 
    magicalMessages, comfortMode, dramaticMode, unicornMode, sparkleUnits
  } = state;

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
        comfortMode ? 'comfort-mode' :
        dramaticMode ? 'dramatic-mode' : // Changed from emergency-mode
        unicornMode ? 'unicorn-mode' :
        'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600'
      }`}
    >
      {/* Animation Container */}
      <div ref={fairyContainerRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Mode Alerts - More subtle */}
      {comfortMode && (
        <div className="comfort-alert fixed top-0 left-0 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white text-center py-2 font-semibold text-sm z-40">
          💖 Almost There! {timeLeft.minutes}m {timeLeft.seconds}s To Go! 💖
        </div>
      )}

      {dramaticMode && (
        <div className="dramatic-alert fixed top-0 left-0 w-full bg-gradient-to-r from-yellow-600 to-red-600 text-white text-center py-2 font-semibold text-sm z-40">
          ⚡ {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s Until Birthday! ⚡
        </div>
      )}

      {unicornMode && (
        <div className="unicorn-alert fixed top-0 left-0 w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center py-2 font-semibold text-sm z-40">
          🦄 Magical Countdown Activated! 🦄
        </div>
      )}

      {/* Floating Messages */}
      {magicalMessages.map(message => (
        <div
          key={message.id}
          className="magical-message fixed text-white text-base font-semibold text-center bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 z-30 shadow-lg"
          style={{
            top: message.top,
            left: message.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {message.text}
        </div>
      ))}

      {/* Simple Easter Egg Hint */}
      <div className="fixed bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-xs max-w-xs z-30">
        <p className="font-bold mb-1">🎮 Mobile Easter Eggs:</p>
        <ul className="space-y-0.5">
          <li>• Triple tap title</li>
          <li>• Shake phone</li>
          <li>• Long press timer</li>
        </ul>
      </div>

      {/* Main Timer Container */}
      <div 
        ref={timerRef}
        className={`timer-container relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 rounded-2xl p-6 md:p-8 shadow-xl border backdrop-blur-lg ${
          comfortMode 
            ? 'bg-white/30 border-white/40' 
            : dramaticMode 
            ? 'bg-gray-900/40 border-yellow-500/30 dramatic-glow'
            : unicornMode
            ? 'bg-white/30 border-purple-300/40'
            : 'bg-gradient-to-br from-white/20 via-pink-100/20 to-purple-100/20 border-white/30'
        }`}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd} // Important for mobile
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        style={{ touchAction: 'manipulation', userSelect: 'none' }}
      >
        {/* Header with Title Tap */}
        <div className="text-center space-y-3">
          <div 
            className="flex justify-center items-center space-x-3 cursor-pointer select-none"
            onClick={handleTitleTap}
            style={{ touchAction: 'manipulation', userSelect: 'none' }}
          >
            <span className="text-3xl">🎂</span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent select-none">
              {comfortMode ? 'Almost There! 💫' :
               dramaticMode ? 'Final Countdown!' : // Less dramatic
               unicornMode ? 'Magical Countdown 🦄' :
               'Birthday Countdown!'}
            </h1>
            <span className="text-3xl">🎁</span>
          </div>
          <p className="text-white text-base md:text-lg max-w-md font-medium">
            {comfortMode 
              ? `You're doing amazing! ${timeLeft.minutes}m ${timeLeft.seconds}s to go! 💖` 
              : dramaticMode 
              ? `⚡ ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s left! ⚡` 
              : unicornMode
              ? `🦄 ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s! 🦄`
              : "Counting down to November 4th, 2025! 🎈"
            }
          </p>
          <p className="text-pink-200 text-sm md:text-base">
            For my awesome little sister! 💖
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
            sparkle={sparkleUnits.days}
          />
          <TimeUnit 
            label="Hours"
            value={timeLeft.hours}
            color="from-pink-500 to-purple-500"
            unitRef={hoursRef}
            comfortMode={comfortMode}
            dramaticMode={dramaticMode}
            sparkle={sparkleUnits.hours}
          />
          <TimeUnit 
            label="Minutes"
            value={timeLeft.minutes}
            color="from-indigo-500 to-blue-400"
            unitRef={minutesRef}
            comfortMode={comfortMode}
            dramaticMode={dramaticMode}
            sparkle={sparkleUnits.minutes}
          />
          <TimeUnit 
            label="Seconds"
            value={timeLeft.seconds}
            color="from-green-400 to-teal-400"
            unitRef={secondsRef}
            comfortMode={comfortMode}
            dramaticMode={dramaticMode}
            sparkle={sparkleUnits.seconds}
          />
        </div>

        {/* Progress Bar with Double Tap */}
        <div 
          className="w-full max-w-md mt-2" 
          onClick={handleProgressBarTap} 
          style={{ touchAction: 'manipulation', userSelect: 'none' }}
        >
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
                  ? 'bg-gradient-to-r from-yellow-400 to-red-500'
                  : unicornMode
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400'
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
          <button 
            onClick={handleSurpriseClick}
            type="button"
            className={`surprise-btn w-full px-5 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 select-none ${
              isButtonEnabled 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 cursor-pointer' 
                : comfortMode
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white cursor-pointer hover:scale-105'
                : dramaticMode
                ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white cursor-pointer hover:scale-105'
                : unicornMode
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white cursor-pointer hover:scale-105'
                : 'bg-white/30 text-white cursor-pointer hover:scale-105'
            }`}
            style={{ touchAction: 'manipulation', userSelect: 'none' }}
          >
            {comfortMode ? '💖 You Are Amazing! 💖' : 
             dramaticMode ? '⚡ Final Stretch! ⚡' : 
             unicornMode ? '🦄 Magical Surprise! 🦄' :
             isButtonEnabled ? 'View Surprises!' : 'Get Random Surprise!'}
          </button>

          {isButtonEnabled && (
            <button 
              ref={birthdayButtonRef}
              onClick={redirectToBirthdayPage}
              type="button"
              className="birthday-special-btn w-full px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-yellow-300 select-none"
              style={{ touchAction: 'manipulation', userSelect: 'none' }}
            >
              🎊 Enter Birthday Celebration! 🎊
            </button>
          )}
        </div>

        {/* Status Message */}
        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-white text-sm md:text-base italic">
            {comfortMode 
              ? `You're handling the wait like a champion! 💫` 
              : dramaticMode
              ? `⚡ ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s remaining! ⚡`
              : unicornMode
              ? `🦄 Magic is building! ${timeLeft.days} days until your special day! 🦄`
              : isButtonEnabled 
              ? "🎉 IT'S YOUR BIRTHDAY! Click to celebrate! 🎉" 
              : `Only ${timeLeft.days} days until November 4th, 2025! 🎈`
            }
          </p>
        </div>

        {/* Floating Elements - Fewer and more subtle */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(comfortMode ? 8 : dramaticMode ? 10 : unicornMode ? 12 : 6)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute text-base opacity-40" // Smaller, more transparent
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`, // Slower
              }}
            >
              {comfortMode 
                ? ['💖', '⭐', '✨'][i % 3]
                : dramaticMode 
                ? ['⚡', '🌟', '🎯'][i % 3]
                : unicornMode
                ? ['🦄', '🌈', '✨'][i % 3]
                : ['🎈', '🎂', '🎁'][i % 3]
              }
            </div>
          ))}
        </div>
      </div>

      {/* SURPRISE MODAL */}
      {showSurprise && (
        <div 
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4" // Less opaque
          style={{ touchAction: 'manipulation' }}
        >
          <div 
            ref={surpriseModalRef}
            className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto"
          >
            <div className="text-center mb-4 md:mb-6 px-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2"> {/* Smaller */}
                {isButtonEnabled ? "Happy Birthday! 🎉" : currentMessage}
              </h3>
            </div>

            <div className="flex-1 w-full flex items-center justify-center p-2 md:p-4 max-h-[60vh]">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt="Funny surprise" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-xl" // Smaller shadow
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg">
                  <p className="text-gray-600 font-bold text-lg">🎁 Loading... 🎁</p> {/* Smaller */}
                </div>
              )}
            </div>

            <div className="text-center my-4 md:my-6 px-4">
              <p className="text-white text-sm md:text-base"> {/* Smaller */}
                {isButtonEnabled 
                  ? "Ready for your birthday adventure?" 
                  : "Found a secret surprise! 😄"
                }
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3 justify-center items-center px-4 pb-4 md:pb-8">
              <button 
                onClick={isButtonEnabled ? redirectToBirthdayPage : closeSurpriseModal}
                type="button"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-base hover:scale-105 transition-transform min-h-[50px] flex items-center justify-center" // Smaller font
                style={{ touchAction: 'manipulation' }}
              >
                {isButtonEnabled ? "Let's Go! 🎊" : "Close"}
              </button>
              {isButtonEnabled && (
                <button 
                  onClick={redirectToBirthdayPage}
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold text-base hover:scale-105 transition-transform min-h-[50px] flex items-center justify-center" // Smaller font
                  style={{ touchAction: 'manipulation' }}
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
          50% { transform: translateY(-8px) rotate(3deg); } // Less movement
        }
        
        @keyframes dramatic-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.01); opacity: 0.9; } // Very subtle
        }
        
        @keyframes dramatic-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(255, 255, 0, 0.3); }
          50% { box-shadow: 0 0 25px rgba(255, 255, 0, 0.5); } // More subtle
        }
        
        @keyframes comfort-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 182, 193, 0.3); }
          50% { box-shadow: 0 0 30px rgba(135, 206, 235, 0.3); }
        }
        
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.7; } // Less opaque
          100% { transform: translateY(-150px) rotate(360deg); opacity: 0; } // Less movement
        }
        
        .floating-element {
          animation: float 4s ease-in-out infinite; // Slower
        }
        
        .dramatic-mode {
          animation: dramatic-pulse 3s ease-in-out infinite; // Slower
        }
        
        .dramatic-glow {
          animation: dramatic-glow 3s ease-in-out infinite; // Slower
        }
        
        .comfort-glow {
          animation: comfort-glow 3s ease-in-out infinite; // Slower
        }
        
        .dramatic-alert {
          animation: dramatic-pulse 2s ease-in-out infinite; // Slower
        }
        
        .comfort-alert {
          animation: comfort-glow 3s ease-in-out infinite; // Slower
        }
        
        .confetti {
          animation: confetti-fall 1.5s ease-out forwards; // Shorter
        }
        
        .magical-message {
          animation: float 4s ease-in-out infinite; // Slower
        }
        
        /* Prevent blue highlight on mobile taps */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}