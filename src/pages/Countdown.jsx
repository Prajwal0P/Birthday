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
    magicalMessages: [],
    nightMode: false,
    tapCount: 0,
    shakeCount: 0,
    hiddenSpotTapCount: 0,
    multiTapCount: 0,
    titleTapSequence: [],
    numberTapCount: 0
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
  const comfortModeActivated = useRef(false);
  const dramaticModeActivated = useRef(false);
  const intervalsRef = useRef([]);
  
  // Mobile-friendly tap tracking refs
  const lastTapTimeRef = useRef(0);
  const lastMultiTapTimeRef = useRef(0);
  const lastHiddenTapTimeRef = useRef(0);
  const lastNumberTapTimeRef = useRef(0);
  const touchStartRef = useRef(null);

  // Memoized constants
  const funnyImages = useMemo(() => images || [], []);

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

  // Animation functions
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
      fairy.style.zIndex = '1000';
      fairy.style.pointerEvents = 'none';
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
            fairyContainer.removeChild(fairy);
          }
        }
      });
    }
  }, []);

  const createConfetti = useCallback(() => {
    if (!fairyContainerRef.current) return;
    const container = fairyContainerRef.current;
    const confettiCount = 50;
    const emojis = ['🎉', '✨', '🎊', '💖', '🌟', '🥳', '🎂', '🍰'];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.position = 'absolute';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.fontSize = `${Math.random() * 20 + 15}px`;
      confetti.style.opacity = '0';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      confetti.className = 'confetti';
      container.appendChild(confetti);

      gsap.to(confetti, {
        duration: Math.random() * 2 + 1,
        y: -200,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 720,
        opacity: 1,
        ease: "power1.out",
        onComplete: () => {
          if (confetti.parentNode === container) {
            container.removeChild(confetti);
          }
        }
      });
    }
  }, []);

  const createFlyingEmojis = useCallback(() => {
    if (!fairyContainerRef.current) return;
    const container = fairyContainerRef.current;
    const emojiCount = 20;
    const emojis = ['🎉', '✨', '💖', '🌟', '🥳', '🎂', '🍰', '😄', '🎁', '⭐'];

    for (let i = 0; i < emojiCount; i++) {
      const emoji = document.createElement('div');
      emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = 'absolute';
      emoji.style.left = `${Math.random() * 100}%`;
      emoji.style.top = `${Math.random() * 100}%`;
      emoji.style.fontSize = `${Math.random() * 25 + 20}px`;
      emoji.style.opacity = '0';
      emoji.style.zIndex = '1000';
      emoji.style.pointerEvents = 'none';
      emoji.className = 'flying-emoji';
      container.appendChild(emoji);

      gsap.to(emoji, {
        duration: Math.random() * 3 + 2,
        y: -150,
        x: Math.random() * 300 - 150,
        rotation: Math.random() * 360,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
          if (emoji.parentNode === container) {
            container.removeChild(emoji);
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

    // Auto-remove after 5 seconds
    setTimeout(() => {
      updateState(prev => ({
        magicalMessages: prev.magicalMessages.filter(msg => msg.id !== newMessage.id)
      }));
    }, 5000);
  }, [updateState]);

  // Easter Egg Functions - SIMPLIFIED AND MOBILE-FRIENDLY
  const triggerTapCakeSurprise = useCallback(() => {
    console.log("🎂 Cake tap surprise triggered!");
    createConfetti();
    showFloatingMessage("Whoa! You're smashing the cake with your fingers! 🍰😂");
    
    gsap.to(".timer-container", {
      duration: 0.5,
      scale: 1.1,
      rotation: 5,
      yoyo: true,
      repeat: 2,
      ease: "elastic.out(1, 0.5)"
    });
  }, [createConfetti, showFloatingMessage]);

  const triggerShakeSurprise = useCallback(() => {
    console.log("📱 Shake surprise triggered!");
    createFlyingEmojis();
    showFloatingMessage("Shake it like a polaroid picture! 📱✨");
    
    gsap.to("body", {
      duration: 0.3,
      rotation: 1,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    });
  }, [createFlyingEmojis, showFloatingMessage]);

  const triggerHiddenSpotSurprise = useCallback(() => {
    console.log("🔍 Hidden spot surprise triggered!");
    const surpriseImages = funnyImages.length > 0 ? funnyImages : [""];
    const randomImage = surpriseImages[Math.floor(Math.random() * surpriseImages.length)];
    
    updateState({ 
      currentImage: randomImage,
      currentMessage: "Caught you snooping! Here's a secret pic 🤪",
      showSurprise: true
    });
    
    if (surpriseModalRef.current) {
      gsap.fromTo(surpriseModalRef.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [funnyImages, updateState]);

  const triggerMultiTapSurprise = useCallback(() => {
    console.log("👆 Multi-tap surprise triggered!");
    const surpriseImages = funnyImages.length > 0 ? funnyImages : [""];
    const randomImage = surpriseImages[Math.floor(Math.random() * surpriseImages.length)];
    const sillyMessages = [
      "Wow, you're tap-happy! 🎉",
      "Tap dancing much? 💃",
      "Finger workout complete! 💪",
      "You've got the magic touch! ✨",
      "Tap master level unlocked! 🏆"
    ];
    const randomMessage = sillyMessages[Math.floor(Math.random() * sillyMessages.length)];
    
    updateState({ 
      currentImage: randomImage,
      currentMessage: randomMessage,
      showSurprise: true
    });
    
    if (surpriseModalRef.current) {
      gsap.fromTo(surpriseModalRef.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [funnyImages, updateState]);

  const triggerSecretSequence = useCallback(() => {
    console.log("🎮 Secret sequence triggered!");
    createFairyDust();
    showFloatingMessage("Secret sequence activated! 🎮✨");
    
    gsap.to(".time-unit", {
      duration: 1,
      y: -20,
      scale: 1.2,
      stagger: 0.1,
      ease: "back.out(1.7)",
      repeat: 1,
      yoyo: true
    });
  }, [createFairyDust, showFloatingMessage]);

  const triggerCountdownEasterEgg = useCallback(() => {
    console.log("⏰ Countdown easter egg triggered!");
    const messages = [
      "Trying to speed up time? Not today, time traveler! ⏳😂",
      "Patience, young padawan! The force will be with you soon! 🌌",
      "Time can't be rushed! But your birthday is worth the wait! 🎂",
      "No fast-forwarding allowed! Enjoy the anticipation! 🎊"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showFloatingMessage(randomMessage);
    
    gsap.to(".time-unit", {
      duration: 0.5,
      y: 10,
      stagger: 0.1,
      ease: "bounce.out",
      repeat: 1,
      yoyo: true
    });
  }, [showFloatingMessage]);

  const triggerSwipeSurprise = useCallback(() => {
    console.log("⬇️ Swipe surprise triggered!");
    updateState({ nightMode: true });
    showFloatingMessage("Late-night party mode activated! 🌙✨");
    
    gsap.to("body", {
      duration: 2,
      background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
      ease: "sine.inOut"
    });

    // Create floating stars
    if (fairyContainerRef.current) {
      const container = fairyContainerRef.current;
      const starCount = 25;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.fontSize = `${Math.random() * 15 + 10}px`;
        star.style.opacity = '0';
        star.style.zIndex = '1000';
        star.style.pointerEvents = 'none';
        star.className = 'floating-star';
        container.appendChild(star);

        gsap.to(star, {
          duration: Math.random() * 4 + 3,
          y: -50,
          x: Math.random() * 100 - 50,
          rotation: Math.random() * 360,
          opacity: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }
  }, [updateState, showFloatingMessage]);

  // Mobile-friendly event handlers
  const handleCakeTap = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const currentTime = Date.now();
    if (currentTime - lastTapTimeRef.current > 1000) {
      // Reset if more than 1 second between taps
      updateState({ tapCount: 1 });
    } else {
      // Increment tap count
      updateState(prev => ({ tapCount: prev.tapCount + 1 }));
    }
    lastTapTimeRef.current = currentTime;

    console.log(`🎂 Cake taps: ${state.tapCount + 1}`);

    // Trigger after 3 taps (more mobile-friendly)
    if (state.tapCount >= 2) { // 3 taps total (0,1,2)
      triggerTapCakeSurprise();
      updateState({ tapCount: 0 });
    }
  }, [state.tapCount, triggerTapCakeSurprise, updateState]);

  const handleHiddenSpotTap = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const currentTime = Date.now();
    if (currentTime - lastHiddenTapTimeRef.current > 2000) {
      updateState({ hiddenSpotTapCount: 1 });
    } else {
      updateState(prev => ({ hiddenSpotTapCount: prev.hiddenSpotTapCount + 1 }));
    }
    lastHiddenTapTimeRef.current = currentTime;

    console.log(`🔍 Hidden spot taps: ${state.hiddenSpotTapCount + 1}`);

    if (state.hiddenSpotTapCount >= 2) { // 3 taps
      triggerHiddenSpotSurprise();
      updateState({ hiddenSpotTapCount: 0 });
    }
  }, [state.hiddenSpotTapCount, triggerHiddenSpotSurprise, updateState]);

  const handleMultiTap = useCallback((event) => {
    // Don't trigger if clicking buttons
    if (event.target.closest('button')) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    const currentTime = Date.now();
    if (currentTime - lastMultiTapTimeRef.current > 1000) {
      updateState({ multiTapCount: 1 });
    } else {
      updateState(prev => ({ multiTapCount: prev.multiTapCount + 1 }));
    }
    lastMultiTapTimeRef.current = currentTime;

    console.log(`👆 Multi-taps: ${state.multiTapCount + 1}`);

    if (state.multiTapCount >= 4) { // 5 taps total
      triggerMultiTapSurprise();
      updateState({ multiTapCount: 0 });
    }
  }, [state.multiTapCount, triggerMultiTapSurprise, updateState]);

  const handleTitleTap = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const rect = event.currentTarget.getBoundingClientRect();
    const tapPosition = event.clientX < rect.left + rect.width / 2 ? 'left' : 'right';
    
    updateState(prev => {
      const newSequence = [...prev.titleTapSequence, tapPosition].slice(-4);
      console.log(`🎮 Title tap sequence: ${newSequence.join(',')}`);
      
      if (newSequence.join(',') === 'left,right,left,right') {
        triggerSecretSequence();
        return { ...prev, titleTapSequence: [] };
      }
      
      return { ...prev, titleTapSequence: newSequence };
    });

    // Clear sequence after 3 seconds
    setTimeout(() => updateState({ titleTapSequence: [] }), 3000);
  }, [triggerSecretSequence, updateState]);

  const handleNumberTap = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const currentTime = Date.now();
    if (currentTime - lastNumberTapTimeRef.current > 2000) {
      updateState({ numberTapCount: 1 });
    } else {
      updateState(prev => ({ numberTapCount: prev.numberTapCount + 1 }));
    }
    lastNumberTapTimeRef.current = currentTime;

    console.log(`⏰ Number taps: ${state.numberTapCount + 1}`);

    if (state.numberTapCount >= 3) { // 4 taps
      triggerCountdownEasterEgg();
      updateState({ numberTapCount: 0 });
    }
  }, [state.numberTapCount, triggerCountdownEasterEgg, updateState]);

  // Mobile-friendly shake detection
  const handleShake = useCallback(() => {
    const newShakeCount = state.shakeCount + 1;
    updateState({ shakeCount: newShakeCount });
    
    console.log(`📱 Shake count: ${newShakeCount}`);

    if (newShakeCount >= 2) { // 3 shakes
      triggerShakeSurprise();
      updateState({ shakeCount: 0 });
    }
    
    // Reset shake count after 3 seconds
    setTimeout(() => updateState({ shakeCount: 0 }), 3000);
  }, [state.shakeCount, triggerShakeSurprise, updateState]);

  // Mobile-friendly swipe detection
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return;
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    };
    
    const swipeDistance = {
      x: touchEnd.x - touchStartRef.current.x,
      y: touchEnd.y - touchStartRef.current.y
    };
    
    const swipeTime = touchEnd.time - touchStartRef.current.time;

    console.log(`⬇️ Swipe detected: ${Math.abs(swipeDistance.y)}px in ${swipeTime}ms`);

    if (swipeTime < 500 && Math.abs(swipeDistance.y) > 100 && Math.abs(swipeDistance.x) < 50) {
      if (swipeDistance.y > 0) { // Swipe down
        triggerSwipeSurprise();
      }
    }
    
    touchStartRef.current = null;
  }, [triggerSwipeSurprise]);

  // Original functions (keep these)
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
        text: "You're doing amazing! Almost there! 💫",
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`
      };
      updateState(prev => ({ 
        magicalMessages: [...prev.magicalMessages.slice(-3), newMessage] 
      }));
      messageIndex++;
    }, 8000);

    intervalsRef.current.push(messageInterval);
  }, [updateState]);

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
      event.preventDefault();
      event.stopPropagation();
    }
    navigate("/birthday-special");
  }, [navigate]);

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

    // Mobile shake detection
    let lastAcceleration = { x: 0, y: 0, z: 0 };
    const handleDeviceMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      
      const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
      const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
      const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);
      
      const totalMovement = deltaX + deltaY + deltaZ;
      
      if (totalMovement > 25) {
        console.log(`📱 Shake detected: ${totalMovement}`);
        handleShake();
      }
      
      lastAcceleration = acceleration;
    };
    
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleDeviceMotion);
      }
    };
  }, [calculateTimeLeft, isLastHour, isLast3Hours, activateComfortMode, activateDramaticMode, handleShake]);

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
    magicalMessages, comfortMode, dramaticMode, nightMode
  } = state;

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
        comfortMode ? 'comfort-mode' :
        dramaticMode ? 'emergency-mode' :
        nightMode ? 'night-mode' :
        'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleMultiTap}
    >
      {/* Animation Container */}
      <div ref={fairyContainerRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Hidden Spot Easter Egg - Larger and more visible for mobile */}
      <div 
        className="fixed top-6 left-6 w-6 h-6 bg-yellow-400 rounded-full opacity-60 cursor-pointer z-50 shadow-lg"
        onClick={handleHiddenSpotTap}
        title="Tap me 3 times!"
        style={{ touchAction: 'manipulation' }}
      />

      {/* Mode Alerts */}
      {comfortMode && (
        <div className="comfort-alert fixed top-0 left-0 w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white text-center py-3 font-bold text-lg z-40">
          💖 You're Amazing! {timeLeft.minutes}m {timeLeft.seconds}s Until Your Special Day! 💖
        </div>
      )}

      {dramaticMode && (
        <div className="emergency-alert fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 font-bold text-lg z-40 animate-pulse">
          🚨 BIRTHDAY COUNTDOWN CRITICAL! {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s REMAINING! 🚨
        </div>
      )}

      {nightMode && (
        <div className="night-alert fixed top-0 left-0 w-full bg-purple-600 text-white text-center py-2 font-bold text-lg z-40">
          🌙 Late-Night Party Mode Activated! ✨
        </div>
      )}

      {/* Floating Messages */}
      {magicalMessages.map(message => (
        <div
          key={message.id}
          className="magical-message fixed text-white text-lg font-bold text-center bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 z-30 shadow-lg"
          style={{
            top: message.top,
            left: message.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {message.text}
        </div>
      ))}

      {/* Easter Egg Instructions - Mobile Friendly */}
      <div className="fixed bottom-4 left-4 bg-black/70 text-white px-4 py-3 rounded-lg text-sm max-w-xs z-30">
        <p className="font-bold mb-2">🎮 Easter Eggs:</p>
        <ul className="text-xs space-y-1">
          <li>• Tap cake 3 times</li>
          <li>• Shake phone</li>
          <li>• Tap yellow dot 3 times</li>
          <li>• Tap anywhere 5 times</li>
          <li>• Swipe down</li>
        </ul>
      </div>

      {/* Main Timer Container */}
      <div 
        ref={timerRef}
        className={`timer-container relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 md:space-y-8 rounded-2xl p-6 md:p-8 shadow-xl border backdrop-blur-lg ${
          comfortMode 
            ? 'bg-white/40 border-white/50 comfort-glow' 
            : dramaticMode 
            ? 'bg-red-500/20 border-red-500/50 emergency-glow'
            : nightMode
            ? 'bg-gray-800/60 border-purple-500/50 night-glow'
            : 'bg-gradient-to-br from-white/20 via-pink-100/20 to-purple-100/20 border-white/30'
        }`}
        onClick={handleCakeTap}
        style={{ touchAction: 'manipulation' }}
      >
        {/* Header with Title Tap */}
        <div className="text-center space-y-3">
          <div 
            className="flex justify-center items-center space-x-3 cursor-pointer"
            onClick={handleTitleTap}
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-3xl">🎂</span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {comfortMode ? 'Almost There! 💫' :
               dramaticMode ? 'EMERGENCY COUNTDOWN!' :
               nightMode ? 'LATE-NIGHT PARTY! 🌙' :
               'Birthday Countdown!'}
            </h1>
            <span className="text-3xl">🎁</span>
          </div>
          <p className="text-white text-base md:text-lg max-w-md font-medium">
            {comfortMode 
              ? `You're doing amazing! ${timeLeft.minutes}m ${timeLeft.seconds}s to go! 💖` 
              : dramaticMode 
              ? `🚨 CRITICAL: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s LEFT! 🚨` 
              : nightMode
              ? "The party never stops! Keep celebrating! 🌟"
              : "Counting down to November 4th, 2025! Get ready! 🎈"
            }
          </p>
          <p className="text-pink-200 text-sm md:text-base">
            For my awesome little sister! 💖
          </p>
        </div>

        {/* Time Units with Number Tap */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {[daysRef, hoursRef, minutesRef, secondsRef].map((ref, index) => (
            <div 
              key={index} 
              onClick={handleNumberTap}
              style={{ touchAction: 'manipulation' }}
              className="cursor-pointer"
            >
              <TimeUnit 
                label={["Days", "Hours", "Minutes", "Seconds"][index]}
                value={[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][index]}
                color={[
                  "from-purple-500 to-blue-500",
                  "from-pink-500 to-purple-500", 
                  "from-indigo-500 to-blue-400",
                  "from-green-400 to-teal-400"
                ][index]}
                unitRef={ref}
                comfortMode={comfortMode}
                dramaticMode={dramaticMode}
              />
            </div>
          ))}
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
                  : nightMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
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
            className={`surprise-btn w-full px-5 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 ${
              isButtonEnabled 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 cursor-pointer' 
                : comfortMode
                ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white cursor-pointer hover:scale-105 comfort-glow'
                : dramaticMode
                ? 'bg-red-500 text-white cursor-pointer hover:scale-105 animate-pulse'
                : nightMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-pointer hover:scale-105 night-glow'
                : 'bg-white/30 text-white cursor-pointer hover:scale-105'
            }`}
            style={{ touchAction: 'manipulation' }}
          >
            {comfortMode ? '💖 You Are Amazing! 💖' : 
             dramaticMode ? '🚨 GET READY! 🚨' : 
             nightMode ? '🌙 Party Surprise! 🌙' :
             isButtonEnabled ? 'View Surprises!' : 'Get Random Surprise!'}
          </button>

          {isButtonEnabled && (
            <button 
              ref={birthdayButtonRef}
              onClick={redirectToBirthdayPage}
              type="button"
              className="birthday-special-btn w-full px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-yellow-300"
              style={{ touchAction: 'manipulation' }}
            >
              🎊 Enter Birthday Wonderland! 🎊
            </button>
          )}
        </div>

        {/* Easter Egg Hint */}
        {!isButtonEnabled && !dramaticMode && !comfortMode && !nightMode && (
          <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm max-w-md">
            <p className="text-white text-sm italic">
              Try tapping, shaking, or swiping for surprises! 🎉
            </p>
          </div>
        )}

        {/* Status Message */}
        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-white text-sm md:text-base italic">
            {comfortMode 
              ? `You're handling the wait like a champion! 💫` 
              : dramaticMode
              ? `🚨 ALERT: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s REMAINING! 🚨`
              : nightMode
              ? `The stars are shining bright for you! ✨ ${timeLeft.days} days to go!`
              : isButtonEnabled 
              ? "🎉 IT'S YOUR BIRTHDAY! Click to celebrate! 🎉" 
              : `Only ${timeLeft.days} days until November 4th, 2025! 🎈`
            }
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(comfortMode ? 15 : dramaticMode ? 20 : nightMode ? 25 : 12)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute text-lg opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: comfortMode ? '1.2rem' : dramaticMode ? '1.5rem' : nightMode ? '1.1rem' : '1rem',
                opacity: comfortMode ? 0.6 : dramaticMode ? 0.8 : nightMode ? 0.7 : 0.5
              }}
            >
              {comfortMode 
                ? ['💖', '⭐', '✨', '🌟', '🎀'][i % 5]
                : dramaticMode 
                ? ['🚨', '⚠️', '💥', '🎊', '🔥', '⚡'][i % 6]
                : nightMode
                ? ['🌙', '⭐', '✨', '🌟', '💫', '🌠'][i % 6]
                : ['🎈', '🎂', '🎁', '⭐'][i % 4]
              }
            </div>
          ))}
        </div>
      </div>

      {/* SURPRISE MODAL */}
      {showSurprise && (
        <div 
          className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-4"
          style={{ touchAction: 'manipulation' }}
        >
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
                type="button"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-transform min-h-[50px] flex items-center justify-center"
                style={{ touchAction: 'manipulation' }}
              >
                {isButtonEnabled ? "Let's Go! 🎊" : "Close"}
              </button>
              {isButtonEnabled && (
                <button 
                  onClick={redirectToBirthdayPage}
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-transform min-h-[50px] flex items-center justify-center"
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
        
        @keyframes night-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
          50% { box-shadow: 0 0 50px rgba(236, 72, 153, 0.5); }
        }
        
        @keyframes fairy-dust {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-200px) rotate(720deg); opacity: 0; }
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
        
        .night-glow {
          animation: night-glow 2s ease-in-out infinite;
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
        
        .confetti {
          animation: confetti-fall 2s ease-out forwards;
        }
        
        .flying-emoji {
          animation: fairy-dust 3s ease-out forwards;
        }
        
        .floating-star {
          animation: float 4s ease-in-out infinite;
        }
        
        .magical-message {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}