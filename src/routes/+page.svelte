<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";

  let seed: number = 1;
</script>

<div>
  <div style="position: absolute; height:0;">
    <button on:click={() => (seed += 1)}>+1 </button>
    <button on:click={() => (seed += Math.floor(Math.random() * 1000))}
      >Random
    </button>
    <button style="background: teal;">
      {seed}
    </button>
  </div>
  <Canvas>
    <Scene {seed} />
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(
      180deg,
      rgba(13, 19, 32, 1) 0%,
      rgba(8, 12, 21, 1) 100%
    );
  }
</style>
