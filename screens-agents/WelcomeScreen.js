import { useState, useEffect } from 'react';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { API_ENDPOINT } from '@env';

const WelcomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

const sendLocationToBackend = async (location) => {
  try {
    const id = await AsyncStorage.getItem('id');
    if (!id) {
      throw new Error('User ID not found');
    }

    // You can also include the access token if your backend requires authentication
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${API_ENDPOINT}/api/location/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`, // Uncomment if using token authentication
      },
      body: JSON.stringify({
        id: id, // Send user ID
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send location');
    }

    console.log('Location sent successfully');
  } catch (error) {
    console.error('Error sending location:', error);
  }
};

  // Function to start watching the location
  const startLocationTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // send every 5 seconds
        distanceInterval: 10, // send when moved by 10 meters
      },
      (loc) => {
        setLocation(loc);
        sendLocationToBackend(loc);
      }
    );
  };
  // Start tracking the location when the component mounts
  useEffect(() => {
    startLocationTracking();
  }, []);


  const handleLogout = async () => {
  try {
    console.log("Attempting to log out...");
    
    // Clear stored data
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("first_name");
    await AsyncStorage.removeItem("last_name");
    await AsyncStorage.removeItem("id");

    console.log("Logout successful");
    ToastAndroid.show("Logout successful", ToastAndroid.SHORT);
    
    // Navigate back to the Login screen
    navigation.navigate('Login');
    
  } catch (error) {
    console.error("An error occurred while logging out:", error);
    ToastAndroid.show(
      error.message || "An error occurred. Please try again.",
      ToastAndroid.LONG
    );
  }
};

  const navigation = useNavigation();

  return (
    <View className="bg-white h-full w-full">
      <View className="h-full w-full flex justify-around pt-5 pb-5">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-black font-bold tracking-wider text-5xl"
          >
            Fiker Guide
          </Animated.Text>
        </View>

        {/* Navigation buttons */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('SalesOrderAgent')}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Sales 
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('LedgerAgent')}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Ledger Balance
              </Text>
            </TouchableOpacity>
          </Animated.View>

         

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
              Profile
              </Text> 
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>are you sure you want to exit? </Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text className="text-sky-600">Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;


