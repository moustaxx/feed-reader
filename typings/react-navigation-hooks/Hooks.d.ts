/* eslint-disable */

declare module 'react-navigation-hooks' {
	import { NavigationScreenProp, NavigationRoute, NavigationParams, NavigationEventCallback } from 'react-navigation';

	export function useNavigation<S>(): NavigationScreenProp<S & NavigationRoute>;
	export function useNavigationParam<T extends keyof NavigationParams>(paramName: T): NavigationParams[T];
	export function useNavigationState(): (import("react-navigation").NavigationLeafRoute<NavigationParams> & {
		params?: NavigationParams | undefined;
	}) | (import("react-navigation").NavigationLeafRoute<NavigationParams> & import("react-navigation").NavigationState & {
		params?: NavigationParams | undefined;
	});
	export function useNavigationKey(): string;
	export function useNavigationEvents(handleEvt: NavigationEventCallback): void;
	export function useFocusState(): {
		isFocused: boolean;
		isBlurring: boolean;
		isBlurred: boolean;
		isFocusing: boolean;
	};
}