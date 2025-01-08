import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import {TypeList, WhenToTake} from './../constant/Options'
import {Picker} from '@react-native-picker/picker';

export default function AddMedicationForm() {

  const [formData,setFormData] = useState();

  const onHandleInputChange = (field,value)=>{
    setFormData(prev=>({
      ...prev,
      [field]:value
    }));

    console.log(formData);
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
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        marginTop: 10,
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
    }
})