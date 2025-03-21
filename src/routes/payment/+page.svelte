<script>
    import { fade } from 'svelte/transition';
    import info from '$lib/data/info.json';
  
    let isDark = true;
  
    const personalInfo = info;
  
    function toggleTheme() {
      isDark = !isDark;
    }
  </script>
  
  <main class="{isDark ? 'bg-gradient-to-br from-gray-900 to-indigo-950' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'} 
    min-h-screen p-6 md:p-10 transition-colors duration-700 flex flex-col items-center relative overflow-hidden">
    
    <div class="absolute inset-0 pointer-events-none">
      {#each Array(30) as _, i}
        <div 
          class="w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full 
                 absolute animate-float opacity-60 blur-sm"
          style="top: {Math.random() * 100}%; left: {Math.random() * 100}%; 
                 animation-delay: {Math.random() * 6}s;"
        ></div>
      {/each}
    </div>
  
    <div class="max-w-3xl w-full relative z-10 bg-white/80 dark:bg-gray-800/80 
                backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8">
      <button 
        on:click={toggleTheme}
        class="fixed top-6 right-6 p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 
               hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all duration-300 
               shadow-lg hover:shadow-xl z-20"
      >
        {#if isDark}
          <span class="text-yellow-400 text-xl">☀️</span>
        {:else}
          <span class="text-indigo-600 text-xl">🌙</span>
        {/if}
      </button>
  
      <div in:fade={{ duration: 600 }} class="text-center mb-10">
        <h1 class="text-4xl font-extrabold bg-clip-text text-transparent 
              bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 
              dark:to-purple-400">
          Thông tin thanh toán
        </h1>
      </div>
  
      <div in:fade={{ delay: 200 }} class="mb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-5 bg-gradient-to-br from-indigo-100/80 to-purple-100/80 
                dark:from-indigo-900/80 dark:to-purple-900/80 rounded-xl text-center 
                shadow-md hover:shadow-lg transition-all duration-300 border 
                border-indigo-200/50 dark:border-purple-800/50">
            <p class="text-gray-600 dark:text-gray-300">Đỗ Hoài Khương</p>
            <p class="text-gray-800 dark:text-gray-100 font-semibold text-lg">18074561</p>
          </div>
          <div class="p-5 bg-gradient-to-br from-indigo-100/80 to-purple-100/80 
                dark:from-indigo-900/80 dark:to-purple-900/80 rounded-xl text-center 
                shadow-md hover:shadow-lg transition-all duration-300 border 
                border-indigo-200/50 dark:border-purple-800/50">
            <p class="text-gray-600 dark:text-gray-300">Đỗ Hoài Khương</p>
            <p class="text-gray-800 dark:text-gray-100 font-semibold text-lg">107833856811</p>
          </div>
        </div>
      </div>
  
      <div in:fade={{ delay: 400 }} class="text-center">
        <a href="/" class="text-indigo-500 dark:text-indigo-400 hover:underline 
               text-lg font-medium transition-colors duration-200">
          Quay lại trang chính
        </a>
      </div>
    </div>
  </main>
  
  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
  
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }
  </style>