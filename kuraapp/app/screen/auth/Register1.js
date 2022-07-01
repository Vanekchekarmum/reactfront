import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
  } from 'react-native';
  import React, {useState} from 'react';
  import {styles, toastConfig} from '../../../style';
  import Toast from 'react-native-toast-message';
  import {useNavigation} from '@react-navigation/native';
  import AddHeader from '../../../assets/components/AddHeader';
  import Input from '../../components/Input';
  import NextButton from '../../../assets/components/NextButton';
  import HapticEffect from '../../../assets/actions/HapticEffect';
  import CheckBox from '@react-native-community/checkbox';
  import {useRoute} from '@react-navigation/native';

  const Register1 = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [tc, setTc] = useState(null);
    const route = useRoute();

    const lol = ()=>{
        navigation.navigate('Register2', {

            email: {email: email},
            name: {name: name},
            tc: {tc: tc},

          });
          HapticEffect()        
    }
  
  
    return (
      <View style={{flex: 1, backgroundColor: '#bceaff', alignItems: 'center'}}>
        <AddHeader />
        <Toast config={toastConfig} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#bceaff',
            alignItems: 'center',
          }}>
          <View style={{alignSelf: 'center', marginBottom: 10}}></View>
          <View style={[styles.inputWithLabel, {marginBottom: 10}]}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Введите почту"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Придумайте логин"
              secureTextEntry={false}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' , marginTop:20,}}>
            <CheckBox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />
            <Text style={styles.labelText}>I agree to term and condition.</Text>
          </View>
          <NextButton style={{top:300}} onPress={lol}/>
          
        </ScrollView>
      </View>
    );
  };
  
  export default Register1;
  