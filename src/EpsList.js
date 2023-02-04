/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
import { Component } from "react";
import { View, ActivityIndicator, Text, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native';
import styles from './assets/style';


class EpsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: this.props.route.params.data.episodeList,
        }
    }

    render() {
        return (
            <View style={{flexShrink:1}}>
                <View>
                    <Text style={[{ fontSize: 25 }, styles.text]}>{this.props.route.params.data.title}{' '}
                        <Text style={[styles.text, { backgroundColor: '#159cc5' }]}>{this.props.route.params.data.releaseYear}</Text>{'\n'}
                        <Text style={[styles.text, { fontSize: 15, backgroundColor: this.props.route.params.data.status == 'Ongoing' ? '#ac0000' : '#22b422' }]}>{this.props.route.params.data.status}</Text>
                    </Text>
                </View>

                <Text style={[{ fontSize: 20 }, styles.text]}>Sinopsis: </Text>
                <ScrollView nestedScrollEnabled style={{ maxHeight: 250, borderWidth: 1, borderColor: '#1f5f44', flexShrink:1 }}>
                    <Text style={styles.text}>{this.props.route.params.data.synopsys}</Text>
                </ScrollView>

                <Text style={[{ fontSize: 20, marginTop: 16 }, styles.text]}>Pilih Episode: </Text>
                <TextInput placeholder="Cari episode di sini" keyboardType="numeric" placeholderTextColor={'#616161'} style={[styles.text, { flexShrink:0.4, height: 35, borderWidth: 1, borderColor: '#2e2ebb', marginHorizontal: 2, paddingVertical: 1 }]} onChangeText={(text) => {
                    if (text === '') {
                        this.setState({
                            result: this.props.route.params.data.episodeList
                        })
                    } else {
                        this.setState({
                            result: [JSON.parse(JSON.stringify(this.props.route.params.data.episodeList)).reverse().find(x => {
                                const index = x.episode.indexOf('episode');
                                const slice = index > 0 ? x.episode.slice(index) : x.episode;
                                return slice.includes(text)
                            })]
                        })
                    }
                }} />
                <View style={{ maxHeight: 200, marginTop: 10, borderWidth: 1, borderColor: '#40af6a',flexShrink:1 }}>
                    {this.state.result[0] !== undefined ?
                        <FlatList
                            nestedScrollEnabled
                            data={this.state.result}
                            keyExtractor={(item) => item.episode}
                            initialNumToRender={10}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ paddingBottom: 12 }} onPress={() => {
                                        this.props.navigation.dispatch(StackActions.push('FromUrl', {
                                            link: item.link,
                                        }));
                                    }}>
                                        <Text style={{ color: 'lightblue' }}>{item.episode}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        /> : <Text style={styles.text}>Tidak ada episode</Text>}
                </View>
                <Text style={[{ fontSize: 20, marginTop: 10 }, styles.text]}>Genre: </Text>
                <View style={{ flexDirection:'row', flexWrap:'wrap', flexShrink:0.1 }}>
                    {this.props.route.params.data.genre.map(data => {
                        return (
                            <Text key={data} style={[{ fontSize: 15, marginTop: 10, backgroundColor: '#004680', marginHorizontal: 3 }, styles.text]}>{data}</Text>
                        )
                    })}
                </View>
            </View>
        )
    }

}

export default EpsList;