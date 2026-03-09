import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import { Eye, EyeOff, Sparkles, ArrowRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Module-level mouse — ONE passive listener, ZERO React re-renders ─── */
const mousePos = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    },
    { passive: true },
  );
}

/* ─── Floating Particle ─── */
const FloatingParticle = ({ delay, duration, x, y, size }) => (
  <motion.div
    className="absolute rounded-full bg-white/20"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, x, y }}
    animate={{
      opacity: [0, 0.6, 0],
      y: [y, y - 120],
      x: [x, x + (Math.random() - 0.5) * 40],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ─── Pupil — self-contained RAF loop, ZERO re-renders for mouse ─── */
const Pupil = memo(
  ({
    size = 12,
    maxDistance = 5,
    pupilColor = "black",
    forceLookX,
    forceLookY,
  }) => {
    const ref = useRef(null);
    const forceRef = useRef({ x: forceLookX, y: forceLookY });
    forceRef.current = { x: forceLookX, y: forceLookY };

    useEffect(() => {
      let raf;
      const loop = () => {
        const el = ref.current;
        if (el) {
          const { x: fx, y: fy } = forceRef.current;
          let tx, ty;
          if (fx !== undefined && fy !== undefined) {
            tx = fx;
            ty = fy;
          } else {
            const r = el.getBoundingClientRect();
            const dx = mousePos.x - (r.left + r.width / 2);
            const dy = mousePos.y - (r.top + r.height / 2);
            const dist = Math.min(Math.hypot(dx, dy), maxDistance);
            const a = Math.atan2(dy, dx);
            tx = Math.cos(a) * dist;
            ty = Math.sin(a) * dist;
          }
          el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [maxDistance]);

    return (
      <div
        ref={ref}
        className="rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: pupilColor,
          willChange: "transform",
        }}
      />
    );
  },
);

/* ─── EyeBall — self-contained RAF loop for inner pupil ─── */
const EyeBall = memo(
  ({
    size = 48,
    pupilSize = 16,
    maxDistance = 10,
    eyeColor = "white",
    pupilColor = "black",
    isBlinking = false,
    forceLookX,
    forceLookY,
  }) => {
    const eyeRef = useRef(null);
    const innerRef = useRef(null);
    const forceRef = useRef({ x: forceLookX, y: forceLookY });
    forceRef.current = { x: forceLookX, y: forceLookY };

    useEffect(() => {
      let raf;
      const loop = () => {
        const eye = eyeRef.current;
        const inner = innerRef.current;
        if (eye && inner) {
          const { x: fx, y: fy } = forceRef.current;
          let tx, ty;
          if (fx !== undefined && fy !== undefined) {
            tx = fx;
            ty = fy;
          } else {
            const r = eye.getBoundingClientRect();
            const dx = mousePos.x - (r.left + r.width / 2);
            const dy = mousePos.y - (r.top + r.height / 2);
            const dist = Math.min(Math.hypot(dx, dy), maxDistance);
            const a = Math.atan2(dy, dx);
            tx = Math.cos(a) * dist;
            ty = Math.sin(a) * dist;
          }
          inner.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [maxDistance]);

    return (
      <div
        ref={eyeRef}
        className="rounded-full flex items-center justify-center"
        style={{
          width: `${size}px`,
          height: isBlinking ? "2px" : `${size}px`,
          backgroundColor: eyeColor,
          overflow: "hidden",
          transition: "height 0.15s ease",
        }}
      >
        {!isBlinking && (
          <div
            ref={innerRef}
            className="rounded-full"
            style={{
              width: `${pupilSize}px`,
              height: `${pupilSize}px`,
              backgroundColor: pupilColor,
              willChange: "transform",
            }}
          />
        )}
      </div>
    );
  },
);

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function AnimatedCharactersLoginPage({
  onLogin,
  onGoogleSignIn,
  onSignUp,
  isLoading: externalLoading,
  error: externalError,
  brandName = "Darśana",
  brandTagline = "A Gateway to Indian Philosophy",
  brandDescription = "Embark on a journey of discovery. Log in or sign up to explore the profound depths of Darśana.",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [internalError, setInternalError] = useState("");
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);

  // Character body refs
  const purpleRef = useRef(null);
  const blackRef = useRef(null);
  const yellowRef = useRef(null);
  const orangeRef = useRef(null);
  // Face container refs (for direct DOM updates)
  const purpleFaceRef = useRef(null);
  const blackFaceRef = useRef(null);
  const orangeFaceRef = useRef(null);
  const yellowFaceRef = useRef(null);
  const yellowMouthRef = useRef(null);

  const error = externalError || internalError;
  const isLoading = externalLoading;

  /* ─── RAF loop for character body transforms & face positions ─── */
  const stateRef = useRef({});
  stateRef.current = {
    isTyping,
    showPassword,
    passwordLen: password.length,
    isLookingAtEachOther,
  };

  useEffect(() => {
    let raf;
    const calcPos = (el) => {
      if (!el) return { faceX: 0, faceY: 0, bodySkew: 0 };
      const r = el.getBoundingClientRect();
      const dx = mousePos.x - (r.left + r.width / 2);
      const dy = mousePos.y - (r.top + r.height / 3);
      return {
        faceX: Math.max(-15, Math.min(15, dx / 20)),
        faceY: Math.max(-10, Math.min(10, dy / 30)),
        bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
      };
    };

    const loop = () => {
      const s = stateRef.current;

      // ── Batch-read all positions (one layout pass) ──
      const pp = calcPos(purpleRef.current);
      const bp = calcPos(blackRef.current);
      const op = calcPos(orangeRef.current);
      const yp = calcPos(yellowRef.current);

      // ── Batch-write all DOM updates ──
      // Purple body
      if (purpleRef.current) {
        purpleRef.current.style.transform =
          s.passwordLen > 0 && s.showPassword
            ? "skewX(0deg)"
            : s.isTyping || (s.passwordLen > 0 && !s.showPassword)
              ? `skewX(${(pp.bodySkew || 0) - 12}deg) translateX(40px)`
              : `skewX(${pp.bodySkew || 0}deg)`;
      }
      if (purpleFaceRef.current) {
        purpleFaceRef.current.style.left =
          s.passwordLen > 0 && s.showPassword
            ? "20px"
            : s.isLookingAtEachOther
              ? "55px"
              : `${45 + pp.faceX}px`;
        purpleFaceRef.current.style.top =
          s.passwordLen > 0 && s.showPassword
            ? "35px"
            : s.isLookingAtEachOther
              ? "65px"
              : `${40 + pp.faceY}px`;
      }
      // Black body
      if (blackRef.current) {
        blackRef.current.style.transform =
          s.passwordLen > 0 && s.showPassword
            ? "skewX(0deg)"
            : s.isLookingAtEachOther
              ? `skewX(${(bp.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
              : s.isTyping || (s.passwordLen > 0 && !s.showPassword)
                ? `skewX(${(bp.bodySkew || 0) * 1.5}deg)`
                : `skewX(${bp.bodySkew || 0}deg)`;
      }
      if (blackFaceRef.current) {
        blackFaceRef.current.style.left =
          s.passwordLen > 0 && s.showPassword
            ? "10px"
            : s.isLookingAtEachOther
              ? "32px"
              : `${26 + bp.faceX}px`;
        blackFaceRef.current.style.top =
          s.passwordLen > 0 && s.showPassword
            ? "28px"
            : s.isLookingAtEachOther
              ? "12px"
              : `${32 + bp.faceY}px`;
      }
      // Orange body
      if (orangeRef.current) {
        orangeRef.current.style.transform =
          s.passwordLen > 0 && s.showPassword
            ? "skewX(0deg)"
            : `skewX(${op.bodySkew || 0}deg)`;
      }
      if (orangeFaceRef.current) {
        orangeFaceRef.current.style.left =
          s.passwordLen > 0 && s.showPassword
            ? "50px"
            : `${82 + (op.faceX || 0)}px`;
        orangeFaceRef.current.style.top =
          s.passwordLen > 0 && s.showPassword
            ? "85px"
            : `${90 + (op.faceY || 0)}px`;
      }
      // Yellow body
      if (yellowRef.current) {
        yellowRef.current.style.transform =
          s.passwordLen > 0 && s.showPassword
            ? "skewX(0deg)"
            : `skewX(${yp.bodySkew || 0}deg)`;
      }
      if (yellowFaceRef.current) {
        yellowFaceRef.current.style.left =
          s.passwordLen > 0 && s.showPassword
            ? "20px"
            : `${52 + (yp.faceX || 0)}px`;
        yellowFaceRef.current.style.top =
          s.passwordLen > 0 && s.showPassword
            ? "35px"
            : `${40 + (yp.faceY || 0)}px`;
      }
      if (yellowMouthRef.current) {
        yellowMouthRef.current.style.left =
          s.passwordLen > 0 && s.showPassword
            ? "10px"
            : `${40 + (yp.faceX || 0)}px`;
        yellowMouthRef.current.style.top =
          s.passwordLen > 0 && s.showPassword
            ? "88px"
            : `${88 + (yp.faceY || 0)}px`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Blinking effect for purple character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Blinking effect for black character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Looking at each other when typing
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  // Purple peeking when password visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(
          () => {
            setIsPurplePeeking(true);
            setTimeout(() => setIsPurplePeeking(false), 800);
          },
          Math.random() * 3000 + 2000,
        );
        return peekInterval;
      };
      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      setIsPurplePeeking(false);
    }
  }, [password, showPassword, isPurplePeeking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInternalError("");

    if (!isLogin && !displayName) {
      setInternalError("Please enter your full name.");
      return;
    }

    if (isLogin && onLogin) {
      await onLogin(email, password);
    } else if (!isLogin && onSignUp) {
      await onSignUp(email, password, displayName);
    }
  };

  const handleGoogleClick = async () => {
    if (onGoogleSignIn) {
      await onGoogleSignIn();
    }
  };

  /* ─── Floating particles data ─── */
  const particles = [
    { delay: 0, duration: 6, x: 60, y: 300, size: 4 },
    { delay: 1.2, duration: 7, x: 200, y: 350, size: 3 },
    { delay: 2.5, duration: 5, x: 350, y: 280, size: 5 },
    { delay: 0.8, duration: 8, x: 120, y: 400, size: 3 },
    { delay: 3.1, duration: 6, x: 420, y: 320, size: 4 },
    { delay: 1.8, duration: 7, x: 280, y: 380, size: 3 },
    { delay: 4.0, duration: 5.5, x: 80, y: 250, size: 4 },
    { delay: 2.2, duration: 6.5, x: 380, y: 220, size: 3 },
  ];

  return (
    <div className="dark min-h-screen grid lg:grid-cols-[1.1fr_1fr] overflow-hidden">
      {/* ════════════ LEFT — Animated Characters Panel ════════════ */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #4f46e5 0%, #7c3aed 35%, #6d28d9 65%, #4338ca 100%)",
          }}
        />
        {/* Mesh overlay for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(at 20% 80%, rgba(139,92,246,0.6) 0, transparent 50%), radial-gradient(at 80% 20%, rgba(99,102,241,0.5) 0, transparent 50%), radial-gradient(at 50% 50%, rgba(124,58,237,0.3) 0, transparent 70%)",
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}

        {/* Glow orbs */}
        <motion.div
          className="absolute top-1/4 right-1/6 w-72 h-72 bg-violet-400/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/6 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Brand header */}
        <motion.div
          className="relative z-20 p-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              {brandName}
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="relative z-20 px-10 -mt-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-md">
            {brandTagline}
          </h2>
          <p className="mt-3 text-white/50 text-sm max-w-sm leading-relaxed">
            {brandDescription}
          </p>
        </motion.div>

        {/* Characters area */}
        <div className="relative z-20 flex items-end justify-center h-[420px] px-6">
          <div className="relative" style={{ width: "550px", height: "400px" }}>
            {/* Purple character */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-[height] duration-700 ease-in-out"
              style={{
                left: "70px",
                width: "180px",
                height:
                  isTyping || (password.length > 0 && !showPassword)
                    ? "440px"
                    : "400px",
                backgroundColor: "#6C3FF5",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transformOrigin: "bottom center",
                willChange: "transform",
                transition: "height 0.7s ease-in-out, transform 0.15s ease-out",
              }}
            >
              <div
                ref={purpleFaceRef}
                className="absolute flex gap-8"
                style={{
                  left: "45px",
                  top: "40px",
                  transition: "left 0.15s ease-out, top 0.15s ease-out",
                }}
              >
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
              </div>
            </div>

            {/* Black character */}
            <div
              ref={blackRef}
              className="absolute bottom-0"
              style={{
                left: "240px",
                width: "120px",
                height: "310px",
                backgroundColor: "#2D2D2D",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transformOrigin: "bottom center",
                willChange: "transform",
                transition: "transform 0.15s ease-out",
              }}
            >
              <div
                ref={blackFaceRef}
                className="absolute flex gap-6"
                style={{
                  left: "26px",
                  top: "32px",
                  transition: "left 0.15s ease-out, top 0.15s ease-out",
                }}
              >
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? 0
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? -4
                        : undefined
                  }
                />
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? 0
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? -4
                        : undefined
                  }
                />
              </div>
            </div>

            {/* Orange character */}
            <div
              ref={orangeRef}
              className="absolute bottom-0"
              style={{
                left: "0px",
                width: "240px",
                height: "200px",
                zIndex: 3,
                backgroundColor: "#FF9B6B",
                borderRadius: "120px 120px 0 0",
                transformOrigin: "bottom center",
                willChange: "transform",
                transition: "transform 0.15s ease-out",
              }}
            >
              <div
                ref={orangeFaceRef}
                className="absolute flex gap-8"
                style={{
                  left: "82px",
                  top: "90px",
                  transition: "left 0.12s ease-out, top 0.12s ease-out",
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={
                    password.length > 0 && showPassword ? -5 : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword ? -4 : undefined
                  }
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={
                    password.length > 0 && showPassword ? -5 : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword ? -4 : undefined
                  }
                />
              </div>
            </div>

            {/* Yellow character */}
            <div
              ref={yellowRef}
              className="absolute bottom-0"
              style={{
                left: "310px",
                width: "140px",
                height: "230px",
                backgroundColor: "#E8D754",
                borderRadius: "70px 70px 0 0",
                zIndex: 4,
                transformOrigin: "bottom center",
                willChange: "transform",
                transition: "transform 0.15s ease-out",
              }}
            >
              <div
                ref={yellowFaceRef}
                className="absolute flex gap-6"
                style={{
                  left: "52px",
                  top: "40px",
                  transition: "left 0.12s ease-out, top 0.12s ease-out",
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={
                    password.length > 0 && showPassword ? -5 : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword ? -4 : undefined
                  }
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={
                    password.length > 0 && showPassword ? -5 : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword ? -4 : undefined
                  }
                />
              </div>
              {/* Mouth */}
              <div
                ref={yellowMouthRef}
                className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full"
                style={{
                  left: "40px",
                  top: "88px",
                  transition: "left 0.12s ease-out, top 0.12s ease-out",
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="relative z-20 p-10 flex items-center gap-6 text-xs text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>© 2025 {brandName}</span>
          <span className="flex items-center gap-1.5">
            <Shield className="size-3" /> Secure Authentication
          </span>
        </motion.div>
      </div>

      {/* ════════════ RIGHT — Form Panel ════════════ */}
      <div className="relative flex items-center justify-center p-6 sm:p-8 bg-[#020617] overflow-hidden">
        {/* Subtle radial glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="w-full max-w-[440px] relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile Brand */}
          <motion.div
            className="lg:hidden flex items-center justify-center gap-2.5 mb-10"
            variants={itemVariants}
          >
            <div className="size-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Sparkles className="size-4.5 text-violet-400" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              {brandName}
            </span>
          </motion.div>

          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-slate-400 text-sm">
              {isLogin
                ? "Enter your credentials to continue"
                : "Sign up to begin your journey"}
            </p>
          </motion.div>

          {/* glassmorphism card */}
          <motion.div
            className="rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm p-6 sm:p-8"
            variants={itemVariants}
          >
            {/* Animated Tabs */}
            <div className="relative flex bg-slate-800/60 rounded-2xl p-1 mb-7">
              {["Login", "Sign Up"].map((tab, idx) => {
                const active = idx === 0 ? isLogin : !isLogin;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setIsLogin(idx === 0);
                      setInternalError("");
                    }}
                    className="relative z-10 flex-1 py-2.5 text-sm font-semibold transition-colors duration-200"
                    style={{ color: active ? "#fff" : "#94a3b8" }}
                  >
                    {active && (
                      <motion.div
                        layoutId="auth-tab-pill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/20"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pb-1">
                      <Label
                        htmlFor="displayName"
                        className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="e.g., Veerpal Singh"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                        className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className="h-12 pr-11 rounded-xl bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-slate-600 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal cursor-pointer text-slate-400"
                    >
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  >
                    Forgot?
                  </a>
                </div>
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl font-medium text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/35 transition-all duration-200"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {isLogin ? "Log in" : "Create Account"}
                      <ArrowRight className="size-4" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <span className="mx-4 text-slate-500 font-medium text-xs uppercase tracking-wider">
                or continue with
              </span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>

            {/* Google */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-slate-200 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200"
                type="button"
                onClick={handleGoogleClick}
                disabled={isLoading}
              >
                <svg className="mr-2.5 w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6.02C43.41 37.01 47 31.17 47 24.55z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6.02c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                Google
              </Button>
            </motion.div>
          </motion.div>

          {/* Toggle text */}
          <motion.p
            className="text-center text-sm text-slate-500 mt-7"
            variants={itemVariants}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setInternalError("");
              }}
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              {isLogin ? "Sign Up" : "Log in"}
            </button>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
