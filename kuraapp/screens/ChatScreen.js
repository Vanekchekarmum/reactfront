import React, { useEffect, useState } from 'react';
import Video from 'react-native-fast-video'
import { VibrancyView } from "@react-native-community/blur";
import ImagePicker from 'react-native-image-crop-picker';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator

} from 'react-native';
import { storeToken } from 'kura/services/AsyncStorageService';
import { getToken } from 'kura/services/AsyncStorageService'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAddPostMutation } from 'kura/services/appPostApi';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
  clockTick:true
};

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const camera = () =>{
  ImagePicker.openCamera({
    mediaType: 'any',
  }).then(lol => {
    console.log(lol.path);
  });
}

export default function ChatScreen({navigation,route}) {
  const { item } = route.params;

  // const [liked, setLiked] = useState(DATA.id);
  const [refreshing, setRefreshing] = React.useState(false);
  const [blur, setBlur] = useState(false);
  const [usertoken, setUserToken] = React.useState()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState([])


  const getMovies = async () => {
     try {
      const response = await fetch(`http://192.168.254.45:8000/api/user/comments/?post=${item.id}`);
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


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const star = () =>{
    setBlur((isBlur) => !isBlur),
    ReactNativeHapticFeedback.trigger("impactHeavy", options)
  }
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

  const gallery = () => {
    ImagePicker.openPicker({
    mediaType: "mixed", 
  
  }).then(image => {
    console.log(image.path);
    const lol =() => {
      PicturePath = image.path
      URLpath = "http://192.168.254.45:8000/api/user/comments/";
      const { access } = usertoken
    
      var formData = new FormData();
      formData.append("file", {uri: PicturePath, name: 'sdsd.jpg', type: ['image/jpg', 'video/mp4']});
      formData.append("post", item.id);
    
      fetch( URLpath, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${access}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
       })
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
      })
    }
    lol();

  });
}
const onRefr = () => {
  //Clear old data of the list
  setData([]);
  //Call the Service to get the latest data
  getMovies();
};
 const renderItem =({item}) =>{
  return(
<View>
{item.file.toString().endsWith("mp4")  ?
    <TouchableOpacity >
    <Video
      style={styles.full1}
      controls={false}
      audioOnly={true}
      playInBackground={false}
      volume={1.0}
      resizeMode={'cover'}
      ignoreSilentSwitch={"ignore"}
      repeat={true}
      source={{uri: "http://192.168.254.45:8000/media/sdsd.mp4"}}
      ref={async ref => {
        player = ref;
      }}
    />
    </TouchableOpacity>
    :
              <Image style={styles.full}
          source={{uri: item.file}}

          />
    }
</View>

  )
}
if (loading) {
  return (
<View style={styles.container}>
  <ActivityIndicator size="large" loading={loading} />
</View>
  );
}
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
 <FlatList
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefr}
          />}
        // renderItem={({ item }) => (
        //   <View style={{marginBottom:10}}>
        //  {item.file.toString().endsWith("mp4")  ?
        //   <TouchableOpacity onPress={() => { setLiked(item)  }}>
        //   <Video
        //     key={item.id}
        //     style={styles.full}
        //     controls={false}
        //     audioOnly={true}
        //     playInBackground={false}
        //     volume={item === liked ? 1.0 : 0}
        //     resizeMode={'stretch'}
        //     ignoreSilentSwitch={"ignore"}
        //     repeat={true}
        //     source={{uri: item.image_url}}
        //     ref={async ref => {
        //       player = ref;
        //     }}
        //   />
        //   </TouchableOpacity>
        //   : */}
        //   <Image style={styles.full}
        //   source={{uri: item.file}}

        //   />
        
        //     <Text style={styles.name}> {item.name}</Text>
        //   </View>
        // )}
      />
              <TouchableOpacity style={styles.plus} onPress={star}>
        <FontAwesome name="plus" color={'white'} size={40} />

        </TouchableOpacity>
        {blur ?
        <>
        <VibrancyView
          style={styles.absolute}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.add}>
                    <View style={styles.btnParentSection}>

               <TouchableOpacity  style={styles.btnSection} onPress={camera}  >
                 <Text style={styles.btnText}>Камера</Text>
               </TouchableOpacity> 

               <TouchableOpacity  style={styles.btnSection} onPress={gallery} >
                 <Text style={styles.btnText}>Галерея</Text>
               </TouchableOpacity>
             </View>
          </View>
          <TouchableOpacity style={styles.plus} onPress={star}>
        <FontAwesome name="close" color={'white'} size={40} />

        </TouchableOpacity>
        <View style={{height:150}}>

        </View>
        </>
        : null 
        }

  </View>

  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#bceaff',
    justifyContent:'center',
    alignItems:'center'
  },
  header:{
    backgroundColor: '#097fb4',
    width:width,
    height:width*0.23,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  searchIcons:{
    marginTop:22,
    marginLeft:25
  },
  catIcons:{
    marginTop:22,
    marginRight:25
  },
  lenta:{
    alignItems: 'center',
    backgroundColor:'#bceaff',
    marginTop:20
  },
  box:{
    justifyContent:'center',
    alignItems:'center', 
    backgroundColor:'white',
    borderRadius:25,
    borderWidth:3,
    borderColor:'#097fb4',
    marginBottom:20,

  },
  img:{
    width:width*0.85,
    height:width *0.85,
    borderRadius:25,

  },
  full:{
    width: width - 20,
    height: height * 0.6 - 20,
    backgroundColor: '#eee',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 5,
    resizeMode:'cover'
  },
  name:{
    fontSize:20,
    marginLeft:15,
    fontWeight:'500'
  },
  plus:{
    position:'absolute',
    bottom:40,
    backgroundColor:'#ff844d',
    width:66,
    height:66,
    right:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:40,
    
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  add:{
  position:'absolute',

  },
  btnParentSection: {
    marginTop:height *0.4
  },
  btnSection: {
    width: 175,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom:10,
    borderColor:'#097fb4',
    borderWidth:4,
    backgroundColor:'#bceaff'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight:'bold'
  },
  full1:{
    width: width - 20,
    height: height * 0.6 - 20,
    backgroundColor: 'green',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 5,
    resizeMode:'cover'
  }
});
