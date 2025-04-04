<!-- Intro.svelte -->
<script>
  import { onMount } from 'svelte';
  import { fade, scale, fly } from 'svelte/transition';

  let loaded = false;

  onMount(() => {
      setTimeout(() => {
          loaded = true;
      }, 500); // Delay để hiệu ứng mượt mà
  });

  // Hàm chuyển hướng khi nhấn nút
  function redirectToBypass() {
      window.location.href = 'https://vanhao.xyz/bypass';
  }
</script>

<svelte:head>
  <title>Atlantis Bypass Intro</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
</svelte:head>

<div class="intro-container">
  <!-- Ocean Bubble Particles -->
  <div class="bubbles">
      {#each Array(50) as _, i}
          <div 
              class="bubble"
              style="
                  left: {Math.random() * 100}%;
                  bottom: {Math.random() * 100}%;
                  animation-delay: {Math.random() * 5}s;
                  animation-duration: {4 + Math.random() * 8}s;
                  --size: {5 + Math.random() * 10}px;
              "
          ></div>
      {/each}
  </div>

  <!-- Glowing Ocean Lights -->
  <div class="ocean-lights">
      <div class="light light-1"></div>
      <div class="light light-2"></div>
      <div class="light light-3"></div>
  </div>

  <!-- Main Content -->
  {#if loaded}
      <div class="content" in:fade={{ duration: 1200 }}>
          <!-- Atlantis Title -->
          <h1 
              in:scale={{ duration: 1400, delay: 300 }}
              class="title font-orbitron"
          >
              Atlantis Bypass
          </h1>

          <!-- Tagline -->
          <p 
              in:fly={{ y: 20, duration: 1000, delay: 600 }}
              class="tagline font-orbitron"
          >
              Dive Deep, Unlock Fast
          </p>

          <!-- Call to Action -->
          <button 
              in:fly={{ y: 30, duration: 1000, delay: 900 }}
              on:click={redirectToBypass}
              class="cta-button font-orbitron"
          >
              Start Bypassing
          </button>
      </div>
  {/if}
</div>

<style>
  .intro-container {
      position: relative;
      min-height: 100vh;
      background: linear-gradient(135deg, #001f3f 0%, #0074d9 50%, #00c4cc 100%);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
  }

  /* Bubble Effects */
  .bubbles {
      position: absolute;
      inset: 0;
      pointer-events: none;
  }
  .bubble {
      position: absolute;
      width: var(--size);
      height: var(--size);
      background: radial-gradient(circle, rgba(0, 196, 204, 0.7) 20%, rgba(0, 116, 217, 0.3) 80%);
      border-radius: 50%;
      animation: rise infinite ease-in-out;
      box-shadow: 0 0 8px rgba(0, 196, 204, 0.5);
  }
  @keyframes rise {
      0% { transform: translateY(0) scale(0.8); opacity: 0.6; }
      50% { opacity: 1; }
      100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
  }

  /* Glowing Ocean Lights */
  .ocean-lights {
      position: absolute;
      inset: 0;
      pointer-events: none;
  }
  .light {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      animation: glow infinite ease-in-out;
  }
  .light-1 {
      width: 220px;
      height: 220px;
      top: 15%;
      left: 20%;
      background: rgba(0, 196, 204, 0.25);
      animation-duration: 10s;
  }
  .light-2 {
      width: 180px;
      height: 180px;
      bottom: 25%;
      right: 15%;
      background: rgba(0, 116, 217, 0.2);
      animation-duration: 14s;
      animation-delay: -2s;
  }
  .light-3 {
      width: 200px;
      height: 200px;
      top: 60%;
      left: 65%;
      background: rgba(0, 255, 204, 0.15);
      animation-duration: 16s;
      animation-delay: -5s;
  }
  @keyframes glow {
      0% { transform: scale(1); opacity: 0.4; }
      50% { transform: scale(1.15); opacity: 0.7; }
      100% { transform: scale(1); opacity: 0.4; }
  }

  /* Main Content */
  .content {
      text-align: center;
      z-index: 10;
  }
  .title {
      font-size: 5rem;
      background: linear-gradient(90deg, #00c4cc, #0074d9, #00ffcc, #00c4cc);
      background-size: 300%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: ocean-flow 8s infinite linear;
      text-shadow: 0 0 15px rgba(0, 196, 204, 0.8), 
                  0 0 30px rgba(0, 116, 217, 0.6),
                  0 0 60px rgba(0, 255, 204, 0.4);
  }
  @keyframes ocean-flow {
      0% { background-position: 0%; }
      100% { background-position: 300%; }
  }

  .tagline {
      font-size: 1.5rem;
      color: #e6f7ff;
      margin: 1.5rem 0;
      text-shadow: 0 0 10px rgba(0, 196, 204, 0.5);
      animation: wave 4s infinite ease-in-out;
  }
  @keyframes wave {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
  }

  .cta-button {
      padding: 1rem 2.5rem;
      font-size: 1.25rem;
      color: #fff;
      background: linear-gradient(45deg, #00c4cc, #0074d9);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(0, 196, 204, 0.7),
                 inset 0 0 10px rgba(0, 116, 217, 0.5);
      transition: all 0.3s ease;
  }
  .cta-button:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px rgba(0, 196, 204, 0.9),
                 inset 0 0 15px rgba(0, 116, 217, 0.7);
  }

  .font-orbitron {
      font-family: 'Orbitron', sans-serif;
  }
</style>