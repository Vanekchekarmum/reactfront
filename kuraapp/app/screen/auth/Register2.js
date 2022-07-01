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
  import {useRoute} from '@react-navigation/native';

  
  const Register2 = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const route = useRoute();

    const lol = ()=>{
        navigation.navigate('Register3', {

            email: {email: route.params.email.email},
            name: {name: route.params.name.name},
            tc: {tc: route.params.tc.tc},
            password:{password:password},
            password2:{password2:password2}

          });
          HapticEffect()        
    }
    const clearTextInput = () => {
      setEmail('');
      setName('');

    };
  
  
  
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
              value={password}
              onChangeText={setPassword}
              placeholder="Придумайте пароль"
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Input
              value={password2}
              onChangeText={setPassword2}
              placeholder="Повторите пароль"
              secureTextEntry={false}
            />
          </View>

          <NextButton style={{top:300}} onPress={lol}/>
          
        </ScrollView>
      </View>
    );
  };
  
  export default Register2;
  