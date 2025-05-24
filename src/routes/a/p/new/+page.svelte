<script lang="ts">
  import AIcon from "lucide-svelte/icons/person-standing";
  import Eye from "lucide-svelte/icons/eye";
  import Life from "lucide-svelte/icons/heart";
  import Size from "lucide-svelte/icons/move-vertical";
  import Speed from "lucide-svelte/icons/footprints";
  import * as Alert from "$lib/components/ui/alert";
  import * as Select from "$lib/components/ui/select";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import {
    getAttrbuteFullName,
    getSizeFullName,
    getVisionName,
  } from "$lib/utils.js";

  let { data } = $props();

  let ancestralidade = $state<string | null>(null);
  let melhorias = $state<{ label: string; value: string }[]>([]);
  let defeitos = $state<{ label: string; value: string }[]>([]);
</script>

{#await data}
  <section>
    <Skeleton class="w-full h-16 rounded-lg" />
  </section>
{:then { ancestries }}
  <section class="flex flex-col gap-4">
    <Alert.Root>
      <AIcon class="h-9 w-9" />
      <Alert.Title class="pl-3">Ancestralidade</Alert.Title>
      <Alert.Description class="pl-3"
        >Uma ancestralidade fornece melhorias de atributo (e talvez defeitos de
        atributo), Pontos de Vida, talentos de ancestralidade e às vezes
        habilidades adicionais.</Alert.Description
      >
    </Alert.Root>
    <Select.Root
      onSelectedChange={(v) => v && (ancestralidade = v.value as string)}
    >
      <Select.Trigger class="w-full">
        <Select.Value placeholder="SELECIONE A ANCESTRALIDADE" />
      </Select.Trigger>
      <Select.Content>
        {#each Object.entries(ancestries) as [key, value]}
          <Select.Item value={key}>{(value as any).name}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    {#if ancestralidade}
      {@const ancestry = ancestries[
        ancestralidade as keyof typeof ancestries
      ] as any}
      {@const info = ancestry.system}
      <article class="flex flex-col md:flex-row gap-4 items-center">
        <img
          alt={ancestry.name}
          src={ancestry.img}
          class="w-full md:w-1/3 h-64 object-top object-cover"
        />
        <div class="w-full">
          <em class="mb-4">{info.description}</em>
          <div class="flex flex-col md:flex-row items-center gap-1 my-4">
            <Label>MELHORIAS:</Label>
            {#each Object.values(info.boosts) as boostObj, i}
              {@const boost = (boostObj as any).value}
              <Select.Root
                selected={boost.length === 1
                  ? { value: boost[0], label: getAttrbuteFullName(boost[0]) }
                  : undefined}
              >
                <Select.Trigger class="w-full">
                  <Select.Value placeholder="ATRIBUTO" />
                </Select.Trigger>
                <Select.Content>
                  {#each boost as b}
                    <Select.Item value={b}>{getAttrbuteFullName(b)}</Select.Item
                    >
                  {/each}
                </Select.Content>
              </Select.Root>
            {/each}
          </div>
          <div class="flex flex-col md:flex-row items-center gap-1 my-4">
            <Label>DEFEITOS:</Label>
            {#each Object.values(info.flaws) as flawObj, i}
              {@const flaw = (flawObj as any).value}
              <Select.Root
                selected={flaw.length === 1
                  ? { value: flaw[0], label: getAttrbuteFullName(flaw[0]) }
                  : undefined}
              >
                <Select.Trigger class="w-full">
                  <Select.Value placeholder="ATRIBUTO" />
                </Select.Trigger>
                <Select.Content>
                  {#each flaw as b}
                    <Select.Item value={b}>{getAttrbuteFullName(b)}</Select.Item
                    >
                  {/each}
                </Select.Content>
              </Select.Root>
            {/each}
          </div>
          <div class="flex flex-row flex-wrap items-center gap-1 my-4">
            <Badge variant="outline" class="p-2"
              ><Life class="h-6 w-6 pr-1" /> {info.hp}</Badge
            >
            <Badge variant="outline" class="p-2"
              ><Size class="h-6 w-6 pr-1" /> {getSizeFullName(info.size)}</Badge
            >
            <Badge variant="outline" class="p-2"
              ><Speed class="h-6 w-6 pr-1" /> {info.speed / 5}m</Badge
            >
            <Badge variant="outline" class="p-2"
              ><Eye class="h-6 w-6 pr-1" /> {getVisionName(info.vision)}</Badge
            >
            {#each Object.values(info.items) as item}
              <Badge variant="outline" class="p-2">{(item as any).name}</Badge>
            {/each}
          </div>
        </div>
      </article>
    {/if}
  </section>
{/await}
