import 'intl-pluralrules';
import { View, Text, Image,  TextInput,  KeyboardAvoidingView,  Keyboard,
  TouchableWithoutFeedback, ScrollView,
  Platform, TouchableOpacity,  ToastAndroid } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from './SignupScreen';
import { API_ENDPOINT } from '@env';
import { Ionicons } from '@expo/vector-icons'; 
import {  Button } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [web_id, setWeb_id] = useState('');
    const [roles, setRoles] = useState("");
    const [salesroute, setSalesRoute] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("english");
    const { t, i18n } = useTranslation();
    useEffect(() => {
    // Fetch language from AsyncStorage and set it as default
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage); // Also set i18n language
        }
      } catch (error) {
        console.error('Error fetching stored language:', error);
      }
    };
    fetchLanguage();
  }, []);

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng); // Change language in i18n
      setSelectedLanguage(lng); // Update local state
      await AsyncStorage.setItem('language', lng); // Persist language selection in AsyncStorage
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };


    useEffect(() => {
      checkExistingTokens();
    }, []);
  

const checkExistingTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    
    // Fetch the user data (e.g., from API or local storage)
    const userData = await AsyncStorage.getItem('userData'); // Assuming you store user data in AsyncStorage
    const data = JSON.parse(userData); // Parse userData to get 'data' object

    if (accessToken && refreshToken && data) {
      // Ensure `data` exists and has a role property
      if (data.role) {
        if (data.role === 'Supervisor') {
          navigation.navigate('WelcomeSupervisor');
        } else if (data.role === 'Agents') {
          navigation.navigate('WelcomeAgent');
        } else {
          // If role is not valid, delete tokens and redirect to LoginScreen
          AsyncStorage.removeItem('accessToken');
          AsyncStorage.removeItem('refreshToken');
          navigation.navigate('Login');
        }
      } else {
        console.error('Data or role not available');
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('refreshToken');
        navigation.navigate('Login');
      }
    }

  } catch (error) {
    console.error('Error checking existing tokens:', error);
  }
};


    const retrieveUserData = async () => {
      try {
        // Retrieve data from AsyncStorage
        const storedFirstName = await AsyncStorage.getItem("first_name");
        const storedLastName = await AsyncStorage.getItem("last_name");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedRole = await AsyncStorage.getItem("role");
        const storedPhone = await AsyncStorage.getItem("phone");
        const storedweb_id = await AsyncStorage.getItem("web_id")
        const storedSalesRoute = await AsyncStorage.getItem("salesRoute")       // Update state with retrieved data
        setFirstName(storedFirstName || "");
        setLastName(storedLastName || "");
        setEmail(storedEmail || "");
        setRoles(storedRole || "");
        setPhone(storedPhone || "");   
        setWeb_id(storedweb_id || "");
        setSalesRoute(storedSalesRoute || "");   
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };



 const handleFormSubmit = async () => {
  try {
    console.log("Attempting to make a network request...");
    const response = await fetch(`${API_ENDPOINT}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
    console.log("Network request completed.");
    
    if (response.ok) {
      const data = await response.json();

      // Ensure no undefined/null values are saved
      if (data.access) {
        await AsyncStorage.setItem("accessToken", data.access);
      }
      if (data.refresh) {
        await AsyncStorage.setItem("refreshToken", data.refresh);
      }
      if (data.role) {
        await AsyncStorage.setItem("role", data.role);
      }
      if (data.first_name) {
        await AsyncStorage.setItem("first_name", data.first_name);
      }
      if (data.last_name) {
        await AsyncStorage.setItem("last_name", data.last_name);
      }
      if (data.phone) {
        await AsyncStorage.setItem("phone", data.phone);
      }
      if (data.id) {
        await AsyncStorage.setItem("id", String(data.id));
      }
      if (data.web_id) {
        await AsyncStorage.setItem("web_id", String(data.web_id));
      }
      if (data.salesroute) {
        await AsyncStorage.setItem("salesroute", String(data.salesroute));
      }
      
      const storedId = await AsyncStorage.getItem("id");
      const id = parseInt(storedId, 10);
      const role = await AsyncStorage.getItem("role");
      
      console.log("Login successful");

      // Pass state-setting functions
      await retrieveUserData(setFirstName, setLastName, setEmail, setRole, setPhone);

      // Navigate based on the user role
      if (role === "Agent") {
        navigation.navigate("WelcomeAgent"); // Navigate to Agent screen
      } else if (role === "Supervisior") {
        navigation.navigate("WelcomeSupervisor"); // Navigate to Supervisor screen
      } else {
        ToastAndroid.show("Invalid role", ToastAndroid.SHORT);
          // If role is not valid, delete tokens and redirect to LoginScreen
            // Assuming you're using AsyncStorage for tokens
            AsyncStorage.removeItem('accessToken');
            AsyncStorage.removeItem('id');
            AsyncStorage.removeItem('web_id');
            AsyncStorage.removeItem('role');
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.removeItem('salesroute')
            navigation.navigate('Login');
      }
      
      ToastAndroid.show("Login successful", ToastAndroid.SHORT);
    } else {
      const errorMessage = await response.text();
      console.error("Login failed:", errorMessage);
      ToastAndroid.show(errorMessage || "Login failed. Please try again.", ToastAndroid.LONG);
      
      // Clear stored data on login failure
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("first_name");
      await AsyncStorage.removeItem("last_name");
      await AsyncStorage.removeItem("id");
      await AsyncStorage.removeItem("web_id");
      await AsyncStorage.removeItem("phone");
      await AsyncStorage.removeItem("salesroute");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    ToastAndroid.show(error.message || "An error occurred. Please try again.", ToastAndroid.LONG);
  }
};



return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this for iOS to move the screen higher
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('./assets/images/background.png')} />

            {/* Language Dropdown */}
            <View className="w-full p-5">
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="bg-black/5 p-2 rounded-2xl w-full mb-4"
              >
<Picker
          selectedValue={selectedLanguage} // Set default from state
          onValueChange={(itemValue) => {
            changeLanguage(itemValue);
          }}
          style={{ color: 'black', backgroundColor: 'transparent', borderRadius: 5 }} // Adjust the dropdown styling
        >
 
  <Picker.Item label="English" value="en" />
  <Picker.Item label="Amharic" value="am" />
</Picker>
              </Animated.View>
            </View> 

           {/* lights (logo and text) */}
<View className="w-full flex-row justify-center items-center pt-8">
  <Animated.Image 
    entering={FadeInUp.delay(200).duration(1000).springify()} 
    source={require('./assets/images/fker3.jpeg')} 
    className="h-[120px] w-[120px] rounded-full mr-4" // Added margin-right for spacing
  />
  <Animated.Text 
    entering={FadeInUp.duration(1000).springify()} 
    className="text-white font-bold tracking-wider text-4xl">
    FikerPay
  </Animated.Text>
</View>


            {/* title and form */}
            <View className="h-full w-full flex justify-start pt-40">
              {/* title */}
             
              {/* form */}
              <View className="flex items-center mx-5 space-y-6">
                <Animated.View 
                  entering={FadeInDown.duration(1000).springify()} 
                  className="bg-black/5 p-5 rounded-2xl w-full">
                  <TextInput
                    placeholder={t('phone')}
                    placeholderTextColor={'gray'}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    style={{ color: 'black' }}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()} 
                    blurOnSubmit={false}
                  />
                </Animated.View>
                
                <Animated.View 
                  entering={FadeInDown.delay(200).duration(1000).springify()} 
                  className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   <TextInput
                        ref={(input) => { this.passwordInput = input; }}
                        placeholder={t('password')}
                        placeholderTextColor={'gray'}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={{ flex: 1, color: 'black' }}
                        returnKeyType="done"
                      />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                </Animated.View>

                <Animated.View 
                  className="w-full" 
                  entering={FadeInDown.delay(400).duration(1000).springify()}>
                  <TouchableOpacity onPress={handleFormSubmit} className="w-full bg-sky-400 p-4 rounded-2xl mb-5">
                    <Text className="text-xl font-bold text-white text-center"> {t('Login')}</Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                  entering={FadeInDown.delay(600).duration(1000).springify()} 
                  className="flex-row justify-center mt-4">
                  <Text> {t('dont_have_an_account?')} </Text>
                  <TouchableOpacity onPress={() => navigation.push('Signup')}>
                    <Text className="text-sky-600"> {t('register')}</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
);
}
