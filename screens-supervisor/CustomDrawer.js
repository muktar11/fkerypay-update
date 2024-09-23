// CustomDrawer.js

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#AD40AF' }}>
        <View style={{ padding: 20 }}>
          <Image
            source={require('../assets/adaptive-icon.png')} // Replace with your own profile image
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ color: '#fff', fontSize: 18, marginBottom: 5 }}>John Doe</Text>
          <Text style={{ color: '#fff', fontSize: 14 }}>john.doe@example.com</Text>
        </View>

        <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
