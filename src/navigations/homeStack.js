import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/homeScreen';
import AddProducts from '../screens/addProducts';
import MyOrders from '../screens/myOrders';

const screens = {
    Home: {
        screen: Home
    },
    AddProducts: {
        screen: AddProducts
    },
    MyOrders: {
        screen: MyOrders
    }

}
const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions: {
        headerTitleAlign: 'center'
    }});

export default createAppContainer(HomeStack);