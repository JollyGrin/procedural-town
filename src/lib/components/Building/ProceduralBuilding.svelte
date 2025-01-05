<script lang="ts">
  import { T } from "@threlte/core";
  import Floor from "./Floor.svelte";
  import { random, generateColorFamily } from "./utils";
  import { BUILDING_CONFIG } from "./types";
  import type { FloorConfig } from "./types";

  export let position: number[] = [0, 0, 0];
  export let seed: number = Math.random() * 10000;

  // Base colors
  const baseColor = 0x754e1a;
  const baseOutline = 0x123524;
  const baseTopColor = 0x16c47f;

  // Building configuration
  const numFloors = Math.floor(
    random(BUILDING_CONFIG.MIN_FLOORS, BUILDING_CONFIG.MAX_FLOORS, seed),
  );

  const baseWidth = random(
    BUILDING_CONFIG.MIN_WIDTH,
    BUILDING_CONFIG.MAX_WIDTH,
    seed + 1,
  );

  const baseDepth = random(
    BUILDING_CONFIG.MIN_DEPTH,
    BUILDING_CONFIG.MAX_DEPTH,
    seed + 2,
  );

  // Generate floors
  const floors: FloorConfig[] = [];
  let currentHeight = 0;

  for (let i = 0; i < numFloors; i++) {
    const floorSeed = seed + i;
    const isSetback =
      random(0, 1, floorSeed) > BUILDING_CONFIG.SETBACK_THRESHOLD &&
      i > numFloors * BUILDING_CONFIG.SETBACK_HEIGHT_THRESHOLD;

    const width = isSetback
      ? baseWidth * BUILDING_CONFIG.SETBACK_SCALE
      : baseWidth;
    const depth = isSetback
      ? baseDepth * BUILDING_CONFIG.SETBACK_SCALE
      : baseDepth;
    const height = random(
      BUILDING_CONFIG.MIN_HEIGHT,
      BUILDING_CONFIG.MAX_HEIGHT,
      floorSeed,
    );

    const xOffset = isSetback
      ? random(
          -BUILDING_CONFIG.POSITION_VARIATION,
          BUILDING_CONFIG.POSITION_VARIATION,
          floorSeed,
        )
      : 0;

    const zOffset = isSetback
      ? random(
          -BUILDING_CONFIG.POSITION_VARIATION,
          BUILDING_CONFIG.POSITION_VARIATION,
          floorSeed,
        )
      : 0;

    floors.push({
      width,
      depth,
      height,
      color: generateColorFamily(
        baseColor,
        BUILDING_CONFIG.COLOR_VARIATION,
        floorSeed,
      ),
      outlineColor: generateColorFamily(
        baseOutline,
        BUILDING_CONFIG.COLOR_VARIATION,
        floorSeed,
      ),
      topFaceColor: generateColorFamily(
        baseTopColor,
        BUILDING_CONFIG.COLOR_VARIATION,
        floorSeed,
      ),
      offset: [
        position[0] + xOffset,
        position[1] + currentHeight,
        position[2] + zOffset,
      ],
    });

    currentHeight += height;
  }

  const [x, y, z] = position;
</script>

<T.Group scale={0.5} position={[x * 0.5, 0.5 * y + 0.2, z * 0.5]}>
  {#each floors as floorConfig, i (i)}
    <Floor config={floorConfig} />
  {/each}
</T.Group>
