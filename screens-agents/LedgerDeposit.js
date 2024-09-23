import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
   ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  PermissionsAndroid,
  Button,
} from 'react-native';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress'; // Optional: for a visual progress bar (install it using: npm install react-native-progress)
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker'; 
import { Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
// Add this line with other imports at the top of your file
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReturnDepositScreen from './ReturnDepositScreen';
import LedgerBalanceScreen from './LedgerBalance';
import { API_ENDPOINT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const LedgerDepositContent = () => {
  const navigation = useNavigation();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [stored_id, setStoredId] = useState('');
  const [web_id, setWeb_id] = useState('');
  const [customers, setCustomers] = useState([]);
  const[CSI_CSRI_Number, setCSI_CSRI_Number]= useState('');
  const[Bank_Name, setBank_Name]= useState('');
  const[Bank_Reference_Number, setBank_Reference_Number]= useState('');
  const[Deposit_Amount, setDeposit_Amount]= useState('');
  const[Branch_Name, setBranch_Name] = useState('');
  const [Narrative, setNarrative] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [imageData, setImageData] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1),"YYYY/MM/DD");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const Drawer = createDrawerNavigator();

  

useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
      const stored_id = await AsyncStorage.getItem("id");
      const storedweb_id = await AsyncStorage.getItem('web_id');
      setStoredId(stored_id);
      setWeb_id(storedweb_id);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };




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


  
  const selectFile = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*']
      });
      const assets = docRes.assets;
      if (!assets) return; 
      const file = assets[0];
  
      const SingleFile = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      setSingleFile(SingleFile)
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

const [loading, setLoading] = useState(false); // State for managing the loading indicator
const [uploadProgress, setUploadProgress] = useState(0); // State to track upload percentage

const uploadImage = async () => {
  const BASE_URL = 'xxxx';

  // Check if file exists
  if (!singleFile) {
    Alert.alert('No file selected');
    return;
  }

  // Create FormData for file upload
  const formData = new FormData();
  formData.append('Bank_Name', Bank_Name || '');
  formData.append('Bank_Reference_Number', Bank_Reference_Number || '');
  formData.append('Deposit_Amount', Deposit_Amount || '');
  formData.append('Deposit_Date', startedDate || '');
  formData.append('Narrative', Narrative || '');
  formData.append('Branch_Name', Branch_Name || '');
  formData.append('file', {
    name: singleFile.name,
    uri: singleFile.uri,
    type: singleFile.type,
  });

  setLoading(true); // Start loading indicator
  setUploadProgress(0); // Reset progress to 0

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_ENDPOINT}/commerce/mobile-ledger-deposit/${web_id}/`);

    // Set upload progress listener
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progressPercent = (event.loaded / event.total) * 100;
        setUploadProgress(progressPercent); // Update progress state
      }
    };

    // Set headers for the request
    xhr.setRequestHeader('Accept', 'application/json');

    // Set up response handling
    xhr.onload = () => {
      if (xhr.status === 201) {
        Alert.alert('Ledger created successfully!');
      } else {
        const result = JSON.parse(xhr.response);
        Alert.alert('Info', result.msg || 'Something went wrong');
      }
      setLoading(false); // End loading indicator
    };

    xhr.onerror = () => {
      Alert.alert('Error', 'Something went wrong while uploading the ledger.');
      setLoading(false); // End loading indicator
    };

    // Send the request with formData
    xhr.send(formData);
  } catch (error) {
    console.log('error upload', error);
    Alert.alert('Error', 'Something went wrong while uploading the ledger.');
    setLoading(false); // End loading indicator
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
          ተቀማጭ ገንዘብ
          </Animated.Text>
        </View>

        {/* form */}
        <View style={{ marginTop: 20 }}>
         

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

      

               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="የባንክ ማመሳከሪያ ቁጥር"
                  placeholderTextColor={'gray'}
                  value={Bank_Reference_Number} // Connect to the state variable
                  onChangeText={(text) => setBank_Reference_Number(text)} // Update the state variable
                />
              </Animated.View>
            </View>
           
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
           
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="የባንክ ስም"
                  placeholderTextColor={'gray'}
                  value={Bank_Name} // Connect to the state variable
                  onChangeText={(text) => setBank_Name(text)} // Update the state variable
                />
              </Animated.View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="የቅርንጫፍ ስም"
                  placeholderTextColor={'gray'}
                  value={Branch_Name} // Connect to the state variable
                  onChangeText={(text) => setBranch_Name(text)} // Update the state variable
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
                  placeholder="የገንዘብ መጠን"
                  placeholderTextColor={'gray'}
                  value={Deposit_Amount} // Connect to the state variable
                  onChangeText={(text) => setDeposit_Amount(text)} // Update the state variable
                />
              </Animated.View>
            </View>
          
            </View>


      

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          
          <View style={{ flex: 1 }}>
            <Animated.View
              entering={FadeInDown.delay(1400).duration(1000).springify()}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
            >
              <TextInput
                placeholder="አስገቢ ስም"
                placeholderTextColor={'gray'}
                value={Narrative} // Connect to the state variable
                onChangeText={(text) => setNarrative(text)} // Update the state variable
              />
            </Animated.View>
          </View>
          </View>


       

          
        </View>


        




    <SafeAreaView style={{ flex: 1 }}>
  <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : ""}
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#fff",
    }}
  >
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%" }}>
        <View>
          {/* Conditionally render the selected date or a placeholder */}
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={handleOnPressStartDate}
          >
            <Text style={{ color: selectedStartDate ? "black" : "gray" }}>
              {selectedStartDate ? selectedStartDate : "ቀን ይምረጡ"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Create modal for date picker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: "#080516",
                textHeaderColor: "#469ab6",
                textDefaultColor: "#FFFFFF",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "#FFFFFF",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              accessibilityLabel="Select a start date"
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  </KeyboardAvoidingView>
</SafeAreaView>


  

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity onPress={selectFile}  className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">ፎቶ አያይዝ</Text>
                    </TouchableOpacity>
                </Animated.View>

        

        
                    <Animated.View
      className="w-full"
      entering={FadeInDown.delay(400).duration(1000).springify()}
    >
      <TouchableOpacity
        onPress={uploadImage}
        disabled={loading} // Disable the button while loading
        className={`w-full p-3 rounded-2xl mb-3 ${loading ? 'bg-gray-400' : 'bg-sky-400'}`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
       //   <Progress.Bar progress={uploadProgress / 100} width={200} />
        ) : (
          <Text className="text-xl font-bold text-white text-center">አስገባ</Text>
        )}
      </TouchableOpacity>
    </Animated.View>





      </View>
    </View>
  );
}


export default function LedgerDepositScreen() {
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
        name="የሂሳብ መዝገብ"
        component={LedgerDepositContent} // Use the separate component
        options={{
          drawerIcon: ({ color }) => null,
        }}
      />
      <Drawer.Screen
        name="ተቀማጭ ገንዘብ መመለስ"
        component={ReturnDepositScreen}
        options={{
          title: 'ተቀማጭ ገንዘብ መመለስ',
        }}
      />
      <Drawer.Screen
        name="የሂሳብ መዝገብ ታሪክ"
        component={LedgerBalanceScreen}
        options={{
          title: 'የሂሳብ መዝገብ ታሪክ',
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