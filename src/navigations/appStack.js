import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "../screens/app/homeScreen";
import AddProducts from "../screens/app/addProducts";
import MyOrders from "../screens/app/myOrders";
import BookDriver from "../screens/app/bookDriver";
import DriverList from "../screens/app/driverList";
import DriverMap from "../screens/app/driverMap";
import Market from "../screens/app/Market";
import EditStock from "../screens/app/EditStock";
import OrderHome from "../screens/app/OrderHome";
import AcceptOrder from "../screens/app/AcceptOrders";
import CompleteOrder from "../screens/app/CompletedOrder";
import addMyDetails from "../screens/app/addMyDetails";
import ReviewHistory from "../screens/app/ReviewHistory";
import RideHistory from "../screens/app/RideHistory";

const AppStack = createStackNavigator(
  {
    Home: Home,
    AddProducts: AddProducts,
    OrderHome: OrderHome,
    MyOrders: MyOrders,
    AcceptOrder: AcceptOrder,
    CompleteOrder: CompleteOrder,
    BookDriver: BookDriver,
    DriverList: DriverList,
    DriverMap: DriverMap,
    Market: Market,
    EditStock: EditStock,
    addMyDetails: addMyDetails,
    ReviewHistory: ReviewHistory,
    RideHistory: RideHistory,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(AppStack);
