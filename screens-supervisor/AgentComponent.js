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
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { API_ENDPOINT } from '@env';
import { useTranslation } from 'react-i18next';

export default function AgentComponent() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [customers, setCustomers] = useState([]);
   const { t } = useTranslation();
  useEffect(() => {
    // Fetching customer data from API
    fetch(`${API_ENDPOINT}/api/webcustomer/not-approve/list/`)
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleCustomerChange = (itemValue) => {
    setSelectedCustomer(itemValue);

    // Finding the corresponding sales_route value for the selected customer
    const selectedCustomer = customers.find(
      (customer) => customer.customer_name === itemValue
    );
    if (selectedCustomer) {
      setSelectedCustomerId(selectedCustomer._id);
    }
  };

  const askForPermission = async () => {
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
    if (permissionResult.status !== 'granted') {
      Alert.alert('No permissions to access the camera!', [{ text: 'OK' }]);
      return false;
    }
    return true;
  };

  const UploadTinNumber = async () => {
    // Make sure that we have the permission
    const hasPermission = await askForPermission();
    if (!hasPermission) {
      return;
    } else {
      // Launch the camera with the following settings
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: true,
      });
      // Make sure an image was taken
      if (!image.cancelled) {
        fetch(`${API_ENDPOINT}/api/webcustomer/tin/upload/${selectedCustomerId}/`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // Send our base64 string as a POST request
          body: JSON.stringify({
            imgsource: image.base64,
          }),
        });
      }
    }
  };


  const UploadBusinessLiscense = async () => {
    // Make sure that we have the permission
    const hasPermission = await askForPermission();
    if (!hasPermission) {
      return;
    } else {
      // Launch the camera with the following settings
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: true,
      });
      // Make sure an image was taken 
      console.log('Image details:', image);
      if (!image.cancelled) {
        let imgsource = image.base64; // Declare imgsource here
        console.log('Base64 image data:', imgsource);
        try {
          const response = await fetch(`${API_ENDPOINT}/api/webcustomer/business/registeration/${selectedCustomerId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            // Send our base64 string as a POST request
            body: JSON.stringify({
              imgsource: image.base64,
            }),
          });
  
          if (response.ok) {
            // If the response is successful (status code 2xx), show an alert notification
            Alert.alert('Success', 'Business License uploaded successfully!');
          } else {
            // Handle other response statuses if needed
            Alert.alert('Error', 'Failed to upload Business License');
          }
        } catch (error) {
          // Catch any network-related errors
          Alert.alert('Error', 'An error occurred while uploading Business License');
        }
      }
    }
  };
  


  const UploadBusinessRegisteration = async () => {
    // Make sure that we have the permission
    const hasPermission = await askForPermission();
    if (!hasPermission) {
      return;
    } else {
      // Launch the camera with the following settings
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: true,
      });
      // Make sure an image was taken
      if (!image.cancelled) {
        fetch(`${API_ENDPOINT}/api/webcustomer/business/registeration/${selectedCustomerId}/`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // Send our base64 string as a POST request
          body: JSON.stringify({
            imgsource: image.base64,
          }),
        });
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />

      {/* Lights */}

      {/* Title and form */}
      <View style={{ flex: 1,  padding: 18 }}>
        {/* Title */}
        <View style={{ alignItems: 'center' }}>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            style={{ color: 'grey', fontWeight: 'bold', fontSize: 24 }}
          >
             Customers Credentials
          </Animated.Text>
        </View>
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
                <Picker.Item label="-- Select Customer --" value="" />
                {customers.map((customer) => (
                  <Picker.Item key={customer._id} label={customer.customer_name} value={customer.customer_name} />
                ))}
              </Picker>
            </View>
           
          </View>
          <Animated.View
              entering={FadeInDown.delay(1600).duration(1000).springify()}
              style={{ marginTop: 20 }}
            >
              <TouchableOpacity onPress={UploadTinNumber}  style={{ backgroundColor: '#00f', padding: 15, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                  Upload Tin Number
                </Text>
              </TouchableOpacity>
            </Animated.View>


            <Animated.View
              entering={FadeInDown.delay(1600).duration(1000).springify()}
              style={{ marginTop: 20 }}
            >
              <TouchableOpacity onPress={UploadBusinessLiscense}   style={{ backgroundColor: '#00f', padding: 15, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                  Upload Business Liscense
                </Text>
              </TouchableOpacity>
            </Animated.View>


            <Animated.View
              entering={FadeInDown.delay(1600).duration(1000).springify()}
              style={{ marginTop: 20 }}
            >
              <TouchableOpacity onPress={UploadBusinessRegisteration} style={{ backgroundColor: '#00f', padding: 15, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                  Upload Business Registeration
                </Text>
              </TouchableOpacity>
            </Animated.View>


          
        </View>
      </View>
    </View>
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
