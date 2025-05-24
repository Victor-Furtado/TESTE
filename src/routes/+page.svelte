<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";

  import type { PageProps } from "./$types";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { loading } from "$lib/stores/ui";

  const { form }: PageProps = $props();

  let backgroundImage = $state("");

  const formSubmit: SubmitFunction = () => {
    $loading = true;
    return async ({ update }) => {
      await update();
      $loading = false;
    };
  };

  onMount(() => {
    const updateBackground = async () => {
      const isMobile = window.innerWidth <= 768;
      backgroundImage = isMobile
        ? (await import("$lib/images/m_login.jpg")).default
        : (await import("$lib/images/login.jpg")).default;
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);

    return () => window.removeEventListener("resize", updateBackground);
  });
  $effect(() => {
    if (form?.error) {
      toast.error(form.error);
    }
  });
</script>

{#if $loading}
  <div
    class="flex items-center justify-center h-screen bg-cover bg-center transition-all duration-500"
    style="background-image: url('{backgroundImage}')"
  >
    <Card.Root class="w-full max-w-sm mx-5 backdrop-blur-sm bg-black/50 rounded-xl p-6">
      <Card.Header>
        <Card.Title class="text-2xl text-center">VERIFICANDO...</Card.Title>
        <!-- <Card.Description>Enter your email below to login to your account.</Card.Description> -->
      </Card.Header>
      <Card.Content class="grid gap-4">
        <div class="grid gap-2">
          <Label for="user">Usuário</Label>
          <Skeleton class="h-9" />
        </div>
        <div class="grid gap-2">
          <Label for="password">Senha</Label>
          <Skeleton class="h-9" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button class="w-full" disabled></Button>
      </Card.Footer>
    </Card.Root>
  </div>
{:else}
  <form
    method="POST"
    use:enhance={formSubmit}
    action="?/login"
    class="flex items-center justify-center h-screen bg-cover bg-center transition-all duration-500"
    style="background-image: url('{backgroundImage}')"
  >
    <Card.Root class="w-full max-w-sm mx-5 backdrop-blur-sm bg-black/50 rounded-xl p-6">
      <Card.Header>
        <Card.Title class="text-2xl text-center">ENTRE</Card.Title>
        <!-- <Card.Description>Enter your email below to login to your account.</Card.Description> -->
      </Card.Header>
      <Card.Content class="grid gap-4">
        <div class="grid gap-2">
          <Label for="user">Usuário</Label>
          <Input name="user" id="user" type="text" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Senha</Label>
          <Input name="pass" id="password" type="password" required />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button type="submit" class="w-full">Sign in</Button>
      </Card.Footer>
    </Card.Root>
  </form>
{/if}
