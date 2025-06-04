import {FiatList, Image, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import { PaperProvider, Text, Button, Divider } from "react-native-paper";
import { students } from "./StudentsDb";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-web";
import updateStudent from "./UpdateStudent";
export default function StudentList() {
    const navigation = useNavigation();
    const route = useRoute(); // Correctly define route here
    const [nstudent, setNstudent] = useState(students);
    const [reRender, setRerender] = useState(false);

    useEffect(() => {
        console.log("Route params:", route.params); // Log route params
        if (route.params?.newStudent) {
            const { newStudent } = route.params;
            setNstudent((prev) => [...prev, { ...newStudent }]);
        }
        if (route.params?.UpdateStudent) {
            const { UpdateStudent } = route.params;
            let index = 0;
            let count = 0;
            students.forEach((stu) => {
                if (stu.id == UpdateStudent.id) {
                    index = count;
                }
                count++;
            });
            students[index] = UpdateStudent;
            setNstudent(students);
            setRerender(!reRender);
        }
        console.log("Updated student list:", nstudent); // Log updated student list
    }, [route.params?.newStudent, route.params?.UpdateStudent]);

    return (
        <PaperProvider>
            <ScrollView>
                <View>
                    <View>
                        <Image source={require('../assets/uovlogo.png')} />
                    </View>
                    <View>
                        <FlatList
                            data={nstudent}
                            keyExtractor={item => item.id.toString()} // Ensure id is a string
                            extraData={reRender}
                            renderItem={({ item }) =>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Profile', { student: item });
                                    }}>
                                        <Image source={item.profile_pic} />
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                    <Button onPress={() => {
                                        navigation.navigate('UpdateStudent', { student: item });
                                    }}>Update</Button>
                                </View>
                            } />
                    </View>
                    <View>
                        <Button onPress={() =>
                            navigation.navigate('AddStudent')
                        }>+</Button>
                    </View>
                </View>
            </ScrollView>
        </PaperProvider>
    );
}
