/* eslint-disable */

declare module 'react-navigation-hooks' {
	import { NavigationScreenProp, NavigationRoute, NavigationParams, NavigationEventCallback, NavigationLeafRoute, NavigationState } from 'react-navigation';

	export function useNavigation<S>(): NavigationScreenProp<S & NavigationRoute>;
	export function useNavigationParam<T extends keyof NavigationParams>(paramName: T): NavigationParams[T];
	export function useNavigationState(): (NavigationLeafRoute<NavigationParams> & {
		params?: NavigationParams | undefined;
	}) | (NavigationLeafRoute<NavigationParams> & NavigationState & {
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
