import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';
import { generateText } from '@/api/gemini';


export default function ConsultScreen() {
    const [form, setForm] = useState({
            symptoms: '',
            duration: '',
            severity: '',
            addInfo: '',
    });

    const [response, setResponse] = useState('');


    const callGeminiAPI = async () => {
        setForm({
            symptoms: '',
            duration: '',
            severity: '',
            addInfo: '',
        })
        const prompt = buildAIPrompt(form);
        console.log("Submitting prompt:", prompt);

        try {
            const text = await generateText(prompt);
            console.log("Got response:", text);
            setResponse(text);
        } catch (error) {
            console.error('Error:', error);
        };
    }
    
    function buildAIPrompt(form: Record<string, string>) {
        return `
        You are a medical assistant. Based on the patient's responses below, 
        generate a bulleted list of the top 3 possible causes of the patient's issue. 
        For each possible cause, list the required documentation to diagnose it, 
        whether each requirement is known, and give a probability that this condition
        is causing the issue.
        Of the possible causes, pick the one that is most likely to have 
        caused the issue. Come up with a treatment plan for the patient.
        At the end, remind the patient that your diagnosis may not be accurate and 
        it is best to consult a health professional.

        Patient's symptoms: ${form.symptoms}
        Duration: ${form.duration}
        Severity: ${form.severity}
        Additional information: ${form.addInfo}

        Provide the response in clear, empathetic language.
        `;
    }



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
                                
                            <Button title='Submit' onPress={callGeminiAPI}/>
                        </View>
                        
                        <View style={styles.response}>
                            {response && <ThemedText>{response}</ThemedText>}
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
    response: {
        fontSize: RFValue(12),
        paddingTop: 10,
    }
})