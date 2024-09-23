import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    useWindowDimensions,
    FlatList,
  } from "react-native";
  import { Alert } from 'react-native';
  import React, { useState, useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { COLORS, FONTS, SIZES, images } from "./constants";
  import { StatusBar } from "expo-status-bar";
  import { MaterialIcons } from "@expo/vector-icons";
  import { SceneMap, TabBar, TabView } from "react-native-tab-view";
  import { photos } from "./constants";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { API_ENDPOINT } from '@env';
  import * as Location from 'expo-location';
import { useTranslation } from 'react-i18next';
  // ... (the rest of your code)
  
  const Profile = () => {
    const layout = useWindowDimensions();
     const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roles, setRoles] = useState("");
  
    const [email, setEmail] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [location, setLocation] = useState('');
  



    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let userLocation = await Location.getCurrentPositionAsync({});
        setUserLocation(userLocation.coords); // Update with coordinates only
  
        // Fetch location name from coordinates using reverse geocoding
        let { latitude, longitude } = userLocation.coords; // Destructure latitude and longitude
        let geocode = await Location.reverseGeocodeAsync({latitude,longitude,});
        // Extract and set the location name
        let locationString = `${geocode[0].country}, ${geocode[0].city}, ${geocode[0].street} `;
        setLocationName(locationString);
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Error getting location');
      }
    };
  
    useEffect(() => {
      getCurrentLocation();
    }, []);
  
  

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);
  
    const retrieveUserData = async () => {
      try {
        // Retrieve data from AsyncStorage
        const storedFirstName = await AsyncStorage.getItem("first_name");
        const storedLastName = await AsyncStorage.getItem("last_name");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedRole = await AsyncStorage.getItem("role");
     
  
        // Update state with retrieved data
        setFirstName(storedFirstName || "");
        setLastName(storedLastName || "");
        setEmail(storedEmail || "");
        setRoles(storedRole || "");
        
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };


    useEffect(() => {
      retrieveUserData();
    }, []);
    
    const [routes] = useState([
      { key: "first", title: "Photos" },
      { key: "second", title: "Likes" },
    ]);
  
    const renderTabBar = (props) => (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: COLORS.primary,
        }}
        style={{
          backgroundColor: COLORS.white,
          height: 44,
        }}
        renderLabel={({ focused, route }) => (
          <Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
            {route.title}
          </Text>
        )}
      />
    );
  


  const updateProfile = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return; // Return early if passwords don't match
      }
      const response = await fetch(
        `${API_ENDPOINT}/api/update/staff/profile/${id}/`,
        {
          method: "PUT", // Assuming you use the correct HTTP method for updating the profile
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            confirmPassword: confirmPassword,
            // Include other data to update like firstName, lastName, email, etc. if needed
          }),
        }
      );

      if (response.ok) {
        // Profile updated successfully
        // Perform actions or handle success here
      
        Alert.alert('Profile updated successfully');
      } else {
        // Handle the error scenario if the update fails
        
        Alert.alert('Failed to update profile');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert('Profile updated successfully');
    }
  };

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <StatusBar backgroundColor={COLORS.gray} />
        <ScrollView>
        <View style={{ width: "100%" }}>
          <Image
            source={images.cover}
            resizeMode="cover"
            style={{
              height: 200,
              width: "100%",
            }}
          />
        </View>
  
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={images.profile}
            resizeMode="contain"
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderColor: COLORS.primary,
              borderWidth: 2,
              marginTop: -90,
            }}
          />
  
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.primary,
              marginVertical: 8,
            }}
          >
            {roles}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.body4,
            }}
          >
            {firstName} {lastName}
          </Text>

          <Text
            style={{
              color: COLORS.black,
              ...FONTS.body4,
            }}
          >
            {email} 
          </Text>
  
          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="location-on" size={24} color="black" />
            <Text
              style={{
                ...FONTS.body4,
                marginLeft: 4,
              }}
            >
 {userLocation && (
        <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center' }}>
          <Text style={{ ...FONTS.body4, marginLeft: 4 }}>
            {locationName ? locationName : 'Location Name Unavailable'}
          </Text>
        </View>
      )}

            </Text>
          </View>
  
         
        </View> 

         {/* Password Input */}
         <View style={{ marginVertical: 3, paddingHorizontal: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: COLORS.gray,
                borderRadius: 10,
                paddingLeft: 10,
                height: 50, // Increase the height
                width: "100%",
              }}
              placeholder="Enter Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
  
          {/* Confirm Password Input */}
          <View style={{ marginVertical: 5, paddingHorizontal: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: COLORS.gray,
                borderRadius: 10,
                paddingLeft: 10,
                height: 50, // Increase the height
                width: "100%",
              }}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
  
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={updateProfile}
              style={{
                width: 124,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                marginHorizontal: SIZES.padding * 2,
              }}
            >
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.white,
                }}
              >
                Update Password
              </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Profile;
  