<script>
  import { onMount, onDestroy } from 'svelte';
  import { player } from './playerStore.js';

  let audio = $state(null);
  let state = $state({ playlist: [], index: 0, current: null, playing: false });
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(0.9);
  let isLiked = $state(false);
  let shareLabel = $state('Share');

  const unsub = player.subscribe(v => {
    state = v;
    if (!audio) return;

    audio.volume = volume;
    if (!state.current || !state.playing) {
      audio.pause();
      return;
    }

    if (audio.getAttribute('src') !== state.current.src) {
      audio.src = state.current.src;
      audio.load();
    }

    if (audio.paused) audio.play().catch(() => player.pause());
  });

  onDestroy(() => unsub());

  function togglePlay() {
    if (!state.current) return;
    if (state.playing) {
      player.pause();
      audio.pause();
    } else {
      player.play();
      audio.play().catch(() => player.pause());
    }
  }

  function onTimeUpdate() {
    currentTime = audio.currentTime || 0;
    duration = audio.duration || 0;
    player.setProgress(currentTime, duration);
  }

  function seek(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    if (audio && duration) audio.currentTime = pct * duration;
    onTimeUpdate();
  }

  function onSeekKey(e) {
    if (!audio || !duration) return;
    if (e.key === 'ArrowLeft') {
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    } else if (e.key === 'ArrowRight') {
      audio.currentTime = Math.min(duration, audio.currentTime + 5);
    }
    onTimeUpdate();
  }

  function next() {
    player.next();
  }

  function prev() {
    player.prev();
  }

  function stop() {
    player.stop();
    currentTime = 0;
    duration = 0;
  }

  async function shareTrack() {
    if (!state.current) return;

    const shareData = {
      title: state.current.title,
      text: `Listen to ${state.current.title} by ${state.current.artist || 'Unknown artist'}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        shareLabel = 'Copied';
        setTimeout(() => (shareLabel = 'Share'), 1600);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') shareLabel = 'Unavailable';
    }
  }

  function format(t) {
    if (!t || !isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
</script>

{#if state.current}
<div class="fixed bottom-4 left-1/2 z-50 w-[min(1100px,95%)] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900/90 p-4 text-slate-200 shadow-2xl backdrop-blur-md">
  <div class="flex items-center gap-4">
    <img src={state.current.image || state.current.cover} alt={state.current.title} class="h-14 w-14 rounded-xl object-cover" />
    <div class="flex-1">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="min-w-0">
          <div class="text-sm font-semibold">{state.current.title}</div>
          <div class="text-xs text-slate-400">{state.current.artist} • {state.current.album}</div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" onclick={prev} aria-label="Previous track" class="rounded-full p-2 transition hover:bg-white/10">⏮</button>
          <button type="button" onclick={togglePlay} class="rounded-full bg-[#f6b84a] px-4 py-2 font-semibold text-slate-950 shadow">{state.playing ? 'Pause' : 'Play'}</button>
          <button type="button" onclick={stop} class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15">Stop</button>
          <button type="button" onclick={next} aria-label="Next track" class="rounded-full p-2 transition hover:bg-white/10">⏭</button>
          <button type="button" onclick={() => (isLiked = !isLiked)} aria-pressed={isLiked} aria-label={isLiked ? 'Unlike track' : 'Like track'} class={`rounded-full px-3 py-2 text-lg transition ${isLiked ? 'bg-amber-400/20 text-amber-300' : 'hover:bg-white/10'}`}>
            {isLiked ? '♥' : '♡'}
          </button>
          <button type="button" onclick={shareTrack} aria-label="Share track" class="rounded-full px-3 py-2 text-sm transition hover:bg-white/10">↗ {shareLabel}</button>
        </div>
      </div>

      <div class="mt-3">
        <div role="slider" tabindex="0" class="h-2 w-full rounded-full bg-white/5" onclick={seek} onkeydown={onSeekKey} aria-valuemin="0" aria-valuemax={duration} aria-valuenow={currentTime}>
          <div class="h-2 rounded-full bg-[#f6b84a]" style="width: {duration ? (currentTime / duration) * 100 : 0}%"></div>
        </div>
        <div class="mt-2 flex items-center justify-between text-xs text-slate-400">
          <div>{format(currentTime)}</div>
          <div>{format(duration)}</div>
        </div>
      </div>
    </div>
  </div>

</div>
{/if}

<audio class="hidden" bind:this={audio} ontimeupdate={onTimeUpdate} onended={next}></audio>

<!-- helper moved into main script -->
