<script lang="ts">
  import { page } from "$app/state";

  import MainIcon from "lucide-svelte/icons/pocket-knife";
  import Menu from "lucide-svelte/icons/menu";
  import Logout from "lucide-svelte/icons/door-open";
  import Feather from "lucide-svelte/icons/feather";

  import * as Dialog from "$lib/components/ui/dialog";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  let { children, data } = $props();

  const tabs: { path: string; icon: any; label: string }[] = [
    { path: "/a/p", icon: Feather, label: "PERSONAGENS" },
  ];

  const getActive = (tab: { path: string; icon: any; label: string }) => {
    if (page.url.pathname == "/a") return "text-muted-foreground";
    if (page.url.pathname.includes(tab.path)) {
      return "bg-muted text-foreground";
    }
    return "text-muted-foreground";
  };
</script>

<div
  class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
  <div class="bg-muted/40 hidden border-r md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div
        class="bg-primary text-white flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"
      >
        <a href="/a" class="flex items-center gap-2 font-semibold">
          <MainIcon class="h-6 w-6" />
          <span class="">RPG de BOLSO</span>
        </a>
        <!-- <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button> -->
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          {#each tabs as tab}
            <a
              href={tab.path}
              class={[
                getActive(tab),
                "hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              ]}
            >
              <tab.icon class="h-4 w-4" />
              {tab.label}
            </a>
          {/each}
          <!-- <a
            href="##"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <ShoppingCart class="h-4 w-4" />
            Orders
            <Badge
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              6
            </Badge>
          </a> -->
        </nav>
      </div>
      <form
        method="POST"
        action="/?/logout"
        class="mt-auto p-4 flex justify-evenly"
      >
        <!-- <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button builders={[builder]} size="icon" class="rounded-full">
              <User class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Support</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root> -->
        <Button
          variant="secondary"
          type="submit"
          size="icon"
          class="rounded-full"
        >
          <Logout class="h-5 w-5" />
          <span class="sr-only">Logout</span>
        </Button>
      </form>
    </div>
  </div>
  <div class="flex flex-col">
    <header
      class="md:hidden bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 bg-primary text-white"
    >
      <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0"
            builders={[builder]}
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="flex flex-col">
          <nav class="grid gap-2 text-lg font-medium">
            <!-- <a href="/a" class="flex items-center gap-2 text-lg font-semibold">
              <MainIcon class="h-6 w-6" />
              <span class="">RPG de BOLSO</span>
            </a> -->
            {#each tabs as tab}
              <a
                href={tab.path}
                class={[
                  getActive(tab),
                  "hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
                ]}
              >
                <tab.icon class="h-4 w-4" />
                {tab.label}
              </a>
            {/each}
            <!-- <a
              href="##"
              class="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <ShoppingCart class="h-5 w-5" />
              Orders
              <Badge
                class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              >
                6
              </Badge>
            </a> -->
          </nav>
          <form
            method="POST"
            action="/?/logout"
            class="mt-auto flex justify-evenly"
          >
            <!-- <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild let:builder>
                <Button builders={[builder]} size="icon" class="rounded-full">
                  <User class="h-5 w-5" />
                  <span class="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Settings</DropdownMenu.Item>
                <DropdownMenu.Item>Support</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root> -->
            <Button
              variant="secondary"
              type="submit"
              size="icon"
              class="rounded-full"
            >
              <Logout class="h-5 w-5" />
              <span class="sr-only">Logout</span>
            </Button>
          </form>
        </Sheet.Content>
      </Sheet.Root>
      <MainIcon class="h-6 w-6" />
      <span class="">RPG de BOLSO</span>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {@render children()}
    </main>
  </div>
</div>

<Dialog.Root
  bind:open={data.firstLogin}
  closeOnEscape={false}
  closeOnOutsideClick={false}
>
  <Dialog.Content class="sm:max-w-[425px]">
    <form method="POST" action="/?/firstLogin">
      <Dialog.Header>
        <Dialog.Title>PRIMEIRO LOGIN!</Dialog.Title>
        <Dialog.Description>Mude sua senha e usuário.</Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="user" class="text-right">Usuário</Label>
          <Input
            name="user"
            id="user"
            type="text"
            required
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="pass" class="text-right">Senha</Label>
          <Input
            name="pass"
            id="pass"
            type="password"
            required
            class="col-span-3"
          />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
