import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const [user, setUser] = useState(null); // Initialize with null

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    try {
      const userInfo = await getLocalStorage('userDetail');
      setUser(userInfo); // Correct state update
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <View style={{
      marginTop: 20
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
       
      }} >
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10
        }}>
          <Image
            source={require('./../assets/images/smiley.png')}
            style={{
              width: 45,
              height: 45,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Hi, {user?.displayName || 'Guest'}
          </Text>
        </View>
        <Ionicons name="settings-outline" size={34} color="black" />
      </View>
    </View>
  );
}
