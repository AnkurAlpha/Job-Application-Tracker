import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../theme/useTheme.js";

export default function ParticlesBackground() {
  const { isDark } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: isDark ? 44 : 50,
          density: { enable: true, area: 900 },
        },
        color: { value: isDark ? "#67e8f9" : "#0f766e" },
        links: {
          enable: true,
          distance: 145,
          color: isDark ? "#334155" : "#94a3b8",
          opacity: isDark ? 0.23 : 0.17,
          width: 1,
        },
        move: {
          enable: true,
          speed: isDark ? 0.4 : 0.45,
          outModes: { default: "out" },
        },
        opacity: {
          value: isDark ? 0.2 : 0.15,
        },
        size: {
          value: { min: 0.8, max: 2.8 },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: { enable: true, mode: "repulse" },
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          repulse: {
            distance: 140,
            duration: 0.45,
          },
          grab: {
            distance: 150,
            links: { opacity: isDark ? 0.32 : 0.24 },
          },
        },
      },
      pauseOnBlur: true,
      background: {
        opacity: 0,
      },
    }),
    [isDark]
  );

  if (!ready) return null;

  return (
    <div className="particles-layer" aria-hidden="true">
      <Particles id="app-particles" options={options} />
    </div>
  );
}

