import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const particleHostRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveFromRoute = useCallback(() => {
    const idx = items.findIndex((item) => {
      if (item.href === "/") return location.pathname === "/";
      return location.pathname.startsWith(item.href);
    });
    return idx >= 0 ? idx : initialActiveIndex;
  }, [items, location.pathname, initialActiveIndex]);

  const [activeIndex, setActiveIndex] = useState(getActiveFromRoute);

  useEffect(() => {
    setActiveIndex(getActiveFromRoute());
  }, [getActiveFromRoute]);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (hostEl) => {
    const d = particleDistances;
    const r = particleR;
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("gooey-particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty(
          "--color",
          `var(--color-${p.color}, #8b5cf6)`,
        );
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("gooey-point");
        particle.appendChild(point);
        hostEl.appendChild(particle);
        setTimeout(() => {
          try {
            hostEl.removeChild(particle);
          } catch {
            // already removed
          }
        }, t);
      }, 30);
    }
  };

  const updateParticleHostPosition = (liEl) => {
    if (!containerRef.current || !particleHostRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = liEl.getBoundingClientRect();
    Object.assign(particleHostRef.current.style, {
      left: `${pos.x - containerRect.x + pos.width / 2}px`,
      top: `${pos.y - containerRect.y + pos.height / 2}px`,
    });
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);

    if (items[index]?.href) {
      navigate(items[index].href);
    }

    // Fire particles from the clicked item
    updateParticleHostPosition(liEl);
    if (particleHostRef.current) {
      const old = particleHostRef.current.querySelectorAll(".gooey-particle");
      old.forEach((p) => {
        try {
          particleHostRef.current.removeChild(p);
        } catch {}
      });
      makeParticles(particleHostRef.current);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl, preventDefault: () => {} }, index);
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateParticleHostPosition(activeLi);
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi =
        navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateParticleHostPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          :root {
            --color-1: #8b5cf6;
            --color-2: #6366f1;
            --color-3: #a78bfa;
            --color-4: #c4b5fd;
          }

          .gooey-particle-host {
            position: absolute;
            width: 0;
            height: 0;
            pointer-events: none;
            z-index: 10;
          }

          .gooey-particle,
          .gooey-point {
            display: block;
            opacity: 0;
            width: 14px;
            height: 14px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .gooey-particle {
            --time: 1200ms;
            position: absolute;
            top: -7px;
            left: -7px;
            animation: gooey-particle-move var(--time) ease 1 forwards;
          }
          .gooey-point {
            background: var(--color);
            opacity: 1;
            animation: gooey-point-scale var(--time) ease 1 forwards;
          }

          @keyframes gooey-particle-move {
            0% {
              transform: rotate(0deg) translate(var(--start-x), var(--start-y));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 0;
            }
          }

          @keyframes gooey-point-scale {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            20% {
              opacity: 1;
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }

          .gooey-nav-container li {
            position: relative;
          }
          .gooey-nav-container li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: linear-gradient(135deg, #8b5cf6, #6366f1);
            opacity: 0;
            transform: scale(0.85);
            transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: -1;
          }
          .gooey-nav-container li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          .gooey-nav-container li.active {
            color: white !important;
            text-shadow: none;
          }
        `}
      </style>
      <div className="gooey-nav-container relative" ref={containerRef}>
        <nav className="flex relative">
          <ul
            ref={navRef}
            className="flex gap-2 list-none p-0 px-2 m-0 relative z-[3]"
          >
            {items.map((item, index) => (
              <li
                key={index}
                onClick={(e) => handleClick(e, index)}
                className={`rounded-lg relative cursor-pointer transition-colors duration-300 text-slate-700 dark:text-slate-200 ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <a
                  href={item.href}
                  onClick={(e) => e.preventDefault()}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="outline-none py-[0.6em] px-[1em] inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap relative z-[1]"
                >
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="gooey-particle-host" ref={particleHostRef} />
      </div>
    </>
  );
};

export default GooeyNav;
