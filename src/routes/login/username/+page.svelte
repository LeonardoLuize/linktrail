<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let isAvailable = false;
  let username = "";
  let loading = false;

  let debounceTimer: NodeJS.Timeout;

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid =
    username?.length > 2 && username.length < 16 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !loading;

  async function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);
    loading = true;

    debounceTimer = setTimeout(async () => {
      const ref = doc(db, "usernames", username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      loading = false;
    }, 500);
  }

  async function confirmUsername() {
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uuid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user?.photoURL,
      published: true,
      bio: "This is a default bio",
      links: [
        {
          title: "Test Link",
          url: "https://kunf.foo",
          icon: "custom",
        },
      ],
    });

    await batch.commit();

    username = "";
    isAvailable = false;
  }
</script>

<AuthCheck>
  <h2 class="card-title">Choose an Username</h2>

  {#if $userData?.username}
    <p class="mt-5">
      Your username is <span class="text-success">@{$userData.username}</span>
    </p>
    <a class="btn btn-accent mt-3" href="/login/photo">→</a>
  {:else}
    <form class="w-[80%]" on:submit|preventDefault={confirmUsername}>
      <div class="w-full flex justify-center gap-2">
        <div class="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            class="input w-[250px] mb-2"
            bind:value={username}
            on:input={checkAvailability}
            class:input-error={!isValid && isTouched}
            class:input-warning={isTaken}
            class:input-success={isAvailable && isValid && !loading}
          />
          {#if loading}
            <p class="text-primary font-bold w-[250px]">
              Checking availability of @{username}...
            </p>
          {/if}

          {#if !isValid && isTouched}
            <p class="text-error text-sm w-[250px]">
              must be 3-16 characters long, alphanumeric only
            </p>
          {/if}

          {#if isValid && !isAvailable && !loading}
            <p class="text-warning text-sm w-[250px]">
              @{username} is not available
            </p>
          {/if}
          {#if isValid && isAvailable && !loading}
            <p class="text-success text-sm w-[250px]">
              @{username} is valid!
            </p>
          {/if}
        </div>
        <button disabled={!isAvailable} class="btn btn-success">Submit</button>
      </div>
    </form>
  {/if}
</AuthCheck>
