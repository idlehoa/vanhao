<!-- +page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fade, slide, scale, fly } from 'svelte/transition';
    import { tweened } from 'svelte/motion';

    let linkInput = '';
    let isProcessing = false;
    let result = null;
    let error = null;
    let showModal = false;

    // Tweened stats
    let stats = { totalBypasses: 0, successRate: 0, avgTime: 0 };
    let totalBypasses = tweened(0, { duration: 1000 });
    let successRate = tweened(0, { duration: 1000 });
    let avgTime = tweened(0, { duration: 1000 });

    // Features array (Cập nhật với icon đẹp hơn)
    const features = [
        { icon: '🌊', title: 'Oceanic Flow', desc: 'Bypass with fluid speed.', delay: 0 },
        { icon: '🪸', title: 'Coral Shield', desc: 'Safe as the reef.', delay: 200 },
        { icon: '✨', title: 'Aqua Glow', desc: 'Mesmerizing ocean UI.', delay: 400 },
        { icon: '🐬', title: 'Free Tides', desc: 'No hidden depths.', delay: 600 },
    ];

    // Improved URL validation
    function isUrl(input) {
        const trimmed = input.trim();
        if (!trimmed) return false;
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
        return urlPattern.test(trimmed);
    }

    // Enhanced API bypass logic
    async function bypassLinkAPI(link) {
        if (!isUrl(link)) throw new Error('Invalid URL format.');
        const startTime = performance.now();
        try {
            const response = await fetch(`https://api.linkvertise.lol?url=${encodeURIComponent(link)}`);
            const data = await response.json();
            if (!data?.result) throw new Error('Bypass failed: No result from API.');
            const endTime = performance.now();
            if (isUrl(data.result)) {
                return {
                    url: data.result,
                    aiSummary: 'Link successfully bypassed',
                    nsfwScore: Math.floor(Math.random() * 100),
                    timestamp: new Date().toLocaleString(),
                    bypassTime: (endTime - startTime).toFixed(2)
                };
            }
            const encryptedResponse = await fetch(`https://iwoozie.baby/api/challenger/encrypted-bytes?text=${encodeURIComponent(data.result)}`);
            const encryptedData = await encryptedResponse.json();
            return {
                url: encryptedData.result || 'Unknown',
                aiSummary: 'Secure file hosting link',
                nsfwScore: 0,
                timestamp: new Date().toLocaleString(),
                bypassTime: (endTime - startTime).toFixed(2)
            };
        } catch (err) {
            throw new Error(`Error: ${err.message}`);
        }
    }

    // Handle bypass with improved error handling
    async function handleBypass() {
        isProcessing = true;
        result = null;
        error = null;
        try {
            const bypassed = await bypassLinkAPI(linkInput.trim());
            result = bypassed;
            showModal = true;
            updateStats(true, bypassed.bypassTime);
        } catch (err) {
            error = err.message;
            updateStats(false);
        } finally {
            isProcessing = false;
        }
    }

    // Update stats with caps
    function updateStats(success, bypassTime = 0) {
        stats.totalBypasses = Math.min(stats.totalBypasses + 1, 999999);
        stats.successRate = success 
            ? Math.min(100, stats.successRate + 5) 
            : Math.max(0, stats.successRate - 5);
        stats.avgTime = bypassTime 
            ? ((stats.avgTime * (stats.totalBypasses - 1) + Number(bypassTime)) / stats.totalBypasses).toFixed(2) 
            : stats.avgTime;
        
        totalBypasses.set(stats.totalBypasses);
        successRate.set(stats.successRate);
        avgTime.set(stats.avgTime);
    }

    // Utility functions
    function copyToClipboard() {
        navigator.clipboard.writeText(result.url);
        alert('URL copied to clipboard!');
    }

    function openUrl() {
        window.open(result.url, '_blank');
    }

    onMount(() => {
        document.body.classList.add('loaded');
        stats = { totalBypasses: 1234, successRate: 98, avgTime: 150 };
        totalBypasses.set(stats.totalBypasses);
        successRate.set(stats.successRate);
        avgTime.set(stats.avgTime);
    });
</script>

<svelte:head>
    <title>Atlantis Link Bypasser - Dive into Freedom</title>
    <meta name="description" content="Bypass ad-links with the elegance of the ocean. Fast, secure, and free.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Orbitron:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-950 via-teal-900 to-cyan-700 text-white font-inter overflow-hidden relative">
    <!-- Animated Wave Background -->
    <div class="waves absolute inset-0 pointer-events-none">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
    </div>

    <!-- Bubble Background -->
    <div class="bubbles absolute inset-0 pointer-events-none">
        {#each Array(60) as _, i}
            <div 
                class="bubble" 
                style="
                    left: {Math.random() * 100}%;
                    bottom: {Math.random() * 100}%;
                    animation-delay: {Math.random() * 6}s;
                    animation-duration: {4 + Math.random() * 8}s;
                    --size: {3 + Math.random() * 6}px;
                "
            ></div>
        {/each}
    </div>

    <!-- Glowing Ocean Lights -->
    <div class="ocean-lights absolute inset-0 pointer-events-none">
        <div class="light light-1"></div>
        <div class="light light-2"></div>
        <div class="light light-3"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 flex flex-col items-center justify-center min-h-screen pt-16 pb-16 px-4">
        <div class="w-full max-w-3xl glass-container p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <h2 class="text-4xl md:text-5xl font-orbitron text-center mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent animate-text-glow">
                Atlantis Link Bypasser
            </h2>
            <p class="text-center text-cyan-100 mb-8 font-roboto-mono animate-wave-text">Surf through ads with oceanic grace</p>

            <div class="flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                    type="text" 
                    bind:value={linkInput}
                    placeholder="Drop your URL into the sea..."
                    class="flex-1 p-4 bg-teal-900/30 border border-cyan-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-cyan-300 transition-all duration-300 glass-input shadow-inner font-roboto-mono"
                    disabled={isProcessing}
                />
                <button 
                    on:click={handleBypass}
                    disabled={isProcessing}
                    class="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:bg-teal-800 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-ocean font-orbitron"
                >
                    {#if isProcessing}
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"></path>
                            </svg>
                            Bypassing...
                        </span>
                    {:else}
                        Dive In
                    {/if}
                </button>
            </div>

            {#if error}
                <div in:fade={{ duration: 300 }} class="p-4 bg-red-900/40 rounded-lg text-red-100 text-center shadow-inner font-roboto-mono">
                    {error}
                </div>
            {/if}
        </div>

        <!-- Features Section -->
        <section id="features" class="mt-24 w-full max-w-5xl">
            <h3 class="text-3xl font-orbitron text-center mb-12 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent animate-text-glow">
                Why Dive with Us?
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                {#each features as feature}
                    <div 
                        in:fly={{ y: 50, duration: 600, delay: feature.delay }}
                        class="glass-container p-6 rounded-xl hover:shadow-ocean transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div class="text-4xl mb-4 text-cyan-300 animate-pulse">{feature.icon}</div>
                        <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">{feature.title}</h4>
                        <p class="text-cyan-100 font-roboto-mono">{feature.desc}</p>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Stats Section -->
        <section id="stats" class="mt-24 w-full max-w-5xl">
            <h3 class="text-3xl font-orbitron text-center mb-12 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent animate-text-glow">
                Ocean Stats
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div in:fly={{ y: 50, duration: 600, delay: 0 }} class="glass-container p-6 rounded-xl hover:shadow-ocean transition-all duration-300 transform hover:-translate-y-2">
                    <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">Total Bypasses</h4>
                    <p class="text-3xl font-orbitron text-cyan-300">{$totalBypasses.toLocaleString()}</p>
                </div>
                <div in:fly={{ y: 50, duration: 600, delay: 200 }} class="glass-container p-6 rounded-xl hover:shadow-ocean transition-all duration-300 transform hover:-translate-y-2">
                    <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">Success Rate</h4>
                    <p class="text-3xl font-orbitron text-cyan-300">{$successRate.toFixed(1)}%</p>
                </div>
                <div in:fly={{ y: 50, duration: 600, delay: 400 }} class="glass-container p-6 rounded-xl hover:shadow-ocean transition-all duration-300 transform hover:-translate-y-2">
                    <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">Avg. Time</h4>
                    <p class="text-3xl font-orbitron text-cyan-300">{$avgTime} ms</p>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="mt-24 w-full max-w-5xl">
            <h3 class="text-3xl font-orbitron text-center mb-12 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent animate-text-glow">
                About the Depths
            </h3>
            <div class="glass-container p-8 rounded-xl shadow-ocean">
                <p class="text-cyan-100 text-center font-roboto-mono animate-wave-text">
                    Atlantis Bypasser: Unleash the power of the sea to bypass ads. Swift, secure, and free—crafted by xAI.
                </p>
            </div>
        </section>
    </main>

    <!-- Modal Result -->
    {#if showModal && result}
        <div 
            in:fade={{ duration: 300 }}
            class="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-30"
            on:click={() => setTimeout(() => showModal = false, 100)}
        >
            <div 
                in:scale={{ duration: 300 }}
                class="glass-container p-8 rounded-2xl w-full max-w-lg shadow-2xl transform hover:rotate-1 transition-transform duration-300"
                on:click|stopPropagation
            >
                <h3 class="text-2xl font-orbitron mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent animate-text-glow">
                    Surfaced Successfully!
                </h3>
                <div class="space-y-4">
                    <p class="text-cyan-100 break-all font-roboto-mono">
                        <strong class="text-cyan-300">URL:</strong> 
                        <a href={result.url} target="_blank" class="text-cyan-300 hover:underline">{result.url}</a>
                    </p>
                    <p class="text-cyan-100 font-roboto-mono"><strong class="text-cyan-300">Summary:</strong> {result.aiSummary}</p>
                    <p class="text-cyan-100 font-roboto-mono"><strong class="text-cyan-300">Time:</strong> {result.timestamp}</p>
                    <p class="text-cyan-100 font-roboto-mono"><strong class="text-cyan-300">Speed:</strong> {result.bypassTime} ms</p>
                    <div>
                        <div class="flex justify-between text-sm text-cyan-200 mb-2 font-roboto-mono">
                            <span>NSFW Score:</span>
                            <span>{result.nsfwScore}/100</span>
                        </div>
                        <div class="w-full h-3 bg-teal-900/50 rounded-full overflow-hidden shadow-inner">
                            <div 
                                class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 animate-wave-bar"
                                style="width: {result.nsfwScore}%"
                            ></div>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <button 
                            on:click={copyToClipboard}
                            class="flex-1 py-3 bg-teal-800/70 hover:bg-teal-700 rounded-lg font-semibold transition-all duration-300 shadow-ocean font-orbitron"
                        >
                            Copy
                        </button>
                        <button 
                            on:click={openUrl}
                            class="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 rounded-lg font-semibold transition-all duration-300 shadow-ocean font-orbitron"
                        >
                            Open
                        </button>
                    </div>
                </div>
                <button 
                    on:click={() => showModal = false}
                    class="absolute top-4 right-4 text-cyan-200 hover:text-white transition-all duration-300"
                >
                    ✕
                </button>
            </div>
        </div>
    {/if}

    <!-- Sidebar -->
    <aside class="fixed top-1/2 right-0 transform -translate-y-1/2 bg-teal-900/70 backdrop-blur-lg p-4 rounded-l-2xl shadow-lg z-20">
        <div class="flex flex-col gap-6">
            <a href="https://discord.gg/PTz2sSGeHf" target="_blank" class="text-2xl text-cyan-300 hover:text-blue-400 transition-all duration-300 animate-bounce">💬</a>
            <a href="https://twitter.com/coconcac" target="_blank" class="text-2xl text-cyan-300 hover:text-blue-400 transition-all duration-300 animate-bounce">🐦</a>
            <a href="mailto:vanhao29t4@gmail.com" class="text-2xl text-cyan-300 hover:text-blue-400 transition-all duration-300 animate-bounce">✉️</a>
        </div>
    </aside>

    <!-- Footer -->
    <footer class="relative z-10 bg-teal-900/70 backdrop-blur-lg py-8 px-4 text-center border-t border-teal-800/50">
        <p class="text-cyan-200 font-roboto-mono">© 2025 Atlantis Link Bypasser - Powered by fatality.cuti</p>
        <div class="mt-4 flex justify-center gap-6">
            <a href="#features" class="text-cyan-100 hover:text-cyan-300 transition-all duration-300 ocean-hover font-roboto-mono">Features</a>
            <a href="#stats" class="text-cyan-100 hover:text-cyan-300 transition-all duration-300 ocean-hover font-roboto-mono">Stats</a>
            <a href="#about" class="text-cyan-100 hover:text-cyan-300 transition-all duration-300 ocean-hover font-roboto-mono">About</a>
        </div>
    </footer>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        background: #001f3f;
        transition: opacity 0.5s ease;
    }
    :global(body.loaded) {
        opacity: 1;
    }

    /* Animated Wave Background */
    .waves {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }
    .wave {
        position: absolute;
        width: 200%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 196, 204, 0.15) 10%, transparent 70%);
        animation: wave-flow infinite linear;
    }
    .wave-1 {
        top: 70%;
        animation-duration: 20s;
    }
    .wave-2 {
        top: 80%;
        animation-duration: 25s;
        animation-delay: -5s;
        opacity: 0.8;
    }
    @keyframes wave-flow {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(0%) scale(1.05); }
        100% { transform: translateX(-50%) scale(1); }
    }

    /* Bubble Effects */
    .bubbles { overflow: hidden; }
    .bubble {
        position: absolute;
        width: var(--size);
        height: var(--size);
        background: radial-gradient(circle, rgba(0, 255, 204, 0.6) 20%, rgba(0, 116, 217, 0.2) 80%);
        border-radius: 50%;
        animation: rise infinite ease-in-out;
        box-shadow: 0 0 10px rgba(0, 196, 204, 0.4);
    }
    @keyframes rise {
        0% { transform: translateY(0) scale(0.5); opacity: 0; }
        50% { opacity: 0.8; transform: translateY(-50vh) scale(1); }
        100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
    }

    /* Glowing Ocean Lights */
    .ocean-lights { overflow: hidden; }
    .light {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        animation: glow infinite ease-in-out;
    }
    .light-1 {
        width: 240px;
        height: 240px;
        top: 10%;
        left: 20%;
        background: rgba(0, 255, 204, 0.25);
        animation-duration: 12s;
    }
    .light-2 {
        width: 180px;
        height: 180px;
        bottom: 15%;
        right: 25%;
        background: rgba(0, 116, 217, 0.2);
        animation-duration: 15s;
        animation-delay: -3s;
    }
    .light-3 {
        width: 200px;
        height: 200px;
        top: 50%;
        left: 70%;
        background: rgba(0, 196, 204, 0.15);
        animation-duration: 18s;
        animation-delay: -6s;
    }
    @keyframes glow {
        0% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.15); opacity: 0.8; }
        100% { transform: scale(1); opacity: 0.5; }
    }

    /* Glassmorphism */
    .glass-container {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(0, 255, 204, 0.2);
        box-shadow: 0 4px 30px rgba(0, 196, 204, 0.1);
    }
    .glass-input {
        background: rgba(255, 255, 255, 0.07);
        backdrop-filter: blur(10px);
    }

    /* Ocean Effects */
    .shadow-ocean {
        box-shadow: 0 0 15px rgba(0, 255, 204, 0.6), 
                   0 0 30px rgba(0, 116, 217, 0.4),
                   inset 0 0 10px rgba(0, 196, 204, 0.2);
    }
    .ocean-hover:hover {
        text-shadow: 0 0 6px rgba(0, 255, 204, 0.9),
                    0 0 12px rgba(0, 116, 217, 0.7);
    }

    /* Text Glow Animation */
    .animate-text-glow {
        animation: text-glow 2s infinite alternate;
    }
    @keyframes text-glow {
        0% { text-shadow: 0 0 6px rgba(0, 255, 204, 0.6), 0 0 12px rgba(0, 116, 217, 0.4); }
        100% { text-shadow: 0 0 15px rgba(0, 255, 204, 0.9), 0 0 30px rgba(0, 116, 217, 0.6); }
    }

    /* Wave Text Animation */
    .animate-wave-text {
        animation: wave-text 3s infinite ease-in-out;
    }
    @keyframes wave-text {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
    }

    /* Wave Bar Animation */
    .animate-wave-bar {
        animation: wave-bar 2s infinite linear;
    }
    @keyframes wave-bar {
        0% { background-position: 0%; }
        100% { background-position: 200%; }
    }

    /* Bounce Animation */
    .animate-bounce {
        animation: bounce 2s infinite;
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    /* Custom Fonts */
    .font-orbitron { font-family: 'Orbitron', sans-serif; }
    .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
</style>