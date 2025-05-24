import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

	const characters = [
		{ nome: "<PERSONAGEM>", A: "Ancestry", B: "Background", C: "Class", level: 1, status: "Disponível", msgs: [], portrait: "https://app.demiplane.com/_next/image?url=https%3A%2F%2Fimages.demiplane.com%2Fcompendium%2Fpathfinder-2e%2Fplayer-core%2Fv8PSbsDpdfyioi4O%2F03-04-PZO2101%20HUMAN%20STUDENT.png&w=640&q=90"},
	]

	return { characters }
};