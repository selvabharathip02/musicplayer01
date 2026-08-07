<script>
  import { onDestroy } from 'svelte';
  import { player } from '$lib/playerStore.js';
  import { auth } from '$lib/authStore.js';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  let currentTrack = $state(1);
  let isPlaying = $state(false);
  let searchQuery = $state('');
  let isLiked = $state(false);
  let shareLabel = $state('Share');
  let mobileMenuOpen = $state(false);
  let playerState = $state({ playlist: [], index: 0, current: null, playing: false, currentTime: 0, duration: 0 });
  let authState = $state({ isLoggedIn: false, user: null });

  const album = {
    title: 'The Pentecostal Mission',
    artist: 'John Peter',
    year: 2026,
    songs: 19,
    duration: '63 min',
    description: 'Collection of spiritual and Christian worship songs from TPM Ernakulam and Vijayawada headquarters.',
    genres: ['Christian', 'Gospel / Worship'],
    rating: 4.8,
    cover: `${base}/images/IMG_1720.jpg`,
    tracks: [
      { id: 1, title: 'TPM Ernakulam malayalam song Bharangal', producer: 'TPM EKM headquarter', duration: '3:32', src: `${base}/songs/Bharangal.mp3`, image: `${base}/images/first.png` },
      { id: 2, title: 'TPM Ernakulam Song En Maname Yahovayil', producer: 'TPM EKM headquarter', duration: '3:33', src: `${base}/songs/En Maname Yahovayil.mp3`, image: `${base}/images/IMG_1720.jpg` },
      { id: 3, title: 'TPM Ernakulam Song Ennullam Kamkshichu', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/Ennullam Kamkshichu.mp3`, image: `${base}/images/OIP (7).jpg` },
      { id: 4, title: 'TPM Enakulam Song Iru thoniyil', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/Iru thoniyil.mp3`, image: `${base}/images/second.jpg` },
      { id: 5, title: 'TPM IYC Song Israyelin Kaahalam', producer: 'Ayo', duration: '3:19', src: `${base}/songs/Israyelin Kaahalam.mp3`, image: `${base}/images/third.jpg` },
      { id: 6, title: 'TPM Enakulam Song Kaanunnile', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/Kaanunnile.mp3`, image: `${base}/images/Alappuzha-3.jpg` },
      { id: 7, title: 'TPM Enakulam Song kAANUNNU NJAANEN', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/kAANUNNU NJAANEN.mp3`, image: `${base}/images/kanjirapuzha-dam.jpg` },
      { id: 8, title: 'TPM EnakulamSong MALPRIYANE ENNESHUNADHA', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/MALPRIYANE ENNESHUNADHA.mp3`, image: `${base}/images/Maldives2.webp` },
      { id: 9, title: 'TPM Enakulam Song Oodunnu', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/Oodunnu.mp3`, image: `${base}/images/Munnar-4.jpg` },
      { id: 10, title: 'TPM Enakulam Song Saumyanaam', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/Saumyanaam.mp3`, image: `${base}/images/xfZygN.webp` },
      { id: 11, title: 'TPM Enakulam Song Gathsamanayil', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Gathsamanayil.mp3`, image: `${base}/images/OIP (8) - Copy.jpg` },
      { id: 12, title: 'TPM Vijayawada Song Yesaiya nenu', producer: 'TPM VJD headquarter', duration: '3:19', src: `${base}/songs/TPM Telugu Song Yesaiya nenu.mp3`, image: `${base}/images/second.jpg` },
      { id: 14, title: 'TPM Ernakulam Song Spadika Thulyamam', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Ernakulam Song Spadika Thulyamam.mp3`, image: `${base}/images/second.jpg` },
      { id: 15, title: 'TPM Ernakulam Song Enpriyakantha yeshu', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Ernakulam Song Enpriyakantha yeshu.mp3`, image: `${base}/images/second.jpg` },
      { id: 16, title: 'TPM Malayalam Song Neethi puramagum', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Malayalam Song Neethi puramagum.mp3`, image: `${base}/images/second.jpg` },
      { id: 17, title: 'TPM Malayalam Song Shobhapoornna', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Malayalam Song Shobhapoornna.mp3`, image: `${base}/images/second.jpg` },
      { id: 18, title: 'TPM Malayalam Song Krushile Sneham', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Malayalam Song Krushile Sneham.mp3`, image: `${base}/images/second.jpg` },
      { id: 19, title: 'TPM Ernakulam Malayalam Song Vishwasa nayakan yeshuve', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Ernakulam Malayalam Song Vishwasa nayakan yeshuve.mp3`, image: `${base}/images/second.jpg` },
      { id: 20, title: 'TPM Ernakulam Song Vishudhiye thikachu nam', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Ernakulam Song Vishudhiye thikachu nam.mp3`, image: `${base}/images/second.jpg` },
      { id: 21, title: 'TPM Ernakulam Song Spadiga Thulyamam', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Ernakulam Song Spadika Thulyamam.mp3`, image: `${base}/images/xfZygN.webp` },
      { id: 22, title: 'TPM Ernakulam Song', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Malayalam Song Shobhapoornna.mp3`, image: `${base}/images/second.jpg` },
      { id: 23, title: 'TPM Ernakulam Song Seon malayil', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Malayalam Song Shobhapoornna.mp3`, image: `${base}/images/second.jpg` },
      { id: 24, title: 'TPM Vijayawada Song yesaiya Nenu', producer: 'TPM VJD headquarter', duration: '3:19', src: `${base}/songs/TPM Malayalam Song Shobhapoornna.mp3`, image: `${base}/images/second.jpg` },
      { id: 25, title: 'TPM Ernakulam Song', producer: 'TPM EKM headquarter', duration: '3:19', src: `${base}/songs/TPM Malayalam Song Shobhapoornna.mp3`, image: `${base}/images/second.jpg` }
    ]
  };

  const playlist = album.tracks.map((track) => ({
    ...track,
    album: album.title,
    artist: album.artist,
    cover: album.cover
  }));

  const unsubscribePlayer = player.subscribe((value) => {
    playerState = value;
    if (value.current?.id) {
      currentTrack = value.current.id;
    }
    isPlaying = Boolean(value.current && value.playing);
  });

  const unsubscribeAuth = auth.subscribe((val) => {
    authState = val;
    if (browser && !val.isLoggedIn) {
      goto(`${base}/loginpage`);
    }
  });

  onDestroy(() => {
    unsubscribePlayer();
    unsubscribeAuth();
  });

  function handleLogout() {
    auth.logout();
    if (browser) {
      goto(`${base}/loginpage`);
    }
  }

  function togglePlay() {
    if (!playerState.current) {
      playTrack(currentTrack);
      return;
    }

    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }

  function stopTrack() {
    player.stop();
  }

  async function shareTrack() {
    const track = playerState.current;
    if (!track) return;

    const shareData = {
      title: track.title,
      text: `Listen to ${track.title} by ${track.artist || album.artist}`,
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

  function playTrack(id) {
    const index = playlist.findIndex((track) => track.id === id);
    if (index === -1) return;

    currentTrack = id;
    player.playList(playlist, index);
  }

  function filteredTracks() {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return album.tracks;

    return album.tracks.filter((track) =>
      [track.title, track.producer, track.duration].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }

  function formatTime(time) {
    if (!time || !Number.isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function progressPercent() {
    if (!playerState.duration) return 0;
    return Math.min(100, (playerState.currentTime / playerState.duration) * 100);
  }
</script>

<svelte:head>
  <title>Pulse Music - Music Player</title>
  <meta name="description" content="Listen and enjoy Pentecostal and Gospel worship music on Pulse Music player." />
</svelte:head>

<div class="min-h-screen bg-[#10131d] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-white">
  <div class="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(255,107,0,0.22),transparent_35%),radial-gradient(circle_at_92%_18%,rgba(255,140,0,0.2),transparent_35%),linear-gradient(145deg,#10131d_0%,#181b2b_58%,#0e1119_100%)] min-h-screen">
    <!-- Ambient Background Glows -->
    <div class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl"></div>
    <div class="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>

    <!-- Floating Social Media Sidebar -->
    <aside class="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 rounded-full border border-white/10 bg-[#151927]/85 p-3 shadow-xl backdrop-blur-xl">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-orange-500 hover:text-slate-950 hover:scale-110">
        <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
        </svg>
        <span class="absolute left-14 hidden rounded-md bg-slate-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap shadow-lg">Twitter</span>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-orange-500 hover:text-slate-950 hover:scale-110">
        <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span class="absolute left-14 hidden rounded-md bg-slate-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap shadow-lg">Facebook</span>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-orange-500 hover:text-slate-950 hover:scale-110">
        <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span class="absolute left-14 hidden rounded-md bg-slate-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap shadow-lg">Instagram</span>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-orange-500 hover:text-slate-950 hover:scale-110">
        <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        <span class="absolute left-14 hidden rounded-md bg-slate-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap shadow-lg">LinkedIn</span>
      </a>
    </aside>

    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
      <!-- Top Navigation Bar -->
      <header class="mb-8">
        <div class="flex items-center justify-between rounded-full border border-white/10 bg-[#151927]/85 px-4 sm:px-6 py-3.5 shadow-xl backdrop-blur-xl">
          <a href={`${base}/template`} class="flex items-center gap-3 group">
            <div class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 font-extrabold text-slate-950 shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              🍊
            </div>
            <div>
              <span class="text-sm sm:text-base font-extrabold tracking-wide text-white block">Pulse Music</span>
              <span class="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-400 font-bold block">Music Player</span>
            </div>
          </a>

          <!-- Desktop Links -->
          <nav class="hidden md:flex items-center gap-2 text-sm font-medium">
            <a href={`${base}/template`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Home</a>
            <a href={`${base}/template#services`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">About</a>
            <a href={`${base}/gallery`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Gallery</a>
            <a href={`${base}/contact`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Contact</a>
            <a href={`${base}/menu`} class="px-4 py-2 rounded-full bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/25 transition cursor-pointer">Player</a>
          </nav>

          <!-- Auth Status & Quick Action -->
          <div class="flex items-center gap-2 sm:gap-4">
            {#if authState.isLoggedIn}
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-orange-300 hidden xs:inline-block">👤 {authState.user?.name || 'User'}</span>
                <button onclick={handleLogout} class="rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3.5 py-1.5 text-xs transition font-semibold cursor-pointer">Logout</button>
              </div>
            {:else}
              <a href={`${base}/loginpage`} class="rounded-full bg-orange-500 px-4 sm:px-5 py-2 text-xs font-bold text-slate-950 hover:bg-orange-400 transition shadow-lg shadow-orange-500/25 hover:scale-105">Login</a>
            {/if}

            <!-- Mobile Hamburger Button -->
            <button 
              onclick={() => mobileMenuOpen = !mobileMenuOpen}
              aria-label="Toggle Mobile Menu"
              class="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-white/10 transition cursor-pointer border border-white/10"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <!-- Mobile Dropdown Navigation -->
        {#if mobileMenuOpen}
          <nav class="md:hidden mt-3 rounded-3xl border border-white/10 bg-[#151927]/95 p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-2">
            <a href={`${base}/template`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition text-sm">Home</a>
            <a href={`${base}/template#services`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition text-sm">About</a>
            <a href={`${base}/gallery`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition text-sm">Gallery</a>
            <a href={`${base}/contact`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition text-sm">Contact</a>
            <a href={`${base}/menu`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl bg-orange-500 text-slate-950 font-bold text-sm">Player Deck 🎵</a>
          </nav>
        {/if}
      </header>

      {#if authState.isLoggedIn}
      <!-- Hero Spotlight Banner -->
      <section class="mb-10 rounded-[2.5rem] border border-white/10 bg-white/6 p-6 sm:p-10 shadow-[18px_18px_45px_rgba(4,6,15,0.42),-12px_-12px_36px_rgba(255,255,255,0.025)] backdrop-blur-xl">
        <div class="grid items-center gap-10 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <!-- Welcome Pill -->
            <div class="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-orange-400 backdrop-blur-md mb-6">
              <span class="flex h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
              Spiritual & Worship Songs 🎶
            </div>

            <!-- Bold Headline -->
            <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl leading-[1.15]">
              Enjoy Worship Songs <br class="hidden sm:inline" />
              <span class="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">Anytime & Anywhere</span>
            </h1>

            <p class="mt-4 text-sm sm:text-base leading-7 text-slate-300 max-w-xl">
              Listen to Pentecostal & Gospel worship music collections, create custom playlists, and manage audio tracks effortlessly.
            </p>

            <!-- Action Controls -->
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <button 
                type="button" 
                onclick={togglePlay}
                class="flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-orange-500/25 transition-all hover:bg-orange-400 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? 'Pause Music ⏸' : 'Play Album ▶'}
              </button>
              <button 
                type="button"
                onclick={shareTrack}
                class="rounded-full border border-white/10 bg-slate-950/80 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:border-orange-500/30 cursor-pointer"
              >
                Share Collection ↗
              </button>
            </div>

            <!-- Metric stats -->
            <div class="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 max-w-lg">
              <div class="rounded-3xl bg-white/4 p-4 text-center shadow-[inset_4px_4px_12px_rgba(0,0,0,0.2),inset_-4px_-4px_12px_rgba(255,255,255,0.025)]">
                <p class="text-2xl sm:text-3xl font-extrabold text-white">{album.songs}</p>
                <p class="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold">Tracks</p>
              </div>
              <div class="rounded-3xl bg-white/4 p-4 text-center shadow-[inset_4px_4px_12px_rgba(0,0,0,0.2),inset_-4px_-4px_12px_rgba(255,255,255,0.025)]">
                <p class="text-2xl sm:text-3xl font-extrabold text-orange-400">★ {album.rating}</p>
                <p class="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold">Rating</p>
              </div>
              <div class="rounded-3xl bg-white/4 p-4 text-center shadow-[inset_4px_4px_12px_rgba(0,0,0,0.2),inset_-4px_-4px_12px_rgba(255,255,255,0.025)]">
                <p class="text-2xl sm:text-3xl font-extrabold text-white">{album.duration}</p>
                <p class="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold">Duration</p>
              </div>
            </div>
          </div>

          <!-- Hero Background Image & Neumorphic Card -->
          <div class="lg:col-span-5">
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <div class="relative overflow-hidden rounded-4xl border border-white/10 bg-[#151927]/80 p-3.5 shadow-2xl shadow-black/40">
                <div class="relative overflow-hidden rounded-3xl bg-slate-950 aspect-square">
                  <img 
                    src={playerState.current?.image || album.cover} 
                    alt={album.title} 
                    class="h-full w-full object-cover object-center transition-all duration-700 hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#151927] via-transparent to-transparent"></div>
                  {#if isPlaying}
                    <div class="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg backdrop-blur-md animate-pulse">
                      <span>• PLAYING</span>
                    </div>
                  {/if}
                </div>

                <!-- Floating Overlay Card -->
                <div class="mt-3 flex items-center justify-between rounded-3xl bg-white/4 p-4 shadow-[inset_4px_4px_12px_rgba(0,0,0,0.2),inset_-4px_-4px_12px_rgba(255,255,255,0.025)]">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 font-bold text-base">
                      ⚡
                    </div>
                    <div>
                      <h4 class="font-semibold text-white text-sm">Ultra High Quality</h4>
                      <p class="text-xs text-slate-400">320kbps Lossless Audio</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onclick={togglePlay}
                    class="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-orange-400 cursor-pointer hover:scale-105"
                  >
                    {isPlaying ? 'Pause' : 'Listen'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Player Controls & Song List Section -->
      <div class="grid gap-8 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start pb-12">
        <!-- Left Sidebar: Animated Vinyl & Player Controls -->
        <aside class="space-y-6">
          <!-- Circular Conic Disc Container -->
          <div class="rounded-[2.5rem] border border-white/10 bg-white/6 p-6 shadow-[18px_18px_45px_rgba(4,6,15,0.42),-12px_-12px_36px_rgba(255,255,255,0.025)] text-center">
            <div
              class="mx-auto aspect-square w-full max-w-[260px] rounded-full p-2.5 shadow-[8px_8px_22px_rgba(3,5,12,0.5),-6px_-6px_18px_rgba(255,255,255,0.05)] transition-all duration-300"
              style={`background: conic-gradient(from 180deg, #ff6b00 ${progressPercent()}%, rgba(255,255,255,0.12) ${progressPercent()}% 100%)`}
            >
              <div class="h-full w-full rounded-full bg-[#151927] p-2 shadow-inner shadow-black/50 overflow-hidden relative group">
                <img 
                  src={playerState.current?.image || album.cover} 
                  alt={playerState.current?.title || album.title} 
                  class={`h-full w-full rounded-full object-cover transition-transform duration-1000 ${isPlaying ? 'animate-[spin_12s_linear_infinite]' : ''}`} 
                />
                <!-- Center Spindle Hole -->
                <div class="absolute inset-0 m-auto h-12 w-12 rounded-full border-4 border-slate-900 bg-[#10131d] shadow-md flex items-center justify-center">
                  <div class="h-3.5 w-3.5 rounded-full bg-orange-500"></div>
                </div>
              </div>
            </div>

            <!-- Track Meta Info -->
            <div class="mt-6">
              <span class="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-300">
                {isPlaying ? 'Now Playing' : 'Selected Track'}
              </span>
              <h2 class="mt-3 truncate text-xl font-bold text-white">{playerState.current?.title || album.tracks[0].title}</h2>
              <p class="mt-1 text-sm text-slate-400">{playerState.current?.producer || album.artist}</p>
            </div>
          </div>

          <!-- Player Control Deck -->
          <div class="rounded-[2.5rem] border border-white/10 bg-white/6 p-6 shadow-[18px_18px_45px_rgba(4,6,15,0.38),-10px_-10px_30px_rgba(255,255,255,0.025)]">
            <!-- Progress Bar & Time Display -->
            <div class="space-y-2">
              <div class="h-2 w-full overflow-hidden rounded-full bg-slate-900/80 p-0.5 shadow-inner">
                <div 
                  class="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
                  style={`width: ${progressPercent()}%`}
                ></div>
              </div>
              <div class="flex items-center justify-between text-xs font-medium text-slate-400">
                <span>{formatTime(playerState.currentTime)}</span>
                <span>{formatTime(playerState.duration)}</span>
              </div>
            </div>

            <!-- Controls Buttons Grid -->
            <div class="mt-6 flex items-center justify-center gap-3">
              <button 
                type="button" 
                onclick={() => player.prev()} 
                aria-label="Previous track" 
                class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/80 text-slate-200 transition hover:bg-slate-800 hover:text-white hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                ⏮
              </button>

              <button 
                type="button" 
                onclick={togglePlay} 
                class="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-slate-950 font-bold text-lg shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button 
                type="button" 
                onclick={stopTrack} 
                aria-label="Stop track"
                class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/80 text-slate-200 transition hover:bg-slate-800 hover:text-white hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                ⏹
              </button>

              <button 
                type="button" 
                onclick={() => player.next()} 
                aria-label="Next track" 
                class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/80 text-slate-200 transition hover:bg-slate-800 hover:text-white hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                ⏭
              </button>
            </div>

            <!-- Action Buttons Row -->
            <div class="mt-6 flex items-center justify-center gap-3 border-t border-white/10 pt-5">
              <button 
                type="button" 
                onclick={() => (isLiked = !isLiked)} 
                aria-pressed={isLiked} 
                class={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${isLiked ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800 border border-transparent'}`} 
                aria-label={isLiked ? 'Unlike track' : 'Like track'}
              >
                <span class="text-base">{isLiked ? '♥' : '♡'}</span>
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button 
                type="button" 
                onclick={shareTrack} 
                class="flex items-center gap-2 rounded-full bg-slate-950/80 border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-orange-500/30 cursor-pointer" 
                aria-label="Share track"
              >
                <span>↗</span>
                <span>{shareLabel}</span>
              </button>
            </div>
          </div>
        </aside>

        <!-- Right Side: Search & Track Cards List -->
        <section class="space-y-6">
          <!-- Search Header Card -->
          <div class="rounded-[2.5rem] border border-white/10 bg-white/6 p-6 shadow-[18px_18px_45px_rgba(4,6,15,0.38),-10px_-10px_30px_rgba(255,255,255,0.025)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-orange-400 font-bold">Playlist Queue</p>
              <h3 class="text-xl font-bold text-white mt-1">Tracks & Worship Songs 🎵</h3>
            </div>
            
            <div class="relative min-w-[240px] sm:min-w-[280px]">
              <input
                type="text"
                placeholder="Search tracks or producers..."
                bind:value={searchQuery}
                class="w-full rounded-full border border-slate-700/70 bg-slate-950/80 px-5 py-3 pr-10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            </div>
          </div>

          <!-- Tracks List -->
          <div class="space-y-3.5">
            {#each filteredTracks() as track (track.id)}
              <button
                type="button"
                onclick={() => playTrack(track.id)}
                class={`group grid min-h-20 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                  currentTrack === track.id
                    ? 'border-orange-500/50 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                    : 'border-white/10 bg-slate-950/80 hover:border-orange-500/30 hover:bg-slate-900/90 hover:-translate-y-0.5'
                }`}
              >
                <!-- Thumbnail Cover -->
                <div class="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-800/70 shadow-md flex-shrink-0">
                  <img src={track.image} alt={track.title} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {#if currentTrack === track.id && isPlaying}
                    <div class="absolute inset-0 bg-slate-950/50 flex items-center justify-center">
                      <div class="flex items-end gap-0.5 h-4">
                        <span class="w-1 bg-orange-500 animate-[bounce_0.8s_infinite]"></span>
                        <span class="w-1 bg-orange-500 animate-[bounce_1.2s_infinite]"></span>
                        <span class="w-1 bg-orange-500 animate-[bounce_0.6s_infinite]"></span>
                      </div>
                    </div>
                  {/if}
                </div>

                <!-- Title & Producer -->
                <div class="min-w-0">
                  <p class={`truncate text-sm sm:text-base font-semibold ${currentTrack === track.id ? 'text-orange-300' : 'text-white group-hover:text-orange-300'} transition-colors`}>
                    {track.title}
                  </p>
                  <p class="mt-1 text-xs text-slate-400 truncate">{track.producer}</p>
                </div>

                <!-- Duration & Action Badge -->
                <div class="flex flex-col items-end gap-2 flex-shrink-0">
                  <span class="text-xs text-slate-400 font-medium">{track.duration}</span>
                  <span class={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                    currentTrack === track.id
                      ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20'
                      : 'bg-white/5 text-slate-300 group-hover:bg-orange-500 group-hover:text-slate-950'
                  }`}>
                    {currentTrack === track.id ? (isPlaying ? 'Playing ⏸' : 'Paused ▶') : 'Play ▶'}
                  </span>
                </div>
              </button>
            {/each}

            {#if filteredTracks().length === 0}
              <div class="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">
                <p class="text-base font-medium">No tracks found matching "{searchQuery}"</p>
                <p class="text-xs text-slate-500 mt-1">Try searching for a different track title or artist.</p>
              </div>
            {/if}
          </div>
        </section>
      </div>
      {:else}
        <!-- Unauthenticated Access Guard -->
        <div class="my-16 rounded-[2.5rem] border border-orange-500/30 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl max-w-xl mx-auto">
          <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/20 text-4xl font-bold text-orange-400 border border-orange-500/40 shadow-lg shadow-orange-500/10">
            🔒
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Login Required</h2>
          <p class="mt-3 text-sm text-slate-300 leading-relaxed">
            The Music Player is restricted to logged-in users only. Redirecting you to the login page...
          </p>
          <div class="mt-8 flex justify-center gap-4">
            <a 
              href={`${base}/loginpage`} 
              class="rounded-full bg-orange-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-orange-500/30 transition hover:bg-orange-400 hover:scale-105 active:scale-95"
            >
              Log In Now 🔑
            </a>
          </div>
        </div>
      {/if}

      <!-- Footer -->
      <footer class="py-8 border-t border-white/10 text-center text-xs text-slate-400">
        <p>© 2026 Pulse Music. All rights reserved.</p>
      </footer>
    </div>
  </div>
</div>