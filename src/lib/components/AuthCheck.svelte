<script lang="ts">
  import { user } from "$lib/firebase";
</script>

{#if $user}
  <slot />
{:else}
  <div class="flex flex-col items-center justify-center gap-3">
    <p class="text-error">You must be signed in to view this page.</p>
    <a class="btn btn-neutral btn-outline" href="/login">Sign In</a>
  </div>
{/if}
