<script lang="ts">
  import Add from "lucide-svelte/icons/diamond-plus";
  import { Badge } from "$lib/components/ui/badge";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

  let { data } = $props();
</script>

<div class="flex gap-4 flex-wrap">
  {#await data.characters}
      <Skeleton class="w-52 h-96 rounded-lg" />
      <Skeleton class="w-52 h-96 rounded-lg" />
      <Skeleton class="w-52 h-96 rounded-lg" />
      <Skeleton class="w-52 h-96 rounded-lg" />
      <Skeleton class="w-52 h-96 rounded-lg" />
      <Skeleton class="w-52 h-96 rounded-lg" />
      <Skeleton class="w-52 h-96 rounded-lg" />
  {:then characters}
    <a href="p/new" class="w-64 md:w-52 h-96 m-auto rounded-lg bg-gray-500 flex flex-col items-center justify-center cursor-pointer">
      <h2 class="text-2xl font-bold text-center">NOVO PERSONAGEM</h2>
      <Add class="h-12 w-12" />
    </a>
    {#each characters as character}
      <div
        class="w-64 md:w-52 h-96 m-auto rounded-lg bg-cover bg-top bg-no-repeat bg-gray-500 cursor-pointer"
        style="background-image: url('{character.portrait}')"
      >
        <div
          class="h-full flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent p-2"
        >
          {#if character.msgs.length > 0}
            <div>
              <Badge variant="destructive">{character.msgs.length}</Badge>
            </div>
          {/if}
          <div class="flex justify-between items-center p-2">
            <h4>{character.nome}</h4>
            <Badge
              variant={character.status === "Disponível"
                ? "default"
                : "secondary"}>{character.status}</Badge
            >
          </div>
          <Badge variant="outline"
            >{`${character.A} - ${character.C} ${character.level}`}</Badge
          >
        </div>
      </div>
    {/each}
  {/await}
</div>
