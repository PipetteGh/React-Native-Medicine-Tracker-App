import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {
    const router = useRouter();

    useEffect(()=>{
        GetUserDetail();
    },[])
    // Get user info base on the data that is store locally on Soluotech's device
    const GetUserDetail = async()=>{
        const userInfo = await getLocalStorage('userDetail');
        if(!userInfo){
            router.replace('/login')
        }
    }


    // const [authenticated,setAuthenticated] = useState(null);
    // // check if user is sign in else signout or redirect to the login page
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/auth.user
    //         const uid = user.uid;
    //         console.log(uid);
    //         setAuthenticated(true);
    //         // ...
    //     } else {
    //         // User is signed out
    //         // ...
    //         setAuthenticated(false);
    //     }
    // });

    // // user is signout if no login detected
    // useEffect(()=>{
    //     if(authenticated==false){
    //         router.push('login'); 
    //     }
    // },[authenticated])
 
  return (
    <Tabs screenOptions={{headerShown:false}} >
        <Tabs.Screen name='index' 
            options={{
                tabBarLabel: "Home",
                tabBarIcon:({color,size}) => (
                    <FontAwesome name="home" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen name='AddNew' 
            options={{
                tabBarLabel: "Add New",
                tabBarIcon:({color,size}) => (
                    <FontAwesome name="plus-square" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen name='Profile' 
            options={{
                tabBarLabel: "Profile",
                tabBarIcon:({color,size}) => (
                    <FontAwesome name="user" size={28} color={color} />
                )
            }}
        />
    </Tabs>
  )
}