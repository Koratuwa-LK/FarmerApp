import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/auth/LoginForm";
import Register from "../screens/auth/RegisterForm";

const AuthStack = createStackNavigator({
    Login: Login,
    Register: Register,
}, {
    headerMode: 'none'
});

export default createAppContainer(AuthStack);