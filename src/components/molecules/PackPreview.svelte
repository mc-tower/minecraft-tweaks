<script context="module">
	import { packPreview, cancelHide, hidePreview } from 'src/stores/preview'
</script>

<picture>
	<source srcset="{$packPreview}/preview.avif" type="image/avif" />
	<source srcset="{$packPreview}/preview.webp" type="image/webp" />
	<img
		src="{$packPreview}/preview.jpg"
		on:mouseenter={cancelHide}
		on:mouseleave={hidePreview}
		class="rounded w-4/5 mx-auto mb-3"
		alt="" />
</picture>
