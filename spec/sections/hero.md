# Hero Section

## Purpose

The first thing anyone sees. It should set the entire emotional tone in under 3 seconds — before a single word is read.

This is not an info dump. It's a _moment of arrival_.

## The Feeling

You've just crested a hill. The sky opens up. The air is soft. Somewhere in the distance, there are green hills and slow-moving clouds. A name appears — not shouted, but written gently in the landscape.

## Content

- **Name**: Biplav
- **Role line**: "Software engineer who thinks in systems. Frontend is home."
- **Sub-line**: "Building things that connect — platforms, people, ideas."
- **CTAs**: Two soft buttons — one to projects ("See my work"), one to about ("About me"). Neither should feel urgent.

### Tone Notes

The role line leads with the broader identity (software engineer) and signals systems thinking as the primary trait. "Frontend is home" anchors the primary strength without boxing the profile. It says: I work across the stack, but I'm deliberate about where I go deepest.

The sub-line ties the technical (platforms) to the human (people, ideas), hinting at the connected-accounting domain without naming it.

Alternate role lines considered:

- "Frontend engineer who thinks in systems" — strong, but reads as frontend-only
- "Full-stack engineer" — generic, dilutes frontend credibility
- "Building platforms that make business connections seamless" — too specific, reads like a product tagline
- "Software engineer. Frontend-focused, system-minded." — close, but slightly stiff

## Atmosphere

- **Background**: A layered sky-to-ground gradient. Not flat — it should have depth.
- **Clouds**: Soft, slow-moving shapes. CSS or SVG. They should feel like they belong, not like stickers pasted on.
- **Hills/Landscape**: Layered SVG silhouettes at the bottom. Multiple depths to create parallax potential.
- **Floating elements**: Something organic — dandelion seeds, petals, or dust motes. Very subtle. More felt than seen.

## Behavior

- On scroll, the text fades and lifts. The landscape shifts slightly (parallax).
- On load, elements appear in a gentle stagger — not all at once, not with a loading screen.
- The section should feel alive even when you're not scrolling.
- **Scroll invitation**: after the stagger completes, a subtle downward indicator appears (a soft bouncing chevron, a drifting dandelion seed moving down, or a gentle opacity pulse on the landscape edge). This signals "there's more below" without being a literal arrow. It fades away once the user begins scrolling.
- **CTA scroll behavior**: the "See my work" and "About me" buttons smooth-scroll to their target sections (~700ms, ease-out). The scroll should feel like the landscape is carrying you forward.

## What to Avoid

- Stock hero images
- Animated typewriter effects on the name
- "Welcome to my portfolio" language
- Heavy 3D or WebGL (beautiful but wrong tone)
- Auto-playing anything

## Open Questions

- Should the hero have a day/night cycle based on time of visit?
- Should clouds cast subtle shadows on the landscape?
- ~~How much vertical space should the hero claim below the fold?~~ **Decided: full viewport height (100vh).** The hero is a scene, not a banner. It should command the full screen on arrival.
