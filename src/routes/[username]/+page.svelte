<script lang="ts">
  import UserLink from "$lib/components/UserLink.svelte";
  import { userData } from "$lib/firebase";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
  <div
    class="w-[150px] overflow-hidden mx-auto aspect-square bg-cover rounded-full border-[3px] border-primary"
  >
    <img src={data.photoURL ?? "/user.png"} alt="photoURL" width="150" />
  </div>
  <h1 class="text-2xl font-bold mt-3 text-purple-500">
    @{data.username}
  </h1>

  <p class="text-lg w-[350px] mt-3 mb-8 line-clamp-3">
    {data.bio ?? "no bio yet..."}
  </p>
  <ul class="list-none flex flex-col gap-2">
    {#each data.links as item}
      <UserLink icon={item.icon} url={item.url} title={item.title} />
    {/each}
  </ul>
</main>

{#if data.username === $userData?.username}
  <a
    href={`/${data.username}/edit`}
    class="btn btn-secondary absolute right-5 top-5"
  >
    Edit
  </a>
{/if}
