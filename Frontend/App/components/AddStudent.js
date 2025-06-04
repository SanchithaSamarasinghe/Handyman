import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text, Button, RadioButton, TextInput, Divider, PaperProvider } from 'react-native-paper';

export default function AddStudent() {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const navigation = useNavigation();
    const newStudent = {
        id: id,
        name: name,
        gender: gender,
        age:age,
        course_name: course,
        profile_pic: require('../assets/profilepic/18.jpg'),
    };
    const addStudent = () => {
        navigation.popTo('Studentlist', { newStudent});
    };
    return (
        <PaperProvider>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
            <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.imagepad}>
                    <Image source={require('../assets/uovlogo.png')} style={styles.headerimage} />
                    <Divider />
                </View>
                <View style={styles.body}>
                    <Text style={styles.title}>Add A New Student</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.input}>
                        <TextInput label="ID" mode='outlined' value={id} onChangeText={setId} />
                    </View>
                    <View style={styles.input}>
                        <TextInput label="Name" mode='outlined' value={name} onChangeText={setName} />
                    </View>
                    <View style={styles.input}>
                        <TextInput label="Age" mode='outlined' value={age} onChangeText={setAge} keyboardType="number-pad" />
                    </View>
                    <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
                        <View style={styles.radioGroup}>
                            <View style={styles.radioItem}>
                                <RadioButton value="Male" />
                                <Text style={styles.radioLabel}>Male</Text>
                            </View>
                            <View style={styles.radioItem}>
                                <RadioButton value="Female" />
                                <Text style={styles.radioLabel}>Female</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                    <View style={styles.input}>
                        <TextInput label="Course" mode='outlined' value={course} onChangeText={setCourse} />
                    </View>
                    {/* Apply Button */}
                    <Button mode="contained" onPress={addStudent} style={styles.applyButton}>
                        ADD
                    </Button>
                </View>
                <View style={styles.footer}>
                    <Text style={{ color: "#ffff", margin: 'auto' }} variant="labelLarge">UoV © 2024</Text>
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
        flex: 1,
        marginBottom: 15,
        marginTop: 5
    },
    headerimage: {
        width: '80%',
        height: 73,
    },
    header: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        padding: 5,
        marginBottom: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 3,
        textAlign: 'center',
    },
    body: {
        flex: 8,
        width: "100%"
    },
    footer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        backgroundColor: '#4b0150'
    },
    scrollView: {
        flexGrow: 1, // Ensures the ScrollView behaves correctly
    },
    divider: {
        marginVertical: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    radioLabel: {
        fontSize: 16,
    },
    ageInputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    ageInput: {
        flex: 1,
        marginHorizontal: 8,
    },
    applyButton: {
        marginTop: 16,
    },
    radioGroup: {
        flexDirection: 'row', // Align all radio buttons horizontally
        justifyContent: 'left',
        alignItems: 'left',
        marginBottom: 8,
        marginTop:8
      },
      radioItem: {
        flexDirection: 'row', // Ensure radio button and label are side by side
        alignItems: 'center',
        marginHorizontal: 8, // Add spacing between items
      },
      radioLabel: {
        fontSize: 16,
        marginLeft: 4,
      },
      selectedText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
      },
      scrollView: {
        flexGrow: 1, // Ensures the ScrollView behaves correctly
    },
    keyboardAvoidingView: {
        flex: 1, // Ensures proper layout with keyboard adjustments
    }
});