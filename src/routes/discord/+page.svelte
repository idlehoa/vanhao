<script>
    import { onMount } from "svelte";
  
    const discordInvite = "https://discord.alora.pw/";
  
    onMount(() => {
      window.location.href = discordInvite;
    });
  </script>
  
  <style>
    .redirect-message {
      text-align: center;
      margin-top: 20px;
      font-family: Arial, sans-serif;
    }
  </style>
  
  <div class="redirect-message">
    <p>Redirecting you to our Discord server...</p>
    <p>If you're not redirected, <a href={discordInvite}>click here</a>.</p>
  </div>
  