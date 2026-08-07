<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { auth } from '$lib/authStore.js';
  import { onDestroy } from 'svelte';

  let email = $state('');
  let password = $state('');
  let mobileMenuOpen = $state(false);
  let authState = $state({ isLoggedIn: false, user: null });

  const unsubscribe = auth.subscribe(val => {
    authState = val;
  });

  onDestroy(() => unsubscribe());

  function handleSubmit(event) {
    event.preventDefault();
    auth.login(email);
    goto(`${base}/menu`);
  }

  function handleLogout() {
    auth.logout();
  }
</script>

<svelte:head>
  <title>Login - Pulse Music</title>
  <meta name="description" content="Sign in to Pulse Music to access spiritual worship songs and music player." />
</svelte:head>

<div class="min-h-screen bg-[#10131d] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-white">
  <div class="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(255,107,0,0.22),transparent_35%),radial-gradient(circle_at_92%_18%,rgba(255,140,0,0.2),transparent_35%),linear-gradient(145deg,#10131d_0%,#181b2b_58%,#0e1119_100%)] min-h-screen">
    <!-- Ambient Background Glows -->
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
              <span class="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-400 font-bold block">Account Portal</span>
            </div>
          </a>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden md:flex items-center gap-2 text-sm font-medium">
            <a href={`${base}/template`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Home</a>
            <a href={`${base}/template#services`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">About</a>
            <a href={`${base}/gallery`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Gallery</a>
            <a href={`${base}/contact`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Contact</a>
          </nav>

          <!-- Auth Status & Action -->
          <div class="flex items-center gap-2 sm:gap-4">
            {#if authState.isLoggedIn}
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-orange-300 hidden xs:inline-block">👤 {authState.user?.name || 'User'}</span>
                <button onclick={handleLogout} class="rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3.5 py-1.5 text-xs transition font-semibold cursor-pointer">Logout</button>
              </div>
            {:else}
              <span class="rounded-full bg-orange-500 px-4 sm:px-5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-orange-500/25">Login</span>
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
          </nav>
        {/if}
      </header>

      <!-- Main Login Section -->
      <main class="py-6">
        <div class="rounded-[2.5rem] border border-white/10 bg-white/6 p-6 sm:p-12 shadow-[18px_18px_45px_rgba(4,6,15,0.42),-12px_-12px_36px_rgba(255,255,255,0.025)] backdrop-blur-xl">
          <div class="grid items-center gap-10 lg:grid-cols-12">
            <!-- Left Feature Showcase -->
            <div class="lg:col-span-6">
              <div class="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-orange-400 backdrop-blur-md mb-6">
                <span class="flex h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
                Welcome Back 🎧
              </div>

              <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15]">
                Sign In to Enjoy <br />
                <span class="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">Pulse Music</span>
              </h1>

              <p class="mt-4 text-sm sm:text-base leading-7 text-slate-300 max-w-lg">
                Access your personal worship music player, custom playlists, and high quality audio streaming.
              </p>

              <!-- Music Artwork Preview Card -->
              <div class="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#151927]/80 p-3 shadow-2xl max-w-sm hidden sm:block">
                <div class="relative overflow-hidden rounded-2xl bg-slate-950">
                  <img 
                    src={`${base}/images/imgs.png`} 
                    alt="Pulse Music Showcase" 
                    class="h-44 w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#151927] via-transparent to-transparent"></div>
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span class="text-xs font-bold text-white">Lossless Worship Streaming</span>
                    <span class="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-950">320kbps</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Login Form Card -->
            <div class="lg:col-span-6">
              <div class="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
                {#if authState.isLoggedIn}
                  <div class="text-center py-4">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/20 text-3xl text-orange-400 border border-orange-500/40 shadow-lg">
                      ✓
                    </div>
                    <h2 class="text-2xl font-extrabold text-white">You Are Logged In</h2>
                    <p class="mt-2 text-sm text-slate-300">Welcome, <span class="font-bold text-orange-400">{authState.user?.name || 'User'}</span></p>

                    <div class="mt-8 flex flex-col gap-3">
                      <a href={`${base}/menu`} class="w-full rounded-full bg-orange-500 px-6 py-3.5 text-center text-sm font-bold text-slate-950 shadow-xl shadow-orange-500/25 transition hover:bg-orange-400 hover:scale-105">
                        Open Music Player 🎵
                      </a>
                      <button onclick={handleLogout} class="w-full rounded-full border border-red-500/30 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20">
                        Logout
                      </button>
                    </div>
                  </div>
                {:else}
                  <div class="mb-6">
                    <h2 class="text-2xl font-bold text-white">Sign In</h2>
                    <p class="mt-1 text-xs text-slate-400">Enter your credentials to access your account.</p>
                  </div>

                  <form onsubmit={handleSubmit} class="space-y-4">
                    <div>
                      <label for="login-email" class="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input 
                        id="login-email"
                        type="email" 
                        bind:value={email}
                        placeholder="you@example.com"
                        required
                        class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label for="login-password" class="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                      <input 
                        id="login-password"
                        type="password" 
                        bind:value={password}
                        placeholder="••••••••"
                        required
                        class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    <div class="flex items-center justify-between text-xs pt-1">
                      <label class="flex items-center gap-2 text-slate-400 cursor-pointer">
                        <input type="checkbox" class="h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500" />
                        <span>Remember me</span>
                      </label>
                      <button type="button" class="font-semibold text-orange-400 transition hover:text-orange-300">Forgot password?</button>
                    </div>

                    <button 
                      type="submit"
                      class="w-full rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-orange-500/25 transition hover:bg-orange-400 hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      Sign In 🔑
                    </button>
                  </form>

                  <div class="mt-6 text-center text-xs text-slate-400">
                    Don’t have an account?
                    <button type="button" class="ml-1 font-bold text-orange-400 hover:text-orange-300">Create one</button>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="py-8 border-t border-white/10 text-center text-xs text-slate-400">
        <p>© 2026 Pulse Music. All rights reserved.</p>
      </footer>
    </div>
  </div>
</div>

