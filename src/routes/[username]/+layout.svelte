<script>
  import { page } from "$app/stores";
  import { userData } from "$lib/firebase";
</script>

{#if $page.route.id?.match(/bio|edit/g)}
  <div class="w-full flex items-center justify-center gap-2 mt-5">
    <a href={`/${$userData?.username}`} class="btn">👤 Profile</a>
    <a
      href={`/${$userData?.username}/edit`}
      class="btn"
      class:btn-accent={$page.route.id?.match(/edit/g)}>🔗 Edit</a
    >
    <a
      href={`/${$userData?.username}/bio`}
      class="btn"
      class:btn-accent={$page.route.id?.match(/bio/g)}>✍️ Bio</a
    >
  </div>
{/if}

<div class="w-full flex flex-col items-center justify-center">
  <slot />
</div>
