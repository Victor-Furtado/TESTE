import fs from 'fs';
import path from 'path';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

	const dirPath = path.resolve('src/lib/data/ancestries');
	const files = fs.readdirSync(dirPath);

	const ancestries = files
		.filter((file) => file.endsWith('.json'))
		.reduce((response, file) => {
			const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
			const obj = JSON.parse(content);
			if (obj.ok) return {...response, [obj._id]: obj};
			else return response;
		}, {});

	return {
		ancestries
	};
};