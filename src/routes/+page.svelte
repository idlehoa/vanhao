<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import info from '$lib/data/info.json';

  let isDark = true;
  let copiedEmail = false;
  let copiedPhone = false;
  let isLoading = true;
  let loadingProgress = 0;

  const personalInfo = info;
  const languages = ["JavaScript", "Python", "CSS", "C++", "Java", "HTML", "Node.js"];

  onMount(() => {
    const interval = setInterval(() => {
      loadingProgress = Math.min(loadingProgress + 1, 100);
    }, 30);

    setTimeout(() => {
      clearInterval(interval);
      isLoading = false;
    }, 3000);
  });

  function toggleTheme() {
    isDark = !isDark;
  }

  function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        copiedEmail = true;
        setTimeout(() => (copiedEmail = false), 2000);
      } else if (type === 'phone') {
        copiedPhone = true;
        setTimeout(() => (copiedPhone = false), 2000);
      }
    });
  }
</script>

{#if isLoading}
  <div 
    in:fade={{ duration: 500 }} 
    out:fade={{ duration: 500 }}
    class="fixed inset-0 bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 
           flex items-center justify-center z-50 overflow-hidden"
  >
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

    <div class="relative text-center px-4">
      <div 
        class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br 
               from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow
               flex items-center justify-center text-6xl font-extrabold text-white 
               shadow-2xl ring-8 ring-indigo-300/20 hover:ring-indigo-400/40 
               transition-all duration-300"
      >
        <span class="animate-pulse">{personalInfo.name[0]}</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 animate-slide-up">
        <span class="bg-clip-text text-transparent bg-gradient-to-r 
                     from-indigo-300 via-purple-300 to-pink-300">
          Chào mừng đến với Portfolio!
        </span>
      </h1>

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

    <div in:fade={{ duration: 600, delay: 3000 }} class="text-center mb-10">
      <div class="w-36 h-36 mx-auto mb-6 rounded-full bg-gradient-to-r 
            from-indigo-600 to-purple-600 flex items-center justify-center text-6xl 
            font-extrabold text-white shadow-xl ring-4 ring-indigo-200/50 
            dark:ring-purple-900/50 transition-all duration-300 hover:ring-8 
            hover:ring-opacity-70 animate-float-slow">
        {personalInfo.name[0]}
      </div>
      <h1 class="text-5xl font-extrabold bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 
            dark:to-purple-400 animate-slide-up">
        {personalInfo.name}
      </h1>
      <p class="text-xl mt-3 font-medium text-gray-600 dark:text-gray-200">
        {personalInfo.occupation}
      </p>
      <p class="text-sm mt-2 text-gray-500 dark:text-gray-300 flex justify-center 
            items-center gap-3 animate-fade-in">
        <span class="text-pink-500 animate-pulse">💖</span> {personalInfo.location} 
        <a href={personalInfo.github} target="_blank" 
           class="ml-2 text-indigo-500 dark:text-indigo-400 hover:underline 
                  transition-colors duration-200">
          🔗 GitHub
        </a>
      </p>
    </div>

    <div in:slide={{ duration: 500, delay: 3200 }} class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 
            bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Giới thiệu
      </h2>
      <p class="text-gray-700 dark:text-gray-200 leading-relaxed bg-indigo-50/50 
            dark:bg-indigo-900/30 p-6 rounded-xl shadow-inner border border-indigo-100 
            dark:border-indigo-800/50 transition-all duration-300 hover:shadow-md">
        {personalInfo.bio}
      </p>
    </div>

    <div in:fade={{ delay: 3400 }} class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 
            bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Thanh toán
      </h2>
      <a href="/payment" class="text-indigo-500 dark:text-indigo-400 hover:underline 
             text-lg font-medium transition-colors duration-200">
        Xem thông tin thanh toán
      </a>
    </div>

    <div in:fade={{ delay: 3600 }} class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 
            bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Ngôn ngữ
      </h2>
      <div class="flex flex-wrap gap-3">
        {#each languages as language}
          <span class="bg-gradient-to-r from-indigo-500 to-purple-500 
                dark:from-indigo-400 dark:to-purple-400 text-white text-sm 
                px-4 py-2 rounded-full hover:from-indigo-600 hover:to-purple-600 
                dark:hover:from-indigo-500 dark:hover:to-purple-500 
                transition-all duration-300 shadow-md hover:shadow-lg 
                hover:scale-105">
            {language}
          </span>
        {/each}
      </div>
    </div>

    <div in:fade={{ delay: 3800 }} class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 
            bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Liên hệ
      </h2>
      <div class="space-y-4 bg-indigo-50/50 dark:bg-indigo-900/30 p-6 rounded-xl 
            shadow-inner border border-indigo-100/50 dark:border-indigo-800/50">
        <p class="flex items-center gap-4 text-gray-700 dark:text-gray-200">
          <span class="text-indigo-500 dark:text-indigo-400 text-xl">✉️</span>
          <span class="flex items-center gap-3">
            <a href="mailto:{personalInfo.contact.email}" 
               class="hover:text-indigo-500 dark:hover:text-indigo-400 
                      transition-colors duration-200">
              {personalInfo.contact.email}
            </a>
            <button 
              on:click={() => copyToClipboard(personalInfo.contact.email, 'email')}
              class="text-gray-500 dark:text-gray-400 hover:text-indigo-500 
                     dark:hover:text-indigo-400 transition-colors duration-200"
            >
              {#if copiedEmail}
                <span class="text-green-500">✔️</span>
              {:else}
                📋
              {/if}
            </button>
          </span>
        </p>
        <p class="flex items-center gap-4 text-gray-700 dark:text-gray-200">
          <span class="text-indigo-500 dark:text-indigo-400 text-xl">📞</span>
          <span class="flex items-center gap-3">
            <a href="tel:{personalInfo.contact.phone}" 
               class="hover:text-indigo-500 dark:hover:text-indigo-400 
                      transition-colors duration-200">
              {personalInfo.contact.phone}
            </a>
            <button 
              on:click={() => copyToClipboard(personalInfo.contact.phone, 'phone')}
              class="text-gray-500 dark:text-gray-400 hover:text-indigo-500 
                     dark:hover:text-indigo-400 transition-colors duration-200"
            >
              {#if copiedPhone}
                <span class="text-green-500">✔️</span>
              {:else}
                📋
              {/if}
            </button>
          </span>
        </p>
      </div>
    </div>

    <div in:fade={{ delay: 4000 }} class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 
            bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Mạng xã hội
      </h2>
      <div class="flex gap-6 justify-center">
        <a href={personalInfo.social.github} target="_blank" 
           class="text-gray-600 dark:text-gray-200 hover:text-indigo-500 
                  dark:hover:text-indigo-400 transition-all duration-300 
                  text-lg font-medium hover:scale-110">
          GitHub
        </a>
        <a href={personalInfo.social.linkedin} target="_blank" 
           class="text-gray-600 dark:text-gray-200 hover:text-indigo-500 
                  dark:hover:text-indigo-400 transition-all duration-300 
                  text-lg font-medium hover:scale-110">
          LinkedIn
        </a>
        <a href={personalInfo.social.twitter} target="_blank" 
           class="text-gray-600 dark:text-gray-200 hover:text-indigo-500 
                  dark:hover:text-indigo-400 transition-all duration-300 
                  text-lg font-medium hover:scale-110">
          Twitter
        </a>
      </div>
    </div>

    <div class="text-center text-sm text-gray-500 dark:text-gray-300 
          border-t border-indigo-100/50 dark:border-indigo-800/50 pt-4">
      © {new Date().getFullYear()} {personalInfo.name} • Built with ❤️
    </div>
  </div>
</main>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

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

  .animate-float {
    animation: float 5s ease-in-out infinite;
  }

  .animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }

  .animate-twinkle {
    animation: twinkle 2.5s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slide-up 0.8s ease-out;
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
</style>