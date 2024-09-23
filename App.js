import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignupScreen';
import WelcomeAgentScreen from './screens-agents/WelcomeScreen';
import SalesOrderAgentScreen from './screens-agents/SalesOrderScreen';
import LedgerDepositAgentScreen from './screens-agents/LedgerDeposit';

import WelcomeSupervisorScreen from './screens-supervisor/WelcomeScreen';
import SalesOrderSupervisorScreen from './screens-supervisor/SalesOrderScreen';
import LedgerDepositSupervisorScreen from './screens-supervisor/LedgerDeposit';

import AgentScreen from './screens-supervisor/AgentScreen';
import ProfileScreen from './screens-supervisor/ProfileScreen';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Ensure that the i18n configuration is imported in your App.js or index.js
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported

const Stack = createNativeStackNavigator();

function App() {
  const { i18n } = useTranslation(); // Ensure you call useTranslation here

  // useEffect for loading stored language inside the component
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]); // Ensure i18n is in the dependency array

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Agent" component={AgentScreen} />
          
          <Stack.Screen name="WelcomeAgent" component={WelcomeAgentScreen} />
          <Stack.Screen name="SalesOrderAgent" component={SalesOrderAgentScreen} />
          <Stack.Screen name="LedgerAgent" component={LedgerDepositAgentScreen} />
          
          <Stack.Screen name="WelcomeSupervisor" component={WelcomeSupervisorScreen} /> 
          <Stack.Screen name="SalesOrderSupervisor" component={SalesOrderSupervisorScreen} />
          <Stack.Screen name="LedgerSupervisor" component={LedgerDepositSupervisorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}

export default App;
