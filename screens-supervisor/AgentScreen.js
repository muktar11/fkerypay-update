import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { getFormatedDate } from "react-native-modern-datepicker";
// Add this line with other imports at the top of your file
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CheckBox } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { API_ENDPOINT } from '@env';
import { useTranslation } from 'react-i18next';
const Drawer = createDrawerNavigator();



const AgentScreenContent = () => {
  const navigation = useNavigation();
  const [customer_name, setcustomer_name] = useState('');
  const[email, setemail]= useState('');
  const[phone, setphone]= useState('');
  const[contact_information, setcontact_information]= useState('');
  const [gps_coordinates, setgps_coordinates] = useState(null);
  const [tin_number, settin_number] = useState(null);
  const[business_license_no, setbusiness_license_no] = useState('');
  const [business_registration_no, setbusiness_registration_no] = useState(null);
  const [tin_number_doc, settin_number_doc] = useState('');
  const [business_license_no_doc, setbusiness_license_no_doc] = useState('');
  const [business_registration_no_doc, setbusiness_registration_no_doc] = useState('');
  const [sales_target, setsales_target] = useState(null);
  const [credit_limit, setcredit_limit] = useState('');
  const [is_credit, setis_credit] = useState(false); // Initialize the state with false
  const [sales_route, setsales_route] = useState('');
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [tinNumberDoc, setTinNumberDoc] = useState(null);
  const [businessLicenseDoc, setBusinessLicenseDoc] = useState(null);
  const [businessRegistrationDoc, setBusinessRegistrationDoc] = useState(null);
  const Drawer = createDrawerNavigator();
  const { t } = useTranslation();


  const selectFile = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*']
      });
      const assets = docRes.assets;
      if (!assets) return; 
      const file = assets[0];
  
      const tinNumber = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      setTinNumberDoc(tinNumber)
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };


  const selectFile2 = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*']
      });
      const assets = docRes.assets;
      if (!assets) return; 
      const file = assets[0];
  
      const businessLicense = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      setBusinessLicenseDoc(businessLicense)
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };


  const selectFile3 = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*']
      });
      const assets = docRes.assets;
      if (!assets) return; 
      const file = assets[0];
  
      const BusinessRegistrationDoc = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      setBusinessRegistrationDoc(BusinessRegistrationDoc)
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };


	
 
  const RouteItems = [ 'Area1', 'Area1B', 'Area2','Area3', 'EastMarket', 'AdissAbabaMarket','AdissAbabaMarket2'];
  const handleRouteSelect = (item) => {
    setsales_route(item);
    setShowInventoryModal(false);
    // Perform actions when an inventory item is selected
  };

  const handleFormSubmit = async () => {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('customer_name', customer_name);
    formData.append('sales_route', sales_target);
    formData.append('tin_number', tin_number);
    formData.append('business_license_no', business_license_no);
    formData.append('business_registration_no', business_registration_no);
    formData.append('sales_target', sales_target);
    formData.append('gps_coordinates', gps_coordinates);
    const isCredit = is_credit === true ? 'true' : 'false';
    const creditLimit = credit_limit ? parseInt(credit_limit) : 0;
    formData.append('phone', phone);
    formData.append('credit_limit', credit_limit);
    formData.append('contact_information', contact_information);
    formData.append("file1", tinNumberDoc);
    formData.append("file2", businessLicenseDoc);
    formData.append("file3", businessRegistrationDoc);
    // Check if selectedImage is a valid URI before proceeding

  
      try {
        console.log('Attempting to make a network request...');
        const response = await fetch(`${API_ENDPOINT}/api/remote/webcustomer/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
  
        if (response.ok) {
          Alert.alert('Agent registered successfully!');
          // Clear form fields or perform other actions
        } else {
          const errorResponse = await response.text(); // Get detailed error response
          throw new Error(errorResponse || 'An error occurred');
        }
      } catch (error) {
        console.error('An error occurred:', error.message || 'An error occurred. Please try again.');
        Alert.alert('Error', error.message || 'An error occurred. Please try again.');
      }
  };
  


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
      Agent Registeration
          </Animated.Text>
        </View>

        {/* form */}
        <View style={{ marginTop: 20 }}>
         

       

      

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="Customer name"
                  placeholderTextColor={'gray'}
                  value={customer_name} // Connect to the state variable
                  onChangeText={(text) => setcustomer_name(text)} // Update the state variable
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
                  placeholder="phone number"
                  placeholderTextColor={'gray'}
                  value={phone} // Connect to the state variable
                  onChangeText={(text) => setphone(text)} // Update the state variable
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
                  placeholder="contact_information"
                  placeholderTextColor={'gray'}
                  value={contact_information} // Connect to the state variable
                  onChangeText={(text) => setcontact_information(text)} // Update the state variable
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
                  placeholder="email"
                  placeholderTextColor={'gray'}
                  value={email} // Connect to the state variable
                  onChangeText={(text) => setemail(text)} // Update the state variable
                />
              </Animated.View>
            </View>
          </View>


          

<TouchableOpacity
        onPress={() => setShowInventoryModal(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#333',
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text>
          {sales_route ? sales_route : 'sales_route'}
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
            {RouteItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ padding: 10 }}
                onPress={() => handleRouteSelect(item)}
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



         

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="gps_coordintates"
                  placeholderTextColor={'gray'}
                  value={gps_coordinates} // Connect to the state variable
                  onChangeText={(text) => setgps_coordinates(text)} // Update the state variable
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
                  placeholder="tin_number"
                  placeholderTextColor={'gray'}
                  value={tin_number} // Connect to the state variable
                  onChangeText={(text) => settin_number(text)} // Update the state variable
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
                  placeholder="business_license_no"
                  placeholderTextColor={'gray'}
                  value={business_license_no} // Connect to the state variable
                  onChangeText={(text) => setbusiness_license_no(text)} // Update the state variable
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
                  placeholder="business_registration_no"
                  placeholderTextColor={'gray'}
                  value={business_registration_no} // Connect to the state variable
                  onChangeText={(text) => setbusiness_registration_no(text)} // Update the state variable
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
                  placeholder="sales_target"
                  placeholderTextColor={'gray'}
                  value={sales_target} // Connect to the state variable
                  onChangeText={(text) => setsales_target(text)} // Update the state variable
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
                  placeholder="credit_limit"
                  placeholderTextColor={'gray'}
                  value={credit_limit} // Connect to the state variable
                  onChangeText={(text) => setcredit_limit(text)} // Update the state variable
                />
              </Animated.View>
            </View>
          </View>
          <CheckBox
      title="is_credit"
      checked={is_credit}
      onPress={() => setis_credit(!is_credit)}
    />        
        </View>


        <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity onPress={selectFile}  className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Attach Tin Number</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity onPress={selectFile2}  className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Attach Business Liscense</Text>
                    </TouchableOpacity>
                </Animated.View>



                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity onPress={selectFile3}  className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Attach Business Registeration</Text>
                    </TouchableOpacity>
                </Animated.View>



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
    </ScrollView>
  );
}


export default function AgentRegisterScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="ወኪል"
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
        name="ወኪል ይመዝገቡ"
        component={AgentScreenContent} // Use the separate component
        options={{
          drawerIcon: ({ color }) => null,
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