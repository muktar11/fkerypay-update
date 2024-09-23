import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormScreen from './SalesOrderScreen';
import ProfileScreen from './ProfileScreen';
import WelcomeScreen from './WelcomeScreen';
import LedgerDepositScreen from './LedgerDeposit';
import ReturnDepositScreen  from './ReturnDepositScreen';
import LedgerBalanceScreen from './LedgerBalance'

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#87CEEB',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
          <Drawer.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

<Drawer.Screen
        name="Status Payment"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      >
        {() => (
          <Drawer.Navigator
            initialRouteName="Status"
            drawerContentOptions={{
              activeBackgroundColor: '#87CEEB',
              activeTintColor: '#fff',
              inactiveTintColor: '#333',
              labelStyle: {
                marginLeft: -25,
                fontSize: 15,
              },
            }}
          >
         
            <Drawer.Screen
              name="Ledger Deposit"
              component={LedgerDepositScreen}
              options={{
                title: 'Ledger Deposit',
              }}
            />

<Drawer.Screen
              name="Deposit Return"
              component={ReturnDepositScreen}
              options={{
                title: 'Return Deposit',
              }}
            />
            <Drawer.Screen
              name="Ledger Balance"
              component={LedgerBalanceScreen}
              options={{
                title: 'Ledger Balance',
              }}
            />
          </Drawer.Navigator>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Order"
        component={FormScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

<Drawer.Screen
        name="Customer Reg"
        component={FormScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
       
      <Drawer.Screen
        name="Status"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      >
        {() => (
          <Drawer.Navigator
            initialRouteName="Status"
            drawerContentOptions={{
              activeBackgroundColor: '#87CEEB',
              activeTintColor: '#fff',
              inactiveTintColor: '#333',
              labelStyle: {
                marginLeft: -25,
                fontSize: 15,
              },
            }}
          >
            <Drawer.Screen
              name="Status"
              component={StatusScreen}
              options={{
                title: 'All Orders',
              }}
            />
            <Drawer.Screen
              name="Completed"
              component={StatusScreen}
              options={{
                title: 'Completed Orders',
              }}
            />
            <Drawer.Screen
              name="OnProgress"
              component={StatusScreen}
              options={{
                title: 'Orders in Progress',
              }}
            />
          </Drawer.Navigator>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeScreen;
