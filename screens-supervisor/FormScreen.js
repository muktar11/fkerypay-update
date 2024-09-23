import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

export default function Form() {
  const navigation = useNavigation();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
   const { t } = useTranslation();

  // Function to handle file attachment for the first button
  const handleAttachFile1 = async () => {
    // Implement file selection logic using 'react-native-document-picker' or another library
    // Set the selected file to the 'file1' state variable
  };

  // Function to handle file attachment for the second button
  const handleAttachFile2 = async () => {
    // Implement file selection logic using 'react-native-document-picker' or another library
    // Set the selected file to the 'file2' state variable
  };

   // Function to handle taking a picture for the first attachment
   const handleTakePicture1 = async () => {
    // Implement picture-taking logic using 'react-native-camera' or another library
    // Set the captured picture to the 'file1' state variable
  };

  // Function to handle taking a picture for the second attachment
  const handleTakePicture2 = async () => {
    // Implement picture-taking logic using 'react-native-camera' or another library
    // Set the captured picture to the 'file2' state variable
  };


  // Function to handle form submission
  const handleSubmit = () => {
    // Implement the logic for submitting the form, including handling the attached files (file1 and file2)
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

            
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="Customer Name"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
            </View>
            
            
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

            
            <View style={{ flex: 1, marginRight: 10 }}>
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="0.35ml Qty"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="0.35ml Price"
                  placeholderTextColor={'gray'}
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
                  placeholder="0.6ml Qty"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="0.6ml Price"
                  placeholderTextColor={'gray'}
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
                  placeholder="1L Qty"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1000).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="1L Price"
                  placeholderTextColor={'gray'}
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
                  placeholder="2L Qty"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="2L Price"
                  placeholderTextColor={'gray'}
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
                  placeholder="Total Qty"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="Total Price"
                  placeholderTextColor={'gray'}
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
                  placeholder="Transportation Fee"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View
                entering={FadeInDown.delay(1400).duration(1000).springify()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
              >
                <TextInput
                  placeholder="Market"
                  placeholderTextColor={'gray'}
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
                  placeholder="Grand Total"
                  placeholderTextColor={'gray'}
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
                />
              </Animated.View>
            </View>
         
            </View>


        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            padding: 15,
            borderRadius: 10,
            flex: 1,
            marginRight: 10,
            alignItems: 'center',
          }}
          onPress={handleAttachFile1}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Bank Deposit
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            padding: 15,
            borderRadius: 10,
            flex: 1,
            marginRight: 10,
            alignItems: 'center',
          }}
          onPress={handleAttachFile1}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Bank Deposit 2
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            padding: 15,
            borderRadius: 10,
            flex: 1,
            alignItems: 'center',
          }}
          onPress={handleAttachFile2}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Bank Deposit 3
          </Text>
        </TouchableOpacity>

        
      </View>

      
        <Animated.View
          entering={FadeInDown.delay(1600).duration(1000).springify()}
          style={{ marginTop: 20 }}
        >
          <TouchableOpacity style={{ backgroundColor: '#00f', padding: 15, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
