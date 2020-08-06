<template>
	<v-container>
		<v-row>
			<v-flex md12>
				<h3 class="text-center blue-grey--text">Tambah Pelanggan</h3>
			</v-flex>
			<v-form class="col-md-12" v-on:submit.prevent="addClient">
				<v-select v-model="form.pesanan" :items="items" label="Sumber Pesanan" required></v-select>
				<v-row>
					<v-text-field v-model="form.first_name" label="First Name" class="col-md-6" required></v-text-field>
					<v-text-field v-model="form.last_name" label="Last Name" class="col-md-6" required></v-text-field>
				</v-row>
				<v-text-field v-model="form.email" label="Email" required type="email"></v-text-field>

				<v-row>
					<span class="col-md-12">Phone Number</span>
					<v-select v-model="form.code_area" :items="code" label="Area Code" class="col-md-2" required></v-select>
					<v-text-field v-model="form.phone" label="Phone Number" class="col-md-10" required></v-text-field>
				</v-row>

				<v-text-field v-model="form.jumlah_roti" label="Jumlah Roti" type="number" required></v-text-field>
				<v-textarea outlined v-model="form.catatan" name="catatan" label="Catatan" :value="form.catatan"></v-textarea>
				<div class="text-center">
					<v-btn rounded color="indigo darken-5" block dark type="submit">Submit</v-btn>
				</div>
			</v-form>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'TambahPelanggan',
		data: () => ({
			items: ['WhatsApp', 'Call', 'Email'],
			code: ['+62', '+63', '+64', '+65'],
			form: {},
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
			async addClient() {
				let data = {
					pesanan: this.form.pesanan,
					first_name: this.form.first_name,
					last_name: this.form.last_name,
					email: this.form.email,
					phone_number: this.form.code_area + this.form.phone,
					jumlah_roti: this.form.jumlah_roti,
					catatan: this.form.catatan,
				}
				console.log('about to add ' + JSON.stringify(data))
				await this.addKuesToDB(data)
				this.dataKue = await this.getKuesFromDb()
				this.$router.push({
					path: '/dashboard',
				})
			},
			async addKuesToDB(kue) {
				return new Promise((resolve, reject) => {
					let trans = this.db.transaction(['kues'], 'readwrite')
					trans.oncomplete = (e) => {
						resolve()
						console.log(e)
						reject('Error')
					}

					let store = trans.objectStore('kues')
					store.add(kue)
				})
			},
		},
	}
</script>
