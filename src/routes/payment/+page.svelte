<script>
  import { fade } from 'svelte/transition';
  import info from '$lib/data/info.json';

  let isDark = true;

  const personalInfo = info;

  function toggleTheme() {
    isDark = !isDark;
  }
</script>

<main class="{isDark ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-black' : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100'} 
  min-h-screen p-6 md:p-12 transition-colors duration-500 flex flex-col items-center relative overflow-hidden">
  
  <!-- Background Particles -->
  <div class="absolute inset-0 pointer-events-none">
    {#each Array(25) as _, i}
      <div 
        class="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full 
               absolute animate-float opacity-50 blur-md shadow-lg shadow-indigo-500/30"
        style="top: {Math.random() * 100}%; left: {Math.random() * 100}%; 
               animation-delay: {Math.random() * 5}s;"
      ></div>
    {/each}
  </div>

  <!-- Main Content -->
  <div class="max-w-3xl w-full relative z-10 bg-white/90 dark:bg-gray-900/90 
              backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border 
              border-gray-200/50 dark:border-gray-800/50">
    
    <!-- Theme Toggle Button -->
    <button 
      on:click={toggleTheme}
      class="fixed top-6 right-6 p-3 rounded-full bg-indigo-500 dark:bg-indigo-700 
             hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-300 
             shadow-md hover:shadow-lg transform hover:scale-110 z-20"
    >
      {#if isDark}
        <span class="text-yellow-300 text-2xl drop-shadow-md">☀️</span>
      {:else}
        <span class="text-indigo-100 text-2xl drop-shadow-md">🌙</span>
      {/if}
    </button>

    <!-- Header -->
    <div in:fade={{ duration: 600 }} class="text-center mb-12">
      <h1 class="text-5xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 
            dark:to-purple-400 tracking-tight">
        Thông tin thanh toán
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2 text-lg">Danh sách tài khoản</p>
    </div>

    <!-- Payment Info Cards -->
    <div in:fade={{ delay: 200 }} class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 
              dark:from-indigo-800/70 dark:to-purple-900/70 rounded-xl text-center 
              shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 
              border border-indigo-200/30 dark:border-purple-900/30">
          <p class="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide">Tên</p>
          <p class="text-gray-900 dark:text-white font-semibold text-xl mt-1">Đỗ Hoài Khương</p>
          <p class="text-indigo-600 dark:text-indigo-400 font-medium text-lg mt-2">18074561</p>
        </div>
        <div class="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 
              dark:from-indigo-800/70 dark:to-purple-900/70 rounded-xl text-center 
              shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 
              border border-indigo-200/30 dark:border-purple-900/30">
          <p class="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide">Tên</p>
          <p class="text-gray-900 dark:text-white font-semibold text-xl mt-1">Đỗ Hoài Khương</p>
          <p class="text-indigo-600 dark:text-indigo-400 font-medium text-lg mt-2">107833856811</p>
        </div>
      </div>
    </div>

    <!-- Back Link -->
    <div in:fade={{ delay: 400 }} class="text-center">
      <a href="/" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 
             dark:hover:text-indigo-300 text-lg font-medium transition-colors duration-200 
             underline underline-offset-4">
        Quay lại trang chính
      </a>
    </div>
  </div>
</main>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>