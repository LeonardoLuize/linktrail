<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let isAvailable = false;
  let username = "";
  let loading = false;

  let debounceTimer: NodeJS.Timeout;

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

  async function confirmUsername() {}
</script>

<AuthCheck>
  <h2 class="card-title">Choose an Username</h2>

  <form class="w-[80%]" on:submit|preventDefault={confirmUsername}>
    <div class="w-full flex justify-center gap-2">
      <div class="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          class="input w-[250px] mb-2"
          bind:value={username}
          on:input={checkAvailability}
        />
        <p
          class="w-[250px] text-left"
          class:text-error={!isAvailable}
          class:opacity-0={username === ""}
        >
          {isAvailable ? "Valid" : "Invalid"} username
        </p>
      </div>
      <button disabled={!isAvailable} class="btn btn-success">Submit</button>
    </div>
  </form>
</AuthCheck>
