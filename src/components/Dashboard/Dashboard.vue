<template>
	<v-container>
		<v-row>
			<v-flex md12>
				<h4 class="pl-2">Hallo, <em>Admin</em></h4>
				<br />
				<h3 class="text-center">Pesanan Masuk</h3>
			</v-flex>
			<v-flex md4 sm12 xs12 pa-2>
				<v-card elevation="1" style="height: 200px" class="green darken-1">
					<v-card-title>
						<v-icon class="white--text" large>mdi-whatsapp</v-icon>
					</v-card-title>
					<v-card-actions class="center-card">
						<v-btn text style="font-size: 72px; font-style: italic" class="white--text text-center">10</v-btn>
					</v-card-actions>
					<v-card-subtitle class="mt-5 white--text">WhatsApp</v-card-subtitle>
				</v-card>
			</v-flex>
			<v-flex md4 sm12 xs12 pa-2>
				<v-card elevation="1" style="height: 200px" class="red darken-2">
					<v-card-title>
						<v-icon class="white--text" large>mdi-phone</v-icon>
					</v-card-title>
					<v-card-actions class="center-card">
						<v-btn text style="font-size: 72px; font-style: italic" class="white--text text-center">40</v-btn>
					</v-card-actions>
					<v-card-subtitle class="mt-5 white--text">Call</v-card-subtitle>
				</v-card>
			</v-flex>
			<v-flex md4 sm12 xs12 pa-2>
				<v-card elevation="1" style="height: 200px" class="orange darken-3">
					<v-card-title>
						<v-icon class="white--text" large>mdi-email</v-icon>
					</v-card-title>
					<v-card-actions class="center-card">
						<v-btn text style="font-size: 72px; font-style: italic" class="white--text text-center">50</v-btn>
					</v-card-actions>
					<v-card-subtitle class="mt-5 white--text">Email</v-card-subtitle>
				</v-card>
			</v-flex>
			<!-- TABLE -->
			<v-flex md12 sm12 xs12 pa-2>
				<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
			</v-flex>
			<v-flex md12 sm12 xs12>
				<v-card>
					<v-data-table
						:headers="headers"
						:items="dataKue"
						:search="search"
						:page.sync="page"
						:items-per-page="itemsPerPage"
						@page-count="pageCount = $event"
						hide-default-footer
					>
						<template v-slot:item.name="{ item }">
							<span style="font-size: 12px" class="black--text">{{ item.first_name }} {{ item.last_name }}</span>
						</template>
					</v-data-table>
				</v-card>
			</v-flex>
			<v-flex md12 sm12 xs12 class="text-center">
				<v-pagination v-model="page" :length="pageCount" :total-visible="5" color="indigo"></v-pagination>
			</v-flex>
			<!-- END TABLE -->
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'Dashboard',
		data: () => ({
			search: '',
			itemsPerPage: 10,
			page: 1,
			pageCount: 0,
			headers: [
				{ text: 'Nama', value: 'name', class: 'indigo darken-1 white--text' },
				{ text: 'Email', value: 'email', class: 'indigo darken-1 white--text' },
				{ text: 'No HP', value: 'phone_number', class: 'indigo darken-1 white--text' },
				{ text: 'Jumlah Roti', value: 'jumlah_roti', class: 'indigo darken-1 white--text' },
				{ text: 'Keterangan', value: 'catatan', class: 'indigo darken-1 white--text' },
			],
			DB_NAME: 'kue',
			DB_VERSION: 3,
			db: null,
			dataKue: [],
		}),
		async created() {
			this.db = await this.getDb()
			this.dataKue = await this.getKuesFromDb()
			console.log(this.dataKue)
		},
		methods: {
			async getDb() {
				return new Promise((resolve, reject) => {
					let request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION)

					request.onerror = (e) => {
						console.log('Error opening db', e)
						reject('Error')
					}

					request.onsuccess = (e) => {
						resolve(e.target.result)
					}

					request.onupgradeneeded = (e) => {
						console.log('onupgradeneeded')
						let db = e.target.result
						let objectStore = db.createObjectStore('kues', { autoIncrement: true, keyPath: 'id' })
						objectStore.createIndex('kue_id', 'kue_id', { unique: true })
					}
				})
			},
			async getKuesFromDb() {
				return new Promise((resolve, reject) => {
					let trans = this.db.transaction(['kues'], 'readonly')
					trans.oncomplete = (e) => {
						resolve(kues)
						reject('Error')
						console.log(e)
					}

					let store = trans.objectStore('kues')
					let kues = []

					store.openCursor().onsuccess = (e) => {
						let cursor = e.target.result
						if (cursor) {
							kues.push(cursor.value)
							cursor.continue()
						}
					}
				})
			},
		},
	}
</script>
