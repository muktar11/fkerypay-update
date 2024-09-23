import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, ToastAndroid, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINT } from '@env';
import { useTranslation } from 'react-i18next';

export default function SignupScreen() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigation = useNavigation();
    const { t, i18n } = useTranslation(); 

    const changeLanguage = async (lng) => {
        try {
          await i18n.changeLanguage(lng); // Change language in i18n
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



    const handleFormSubmit = async () => {
        try {
         const response = await fetch(`${API_ENDPOINT}/api/webcustomer-auth-register/`, {
     //       const response = await fetch(`/api/token/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, password, password2 }),
          });
          if (response.ok) {
            const data = await response.json();
            ToastAndroid.show("Registeration successful", ToastAndroid.SHORT);
            navigation.navigate('Login'); // Navigate to Home screen
          } else {
            const errorMessage = await response.text();
            console.error("Login failed:", errorMessage);
            ToastAndroid.show(errorMessage || "Registeratio failed. Please try again.", ToastAndroid.LONG);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          ToastAndroid.show(
            error.message || "An error occurred. Please try again.",
            ToastAndroid.LONG
          );
        }
      };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('./assets/images/background.png')} />

      {/* lights */}
         <View className="flex-row justify-around w-full absolute pt-6">
    <Animated.Image 
        entering={FadeInUp.delay(200).duration(1000).springify()} 
        source={require('./assets/images/fker3.jpeg')} 
        className="h-[200px] w-[200px] rounded-full" // Make it circular
    />
</View>

      {/* title and form */}
      <View  className="h-full w-full flex justify-around pt-48">
        
        {/* title */}
        <View className="flex items-center">
            <Animated.Text 
                entering={FadeInUp.duration(1000).springify()} 
                className="text-white font-bold tracking-wider text-5xl">
                   FikerPay
            </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-5 space-y-4">
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                     placeholder={t('phone')}
                    placeholderTextColor={'gray'}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(200).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder={t('password')}
                    placeholderTextColor={'gray'}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(400).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput
                    placeholder={t('confirm_password')}
                    placeholderTextColor={'gray'}
                    secureTextEntry
                    value={password2}
                    onChangeText={(text) => setPassword2(text)}
                />
            </Animated.View>

            <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                <TouchableOpacity onPress={handleFormSubmit} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                    <Text className="text-xl font-bold text-white text-center">{t('register')}</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View 
                entering={FadeInDown.delay(800).duration(1000).springify()} 
                className="flex-row justify-center">

                <Text>{t('have_an_account?')}</Text>
                <TouchableOpacity onPress={()=> navigation.push('Login')}>
                    <Text className="text-sky-600">{t('Login')}</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
      </View>
    </View>
  )
}