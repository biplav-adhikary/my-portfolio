import type { SceneTone } from "./SectionWrapper";

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

const scenes: Record<SceneTone, SceneConfig> = {
  /* Hero handles its own background inline — this is a fallback */
  sky: {
    base: "bg-gradient-to-b from-sky-100 via-sky-50 to-cloud-100",
    topFade: "from-transparent",
    bottomFade: "from-transparent",
  },

  /* About: soft landing from sky, warm neutral plateau */
  warmNeutral: {
    base: "bg-gradient-to-b from-sky-50 via-[#fefcf7] to-white",
    radial:
      "radial-gradient(ellipse 70% 50% at 75% 20%, rgba(254, 249, 195, 0.12) 0%, transparent 70%)",
    topFade: "from-sky-50",
    bottomFade: "from-transparent to-white",
  },

  /* Projects: gentle mist, cards float on glass */
  cloudGlass: {
    base: "bg-gradient-to-b from-white via-sky-50/40 to-[#fefdf8]",
    radial:
      "radial-gradient(ellipse 60% 45% at 25% 60%, rgba(186, 230, 253, 0.10) 0%, transparent 70%)",
    topFade: "from-white",
    bottomFade: "from-transparent to-[#fefdf8]",
  },

  /* Experience: grounded warmth, earth and amber */
  earth: {
    base: "bg-gradient-to-b from-[#fefdf8] via-[#fef9ee] to-[#f5f5f0]",
    radial:
      "radial-gradient(ellipse 55% 40% at 70% 30%, rgba(253, 230, 138, 0.10) 0%, transparent 65%)",
    topFade: "from-[#fefdf8]",
    bottomFade: "from-transparent to-[#f5f5f0]",
  },

  /* Skills: bright clearing, open air */
  openAir: {
    base: "bg-gradient-to-b from-[#f5f5f0] via-[#f8fcf9] to-sky-50/30",
    radial:
      "radial-gradient(ellipse 65% 50% at 30% 50%, rgba(187, 247, 208, 0.08) 0%, transparent 60%)",
    topFade: "from-[#f5f5f0]",
    bottomFade: "from-transparent to-sky-50/30",
  },

  /* Contact: golden hour, warm sunset wrap */
  sunset: {
    base: "bg-gradient-to-b from-sky-50/30 via-[#fefbf0] to-[#fef6e4]",
    radial:
      "radial-gradient(ellipse 70% 55% at 50% 70%, rgba(253, 186, 116, 0.12) 0%, transparent 65%)",
    topFade: "from-sky-50/30",
    bottomFade: "from-transparent to-[#fef6e4]",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
interface SceneBackgroundProps {
  scene: SceneTone;
}

export default function SceneBackground({ scene }: SceneBackgroundProps) {
  const config = scenes[scene];

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
