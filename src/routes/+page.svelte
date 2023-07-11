<script lang="ts">
  import { userData } from "$lib/firebase";
</script>

<div
  class="bg-gradient-to-r from-gray-100 w-screen h-screen flex items-center justify-center flex-col"
>
  <div class="w-full flex items-center justify-center flex-col">
    <h1 class="text-3xl md:text-4xl text-center font-bold text-gray-400">
      Welcome to <span class="text-primary"><strong>Link</strong>Trail</span>🌟!
    </h1>
    <p
      class="w-[90%] text-md md:text-xl text-center mt-8 text-gray-700 md:w-[600px]"
    >
      Here you will be able to <strong>create</strong> a dynamic and
      <strong>personalized</strong>
      profile that
      <strong>showcases</strong> all your <strong>important links</strong> in
      <strong>one</strong>
      convenient <strong>place</strong>. LinkTrail empowers you to curate and
      share your online presence effortlessly.
    </p>
    {#if $userData && $userData.username}
      <a href={`/${$userData.username}`} class="btn btn-accent mt-12"
        >View Profile</a
      >
    {:else}
      <a href="/login" class="btn btn-accent mt-12">Get Started →</a>
    {/if}
  </div>
</div>
