import React from 'react';

export interface IAuthStatus {
	status: 'LOGGED_IN' | 'LOGGED_OUT';
	userID: string | null;
}

export const initAuthCtxValue: IAuthStatus = {
	status: 'LOGGED_OUT',
	userID: null,
};

type IAuthContext = readonly [IAuthStatus, (status: IAuthStatus) => void];

export const AuthContext = React.createContext<IAuthContext>([initAuthCtxValue, () => { }]);
