import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Navigation extends Component<{name: string}, {}> {
    render () {
        return (
            <View style={styles.navbar} >
                <View>
                    <Text style={styles.centeredText}>LumberJack</Text>
                    <Text style={styles.centeredText}>Beta v0.0.3</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{textAlign: 'right'}}>Welcome, {this.props.name}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        marginTop: 25, // to escape notification center
        backgroundColor: '#f0f0f0',
        marginBottom: 10
    },
    centeredText: {
        textAlign: 'center'
    }
})