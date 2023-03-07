import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
   return (
      <MainProvider>
         <PaperProvider>
            <Navigator></Navigator>
            <StatusBar style="auto" />
         </PaperProvider>
      </MainProvider>
   );
};

export default App;
