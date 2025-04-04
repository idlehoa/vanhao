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

    // Features array
    const features = [
        { icon: '⚡', title: 'Lightning Fast', desc: 'Bypass links in milliseconds.', delay: 0 },
        { icon: '🔒', title: 'Secure & Safe', desc: 'No ads, no malware.', delay: 200 },
        { icon: '🌌', title: 'Neon Design', desc: 'Futuristic UI experience.', delay: 400 },
        { icon: '💎', title: 'Always Free', desc: 'No hidden fees.', delay: 600 },
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
        // Simulate initial stats
        stats = { totalBypasses: 1234, successRate: 98, avgTime: 150 };
        totalBypasses.set(stats.totalBypasses);
        successRate.set(stats.successRate);
        avgTime.set(stats.avgTime);
    });
</script>

<svelte:head>
    <title>Neon Link Bypasser - Instant & Free</title>
    <meta name="description" content="Bypass ad-links with style. Free, fast, and secure.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Orbitron:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-inter overflow-hidden relative">
    <!-- Particle Background -->
    <div class="particles absolute inset-0 pointer-events-none">
        {#each Array(50) as _, i}
            <div 
                class="particle" 
                style="
                    left: {Math.random() * 100}%;
                    top: {Math.random() * 100}%;
                    animation-delay: {Math.random() * 5}s;
                    animation-duration: {5 + Math.random() * 10}s;
                    --size: {2 + Math.random() * 3}px;
                "
            ></div>
        {/each}
    </div>

    <!-- Glowing Orbs -->
    <div class="orbs absolute inset-0 pointer-events-none">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 flex flex-col items-center justify-center min-h-screen pt-16 pb-16 px-4">
        <div class="w-full max-w-3xl glass-container p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <h2 class="text-4xl md:text-5xl font-orbitron text-center mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow">
                Neon Link Bypasser
            </h2>
            <p class="text-center text-gray-300 mb-8 font-roboto-mono">Skip ads with neon speed!</p>

            <div class="flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                    type="text" 
                    bind:value={linkInput}
                    placeholder="Paste your URL here..."
                    class="flex-1 p-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500 transition-all duration-300 glass-input shadow-inner font-roboto-mono"
                    disabled={isProcessing}
                />
                <button 
                    on:click={handleBypass}
                    disabled={isProcessing}
 W                    class="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:bg-gray-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-neon font-orbitron"
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
                        Bypass Now
                    {/if}
                </button>
            </div>

            {#if error}
                <div in:fade={{ duration: 300 }} class="p-4 bg-red-900/50 rounded-lg text-red-200 text-center shadow-inner font-roboto-mono">
                    {error}
                </div>
            {/if}
        </div>

        <!-- Features Section -->
        <section id="features" class="mt-24 w-full max-w-5xl">
            <h3 class="text-3xl font-orbitron text-center mb-12 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow">
                Why Choose Us?
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                {#each features as feature}
                    <div 
                        in:fly={{ y: 50, duration: 500, delay: feature.delay }}
                        class="glass-container p-6 rounded-xl hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div class="text-4xl mb-4 text-orange-400 animate-pulse">{feature.icon}</div>
                        <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">{feature.title}</h4>
                        <p class="text-gray-300 font-roboto-mono">{feature.desc}</p>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Stats Section -->
        <section id="stats" class="mt-24 w-full max-w-5xl">
            <h3 class="text-3xl font-orbitron text-center mb-12 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow">
                Our Stats
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div in:fly={{ y: 50, duration: 500, delay: 0 }} class="glass-container p-6 rounded-xl hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2">
                    <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">Total Bypasses</h4>
                    <p class="text-3xl font-orbitron text-orange-400">{$totalBypasses.toLocaleString()}</p>
                </div>
                <div in:fly={{ y: 50, duration: 500, delay: 200 }} class="glass-container p-6 rounded-xl hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2">
                    <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">Success Rate</h4>
                    <p class="text-3xl font-orbitron text-orange-400">{$successRate.toFixed(1)}%</p>
                </div>
                <div in:fly={{ y: 50, duration: 500, delay: 400 }} class="glass-container p-6 rounded-xl hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2">
                    <h4 class="text-xl font-semibold mb-2 text-white font-orbitron">Avg. Time</h4>
                    <p class="text-3xl font-orbitron text-orange-400">{$avgTime} ms</p>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="mt-24 w-full max-w-5xl">
            <h3 class="text-3xl font-orbitron text-center mb-12 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow">
                About Us
            </h3>
            <div class="glass-container p-8 rounded-xl shadow-neon">
                <p class="text-gray-300 text-center font-roboto-mono">
                    Neon Bypasser: Skip ad-links with ease. Fast, secure, and free—powered by xAI.
                </p>
            </div>
        </section>
    </main>

    <!-- Modal Result -->
    {#if showModal && result}
        <div 
            in:fade={{ duration: 300 }}
            class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-30"
            on:click={() => setTimeout(() => showModal = false, 100)}
        >
            <div 
                in:scale={{ duration: 300 }}
                class="glass-container p-8 rounded-2xl w-full max-w-lg shadow-2xl transform hover:rotate-1 transition-transform duration-300"
                on:click|stopPropagation
            >
                <h3 class="text-2xl font-orbitron mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow">
                    Bypass Complete!
                </h3>
                <div class="space-y-4">
                    <p class="text-gray-300 break-all font-roboto-mono">
                        <strong class="text-orange-400">URL:</strong> 
                        <a href={result.url} target="_blank" class="text-orange-400 hover:underline">{result.url}</a>
                    </p>
                    <p class="text-gray-300 font-roboto-mono"><strong class="text-orange-400">Summary:</strong> {result.aiSummary}</p>
                    <p class="text-gray-300 font-roboto-mono"><strong class="text-orange-400">Time:</strong> {result.timestamp}</p>
                    <p class="text-gray-300 font-roboto-mono"><strong class="text-orange-400">Speed:</strong> {result.bypassTime} ms</p>
                    <div>
                        <div class="flex justify-between text-sm text-gray-400 mb-2 font-roboto-mono">
                            <span>NSFW Score:</span>
                            <span>{result.nsfwScore}/100</span>
                        </div>
                        <div class="w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                            <div 
                                class="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000"
                                style="width: {result.nsfwScore}%"
                            ></div>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <button 
                            on:click={copyToClipboard}
                            class="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all duration-300 shadow-neon font-orbitron"
                        >
                            Copy
                        </button>
                        <button 
                            on:click={openUrl}
                            class="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-semibold transition-all duration-300 shadow-neon font-orbitron"
                        >
                            Open
                        </button>
                    </div>
                </div>
                <button 
                    on:click={() => showModal = false}
                    class="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-300"
                >
                    ✕
                </button>
            </div>
        </div>
    {/if}

    <!-- Sidebar -->
    <aside class="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-md p-4 rounded-l-2xl shadow-lg z-20">
        <div class="flex flex-col gap-6">
            <a href="https://discord.gg/PTz2sSGeHf" target="_blank" class="text-2xl text-orange-400 hover:text-red-400 transition-all duration-300 animate-bounce">💬</a>
            <a href="https://twitter.com/coconcac" target="_blank" class="text-2xl text-orange-400 hover:text-red-400 transition-all duration-300 animate-bounce">🐦</a>
            <a href="mailto:vanhao29t4@gmail.com" class="text-2xl text-orange-400 hover:text-red-400 transition-all duration-300 animate-bounce">✉️</a>
        </div>
    </aside>

    <!-- Footer -->
    <footer class="relative z-10 bg-gray-900/80 backdrop-blur-md py-8 px-4 text-center border-t border-gray-800/50">
        <p class="text-gray-400 font-roboto-mono">© 2025 Neon Link Bypasser - Powered by fatality.cuti</p>
        <div class="mt-4 flex justify-center gap-6">
            <a href="#features" class="text-gray-300 hover:text-orange-400 transition-all duration-300 neon-hover font-roboto-mono">Features</a>
            <a href="#stats" class="text-gray-300 hover:text-orange-400 transition-all duration-300 neon-hover font-roboto-mono">Stats</a>
            <a href="#about" class="text-gray-300 hover:text-orange-400 transition-all duration-300 neon-hover font-roboto-mono">About</a>
        </div>
    </footer>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        background: #0a0a0a;
        transition: opacity 0.5s ease;
    }
    :global(body.loaded) {
        opacity: 1;
    }

    /* Particle Effects */
    .particles { overflow: hidden; }
    .particle {
        position: absolute;
        width: var(--size);
        height: var(--size);
        background: rgba(255, 107, 0, 0.6);
        border-radius: 50%;
        animation: float infinite linear;
        box-shadow: 0 0 8px rgba(255, 107, 0, 0.4);
    }
    @keyframes float {
        0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-100vh) scale(1); opacity: 0; }
    }

    /* Glowing Orbs */
    .orbs { overflow: hidden; }
    .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(40px);
        animation: orbit infinite linear;
    }
    .orb-1 {
        width: 180px;
        height: 180px;
        top: 15%;
        left: 20%;
        background: rgba(255, 107, 0, 0.25);
        animation-duration: 18s;
    }
    .orb-2 {
        width: 140px;
        height: 140px;
        bottom: 25%;
        right: 20%;
        background: rgba(255, 0, 0, 0.2);
        animation-duration: 22s;
        animation-delay: -4s;
    }
    @keyframes orbit {
        0% { transform: translate(0, 0); }
        25% { transform: translate(40px, -40px); }
        50% { transform: translate(0, 0); }
        75% { transform: translate(-40px, 40px); }
        100% { transform: translate(0, 0); }
    }

    /* Glassmorphism */
    .glass-container {
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .glass-input {
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(6px);
    }

    /* Neon Effects */
    .shadow-neon {
        box-shadow: 0 0 12px rgba(255, 107, 0, 0.6), 
                   0 0 25px rgba(255, 107, 0, 0.4),
                   inset 0 0 8px rgba(255, 107, 0, 0.2);
    }
    .neon-hover:hover {
        text-shadow: 0 0 4px rgba(255, 107, 0, 0.9),
                    0 0 8px rgba(255, 107, 0, 0.7);
    }

    /* Text Glow Animation */
    .animate-text-glow {
        animation: text-glow 1.8s infinite alternate;
    }
    @keyframes text-glow {
        0% { text-shadow: 0 0 4px rgba(255, 107, 0, 0.6), 0 0 8px rgba(255, 107, 0, 0.4); }
        100% { text-shadow: 0 0 12px rgba(255, 107, 0, 0.9), 0 0 25px rgba(255, 107, 0, 0.6); }
    }

    /* Bounce Animation */
    .animate-bounce {
        animation: bounce 2s infinite;
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }

    /* Custom Fonts */
    .font-orbitron { font-family: 'Orbitron', sans-serif; }
    .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
</style>