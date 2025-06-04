import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Divider, PaperProvider, Text, TextInput } from "react-native-paper";
import {students} from './StudentsDb';

export default function Home(){
   
   const navigation = useNavigation(); 
   const [username, setUsername] = useState(''); // Initialize with empty string
   const [password, setPassword] = useState(''); // Initialize with empty string
   const [msg, setMsg] = useState(''); // Initialize with empty string

   const login = () =>{
       if (!students) {
           setMsg("No student data available");
           return;
       }
       const result = students.filter((student) => { 
           return student.username === username && student.password === password;
       });
       if(result.length === 1){
           setMsg("Login Successful");
           navigation.navigate('profiletap', {student: result[0]});
       } else {
           setMsg("Invalid Username or Password");
       }
   }

   return(
       <PaperProvider>
           <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
               <ScrollView contentContainerStyle={styles.scrollView}>
                   <View style={styles.container}>
                       <View style={styles.imagepad}>
                           <Image source={require('../assets/HM/login.png')} style={styles.image}/>
                       </View>
                      
                       <View>
                           <TextInput label="UserEmail" value={username} onChangeText={setUsername}></TextInput>
                       </View>
                       <View>
                           <TextInput label="Password" value={password} onChangeText={setPassword}></TextInput>
                       </View>
                       <View>
                        
                       </View>
                       <View>
                           <Button style={styles.button1} onPress={login}>Customer Login</Button>
                           <Button style={styles.button1} onPress={login}>Customer Signin</Button>
                           <Button style={styles.button2} onPress={login}>EMP Login</Button>
                           <Button style={styles.button2} onPress={login}>EMP Signin</Button>
                       </View>
                      
                   </View>
               </ScrollView>
           </KeyboardAvoidingView>
       </PaperProvider>
   );
}

const styles = StyleSheet.create({
   container: {
       flexDirection: 'column',
       backgroundColor: '#fff',
       flexGrow: 1,
       justifyContent: 'space-between',
       padding: 10
   },
   imagepad: {
       padding: 8,
       alignItems: 'center',
       flex: 2,
       marginBottom: 10
   },
   image: {
       width: '80%',
       height: '100%',
   },
   header: {
       flex: 3,
       width: "100%",
       alignItems: 'center',
       padding: 5,
       marginBottom: 2
   },
   body: {
       flex: 5,
       width: "100%"
   },
   footer: {
       flex: 2,
       width: "100%",
       height: "100",
       alignItems: 'center',
       backgroundColor: '#0047b3'
   },
   button1: {
         backgroundColor: '#33cc33'

   },
   button1: {
         backgroundColor: '#33cc33'

   },
   button2: {
         backgroundColor: '#0066cc'

   },
   
   input: {
       padding: 8,
       marginBottom: 7
   },
   scrollView: {
       flexGrow: 1, // Ensures the ScrollView behaves correctly
   },
   keyboardAvoidingView: {
       flex: 1, // Ensures proper layout with keyboard adjustments
   }
});
