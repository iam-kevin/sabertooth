import { CollectionNode, DocumentNode } from "./core";
import { Document } from "./types";

export type DocumentObservedAction<D extends Document.Data = Document.Data> = {
	ref: Document.Ref;
} & (
	| { action: "added"; state: D }
	| { action: "changed"; data: Partial<D>; state: D }
	| { action: "removed" }
);

export type CollectionObservedAction = {
	// ref: Collection.Ref;
} & (
	| { action: "updated"; documents: Document.Ref[] }
	| { action: "added"; documents: Document.Ref[] }
	| { action: "removed"; documents: Document.Ref[] }
);

/**
 * Set up listener for the actions happening in the collection
 * @param doc
 * @param action
 * @param cb
 */
export function onDocumentSnapshot<D extends Document.Data>(
	doc: DocumentNode<D>,
	action: DocumentObservedAction<D>["action"],
	cb: (data: any) => void
) {
	return doc.observable.subscribe((o) => {
		if (o.action === action) cb(o);
	});
	// logic
}

/**
 * Set up listener for changes in the document
 */
export function onCollectionSnapshot<D extends Document.Data>(
	col: CollectionNode<D>,
	action: CollectionObservedAction["action"],
	cb: (data: any) => void
) {
	return col.observable.subscribe((s) => {
		if (s.action === action) {
			cb(s);
			return;
		}
	});
}
