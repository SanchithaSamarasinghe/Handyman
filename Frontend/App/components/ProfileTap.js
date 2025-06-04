import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Health from './Health';
import StudentList from './StudentList';

export default function ProfileTap({ route }) {
    const Tab = createBottomTabNavigator();
    const { student } = route.params;
    console.log(student);
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                let iconName;

                if (route.name === 'Profile') {
                    iconName = focused ? 'account' : 'account-outline';
                } else if (route.name === 'Health') {
                    iconName = focused ? 'hospital-box' : 'hospital-box-outline';
                } else if (route.name === 'StudentList'){
                    iconName = focused ? 'account-multiple' : 'account-multiple-outline';
                }

                return <Icon name={iconName} size={24} color="#4b0150" />;
            },
        })}>
            <Tab.Screen name="Profile" component={Profile} initialParams={{ student: student }} />
            <Tab.Screen name="Health" initialParams={{ sid: student.id, sname: student.name }} component={Health} />
            <Tab.Screen name="StudentList" component={StudentList} initialParams={{ student: student }} />

        </Tab.Navigator>
    );
}
