import Vue from 'vue'
import VueRouter from 'vue-router'
import Full from '../views/Full.vue'
import NotFound from '../views/404.vue'

const Login = () => import('../components/Auth/Login.vue')

const Dashboard = () => import('../components/Dashboard/Dashboard.vue')
const Pelanggan = () => import('../components/Pelanggan/AddPelanggan.vue')

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: '/dashboard',
			component: Full,
			children: [
				{
					path: '/dashboard',
					name: 'Dashboard',
					component: Dashboard,
				},
				{
					path: '/tambah-pelanggan',
					name: 'Tambah Pelanggan',
					component: Pelanggan,
				},
			],
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '*',
			name: 'Not Found',
			component: NotFound,
		},
	],
})

export default router
