import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { DrawerItemsProps, DrawerItems } from 'react-navigation';

import logoIcon from '../../../assets/small-icon.png';
import menuDrawerStyles from './MenuDrawer.style';

const MenuDrawer = (props: DrawerItemsProps) => {
	return (
		<View style={menuDrawerStyles.container}>
			<ScrollView style={menuDrawerStyles.scroller}>
				<View style={menuDrawerStyles.header}>
					<Image style={menuDrawerStyles.headerImg} source={logoIcon} />
					<Text style={menuDrawerStyles.headerText}>Feed Reader</Text>
				</View>
				<DrawerItems {...props} />
			</ScrollView>
			<View style={menuDrawerStyles.footer}>
				<Text style={menuDrawerStyles.description}>Feed Reader</Text>
				<Text style={menuDrawerStyles.version}>v1.0</Text>
			</View>
		</View>
	);
};

export default MenuDrawer;
