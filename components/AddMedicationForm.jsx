import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import {TypeList, WhenToTake} from './../constant/Options'
import {Picker} from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, formatDateForText, formatTime } from '../service/ConvertDateTime';
import { db } from '../config/FirebaseConfig';
import { getLocalStorage } from '../service/Storage';
import { setDoc, doc } from "firebase/firestore";



export default function AddMedicationForm() {

  const [formData,setFormData] = useState();
  const [showStartDate,setShowStartDate] = useState(false);
  const [showEndDate,setShowEndDate] = useState(false);
  const [showTimePicker,setShowTimePicker] = useState(false);
  const onHandleInputChange = (field,value)=>{
    setFormData(prev=>({
      ...prev,
      [field]:value 
    }));

    console.log(formData);
  }

  const SaveMedication =async ()=>{
    const docId = Date.now().toString();
 
    const user=await getLocalStorage('userDetail');

    if(!(formData?.name || formData?.type || formData?.dose || formData?.startDate || formData?.endDate || formData?.reminder)){
      Alert.alert("All fields are required");
      return;
    }

    try{
      await setDoc(doc(db,'medication',docId),{
        ...formData,
        userEmail:user?.email,
        docId:docId
      })
    } catch(e){
        console.log(e)
    }
  }

  return (
    <View style={{
        padding: 25
    }}>
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons name="medkit-outline" style={styles.icon} size={24} color="black" />
        <TextInput style={styles.textInput} placeholder='Medicine Name' 
        
        onChangeText={(value)=>onHandleInputChange('name',value)}
        /> 
      </View>

      {/* Type list */}
      <FlatList
        data={TypeList}
        style={{
          marginTop: 5
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
          <TouchableOpacity style={[styles.inputGroup,{marginRight: 10},
            {backgroundColor: item.name==formData?.type?.name?Colors.PRIMARY:'white'}
          ]}
            onPress={()=>onHandleInputChange('type',item)}
          >
            <Text style={[styles.typeText,
              {color: item.name==formData?.type?.name?'white':'black'}
            ]}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Does input */}
      <View style={styles.inputGroup}>
        <Ionicons name="eyedrop-outline" style={styles.icon} size={24} color="black" />
        <TextInput style={styles.textInput} placeholder='Dose Eg. 2, 5ml' 
        
        onChangeText={(value)=>onHandleInputChange('dose',value)}
        /> 
      </View>


      {/* when to take Dropdown */}
      <View style={styles.inputGroup}> 
        <Ionicons name="time-outline" style={styles.icon} size={24} color="black" />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue,itemIndex)=>
            onHandleInputChange('when',itemValue)
          }
          style={{
            width: '90%'
          }}
        >
          {WhenToTake.map((item,index)=>(
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>


      {/* start and end date */}
      <View style={styles.dateInputGroup}>
          <TouchableOpacity style={[styles.inputGroup,{flex:1}]}
            onPress={()=>setShowStartDate(true)}
          > 
            <Ionicons name="calendar-outline" style={styles.icon} size={24} color="black" />
            <Text style={styles.text}>{formatDateForText(formData?.startDate)??'Start Date'}</Text>
           
          </TouchableOpacity>
          {showStartDate&& <RNDateTimePicker 
              minimumDate={new Date()}
              onChange={(event)=>{
                onHandleInputChange('startDate', FormatDate(event.nativeEvent.timestamp));
                setShowStartDate(false)
              }}
              value={new Date(formData?.startDate)??new Date()}
            />}
          <TouchableOpacity style={[styles.inputGroup,{flex:1}]}
            onPress={()=>setShowEndDate(true)}
          > 
            <Ionicons name="calendar-outline" style={styles.icon} size={24} color="black" />
            <Text style={styles.text}>{formatDateForText(formData?.endDate)??'End Date'}</Text>
          </TouchableOpacity>
          {showEndDate&& <RNDateTimePicker 
              minimumDate={new Date()}
              onChange={(event)=>{
                onHandleInputChange('endDate', FormatDate(event.nativeEvent.timestamp));
                setShowEndDate(false)
              }}
              value={new Date(formData?.endDate)??new Date()}
            />}
      </View>


      {/* Set Reminder */}
      <View style={styles.dateInputGroup}>
          <TouchableOpacity style={[styles.inputGroup,{flex:1}]}
            onPress={()=>setShowTimePicker(true)}
          > 
            <Ionicons name="timer-outline" style={styles.icon} size={24} color="black" />
            <Text style={styles.text}>{formData?.reminder??'Select Reminder Time'}</Text>
           
          </TouchableOpacity>
      </View>
      {showTimePicker && <RNDateTimePicker 
          mode='time'
          onChange={(event)=>{
            onHandleInputChange('reminder', formatTime(event.nativeEvent.timestamp));
            setShowTimePicker(false)
          }}
          value={new Date(formData?.reminder)??new Date()}
      />}

      <TouchableOpacity style={styles.button}
        onPress={SaveMedication}
      >
        <Text style={styles.buttontext}>Add New Medicine Now</Text>
      </TouchableOpacity>

    </View>
    
  )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputGroup:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        marginTop: 7,
        backgroundColor: 'white'
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16
    },
    icon: {
        color: Colors.PRIMARY,
        borderRightWidth: 1,
        paddingRight: 12,
        borderColor: Colors.GRAY
    },
    typeText: {
        fontSize: 16
    },
    text: {
        fontSize: 16,
        padding: 5
    },
    dateInputGroup: {
      flexDirection: 'row',
      gap: 10
    },
    button: {
      padding: 15,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 15,
      width: '100%',
      marginTop: 25
    },
    buttontext:{
      fontSize: 17,
      color: 'white',
      textAlign: 'center'
    }
})