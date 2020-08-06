<template>
	<nav>
		<v-app-bar color="indigo lighten-3" dark app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase ">
				<span>Kue Kuy</span>
				<span class="font-weight-light"> Dashboard</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-menu offset-y> </v-menu>
			<v-btn text to="/login">
				<span>Exit</span>
				<v-icon right>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" dark app class="indigo lighten-1">
			<v-layout column align-center>
				<v-flex class="mt-5">
					<!-- <div class="logo"> -->
					<img src="../assets/logokue.png" class="img-fluid pt-3 pl-2" alt="" style="width: 150px" />
					<!-- </div> -->
				</v-flex>
			</v-layout>
			<v-list flat>
				<v-list-item router to="/dashboard" active-class="border" class="border-aktif">
					<v-list-item-action>
						<v-icon>mdi-view-dashboard</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-group prepend-icon="mdi-account-multiple" no-action active-class="border" color="white">
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>Pelanggan</v-list-item-title>
						</v-list-item-content>
					</template>
					<v-list-item
						v-for="p in pelanggan"
						:key="p.title"
						router
						:to="p.route"
						active-class="sub-border"
						class="sub-list"
					>
						<v-list-item-content>
							<v-list-item-title>{{ p.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>
<script>
	export default {
		data: () => ({
			drawer: true,
			pelanggan: [{ title: 'Tambah Pelanggan', route: '/tambah-pelanggan' }],
		}),
		components: {},
		methods: {},
	}
</script>
<style scoped>
	.border {
		border-left: 4px solid #fff !important;
		text-decoration: none;
	}
	.sub-border {
		border-left: 4px solid #fff !important;
	}
	.sub-list {
		background-color: #1d2a49 !important;
		border-bottom: 1px solid #fff;
	}
	.sub-list:hover {
		border-left: 4px solid #fff !important;
	}
	.border-active:hover {
		border-left: 4px solid #fff !important;
	}
	.logo {
		height: 140px;
		width: 28vh;
		background-color: indigo;
		background-image: linear-gradient(to bottom right, #fff, #1d2a49);
		border-radius: 70% 50% 70% 50%;
	}
</style>
