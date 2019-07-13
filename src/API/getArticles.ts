import React from 'react';
import withQuery from 'with-query';

import useFetch from '../utils/useFetch';
import { AuthContext } from '../contexts/AuthContext';


export interface IEntires {
	/** The unique, immutable ID for this particular article. */
	id: string;
	/** Optional string the article’s title. This string does not contain any HTML markup. */
	title?: string;
	/** Optional article content object. */
	content?: {
		/** The content contains sanitized HTML markup. */
		content: string;
		/** `ltr` for left-to-right, `rtl` for right-to-left */
		direction: 'ltr' | 'rtl';
	};
	/** Optional content object the article summary. See the content object above. */
	summary?: {
		/** The content contains sanitized HTML markup. */
		content: string;
		/** “ltr” for left-to-right, “rtl” for right-to-left. */
		direction: 'ltr' | 'rtl';
	};
	/** Optional string the author’s name. */
	author?: string;
	/** The immutable timestamp, in ms,
	 *  when this article was processed by the feedly Cloud servers. */
	crawled: number;
	/** Optional timestamp, in ms, when this article was
	 *  re-processed and updated by the feedly Cloud servers. */
	recrawled?: number;
	/** The timestamp, in ms, when this article was published,
	 *  as reported by the RSS feed (often inaccurate). */
	published: number;
	/** Optional timestamp the timestamp, in ms,
	 *  when this article was updated, as reported by the RSS feed. */
	updated?: number;
	/** Optional link object array a list of alternate links for this article.
	 *
	 *  Each link object contains a media type and a URL.
	 *
	 *  Typically, a single object is present, with a link to the original web page. */
	alternate?: Array<{
		href: string;
		type: string;
	}>;
	/** Optional origin object the feed from which this article was crawled.
	 *
	 * @param [streamId] Contain the feed ID.
	 * @param [title] Feed title.
	 * @param [htmlUrl] Feed’s website. */
	origin?: {
		/** Contain the feed ID. */
		streamId: string;
		/** Feed title. */
		title: string;
		/** Feed’s website. */
		htmlUrl: string;
	};
	/** Optional string array a list of keyword strings extracted from the RSS entry. */
	keywords?: string[];
	/** Optional visual object an image URL for this entry.
	 * @param [url] image URL
	 * @param [width] image width
	 * @param [height] image height
	 * @param [contentType] MIME type */
	visual?: {
		/** Image URL. */
		url: string;
		/** Image width. */
		width: number;
		/** Image height. */
		height: number;
		/** MIME type */
		contentType: string;
		/** dunno */
		processor?: string;
	};
	/** boolean was this entry read by the user?
	 *
	 *  If an Authorization header is not provided, this will always return false.
	 *
	 *  If an Authorization header is provided,
	 *  it will reflect if the user has read this entry or not. */
	unread: boolean;
	/** Optional tag object array a list of tag objects (“id” and “label”) that
	 *  the user added to this entry.
	 *
	 *  This value is only returned if an
	 *  Authorization header is provided, and at least one tag has been added.
	 *
	 *  If the entry has been explicitly marked as read (not the feed itself),
	 *  the “global.read” tag will be present. */
	tags?: Array<{
		id: string;
		label: string;
	}>;
	/** Category object array a list of category objects (“id” and “label”)
	 *  that the user associated with the feed of this entry.
	 *
	 *  This value is only returned if an Authorization header is provided. */
	categories: Array<{
		id: string;
		label: string;
	}>;
	/** Optional integer an indicator of how popular this entry is.
	 *
	 *  The higher the number, the more readers have read, saved or shared
	 *  this particular entry. */
	engagement?: number;
	/** Optional timestamp for tagged articles, contains the timestamp when
	 *  the article was tagged by the user.
	 *
	 *  This will only be returned when
	 *  the entry is returned through the streams API. */
	actionTimestamp?: number;
	/** Optional link object array a list of media links (videos, images, sound etc)
	 *  provided by the feed. Some entries do not have a summary or content,
	 *  only a collection of media links. */
	enclosure?: Array<{
		href: string;
		type?: string;
	}>;
	/** string the article fingerprint. This value might change if the article is updated. */
	fingerprint: string;
	/** string the unique ID of this post in the RSS feed (not necessarily a URL!) */
	originId: string;
	/** Optional string an internal search ID. */
	sid?: string;
	/** dunno */
	canonicalUrl?: string;
	/** Rate of the readers that read, saved or shared
	 *  this particular entry. */
	engagementRate?: number;
}

interface IGetArticles {
	/** Query ID. */
	id: string;
	/** Array of object. Containing articles. */
	items: IEntires[];
}

interface IInput {
	streamId: string;
	/** Optional integer number of entries to return.default is 20.
	 * max is 1, 000 for feeds and categories, 500 for tags. */
	count?: number;
	/** Optional string newest, oldest, or engagement(sort by popularity).default is newest. */
	ranked?: string;
	/** Optional boolean if true, only unread articles will be returned;
	 * default is false.Reminder: entries older than 31 days are automatically marked as read.
	 * This requires the authorization header. */
	unreadOnly?: boolean;
	/** Optional long timestamp in ms; cannot be older than 31 days ago. */
	newerThan?: number;
	/** Optional string a continuation id is used to page through the entry ids;
	 * you can also pass a timestamp in ms, which will act as an “older than” limit. */
	continuation?: string;
}

const URL = 'http://sandbox7.feedly.com/v3/streams/contents/';

const getArticles = () => {
	const [{ userID }] = React.useContext(AuthContext);
	const reqURL = withQuery<IInput>(URL, {
		streamId: encodeURI(`user/${userID}/category/global.all`),
		count: 20,
		unreadOnly: true,
		ranked: 'newest',
	});
	return useFetch<IGetArticles>(reqURL);
};

export default getArticles;
