<script>
  import { onDestroy } from 'svelte';
  import { auth } from '$lib/authStore.js';
  import { base } from '$app/paths';

  let authState = $state({ isLoggedIn: false, user: null });
  let mobileMenuOpen = $state(false);
  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let submitted = $state(false);

  const unsubscribeAuth = auth.subscribe((val) => {
    authState = val;
  });

  onDestroy(() => {
    unsubscribeAuth();
  });

  function handleLogout() {
    auth.logout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitted = true;
    setTimeout(() => {
      name = '';
      email = '';
      subject = '';
      message = '';
    }, 1000);
  }
</script>

<svelte:head>
  <title>Contact Us - Pulse Music</title>
  <meta name="description" content="Get in touch with Pulse Music team and Pentecostal Mission headquarters." />
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
              <span class="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-400 font-bold block">Contact Us</span>
            </div>
          </a>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden md:flex items-center gap-2 text-sm font-medium">
            <a href={`${base}/template`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Home</a>
            <a href={`${base}/template#services`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">About</a>
            <a href={`${base}/gallery`} class="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer">Gallery</a>
            <a href={`${base}/contact`} class="px-4 py-2 rounded-full bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/25 transition cursor-pointer">Contact</a>
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
            <a href={`${base}/gallery`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition text-sm">Gallery</a>
            <a href={`${base}/contact`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl bg-orange-500 text-slate-950 font-bold text-sm">Contact</a>
            {#if authState.isLoggedIn}
              <a href={`${base}/menu`} onclick={() => mobileMenuOpen = false} class="px-4 py-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-300 font-bold text-sm">Open Music Player 🎵</a>
            {/if}
          </nav>
        {/if}
      </header>

      <!-- Contact Hero -->
      <section class="mb-12 text-center space-y-3">
        <div class="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-orange-400 backdrop-blur-md">
          <span>✉️ Get In Touch</span>
        </div>
        <h1 class="text-3xl font-extrabold text-white sm:text-5xl">We'd Love to Hear From You</h1>
        <p class="text-sm text-slate-300 max-w-lg mx-auto">
          Have questions about Pulse Music, worship song requests, or choir bookings? Send us a message below.
        </p>
      </section>

      <!-- Contact Form & Info Grid -->
      <div class="grid gap-8 lg:grid-cols-12 pb-12">
        <!-- Contact Information Cards -->
        <div class="lg:col-span-5 space-y-6">
          <div class="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-xl backdrop-blur-xl">
            <h3 class="text-lg font-bold text-white mb-4">Headquarters Locations</h3>
            
            <div class="space-y-4 text-xs text-slate-300">
              <div class="flex items-start gap-3 rounded-2xl bg-white/4 p-3.5">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 font-bold shrink-0">📍</div>
                <div>
                  <h4 class="font-bold text-white text-sm">TPM Ernakulam Center</h4>
                  <p class="mt-0.5 text-slate-400">Headquarters, Ernakulam, Kerala, India</p>
                </div>
              </div>

              <div class="flex items-start gap-3 rounded-2xl bg-white/4 p-3.5">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 font-bold shrink-0">📍</div>
                <div>
                  <h4 class="font-bold text-white text-sm">TPM Vijayawada Center</h4>
                  <p class="mt-0.5 text-slate-400">Vijayawada Headquarters Campus, Andhra Pradesh</p>
                </div>
              </div>

              <div class="flex items-start gap-3 rounded-2xl bg-white/4 p-3.5">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 font-bold shrink-0">📧</div>
                <div>
                  <h4 class="font-bold text-white text-sm">Email Support</h4>
                  <p class="mt-0.5 text-slate-400">support@pulsemusic.org • info@tpmworship.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-7">
          <div class="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-xl backdrop-blur-xl">
            <h3 class="text-xl font-bold text-white mb-2">Send Us a Message</h3>
            <p class="text-xs text-slate-400 mb-6">Fill out the form below and our team will get back to you shortly.</p>

            {#if submitted}
              <div class="rounded-2xl border border-orange-500/40 bg-orange-500/10 p-6 text-center text-orange-300">
                <div class="text-3xl mb-2">🎉</div>
                <h4 class="font-bold text-lg text-white">Message Sent Successfully!</h4>
                <p class="text-xs text-slate-300 mt-1">Thank you for reaching out to Pulse Music. We will respond soon.</p>
                <button onclick={() => submitted = false} class="mt-4 rounded-full bg-orange-500 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-orange-400 cursor-pointer">
                  Send Another Message
                </button>
              </div>
            {:else}
              <form onsubmit={handleSubmit} class="space-y-4">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label for="contact-name" class="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      bind:value={name}
                      placeholder="John Doe"
                      required
                      class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label for="contact-email" class="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      bind:value={email}
                      placeholder="john@example.com"
                      required
                      class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label for="contact-subject" class="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                  <input 
                    id="contact-subject"
                    type="text" 
                    bind:value={subject}
                    placeholder="Worship track inquiry or song request"
                    required
                    class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label for="contact-message" class="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                  <textarea 
                    id="contact-message"
                    rows="4" 
                    bind:value={message}
                    placeholder="Write your message here..."
                    required
                    class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  class="w-full rounded-2xl bg-orange-500 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  Submit Message 🚀
                </button>
              </form>
            {/if}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="py-8 border-t border-white/10 text-center text-xs text-slate-400">
        <p>© 2026 Pulse Music. All rights reserved.</p>
      </footer>
    </div>
  </div>
</div>
