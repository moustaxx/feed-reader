export interface IFeed {
	/** the unique, immutable id of this feed. */
	id: string;
	/** same as id; for backward compatibility */
	feedId: string;
	/** number of feedly cloud subscribers who have this feed in their subscription list. */
	subscribers: number;
	/** the feed name. */
	title: string;
	/** Optional string the feed description. */
	description?: string;
	/**
	 * Optional string this field is a combination of the language reported by the RSS feed,
	 * and the language automatically detected from the feed’s content.It might not be accurate,
	 * as many feeds misreport it.
	 */
	language?: string;
	/**
	 * Optional float the average number of articles published weekly.
	 * This number is updated every few days.
	 */
	velocity?: number;
	/** Optional ** url ** the website for this feed. */
	website?: string;
	/**
	 * Optional string array an array of topics this feed covers.
	 * This list can be used in searches and mixes to build a list of related feeds and articles.
	 *
	 * E.g.if the list contains `productivity`,
	 * querying `productivity` in feed search will produce a list of related feeds.
	 */
	topics?: string[];
	/**
	 * Optional string only returned if the feed cannot be polled.
	 *
	 * Values include `dead` (cannot be polled),
	 *
	 * `dead.flooded` (if the feed produces too many articles per day),
	 *
	 * `dead.dropped` (if the feed has been removed),
	 *
	 * `dormant` (if the feed hasn’t been updated in a few months).
	 */
	state?: string;
}

export interface ICollection {
	/** String the collection id */
	id: string;
	/** Optional Timestamp the EPOCH timestamp when this collection was created */
	created?: number;
	/** String the collection label. Default value is the collection name. */
	label: string;
	/** Optional String the collection description, if defined. */
	description?: string;
	/** Optional URL the URL of the cover image, if one was uploaded */
	cover?: string;
	/**
	 * List of feeds the list of feeds in this collection.
	 * See the subscriptions API for details about the fields returned.
	 */
	feeds: IFeed[];
	numFeeds?: number;
	customizable?: boolean;
	enterprise?: boolean;
}

export type TGetCollections = ICollection[];
