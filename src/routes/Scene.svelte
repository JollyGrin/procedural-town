<script lang="ts">
  import Cube from "$lib/components/Cube.svelte";
  import Camera from "./Camera.svelte";
  import Lights from "./Lights.svelte";
  import ProceduralBuilding from "$lib/components/Building/ProceduralBuilding.svelte";
  import Person from "$lib/components/Building/Person.svelte";

  export let seed: number = 0;

  const alignConst = -1;

  function generateGrid(size: number, _seed: number) {
    return Array.from({ length: size }, (_, z) =>
      Array.from({ length: size }, (_, x) => ({
        position: [alignConst + x, 0, alignConst + z],
        type: Math.random() > 0.7 ? "building" : "cube", // Randomly assign a building
      })),
    ).flat();
  }

  $: tiles = generateGrid(3, seed);
</script>

<Lights />
<Camera />

{#each tiles as { position, type }, index}
  {#if type === "building"}
    <ProceduralBuilding
      position={[position[0], position[1], position[2]]}
      seed={index + 1000 * seed}
    />
    <Person {position} />
  {/if}
  <Cube {position} />
{/each}
