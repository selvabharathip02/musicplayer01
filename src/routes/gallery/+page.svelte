<script>
  import { onDestroy } from 'svelte';
  import { auth } from '$lib/authStore.js';
  import { base } from '$app/paths';

  let authState = $state({ isLoggedIn: false, user: null });
  let selectedCategory = $state('All Media');
  let selectedItem = $state(null);
  let mobileMenuOpen = $state(false);

  const categories = ['All Media', 'Worship Albums', 'Choir Events', 'Headquarters', 'Concerts'];

  const galleryItems = [
    {
      id: 1,
      title: 'TPM Ernakulam Annual Convention',
      category: 'Choir Events',
      image: `${base}/images/first.png`,
      subtitle: 'Ernakulam Headquarters 2026',
      date: 'Jan 2026',
      likes: 342
    },
    {
      id: 2,
      title: 'Worship Album Cover 2026',
      category: 'Worship Albums',
      image: `${base}/images/IMG_1720.jpg`,
      subtitle: 'Official Album Art',
      date: 'Feb 2026',
      likes: 512
    },
    {
      id: 3,
      title: 'IYC Youth Choir Ensemble',
      category: 'Concerts',
      image: `${base}/images/third.jpg`,
      subtitle: 'Youth Worship Gathering',
      date: 'Mar 2026',
      likes: 289
    },
    {
      id: 4,
      title: 'Vijayawada Worship Center',
      category: 'Headquarters',
      image: `${base}/images/second.jpg`,
      subtitle: 'VJD Main Campus',
      date: 'Feb 2026',
      likes: 410
    },
    {
      id: 5,
      title: 'Malayalam Gospel Session',
      category: 'Worship Albums',
      image: `${base}/images/imgs.png`,
      subtitle: 'Studio Recording',
      date: 'Jan 2026',
      likes: 675
    },
    {
      id: 6,
      title: 'Kanjirapuzha Retreat Gathering',
      category: 'Choir Events',
      image: `${base}/images/kanjirapuzha-dam.jpg`,
      subtitle: 'Spiritual Retreat 2026',
      date: 'Apr 2026',
      likes: 198
    },
    {
      id: 7,
      title: 'Munnar Youth Praise Service',
      category: 'Concerts',
      image: `${base}/images/Munnar-4.jpg`,
      subtitle: 'Outdoor Worship Night',
      date: 'May 2026',
      likes: 320
    },
    {
      id: 8,
      title: 'Alappuzha Worship Center',
      category: 'Headquarters',
      image: `${base}/images/Alappuzha-3.jpg`,
      subtitle: 'Regional Center',
      date: 'Jun 2026',
      likes: 245
    }
  ];

  const unsubscribeAuth = auth.subscribe((val) => {
    authState = val;
  });

  onDestroy(() => {
    unsubscribeAuth();
  });

  function handleLogout() {
    auth.logout();
  }

  function filteredGallery() {
    if (selectedCategory === 'All Media') return galleryItems;
    return galleryItems.filter(item => item.category === selectedCategory);
  }

  function openModal(item) {
    selectedItem = item;
  }

  function closeModal() {
    selectedItem = null;
  }
</script>

<svelte:head>
  <title>Gallery - Pulse Music</title>
  <meta name="description" content="Explore Pulse Music photo and video gallery." />
</svelte:head>

<div class="min-h-screen bg-[#10131d] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-white">
  <div class="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(255,107,0,0.22),transparent_35%),radial-gradient(circle_at_92%_18%,rgba(255,140,0,0.2),transparent_35%),linear-gradient(145deg,#10131d_0%,#181b2b_58%,#0e1119_100%)] min-h-screen">
    <!-- Ambient light blurs -->
    <div class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl"></div>

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
              <span class="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-400 font-bold block">Media Gallery</span>
            </div>
          </a>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden md:flex items-center gap-2 text-sm font-medium">
            <a href={`${base}/template`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Home</a>
            <a href={`${base}/template#services`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">About</a>
            <a href={`${base}/gallery`} class="px-4 py-2 rounded-full bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/25 transition cursor-pointer">Gallery</a>
            <a href={`${base}/contact`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Contact</a>
          </nav>

          <!-- Auth Status & Action -->
          <div class="flex items-center gap-2 sm:gap-4">
            {#if authState.isLoggedIn}
              <a href={`${base}/menu`} class="flex items-center gap-2 text-xs font-bold text-orange-300 hover:text-orange-200 transition hidden sm:inline-flex bg-orange-500/10 border border-orange-500/30 px-3.5 py-1.5 rounded-full">
                <span>Music Player</span>
                <span>🎵</span>
              </a>
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-orange-300 hidden xs:inline-block">👤 {authState.user?.name || 'User'}</span>
                <button onclick={handleLogout} class="rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3 py-1.5 text-xs transition font-semibold cursor-pointer">Logout</button>
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
            <a href={`${base}/gallery`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl bg-orange-500 text-slate-950 font-bold text-sm">Gallery</a>
            <a href={`${base}/contact`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition text-sm">Contact</a>
            {#if authState.isLoggedIn}
              <a href={`${base}/menu`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-300 font-bold text-sm">Open Music Player 🎵</a>
            {/if}
          </nav>
        {/if}
      </header>

      <!-- Gallery Hero Banner -->
      <section class="mb-10 text-center space-y-4">
        <div class="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-orange-400 backdrop-blur-md">
          <span>🖼️ Media Showcase</span>
        </div>
        <h1 class="text-3xl font-extrabold text-white sm:text-5xl">Pulse Music Gallery</h1>
        <p class="text-sm text-slate-300 max-w-xl mx-auto">
          Explore moments from worship conventions, live choir performances, and gospel album release events.
        </p>

        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-2 pt-4">
          {#each categories as cat}
            <button
              onclick={() => selectedCategory = cat}
              class="rounded-full px-5 py-2 text-xs font-semibold transition cursor-pointer {selectedCategory === cat ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/25 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
            >
              {cat}
            </button>
          {/each}
        </div>
      </section>

      <!-- Gallery Photo Grid -->
      <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-12">
        {#each filteredGallery() as item (item.id)}
          <button 
            type="button"
            onclick={() => openModal(item)}
            class="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-3 shadow-xl transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1.5 text-left cursor-pointer"
          >
            <div class="relative overflow-hidden rounded-2xl bg-slate-900 aspect-square">
              <img 
                src={item.image} 
                alt={item.title} 
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              
              <span class="absolute top-3 right-3 rounded-full bg-slate-950/80 border border-white/10 px-3 py-1 text-[10px] font-bold text-orange-300 backdrop-blur-md">
                {item.category}
              </span>
            </div>

            <div class="mt-3 px-1">
              <h3 class="font-bold text-white text-sm truncate group-hover:text-orange-400 transition-colors">{item.title}</h3>
              <div class="flex justify-between items-center mt-1 text-xs text-slate-400">
                <span>{item.subtitle}</span>
                <span>❤️ {item.likes}</span>
              </div>
            </div>
          </button>
        {/each}
      </section>

      <!-- Lightbox Modal -->
      {#if selectedItem}
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview Modal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <button 
            type="button" 
            class="absolute inset-0 h-full w-full cursor-default bg-transparent border-0" 
            aria-label="Close Modal Backdrop"
            onclick={closeModal}
          ></button>

          <div class="relative max-w-3xl w-full rounded-3xl border border-white/10 bg-slate-900 p-4 shadow-2xl overflow-hidden z-10">
            <button 
              type="button"
              onclick={closeModal}
              class="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-white hover:bg-orange-500 hover:text-slate-950 transition cursor-pointer"
            >
              ✕
            </button>
            <img src={selectedItem.image} alt={selectedItem.title} class="w-full max-h-[70vh] object-cover rounded-2xl" />
            <div class="mt-4 p-2">
              <span class="text-xs uppercase tracking-widest text-orange-400 font-bold">{selectedItem.category}</span>
              <h3 class="text-xl font-bold text-white mt-1">{selectedItem.title}</h3>
              <p class="text-xs text-slate-400 mt-1">{selectedItem.subtitle} • {selectedItem.date}</p>
            </div>
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
