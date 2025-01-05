<script lang="ts">
  import { T } from "@threlte/core";
  import { BoxGeometry, MeshBasicMaterial } from "three";
  import type { FloorConfig } from "./types";

  export let config: FloorConfig;

  const { width, depth, height, color, outlineColor, topFaceColor, offset } =
    config;

  const colorHex = "#" + color.toString(16).padStart(6, "0");

  const COLOR = colorHex;

  const materials = Array.from({ length: 6 }).map(
    () =>
      new MeshBasicMaterial({
        color: COLOR,
      }),
  );
  materials[2].color.set(COLOR);
  materials.forEach((material) => material.color.set(COLOR));

  const boxGeometry = new BoxGeometry(width, height, depth);
</script>

<T.Mesh position={offset} material={materials}>
  <T.BoxGeometry args={[width, height, depth]} />
</T.Mesh>
<T.LineSegments position={offset}>
  <T.EdgesGeometry attach="geometry" args={[boxGeometry]} />
  <T.LineBasicMaterial color={outlineColor} linewidth={1} />
</T.LineSegments>
