<template>
	<v-footer dark padless app inset>
		<v-card class="flex" flat tile color="indigo lighten-2" :elevation="10">
			<v-card-text class="py-2 white--text text-center">
				{{ new Date().getFullYear() }} — <strong>KUE KUY © Dashboard</strong>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
	export default {
		name: 'Footer',
	}
</script>
