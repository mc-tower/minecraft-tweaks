<script context="module">
	import 'src/tailwind.svelte'

	import { Navbar } from '@minetower/ui-components'
	import ResourcePacks from 'src/components/pages/ResourcePacks.svelte'
</script>

<Navbar title="Minecraft Tweaks" repo_url="/minecraft-tweaks" center_title />
<ResourcePacks />
