import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth } from '../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setLocalStorage } from '../../service/Storage';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to handle sign-in click
  const onSignInClick = () => {
    if (!email || !password) {
      Alert.alert('Please enter email & password');
      return;
    }

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }

    // Check password length
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true); // Show spinner
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // Locally store user details on the device
        await setLocalStorage('userDetail', JSON.stringify(user));
        setIsLoading(false); // Hide spinner
        router.replace('/(tabs)');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false); // Hide spinner

        if (errorCode === 'auth/invalid-credential') {
          console.log(errorCode);
          Alert.alert('Oops, invalid email or password, please try again');
        } else {
          Alert.alert('Error', errorMessage);
        }
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.headerText}>Let's Sign you in</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>Sign in</Text>

      {/* Login Input Fields */}
      <View style={{ padding: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 17, marginTop: 2 }}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={{ padding: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 17 }}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      {/* Login input fields end here */}

      {/* Clickable or button for Sign-in */}
      <TouchableOpacity style={styles.button} onPress={onSignInClick} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Sign in Now
          </Text>
        )}
      </TouchableOpacity>

      {/* Create New Account Button */}
      <TouchableOpacity style={styles.Createbutton} onPress={() => router.push('/login/signUp')}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: Colors.PRIMARY,
            fontWeight: 'bold',
          }}
        >
          Create New Account
        </Text>
      </TouchableOpacity>
      {/* Sign button ends here */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.PRIMARY,
  },
  subText: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center',
    color: Colors.DARK_GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 17,
    borderColor: Colors.PRIMARY,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 25,
  },
  Createbutton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
    marginTop: 25,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
