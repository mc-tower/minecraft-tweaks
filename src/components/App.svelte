<script context="module">
	import { Navbar } from '@minetower/ui-components'
	import DescriptionModal from 'src/components/molecules/DescriptionModal.svelte'
	import ResourcePacks from 'src/components/pages/ResourcePacks.svelte'
</script>

<Navbar
	title="Minecraft Tweaks"
	small_title="Tweaks"
	repo_url="/minecraft-tweaks"
	center_title />
<ResourcePacks />
<DescriptionModal />
