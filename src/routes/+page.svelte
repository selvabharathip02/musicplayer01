<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  onMount(() => {
    if (browser) {
      goto(`${base}/template`);
    }
  });
</script>

<svelte:head>
  <title>Pulse Music</title>
</svelte:head>

<div class="min-h-screen bg-[#10131d] flex items-center justify-center text-slate-300">
  <p class="text-sm font-semibold text-orange-400 animate-pulse">Redirecting to Pulse Music Landing Template...</p>
</div>
