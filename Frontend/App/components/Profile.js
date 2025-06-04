import {Image,ScrollView,StyleSheet,View} from "react-native";
import { Button, Card, Divider, PaperProvider, Text} from "react-native-paper";
import UpdateStudent from "./UpdateStudent";
export default function Profile({ route }){
    const { student } = route.params || {}; // Correctly access the student object
    if (!student) {
        return <Text>No student data available</Text>; // Handle case where student is undefined
    }
    
    return(
        <PaperProvider>
            <ScrollView>
                <View>
                    <Image source={require('../assets/uovlogo.png')} />
                    <Divider/>
                </View>
                <View>
                    <Card>
                        <View>
                            <Image source={student.profile_pic || require('../assets/profilepic/2.jpg')} /> {/* Ensure this is defined */}
                        </View>
                        <View>
                            <Text>
                                {student.name}
                            </Text>
                            <Text>
                                Age: {student.age} | Gender: {student.gender}
                            </Text>
                            <Divider/>
                        </View>
                        <View>
                            <Text>
                                Contact Information
                            </Text>
                            <Text>
                                Email: {student.email}
                            </Text>
                            <Text>
                                Phone: {student.phone}
                            </Text>
                            <Text>
                                Address: {student.address}
                            </Text>
                            <Divider />
                        </View>
                        <View>
                            <Text>
                                Biological Information
                            </Text>
                            <Text>
                                Blood group: {student.blood_group}
                            </Text>
                            <Text>
                                Gender: {student.gender}
                            </Text>
                            <Text>
                                Address: {student.address}
                            </Text>
                            <Divider />
                        </View>
                        <View>
                            <Button onPress={()=>navigation.navigate('StudentList')}>BACK</Button>
                            <Button onPress={()=> navigation.navigate('UpdateStudent')}>EDIT</Button>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </PaperProvider>
    );
}
