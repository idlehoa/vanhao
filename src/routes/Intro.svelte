<script>
  import { fade, scale } from 'svelte/transition';

  export let isLoading;
  export let loadingProgress;
  export let personalInfo;
</script>

{#if isLoading}
  <div 
    in:fade={{ duration: 600 }} 
    out:fade={{ duration: 400 }}
    class="fixed inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 
           flex items-center justify-center z-50 overflow-hidden"
  >
    <!-- Enhanced Particle Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      {#each Array(30) as _, i}
        <div 
          class="w-1.5 h-1.5 bg-gradient-to-br from-indigo-300/80 to-purple-300/80 
                 rounded-full absolute opacity-40 blur-sm animate-[float_5s_ease-in-out_infinite]"
          style="top: {Math.random() * 100}%; left: {Math.random() * 100}%; 
                 animation-delay: {Math.random() * 3}s;
                 animation-duration: {2 + Math.random() * 2}s;"
        ></div>
      {/each}
    </div>

    <!-- Main Content Container -->
    <div class="relative text-center px-6 py-8 max-w-2xl w-full">
      <!-- Enhanced Avatar -->
      <div 
        in:scale={{ duration: 800, delay: 200 }}
        class="w-36 h-36 mx-auto mb-8 rounded-full bg-gradient-to-br 
               from-indigo-600 via-purple-600 to-pink-600 animate-[glow_2s_ease-in-out_infinite]
               flex items-center justify-center text-6xl font-extrabold text-white 
               shadow-xl ring-8 ring-indigo-400/20 hover:ring-indigo-500/40 
               transition-all duration-500 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 animate-[spin-slow_20s_linear_infinite]"></div>
        <span class="relative animate-pulse">{personalInfo.name[0]}</span>
      </div>

      <!-- Dynamic Welcome Text -->
      <h1 
        in:fade={{ duration: 1000, delay: 400 }}
        class="text-4xl md:text-6xl font-extrabold text-white mb-8 animate-[slide-up_0.8s_ease-out]"
      >
        <span class="bg-clip-text text-transparent bg-gradient-to-r 
                     from-indigo-200 via-purple-200 to-pink-200 
                     animate-[gradient-x_6s_ease_infinite] bg-[length:200%_200%]">
          WelCome to VnnHaoo Site UwU!
        </span>
      </h1>

      <!-- Enhanced Progress Bar -->
      <div 
        in:fade={{ duration: 800, delay: 600 }}
        class="w-80 md:w-[28rem] mx-auto overflow-hidden rounded-full 
               bg-gray-900/20 backdrop-blur-lg shadow-xl ring-1 ring-indigo-500/20"
      >
        <div 
          class="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 transition-all duration-500 ease-out relative overflow-hidden"
          style="width: {loadingProgress}%"
        >
          <div class="absolute inset-0 bg-white/20 animate-[shine_2s_linear_infinite]"></div>
        </div>
      </div>
      
      <!-- Progress Percentage -->
      <p 
        in:fade={{ duration: 800, delay: 700 }}
        class="mt-6 text-xl text-indigo-100/80 animate-pulse font-medium"
      >
        Đang tải... {loadingProgress}%
      </p>
    </div>
  </div>
{/if}