interface IMarkCategoryBody {
	action: string;
	type: string;
	categoryIds: string[];
	asOf?: Date | number;
	lastReadEntryId?: string;
}
