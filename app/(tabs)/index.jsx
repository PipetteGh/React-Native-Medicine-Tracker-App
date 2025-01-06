import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { auth } from '../../config/FirebaseConfig'
import { signOut } from 'firebase/auth'
import { clearLocalStorage } from '../../service/Storage'
import Header from '../../components/Header'

export default function HomeScreen() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            // Clear all locally stored user details
            await clearLocalStorage();

            // Sign out the user
            await signOut(auth);

            // Redirect to login screen
            router.replace('/login');
        } catch (error) {
            Alert.alert("Error", "An error occurred while logging out. Please try again.");
            console.error(error);
        }
    };

    return (
        <View style={{
            padding: 25,
            backgroundColor: 'white',
            height: '100%'
        }} >
            
            <Button title="Log Out" onPress={handleSignOut} />

            {/* add header of the dashboard */}

            <Header />
        </View>
    );
}
