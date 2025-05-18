import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { speak } from '@/utils/text-to-speech';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CardScreen() {
    const [info, setInfo] = useState({
        name: '',
        dob: '',
        bloodType: '',
        allergies: '',
        conditions: '',
        medications: '',
        emergencyContact: '',
    });

    const text = 
        `Fill in your emergency health details below.
        This information may help health professionals provide faster and safer care during an emergency.
        In the first input field, enter your name.
        In the second input field, enter your date of birth.
        In the third input field, enter your blood type.
        In the fourth input field, enter your allergies.
        In the fifth input field, enter your medical conditions.
        In the sixth input field, enter your medications.
        In the last input field, enter your emergency contact.`

    const readAloud = () => { speak(text) };

    useEffect(() => {
        const loadInfo = async () => {
            const data = await AsyncStorage.getItem('emergencyInfo');
            if (data) {
                setInfo(JSON.parse(data));
            }
        };
        loadInfo();
    }, []);

    const onSave = async () => {
        try {
            await AsyncStorage.setItem('emergencyInfo', JSON.stringify(info));
            Alert.alert('Saved!', 'Emergency info saved.');
        } catch (e) {
            Alert.alert('Error saving info');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <ThemedText type="title">Emergency Info</ThemedText>

                        <TouchableOpacity onPress={readAloud}>
                                <MaterialIcons name="volume-up" color="#00B3B3" size={35}></MaterialIcons>
                            </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.field}>Name:</Text>
                                <TextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={200}
                                    value={info.name}
                                    onChangeText={text => setInfo(prev => ({ ...prev, name: text}))}
                                />       
                        </View>  

                        <View style={styles.fieldContainer}>
                            <Text style={styles.field}>Date of birth:</Text>
                                <TextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={200}
                                    value={info.dob}
                                    onChangeText={text => setInfo(prev => ({ ...prev, dob: text}))}
                                />    
                        </View>
                        
                        <View style={styles.fieldContainer}>
                            <Text style={styles.field}>Blood Type:</Text>
                                <TextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={200}
                                    value={info.bloodType}
                                    onChangeText={text => setInfo(prev => ({ ...prev, bloodType: text}))}
                                />   
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.field}>Allergies:</Text>
                                <TextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={200}
                                    value={info.allergies}
                                    onChangeText={text => setInfo(prev => ({ ...prev, allergies: text}))}
                                />   
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.field}>Conditions:</Text>
                            <TextInput 
                                style={styles.input} 
                                multiline
                                maxLength={200}
                                value={info.conditions}
                                onChangeText={text => setInfo(prev => ({ ...prev, conditions: text}))}
                            />   
                        </View>
                        
                        <View style={styles.fieldContainer}>
                            <Text style={styles.field}>Medications:</Text>
                            <TextInput 
                                style={styles.input} 
                                multiline
                                maxLength={200}
                                value={info.medications}
                                onChangeText={text => setInfo(prev => ({ ...prev, medications: text}))}
                            />   
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.field}>Emergency contact:</Text>
                            <TextInput 
                                style={styles.input} 
                                multiline
                                maxLength={200}
                                value={info.emergencyContact}
                                onChangeText={text => setInfo(prev => ({ ...prev, emergencyContact: text}))}
                            />   
                        </View>

                        <TouchableOpacity style={styles.button} onPress={onSave}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
)};



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',  
        alignItems: 'center',
    },
    card: {
        backgroundColor: "lightblue",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    fieldContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    field: {
        fontSize: RFValue(14),
    },
    input: {
        fontSize: RFValue(14),
        paddingHorizontal: 8,
        flex: 1,
        backgroundColor: "beige",
    },
    button: {
        backgroundColor: '#00B3B3',
        padding: 10,
        width: '30%',
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    buttonText: {
        fontSize: RFValue(14),
        textAlign: 'center',
    },
});
