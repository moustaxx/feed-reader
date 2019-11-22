export interface IFeedlyError {
	errorCode: number;
	errorMessage?: string;
	errorId?: string;
}

const throwErr = (status: number) => {
	throw Error(`Error ${status}: Response is not ok.`);
};

const makeRequestFetch = async (
	url: string,
	options: RequestInit,
	BASE_URL: string,
): Promise<Response> => {
	const res = await fetch(BASE_URL + url, options);
	if (res.ok) return res;
	const json: IFeedlyError = await res.json().catch(() => throwErr(res.status));
	if (!json.errorCode) throwErr(res.status);
	throw Error(`Feedly API Error ${json.errorCode}: ${json.errorMessage}`);
};

export default makeRequestFetch;
