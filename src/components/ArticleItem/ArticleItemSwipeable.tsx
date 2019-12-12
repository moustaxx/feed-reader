import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import { Animated, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { switchArticleSaveStatus, switchArticleReadStatus } from '../../store/articles/articles.actions';

const styles = StyleSheet.create({
	readTextColor: {
		color: '#666',
	},
	swipeableAction: {
		paddingLeft: 8,
		paddingRight: 16,
		backgroundColor: '#388e3c',
		alignItems: 'center',
		flexDirection: 'row',
	},
	swipeableActionIcon: {
		width: 30,
		marginHorizontal: 8,
	},
	swipeableText: {
		color: '#fff',
		textTransform: 'uppercase',
	},
});

const AnimatedIcon: typeof MaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

interface IActionsProps {
	swipeableRowRef: React.MutableRefObject<Swipeable | null>;
	progress: Animated.Value | Animated.AnimatedInterpolation;
	dragX: Animated.AnimatedInterpolation;
	isSaved?: boolean;
	isUnread?: boolean;
}

const LeftActions = ({ swipeableRowRef, isSaved }: IActionsProps) => {
	return (
		<RectButton
			style={styles.swipeableAction}
			onPress={() => swipeableRowRef.current?.close()}
		>
			<AnimatedIcon
				name="save"
				size={30}
				color="#fff"
				style={styles.swipeableActionIcon}
			/>
			<Animated.Text
				style={styles.swipeableText}
				children={isSaved ? 'Undo save' : 'Read later'}
			/>
		</RectButton>
	);
};

const RightActions = ({ swipeableRowRef, isUnread }: IActionsProps) => {
	return (
		<RectButton
			style={styles.swipeableAction}
			onPress={() => swipeableRowRef.current?.close()}
		>
			<AnimatedIcon
				name="check"
				size={30}
				color="#fff"
				style={styles.swipeableActionIcon}
			/>
			<Animated.Text
				style={styles.swipeableText}
				children={isUnread ? 'Mark as read' : 'Mark as unread'}
			/>
		</RectButton>
	);
};

type TArticleItemSwipeable = React.FC<{
	articleSaved: boolean;
	articleUnread: boolean;
	articleID: string;
}>;

const ArticleItemSwipeable: TArticleItemSwipeable = ({
	articleSaved,
	articleUnread,
	articleID,
	children,
}) => {
	const dispatch = useDispatch();
	const swipeableRowRef = React.useRef<Swipeable | null>(null);

	const handleSwipeLeft = () => {
		dispatch(switchArticleSaveStatus([articleID]));
		swipeableRowRef.current?.close();
	};

	const handleSwipeRight = () => {
		dispatch(switchArticleReadStatus(articleID));
		swipeableRowRef.current?.close();
	};

	return (
		<Swipeable
			ref={swipeableRowRef}
			overshootLeft={false}
			overshootRight={false}
			onSwipeableLeftOpen={handleSwipeLeft}
			onSwipeableRightOpen={handleSwipeRight}
			renderLeftActions={(progress, dragX) => (
				<LeftActions
					swipeableRowRef={swipeableRowRef}
					progress={progress}
					dragX={dragX}
					isSaved={articleSaved}
				/>
			)}
			renderRightActions={(progress, dragX) => (
				<RightActions
					swipeableRowRef={swipeableRowRef}
					progress={progress}
					dragX={dragX}
					isUnread={articleUnread}
				/>
			)}
		>
			{children}
		</Swipeable>
	);
};

export default ArticleItemSwipeable;
