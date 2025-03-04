import React, { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../assets/style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackNavigator } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackNavigator, 'Maintenance'>;

function Manintenance(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Icon
          name="server-security"
          color={globalStyles.text.color}
          size={40}
        />
        <Text style={[globalStyles.text, styles.maintenanceText]}>
          Server sedang dalam maintenance
        </Text>
        <Text style={[globalStyles.text]}>Silahkan cek kembali nanti.</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={[globalStyles.text, styles.message]}>
          {props.route.params.message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  maintenanceText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Manintenance;
