import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../service/Storage';

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
    <View>
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
          fontSize: 30,
          fontWeight: 'bold'
         }}
        >
          Hello {user?.displayName || 'Guest'} {/* Handle missing displayName */}
        </Text>
      </View>
    </View>
  );
}
