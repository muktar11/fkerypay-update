import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SalesOrderReturnScreen from './SalesOrderReturnScreen';
import SalesOrderTrackScreen from './SalesOrdersTrackScreen';
import { API_ENDPOINT } from '@env';
const Drawer = createDrawerNavigator();


const SalesOrderContent = () => {
  const navigation = useNavigation();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [stored_id, setStoredId] = useState('');
  const [web_id, setWeb_id] = useState('');
  const [customers, setCustomers] = useState([]);
  const [salesRoute, setSalesRoute] = useState('');
  const [Q, setQ] = useState('');
  const [H, setH] = useState('');
  const [ONE, setONE] = useState('');
 
  const [TWO, setTWO] = useState('');
  const [Qp, setQp] = useState('');
  const [Hp, setHp] = useState('');
  const [ONEp, setONEp] = useState('');
  const [TWOp, setTWOp] = useState('');
  const [Q_CASH, setQ_CASH] = useState('');
  const [H_CASH, setH_CASH] = useState('');
  const [ONE_CASH, setONE_CASH] = useState('');
  const [TWO_CASH, setTWO_CASH] = useState('');
  const [Totalp, setTotalp] = useState('');
  const [TotalCash, setTotalCash] = useState('');
  const [GrandTotalCash, setGrandTotalCash] = useState('');
  const [TransportationFee, setTransportationFee] = useState('');
  const [Route, setRoute] = useState('');
  const [Remark, setRemark] = useState('');
  const [ledgerBalance, setLedgerBalance] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState(''); // State for selected warehouse 
  const [selectedInventory, setSelectedInventory] = useState('');
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  useEffect(() => {
    handleCustomerChange()
  })
  
 const handleCustomerChange = (itemValue) => {
    setSelectedCustomer(itemValue);
    const selectedCustomer = customers.find(
      (customer) => customer.customer_name === itemValue
    );
    if (selectedCustomer) {
      setSelectedCustomerId(selectedCustomer._id);
      setSalesRoute(selectedCustomer.sales_route);
    }
  };



useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
      // Retrieve data from AsyncStorage
      const stored_id = await AsyncStorage.getItem("id");
      const storedweb_id = await AsyncStorage.getItem('web_id');
      setStoredId(stored_id);
      setWeb_id(storedweb_id);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };



useEffect(() => {
  if (stored_id) {
    // Fetching ledger balance from API based on selectedCustomerId
    fetch(`${API_ENDPOINT}/api/webcustomer/approve/list/${stored_id}/`)
      .then((response) => response.json())
       .then((data) => setCustomers(data)) // Update here
      .catch((error) => console.log(error)); 
  }
}, [stored_id]);

useEffect(() => {
  if (web_id) {
    // Fetching ledger balance from API based on selectedCustomerId
    fetch(`${API_ENDPOINT}/commerce/ledger-deposit-view/${web_id}/`)
      .then((response) => response.json())
      .then((data) => setLedgerBalance(data.Balance)) // Update here
      .catch((error) => console.log(error)); 
  }
}, [web_id]);

  

  useEffect(() => {
    if (salesRoute) {
    // Fetching Q, H, ONE, TWO values from API based on sales_route
    fetch(`${API_ENDPOINT}/commerce/sort_price/${salesRoute}/`)
        .then((response) => response.json())
        .then((data) => {
    setQ(data.Q);
    setH(data.H);
    setONE(data.ONE);
    setTWO(data.TWO);
    // You can set TWO value here if needed
    })
    .catch((error) => console.log(error));
    }
    }, [salesRoute]);

    useEffect(() => {
      const fetchData = async () => {
        if (salesRoute && selectedInventory) {
          try {
            const response = await fetch(`${API_ENDPOINT}/commerce/get-latest-price/${salesRoute}/${selectedInventory}/`);
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setQ(data.Q);
            setH(data.H);
            setONE(data.ONE);
            setTWO(data.TWO);
            // You can set TWO value here if needed
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };
    
      // Fetch data and reset other state values when selectedWarehouse changes
      fetchData();
    
      // Reset other state values when selectedWarehouse changes
      setQp('');
      setHp('');
      setONEp('');
      setTWOp('');
      setQ_CASH('');
      setH_CASH('');
      setONE_CASH('');
      setTWO_CASH('');
      setTotalp('');
      setTotalCash('');
    }, [salesRoute, selectedInventory]); // Include all relevant state setters in the dependency array
    
    


    const handleQpChange = (text) => {
      const newQp = parseInt(text) || 0;
      setQp(newQp);
    
      // Calculate Q_CASH based on the updated Q value
      setQ_CASH((prevQ_CASH) => newQp * Q);
    };

  const handleHpChange = (text) => {
  const newHp =  parseInt(text) || 0;
  setHp(newHp);
  setH_CASH((prevH_CASH) => newHp * H); // Calculating H_CASH

  };
  
  const handleONEpChange = (text) => {
  const newONEp =  parseInt(text) || 0;
  setONEp(newONEp);
  setONE_CASH(newONEp * ONE); // Calculating ONE_CASH
  
  console.log('ONE_CASH:', newONEp * ONE);
  };
  
  const handleTWOpChange = (text) => {
  const newTWOp =  parseInt(text) || 0;
  setTWOp(newTWOp);
  setTWO_CASH(newTWOp * TWO); // Calculating ONE_CASH
  console.log('TWO_CASH:', newTWOp * TWO);
  };

  const handleTransportationFee = (text) => {
    const newTransportation =  parseInt(text) || 0;
    setTransportationFee(newTransportation);
  }
  const handleMarket = (text) => {
    const newmarket =  (text);
    setRoute(newmarket);
  }

  const handleRemark = (text) => {
    const newremark =  (text);
    setRemark(newremark);
  }
  useEffect(() => {
    const totalp = (Qp || 0) + (Hp || 0) + (ONEp || 0) + (TWOp || 0);
    setTotalp(totalp || '');

  
    const totalCash = parseInt(Q_CASH || 0) + parseInt(H_CASH || 0) + parseInt(ONE_CASH || 0) + parseInt(TWO_CASH || 0);
    setTotalCash(totalCash || '');


    const grandtotalCash = parseInt(Q_CASH || 0) + parseInt(H_CASH || 0) + parseInt(ONE_CASH || 0) + parseInt(TWO_CASH || 0) + parseInt(TransportationFee || 0);
    setGrandTotalCash(grandtotalCash || '');
  }, [Qp, Hp, ONEp, TWOp, Q_CASH, H_CASH, ONE_CASH, TWO_CASH, TransportationFee]);

  const handleFormSubmit = async () => {
    const first_name = await AsyncStorage.getItem('first_name');
    const last_name = await AsyncStorage.getItem('last_name');
    const formData = new FormData();
    formData.append('Qp', Qp);
    formData.append('Hp', Hp);
    formData.append('ONEp', ONEp);
    formData.append('TWOp', TWOp);
    formData.append('Totalp', Totalp);
    formData.append('Q_Unit', Q);
    formData.append('H_Unit', H);
    formData.append('ONE_Unit', ONE);
    formData.append('TWO_Unit', TWO);
    formData.append('Q_CASH', Q_CASH);
    formData.append('H_CASH', H_CASH);
    formData.append('ONE_CASH', ONE_CASH);
    formData.append('TWO_CASH', TWO_CASH);
    formData.append('Total_CASH', TotalCash);
    formData.append('Grand_Total_CASH', GrandTotalCash);
    formData.append('ledgerBalance', ledgerBalance);
    formData.append('sales_Route', salesRoute);
    formData.append('Route', Route);
    formData.append('Inventory', selectedInventory);
    formData.append('TransportationFee', TransportationFee) 
    formData.append('supervisor_first_name', first_name);
    formData.append('supervisor_last_name', last_name);
    formData.append('Remark', Remark);
    try {
      console.log('Attempting to make a network request...');
      const response = await fetch(`${API_ENDPOINT}/commerce/remote-sales-order/create/${web_id}/${id}/`, {
        method: 'POST',
        headers: {
          // Add any additional headers here if needed
        },
        body: formData, // Use formData directly as the body
      });

      if (response.ok) {
        Alert.alert('Sales Order created successfully!');
        // Clear form fields
        // ...
      } else {
        throw new Error('An error occurred');
      }
    } catch (error) {
      console.error('An error occurred:', error.message || 'An error occurred. Please try again.');
      Alert.alert('Error', error.message || 'An error occurred. Please try again.');
    }
  };


  const inventoryItems = ['AdissAbaba', 'Agena', 'Wolketie'];

  const handleInventorySelect = (item) => {
    setSelectedInventory(item);
    setShowInventoryModal(false);
    // Perform actions when an inventory item is selected
  };




  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />

      {/* lights */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', width: '100%' }}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          style={{ height: 25, width: 10, padding: 10 }}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          style={{ height: 160, width: 65, opacity: 0.75 }}
        />
      </View>

      {/* title and form */}
      <View style={{ flex: 1, justifyContent: 'center', padding: 18 }}>
        {/* title */}
        <View style={{ alignItems: 'center' }}>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            style={{ color: 'grey', fontWeight: 'bold', fontSize: 24 }}
          >
            Sales Order
          </Animated.Text>
        </View>

        {/* form */}
        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

          
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Picker
              selectedValue={selectedCustomer}
              onValueChange={(itemValue) => handleCustomerChange(itemValue)}
              style={{
                color: '#333',
                padding: 0,
                backgroundColor: 'rgb(255, 255, 255)',
                borderWidth: 0.3,
                width: '100%',
                maxWidth: '100%',
                minWidth: '30%',
                height: 40,
              }}
            >
            
  <Picker.Item
    key={customers.id}
    label={`${customers.first_name} ${customers.last_name}`} // Combine first_name and last_name
    value={customers.id} // Use the customer id as the value
  />

            </Picker>
          </View>

            
            
          </View>


          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

            
<View style={{ flex: 1, marginRight: 10 }}>
  <Animated.View
    entering={FadeInDown.duration(1000).springify()}
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
  >
<TextInput
  placeholder="Ledger Balance"
  placeholderTextColor={'black'}
  value={ledgerBalance.toString()} // Convert to string if ledgerBalance is a number
  editable={false} // Make it read-only
/>
  </Animated.View>
</View>



<TouchableOpacity
        onPress={() => setShowInventoryModal(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#333',
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text>
          {selectedInventory ? selectedInventory : 'warehouse'}
        </Text>
      </TouchableOpacity>

      {/* Inventory Modal */}
      <Modal
        visible={showInventoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowInventoryModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            {inventoryItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ padding: 10 }}
                onPress={() => handleInventorySelect(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={{ marginTop: 10, alignItems: 'flex-end' }}
              onPress={() => setShowInventoryModal(false)}
            >
              <Text style={{ color: 'blue' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



</View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

            
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
               <TextInput
                placeholder="0.35 ml Lit"
                placeholderTextColor={'gray'}
                value={Qp.toString()} // Convert to string if needed
                onChangeText={handleQpChange}
                keyboardType="numeric" // Specify the keyboard type
              />
              </Animated.View>
            </View>
           

            <View style={{ flex: 1 }}>
  <Animated.View
    entering={FadeInDown.delay(200).duration(1000).springify()}
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
  >
    <TextInput
      placeholder="0.35ml price"
      placeholderTextColor={'gray'}
      value={Q_CASH.toString()} // Convert to string if needed
      editable={false} // Make it read-only
    />
  </Animated.View>
</View>          
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="0.6 ml Lit"
                  placeholderTextColor={'gray'}
                  value={Hp.toString()} // Connect to the state variable
                  onChangeText={handleHpChange}
                  keyboardType="numeric" // Update the state variable
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="0.6ml price"
                  placeholderTextColor={'gray'}
                  value={H_CASH.toString()} 
                  editable={false} // Make it read-only
                />
              </Animated.View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="1 Lit Qty"
                  placeholderTextColor={'gray'}
                  value={ONEp} // Connect to the state variable
                  onChangeText={handleONEpChange}
                  keyboardType="numeric" // Update the state variable
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1000).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="1 Lit price"
                  placeholderTextColor={'gray'}
                  value={ONE_CASH.toString()} // Convert to string if needed 
                  editable={false} // Make it read-only
                />
              </Animated.View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(1200).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="2 Lit Qty"
                  placeholderTextColor={'gray'}
                  value={TWOp} // Connect to the state variable
                  onChangeText={handleTWOpChange}
                  keyboardType="numeric" // Update the state variable
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="2 Lit price"
                  placeholderTextColor={'gray'}
                  value={TWO_CASH.toString()} // Convert to string if needed 
                  editable={false} // Make it read-only
                />
              </Animated.View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(1200).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="total qty"
                  placeholderTextColor={'gray'}
                  value={Totalp.toString()} // Convert to string if needed
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="total amount"
                  placeholderTextColor={'gray'}
                  value={TotalCash.toString()} // Convert to string if needed
                />
              </Animated.View>
            </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(1200).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="trasportation fee"
                  placeholderTextColor={'gray'}
                  value={TransportationFee} // Connect to the state variable
                  onChangeText={handleTransportationFee}
                  keyboardType="numeric" // Update the state variable
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="Route"
                  placeholderTextColor={'gray'}
                  value={Route} // Connect to the state variable
                  onChangeText={handleMarket}
                />
              </Animated.View>
            </View>
            </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(1200).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="Grand Total Cash"
                  placeholderTextColor={'gray'}
                  value={GrandTotalCash.toString()} // Convert to string if needed
                />
              </Animated.View>
            </View>
         
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(1200).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="Remark"
                  placeholderTextColor={'gray'}
                  value={Remark}
                  onChangeText={handleRemark}
                />
              </Animated.View>
            </View>
         
            </View>


        </View>

       

      
        <Animated.View
          entering={FadeInDown.delay(1600).duration(1000).springify()}
          style={{ marginTop: 20 }}
        >
          <TouchableOpacity onPress={handleFormSubmit} style={{ backgroundColor: '#00f', padding: 15, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}


export default function SalesOrderScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="LedgerDeposit"
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
        name="Sales Order"
        component={SalesOrderContent} // Use the separate component
        options={{
          drawerIcon: ({ color }) => null,
        }}
      />
      <Drawer.Screen
        name="Sales Order Return"
        component={SalesOrderReturnScreen}
        options={{
          title: 'Sales Order Return',
        }}
      />
      <Drawer.Screen
        name="Sales Order Track"
        component={SalesOrderTrackScreen}
        options={{
          title: 'Sales Orders Track',
        }}
      />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 6,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});