<script lang="ts">
  import { T } from "@threlte/core";
  import { BoxGeometry, MeshBasicMaterial, Vector3 } from "three";
  import { onMount } from "svelte";

  // Simple walking parameters
  export let position: number[] = [0, 0, 0];
  let legMovement = 0;
  let walkingSpeed = 0.025;
  let bodyRotationAmplitude = Math.random() * 0.05; // Vary body rotation

  let bodyRotation = 0; // To simulate slight rotation for walking gait

  let time = 0;
  function randomMovement() {
    time += 0.01; // Increase time incrementally to control smoothness

    const randomBool = Math.random() < 0.5; // Randomly choose a direction

    // Smooth sine wave oscillation for gradual transitions
    const sineWave = randomBool ? Math.cos(time) : Math.sin(time);

    // Apply some random noise to create organic motion
    const randomNoise = (Math.random() - 0.5) * 0.1;

    // Return a gradual random movement based on the sine wave
    return sineWave * 0.05 + randomNoise;
  }

  // Use a loop to animate the person walking
  let animationFrame: number;

  function animate() {
    // Update the body rotation for a walking effect
    bodyRotation = Math.sin(legMovement) * bodyRotationAmplitude; // Simulating body rotation

    // Update the leg movement to simulate walking
    legMovement += walkingSpeed;

    // Update the person's position (moving them slightly back and forth)
    // position[0] += Math.cos(legMovement) * 0.5 * legRotationAmplitude;
    // position[2] += Math.sin(legMovement) * 0.5 * legRotationAmplitude;

    position[0] += randomMovement() * 0.1;
    position[2] += randomMovement() * 0.1;

    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    animate(); // Start the walking animation
    return () => cancelAnimationFrame(animationFrame); // Clean up the animation
  });
</script>

<T.Group
  position={[position[0] * 0.75, position[1] + 0.2, position[2] * 0.75]}
  scale={0.1}
>
  <!-- Body (upper part of the person) -->
  <T.Mesh rotation={[0, bodyRotation, 0]}>
    <T.BoxGeometry args={[0.3, 0.75, 0.3]} />
    <T.MeshBasicMaterial color="#ffcc00" />
  </T.Mesh>

  <!-- Legs (lower part of the person) -->
  <T.Mesh position={[0, -0.45, 0]}>
    <T.BoxGeometry args={[0.3, 0.35, 0.3]} />
    <T.MeshBasicMaterial color="#0000ff" />
  </T.Mesh>
</T.Group>
