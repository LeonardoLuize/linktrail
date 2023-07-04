<script lang="ts">
  import { auth, user } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);

    const idToken = await credential.user.getIdToken();

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
      },
      body: JSON.stringify({ idToken }),
    });
  }

  async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }
</script>

<h2 class="text-lg font-bol" class:text-gray-500={$user}>Authenticate to proceed</h2>

<div class="h-[2px] rounded-full bg-gray-100" />

{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <button
    class="btn btn-secondary btn-outline btn-sm"
    on:click={() => signOutSSR()}
  >
    Sign Out
  </button>
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}>
    Sign In With Google
  </button>
{/if}
