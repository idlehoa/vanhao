<script>
  import { fade } from 'svelte/transition';

  export let isLoading;
  export let loadingProgress;
  export let personalInfo;
</script>

{#if isLoading}
  <div 
    in:fade={{ duration: 500 }} 
    out:fade={{ duration: 500 }}
    class="fixed inset-0 bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 
           flex items-center justify-center z-50 overflow-hidden"
  >
    <!-- Particle Background -->
    <div class="absolute inset-0 pointer-events-none">
      {#each Array(20) as _, i}
        <div 
          class="w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full 
                 absolute animate-twinkle opacity-50"
          style="top: {Math.random() * 100}%; left: {Math.random() * 100}%; 
                 animation-delay: {Math.random() * 2}s;"
        ></div>
      {/each}
    </div>

    <!-- Main Intro Content -->
    <div class="relative text-center px-4">
      <!-- Animated Avatar -->
      <div 
        class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br 
               from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow
               flex items-center justify-center text-6xl font-extrabold text-white 
               shadow-2xl ring-8 ring-indigo-300/20 hover:ring-indigo-400/40 
               transition-all duration-300"
      >
        <span class="animate-pulse">{personalInfo.name[0]}</span>
      </div>

      <!-- Dynamic Welcome Text -->
      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 animate-slide-up">
        <span class="bg-clip-text text-transparent bg-gradient-to-r 
                     from-indigo-300 via-purple-300 to-pink-300">
          Chào mừng đến với Portfolio!
        </span>
      </h1>

      <!-- Progress Bar with Glow -->
      <div class="w-72 md:w-96 mx-auto overflow-hidden rounded-full 
                  bg-gray-800/30 backdrop-blur-md shadow-lg ring-1 ring-gray-700/50">
        <div 
          class="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 transition-all duration-300 ease-out"
          style="width: {loadingProgress}%"
        ></div>
      </div>
      <p class="mt-4 text-lg text-indigo-100 animate-pulse">
        {loadingProgress}%
      </p>
    </div>
  </div>
{/if}

<style>
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.3); }
  }

  @keyframes slide-up {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .animate-spin-slow { animation: spin-slow 12s linear infinite; }
  .animate-twinkle { animation: twinkle 2.5s ease-in-out infinite; }
  .animate-slide-up { animation: slide-up 0.8s ease-out; }
  .animate-fade-in { animation: fade-in 1s ease-out; }
</style>