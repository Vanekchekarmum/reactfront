import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import NextButton from '../assets/components/NextButton';
import AddHeader from '../assets/components/AddHeader';
import AddText from '../assets/components/AddText';
import HapticEffect from '../assets/actions/HapticEffect';

const arr = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Бизнес и карьера',
    num: 4,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Семья',
    num: 5,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b9',
    title: 'Развлечения',
    num: 6,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f60',
    title: 'Технологии',
    num: 7,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29773',
    title: 'Спорт и здоровье',
    num: 8,
  },

  {
    id: '58694a0f-3da1-471f-bd96-145571e29774',
    title: 'Искусство',
    num: 9,
  },
];

const ChooseCategory = ({navigation}) => {
  const [liked, setLiked] = useState(false);
  const [categories, setCategories] = useState([  
]);
  const route = useRoute();

  const lol = (a) => {
    setLiked(a), 
    setCategories(a.num)
    console.log(categories);
    HapticEffect();
  };

  const next = () => {
    navigation.navigate('DateScreen', {
      i: {image_url: route.params.i.image_url},
      w: {place: route.params.w.place},
      long: {long: route.params.long.long},
      lati: {lati: route.params.lati.lati},
      text: {text: route.params.text.text},
      text1: {text1: route.params.text1.text1},
      categories: {categories: categories},
    });
    HapticEffect();
  };
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#bceaff'}}>
      <AddHeader />
      <View style={styles.box}>
        <View style={{position: 'absolute', height: 450}}>
          <AddText text={'Выбери категорию ☺️'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {arr.map(a => {
            return (
              <TouchableOpacity
                onPress={() =>lol(a)}
                key={a.id}
                style={[
                  {
                    backgroundColor: '#bceaff',
                    borderRadius: 50,
                    overflow: 'hidden',
                    padding: '4%',
                    margin: 5,
                    borderWidth: 3,
                  },
                  {borderColor: a=== liked ? '#ff844d' : '#097fb4'},
                ]}>
                <Text
                  style={[
                    {fontSize: 15, fontWeight: '700'},
                    {color: a === liked ? '#ff844d' : '#097fb4'},
                  ]}>
                  {a.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <NextButton onPress={next} />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default ChooseCategory;
