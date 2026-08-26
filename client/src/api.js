import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const api = axios.create({ baseURL: API_BASE });

export async function getServices() { return (await api.get('/services')).data; }
export async function getSettings() {
	const settings = (await api.get('/settings/company')).data;
	return {
		...settings,
		address: 'Yas Park, Plot no 62, Chakan, Kadachiwadi, Chakan, Maharashtra 410501 | Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507',
		phones: ['+91 7972451110', '+91 92707 77733'],
		mapQuery: 'Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507'
	};
}
export async function submitLead(payload) { return (await api.post('/leads', payload)).data; }
