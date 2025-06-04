import {View,StyleSheet,ScrollView,Image,KeyboardAvoidingView,Platform} from "react-native";
import { PaperProvider,Text,Button,RadioButton,TextInput,Divider } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { students } from "./StudentsDb";

export default function updateStudent({routes}){
    const navigation = useNavigation();
    const [id,setId]=useState(students.id);
    const [name,setName]=useState(students.name);
    const [age, setAge] = useState(students.age);
    const [email, setEmail] = useState(students.email);
    const [gender,setGender] = useState(students.gender);
    const updateStudent = {
        id:id,
        name:name,
        age:age,
        email:email,
        gender:gender,
        profile_pic:students.profile_pic,
    };
    const upStudent = ()=>{
        navigation.popTo('Profile',{student: UpdateStudent});
    };
    return(
        <PaperProvider>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View>
                        <View>
                            <Image source={require('../assets/uovlogo.png')}/>
                          <Divider/>
                        </View>
                        <View>
                            <Text>Update Student</Text>
                            <Divider/>
                            <TextInput label= "ID" value={Id} onChangeText={setId} disabled />
                        </View>
                        <View>
                            <TextInput lable= "Name" value={name} onChange={setName}/>
                        </View>
                        <View>
                            <TextInput lable= "Age" value={age} onChange={setAge}/>
                        </View>
                        <View>
                            <TextInput lable= "Email" value={email} onChange={setEmail}/>
                        </View>
                        <View>
                        <View>
                            <RadioButton value="Female"/>
                            <Text>Female</Text>
                        </View>
                        <View>
                            <RadioButton value="Male"/>
                            <Text>Male</Text>
                        </View>
                        </View>
                        <View>
                    <Button onPress={upStudent}></Button>
                        </View>
                        <View>
                            <Text>UOV 2024</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </PaperProvider>
    )

    
}