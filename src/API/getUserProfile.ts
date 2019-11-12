import { fetchJSON } from '../utils/myFetch';

export interface IProfile {
	/** the unique, immutable user id. */
	id: string;
	/** the email address extracted from the OAuth profile.
	 * Not always available, depending on the OAuth method used. */
	email?: string;
	/** the given (first) name. Not always available. */
	givenName?: string;
	/** the family (last) name. Not always available. */
	familyName?: string;
	/** the full name. Not always available. */
	fullName?: string;
	/** Optional url a picture URL for this user, extracted from the OAuth profile. */
	picture?: string;
	/** “male” or “female” */
	gender?: 'male' | 'female';
	/** Optional locale the locale, extracted from the OAuth profile. */
	locale?: string;
	/** the Google user id, if the user went through Google’s OAuth flow. */
	google?: string;
	/** the Google Reader user id. If present, this indicates a
	 * user who migrated from Google Reader. */
	reader?: string;
	/** the Twitter handle (legacy). */
	twitter?: string;
	/** the Twitter user id, if the user went through the Twitter OAuth flow. */
	twitterUserId?: string;
	/** the Facebook user id, if the user went through the Facebook OAuth flow. */
	facebookUserId?: string;
	/** the WordPress user id, if the user went through the WordPress OAuth flow. */
	wordPressId?: string;
	/** the Windows Live user id, if the user went through the Windows Live OAuth flow. */
	windowsLiveId?: string;
	/** the analytics “wave”. Format is?: “yyyy.ww” where yyyy is the year, ww is the week number.
	 *  E.g. “2014.02” means this user joined on the second week of 2014.
	 *  See http://www.epochconverter.com/date-and-time/weeknumbers-by-year.php
	 *  for week number definitions. */
	wave: string;
	/** the client application used to create this account. */
	client: string;
	/** the client name/version used to create this account. */
	source: string;
	/** Optional timestamp the timestamp, in ms, when this account was created.
	 * Not set for accounts created before 10/2/2013. */
	created?: string;


	product?: string;
	/** the feedly pro subscription. Values include FeedlyProMonthly,
		FeedlyProYearly, FeedlyProLifetime etc. */
	productExpiration?: string;
	/* Optional timestamp for expiring subscriptions only; the timestamp,
	in ms, when this subscription will expire. */
	subscriptionStatus?: string;
	/* for expiring subscriptions only; values include Active, PastDue,
	Canceled, Unpaid, Deleted, Expired. */
	isEvernoteConnected?: boolean;
	/* Optional boolean true if the user has activated the Evernote integration. */
	isPocketConnected?: boolean;
	/* Optional boolean true if the user has activated the Pocket integration. */
}

const getUserProfile = () => fetchJSON<IProfile>('/v3/profile');

export default getUserProfile;
