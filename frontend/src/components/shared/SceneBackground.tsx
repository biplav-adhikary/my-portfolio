import type { SceneTone } from "./SectionWrapper";
import { useTheme } from "../../context/ThemeContext";

/* ------------------------------------------------------------------ */
/*  Scene background configs                                            */
/*  Each scene defines layered gradients that create depth and          */
/*  atmosphere without competing with content.                         */
/* ------------------------------------------------------------------ */

interface SceneConfig {
  /** Base vertical gradient (bottom layer) */
  base: string;
  /** Optional radial glow for organic asymmetry */
  radial?: string;
  /** Top edge fade — blends into section above */
  topFade: string;
  /** Bottom edge fade — blends into section below */
  bottomFade: string;
}

/* ---- Light scenes ---- */
const lightScenes: Record<SceneTone, SceneConfig> = {
  sky: {
    base: "bg-gradient-to-b from-sky-100 via-sky-50 to-cloud-100",
    topFade: "from-transparent",
    bottomFade: "from-transparent",
  },
  warmNeutral: {
    base: "bg-gradient-to-b from-[#eef4f7] via-[#f0ece0] to-[#e6eaed]",
    radial:
      "radial-gradient(ellipse 70% 50% at 75% 20%, rgba(254, 249, 195, 0.14) 0%, transparent 70%)",
    topFade: "from-[#eef4f7]",
    bottomFade: "from-transparent to-[#e6eaed]",
  },
  cloudGlass: {
    base: "bg-gradient-to-b from-[#e6eaed] via-[#ecf1f6] to-[#eae5d8]",
    radial:
      "radial-gradient(ellipse 60% 45% at 25% 60%, rgba(186, 230, 253, 0.14) 0%, transparent 70%)",
    topFade: "from-[#e6eaed]",
    bottomFade: "from-transparent to-[#eae5d8]",
  },
  earth: {
    base: "bg-gradient-to-b from-[#eae5d8] via-[#e8e0ca] to-[#e3d9c0]",
    radial:
      "radial-gradient(ellipse 55% 40% at 70% 30%, rgba(253, 230, 138, 0.12) 0%, transparent 65%)",
    topFade: "from-[#eae5d8]",
    bottomFade: "from-transparent to-[#e3d9c0]",
  },
  openAir: {
    base: "bg-gradient-to-b from-[#e3d9c0] via-[#e4ecdf] to-[#e8f0f5]",
    radial:
      "radial-gradient(ellipse 65% 50% at 30% 50%, rgba(187, 247, 208, 0.09) 0%, transparent 60%)",
    topFade: "from-[#e3d9c0]",
    bottomFade: "from-transparent to-[#e8f0f5]",
  },
  sunset: {
    base: "bg-gradient-to-b from-[#e8f0f5] via-[#f0e8d4] to-[#e8dcc6]",
    radial:
      "radial-gradient(ellipse 70% 55% at 50% 70%, rgba(253, 186, 116, 0.14) 0%, transparent 65%)",
    topFade: "from-[#e8f0f5]",
    bottomFade: "from-transparent to-[#e8dcc6]",
  },
};

/* ---- Dark scenes — night sky → deep forest → warm fire arc ---- */
const darkScenes: Record<SceneTone, SceneConfig> = {
  sky: {
    base: "bg-gradient-to-b from-[#0c1222] via-[#0f172a] to-[#131c31]",
    topFade: "from-transparent",
    bottomFade: "from-transparent",
  },
  warmNeutral: {
    base: "bg-gradient-to-b from-[#0f172a] via-[#141e33] to-[#161f2e]",
    radial:
      "radial-gradient(ellipse 70% 50% at 75% 20%, rgba(253, 186, 116, 0.05) 0%, transparent 70%)",
    topFade: "from-[#0f172a]",
    bottomFade: "from-transparent to-[#161f2e]",
  },
  cloudGlass: {
    base: "bg-gradient-to-b from-[#161f2e] via-[#131b2e] to-[#151d2d]",
    radial:
      "radial-gradient(ellipse 60% 45% at 25% 60%, rgba(56, 189, 248, 0.04) 0%, transparent 70%)",
    topFade: "from-[#161f2e]",
    bottomFade: "from-transparent to-[#151d2d]",
  },
  earth: {
    base: "bg-gradient-to-b from-[#151d2d] via-[#1a1f2e] to-[#1c1f28]",
    radial:
      "radial-gradient(ellipse 55% 40% at 70% 30%, rgba(253, 230, 138, 0.04) 0%, transparent 65%)",
    topFade: "from-[#151d2d]",
    bottomFade: "from-transparent to-[#1c1f28]",
  },
  openAir: {
    base: "bg-gradient-to-b from-[#1c1f28] via-[#162029] to-[#131c2a]",
    radial:
      "radial-gradient(ellipse 65% 50% at 30% 50%, rgba(74, 222, 128, 0.03) 0%, transparent 60%)",
    topFade: "from-[#1c1f28]",
    bottomFade: "from-transparent to-[#131c2a]",
  },
  sunset: {
    base: "bg-gradient-to-b from-[#131c2a] via-[#1a1825] to-[#1c1520]",
    radial:
      "radial-gradient(ellipse 70% 55% at 50% 70%, rgba(253, 186, 116, 0.07) 0%, transparent 65%)",
    topFade: "from-[#131c2a]",
    bottomFade: "from-transparent to-[#1c1520]",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
interface SceneBackgroundProps {
  scene: SceneTone;
}

export default function SceneBackground({ scene }: SceneBackgroundProps) {
  const { theme } = useTheme();
  const config = theme === "dark" ? darkScenes[scene] : lightScenes[scene];

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Base gradient */}
      <div className={`absolute inset-0 ${config.base}`} />

      {/* Layer 2: Radial glow (organic asymmetry) */}
      {config.radial && (
        <div
          className="absolute inset-0"
          style={{ background: config.radial }}
        />
      )}

      {/* Layer 3: Top transition edge — blends with section above */}
      <div
        className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${config.topFade} to-transparent md:h-32`}
      />

      {/* Layer 4: Bottom transition edge — blends with section below */}
      <div
        className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent ${config.bottomFade} md:h-32`}
      />
    </div>
  );
}
