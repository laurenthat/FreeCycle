import { StatusBar } from "expo-status-bar";
import { MainProvider } from "./contexts/MainContext";
import Navigator from "./navigators/Navigator";
import TopTabNavigator from "./navigators/TopBarNavigator";

const App = () => {
   return (
      <MainProvider>
         <Navigator></Navigator>
         <StatusBar style="auto" />
      </MainProvider>
   );
};

export default App;
