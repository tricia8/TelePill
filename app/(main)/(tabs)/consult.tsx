import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';

export default function ConsultScreen() {
    const [form, setForm] = useState({
            symptoms: '',
            duration: '',
            severity: '',
            addInfo: '',
        });

    

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                    <ThemedView style={styles.container}>
                        <View style={styles.form}>
                            <ThemedText>What symptoms are you experiencing?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.symptoms}
                                    onChangeText={text => setForm(prev => ({ ...prev, symptoms: text}))}
                                />
                            
                            <ThemedText>How long have you been experiencing these symptoms?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.duration}
                                    onChangeText={text => setForm(prev => ({ ...prev, duration: text}))}
                                />                                

                            <ThemedText>How severe are your symptoms?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.severity}
                                    onChangeText={text => setForm(prev => ({ ...prev, severity: text}))}
                                />

                            <ThemedText>Is there any other information about your health or lifestyle that you think is important?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.addInfo}
                                    onChangeText={text => setForm(prev => ({ ...prev, addInfo: text}))}
                                />
                                
                            <Button title='Submit' onPress={callOpenAIAPI}/>
                        </View>
                    </ThemedView>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )}






const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1,
    },
    form: {
        flex: 1,
        gap: 10,
    },
    input: {
        fontSize: RFValue(12),
        paddingHorizontal: 8,
    },

})