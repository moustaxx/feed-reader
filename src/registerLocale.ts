import { register } from 'timeago.js';

const localeFunc = (_number: number, index: number, _totalSec: number) => {
	// number: the timeago / timein number;
	// index: the index of array below;
	// total_sec: total seconds between date to be formatted and today's date;
	return [
		['now', 'right now'],
		['%ss', 'in %s seconds'],
		['1m', 'in 1 minute'],
		['%sm', 'in %s minutes'],
		['1h', 'in 1 hour'],
		['%sh', 'in %s hours'],
		['1d', 'in 1 day'],
		['%sd', 'in %s days'],
		['1 week', 'in 1 week'],
		['%s weeks', 'in %s weeks'],
		['1mo', 'in 1 month'],
		['%smo', 'in %s months'],
		['1 year', 'in 1 year'],
		['%s years', 'in %s years'],
	][index];
};
// register your locale with timeago
register('my-locale', localeFunc);
