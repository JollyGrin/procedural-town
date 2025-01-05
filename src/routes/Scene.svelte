<script lang="ts">
  import Cube from "$lib/components/Cube.svelte";
  import Building from "$lib/components/Building/Building.svelte";
  import Stones from "$lib/components/Stones.svelte";
  import Text from "$lib/components/Text.svelte";
  import Camera from "./Camera.svelte";
  import Lights from "./Lights.svelte";
  import { playerStore } from "$lib/store/PlayerStore/store";
  import ProceduralBuilding from "$lib/components/Building/ProceduralBuilding.svelte";
  import Person from "$lib/components/Building/Person.svelte";

  const alignConst = -1;
  $: players = $playerStore;

  function tile(amount: number) {
    return Array.from({ length: amount }).map((_, i) => i);
  }

  function generateGrid(size: number) {
    return Array.from({ length: size }, (_, z) =>
      Array.from({ length: size }, (_, x) => ({
        position: [alignConst + x, 0, alignConst + z],
        type: Math.random() > 0.7 ? "building" : "cube", // Randomly assign a building
      })),
    ).flat();
  }

  $: tiles = generateGrid(3);
</script>

<Lights />
<Camera />

{#each tiles as { position, type }, index}
  <!-- {#if type === "building"}{/if} -->
  <ProceduralBuilding
    position={[position[0], position[1], position[2]]}
    seed={index}
  />
  <Cube {position} />
  <Person {position} />
{/each}

<!-- {#each tile(4) as slotNumber} -->
<!--   <Cube position={[alignConst + slotNumber, 0, -1]} /> -->
<!-- {/each} -->
<!-- {#each tile(4) as slotNumber} -->
<!--   <Cube position={[alignConst + slotNumber, 0, 0]} /> -->
<!-- {/each} -->
<!-- {#each tile(4) as slotNumber} -->
<!--   <Cube position={[alignConst + slotNumber, 0, 1]} /> -->
<!-- {/each} -->
