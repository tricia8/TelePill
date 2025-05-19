import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';
import { generateText } from '@/api/gemini';
import { speak } from '@/utils/text-to-speech';
import { MaterialIcons } from '@expo/vector-icons';
import removeMarkdown from 'remove-markdown';


export default function ConsultScreen() {
    const [form, setForm] = useState({
            symptoms: '',
            duration: '',
            severity: '',
            addInfo: '',
    });

    const [response, setResponse] = useState('');

    const text = 
        `Answer the following questions and click submit to get suggestions and advice.
        Question 1, what symptoms are you experiencing?
        Question 2, how long have you been experiencing these symptoms?
        Question 3, how severe are your symptoms?
        Question 4, is there any other information about your medical history or lifestyle that you think is important?
        Click submit after you are done.`

    const readAloud = () => { speak(text) };

    const readResponse = () => { speak(removeMarkdown(response)) };

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
            setResponse(removeMarkdown(text));
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
                        <View style={styles.header}>
                            <ThemedText type="title">Ask the AI!</ThemedText>
                            <TouchableOpacity onPress={readAloud}>
                                <MaterialIcons name="volume-up" color="#00B3B3" size={35}></MaterialIcons>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.form}>
                            <ThemedText style={styles.question}>What symptoms are you experiencing?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.symptoms}
                                    onChangeText={text => setForm(prev => ({ ...prev, symptoms: text}))}
                                />
                            
                            <ThemedText style={styles.question}>How long have you been experiencing these symptoms?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.duration}
                                    onChangeText={text => setForm(prev => ({ ...prev, duration: text}))}
                                />                                

                            <ThemedText style={styles.question}>How severe are your symptoms?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.severity}
                                    onChangeText={text => setForm(prev => ({ ...prev, severity: text}))}
                                />

                            <ThemedText style={styles.question}>Is there any other information about your medical history or lifestyle that you think is important?</ThemedText>
                                <ThemedTextInput 
                                    style={styles.input} 
                                    multiline
                                    maxLength={300}
                                    value={form.addInfo}
                                    onChangeText={text => setForm(prev => ({ ...prev, addInfo: text}))}
                                />
                                
                            <TouchableOpacity onPress={callGeminiAPI} style={styles.button}>
                                <Text style={styles.buttonText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                        
                        
                        {response && 
                            <View style={styles.response}>
                                <View style={styles.header}>
                                    <ThemedText type="subtitle">AI's response:</ThemedText>
                                    <TouchableOpacity onPress={readResponse}>
                                        <MaterialIcons name="volume-up" color="#00B3B3" size={35}></MaterialIcons>
                                    </TouchableOpacity>
                                </View>
                                <ThemedText>{response}</ThemedText>
                            </View>
                        }
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
    header: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',  
        alignItems: 'center',
    },
    form: {
        flex: 1,
        gap: 10,
    },
    question: {
        fontSize: RFValue(14),
    },
    input: {
        fontSize: RFValue(14),
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: '#00B3B3',
        padding: 10,
    },
    buttonText: {
        fontSize: RFValue(14),
        textAlign: 'center',
    },
    response: {
        fontSize: RFValue(14),
        paddingTop: 20,
    },
})