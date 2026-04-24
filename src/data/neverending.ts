import { type CollectionEntry, getCollection } from "astro:content";
import { collectionDateSort } from "@/utils/date";

export async function getAllNeverending(): Promise<CollectionEntry<"neverending">[]> {
	return await getCollection("neverending");
}

export function groupNeverendingByYear(entries: CollectionEntry<"neverending">[]) {
	return Object.groupBy(entries, (entry) => entry.data.publishDate.getFullYear().toString());
}

/** root entries = entries without parent */
export async function getRootNeverending(): Promise<CollectionEntry<"neverending">[]> {
	const all = await getAllNeverending();
	const ids = new Set(all.map((e) => e.id));
	return all.filter((e) => !e.data.parent || !ids.has(e.data.parent));
}

/** direct children of a neverending entry */
export async function getChildNeverending(
	parentId: string,
): Promise<CollectionEntry<"neverending">[]> {
	const all = await getAllNeverending();
	return all.filter((e) => e.data.parent === parentId).sort(collectionDateSort);
}
