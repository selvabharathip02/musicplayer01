<script>
  const { name = '', price = 0 } = $props();
</script>

<div class="rounded-2xl border border-white/10 bg-[#151927]/90 p-4 text-slate-100 shadow-[10px_10px_24px_rgba(4,6,15,0.35),-6px_-6px_18px_rgba(255,255,255,0.025)]">
  <div class="text-lg font-semibold">{name}</div>
  <div class="mt-2 text-sm text-slate-400">₹{price}</div>
  <button class="mt-4 rounded-full bg-[#f6b84a] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">Add to Cart</button>
</div>
