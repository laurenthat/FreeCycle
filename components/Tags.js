import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {Chip, Text} from 'react-native-paper';
import {useState} from 'react';
import {MainContext} from '../contexts/MainContext';

const Tags = () => {
  const [furniture, setFurniture] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [clothing, setClothing] = useState(false);
  const [other, setOther] = useState(false);
  const {setAdvertTag} = React.useContext(MainContext);

  React.useEffect(() => {});
  return (
    <SafeAreaView
      style={{
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Text>Choose a category that describes the item:</Text>

      <Chip
        icon={furniture ? 'check-bold' : 'sofa'}
        mode="outlined"
        selected={furniture}
        selectedColor={furniture ? 'red' : 'black'}
        style={{width: 120, margin: 5}}
        onPress={() => {
          setFurniture(!furniture),
            console.log('Pressed furniture'),
            setAdvertTag('furniture');
        }}
      >
        Furniture
      </Chip>
      <Chip
        icon={electronics ? 'check-bold' : 'monitor-cellphone'}
        mode="outlined"
        selected={electronics}
        selectedColor={electronics ? 'red' : 'black'}
        style={{width: 120, margin: 5}}
        onPress={() => {
          setElectronics(!electronics), setAdvertTag('electronics');
        }}
      >
        Electronics
      </Chip>
      <Chip
        icon={clothing ? 'check-bold' : 'tshirt-crew-outline'}
        mode="outlined"
        selected={clothing}
        selectedColor={clothing ? 'red' : 'black'}
        style={{width: 120, margin: 5}}
        onPress={() => {
          setClothing(!clothing), setAdvertTag('clothing');
        }}
      >
        Clothing
      </Chip>
      <Chip
        icon={other ? 'check-bold' : 'magic-staff'}
        mode="outlined"
        selected={other}
        selectedColor={other ? 'red' : 'black'}
        style={{width: 120, margin: 5}}
        onPress={() => {
          setOther(!other), setAdvertTag('other');
        }}
      >
        Other
      </Chip>
    </SafeAreaView>
  );
};

export default Tags;
