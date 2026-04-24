import { type CollectionEntry, getCollection } from "astro:content";

export async function getAllNeverending(): Promise<CollectionEntry<"neverending">[]> {
	return await getCollection("neverending");
}

export function groupNeverendingByYear(entries: CollectionEntry<"neverending">[]) {
	return Object.groupBy(entries, (entry) => entry.data.publishDate.getFullYear().toString());
}
