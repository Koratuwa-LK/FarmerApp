import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";

import HomeStack from './homeStack';
import AddProducts from '../screens/addProducts';

const RootDrawNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    AddProducts: {
        screen: AddProducts,
        navigationOptions: {
            title: 'Add Products'
        }
    }
});

export default createAppContainer(RootDrawNavigator);