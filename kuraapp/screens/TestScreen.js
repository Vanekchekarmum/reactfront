import React,{useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Pressable, Dimensions, TextInput,Keyboard,TouchableWithoutFeedback, TouchableOpacity, RefreshControl} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { storeToken } from 'kura/services/AsyncStorageService';
import { getToken } from 'kura/services/AsyncStorageService'

import { useAddPostMutation } from 'kura/services/appPostApi';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('window');
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const TestScreen = ({navigation}) =>{
    const [body, setBody] = React.useState("");
    const post = 1
    const [usertoken, setUserToken] = React.useState()
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
  
    const getMovies = async () => {
       try {
        const response = await fetch('http://127.0.0.1:8000/api/user/comments/?format=json');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getMovies();
    }, []);
  

    const [addPost] = useAddPostMutation()
    useEffect(() => {
      (async () => {
        const token = await getToken()
        if (token) {
          const { access, refresh } = JSON.parse(token)
          setUserToken({
            "access": access,
            "refresh": refresh
          })
        }
      })();
    }, [])
    const handleFormSubmit = async () => {
      const formdata = {body, post}
      const { access } = usertoken
      const res = await addPost({ formdata, access })
      console.log(formdata)

    }
    

    const renderItem = ({ item }) => (
      <Item title={item.body} />
    );
  
    return(
        < >
        <View style={{flex:1, backgroundColor:'#bceaff',alignItems:'center'}}>
         <View style={styles.header}>
        </View>
        <View  style={{flex:1, backgroundColor:'#bceaff', alignItems:'center'}} 

        >
        <TextInput
        style={styles.input}
        onChangeText={setBody}
        value={body}
        maxLength={50}
        placeholder="Напиши заголовок 🥰"
      />

<FlatList
data={data}
renderItem={renderItem}
keyExtractor={item => item.id}
refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
/>

      {body ? (
            <TouchableOpacity style={styles.arrow} onPress={handleFormSubmit}>
        <FontAwesome name="arrow-right" color={'white'} size={40} />

        </TouchableOpacity>
      ) : null
}
      </View>

        </View>
        </>

    )
}
export default TestScreen
const styles = StyleSheet.create({
    header:{
      backgroundColor: '#097fb4',
      width:width,
      height:width*0.23,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    arrow:{
      position:'absolute',
      bottom:120,
      backgroundColor:'#ff844d',
      width:66,
      height:66,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:40,
    },
    input:{
        backgroundColor:"white",
        marginTop:30,
        width:width * 0.9,
        height: 68,
        fontSize: 16,
        borderRadius:4,
        textAlign:'center'
    },
    input2:{
        backgroundColor:"white",
        marginTop:20,
        width:width * 0.9,
        height: height*0.4,
        fontSize: 16,
        borderRadius:4,
        textAlign:'center'


    },
    item: {
      padding: 20,
      marginVertical: 5,
      marginHorizontal: 16,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'red'
    },
    title: {
      fontSize: 32,
      fontWeight:'500',
      color:'white'

    },
    
  })
  