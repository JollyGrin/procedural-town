<script lang="ts">
  import { T } from "@threlte/core";
  import ProceduralBuilding from "./ProceduralBuilding.svelte";
</script>

<T.Group>
  <ProceduralBuilding position={[0, 0, 0]} seed={123} />
  <ProceduralBuilding position={[3, 0, 0]} seed={456} />
  <ProceduralBuilding position={[-3, 0, 0]} seed={789} />
</T.Group>
