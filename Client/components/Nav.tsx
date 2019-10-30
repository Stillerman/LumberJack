import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Navigation extends Component<{}, {}> {
    render () {
        return (
            <View style={styles.navbar}>
                <Text style={styles.centeredText}>LumberJack</Text>
                <Text style={styles.centeredText}>Beta v0.0.1</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        justifyContent: 'center',
        padding: 10,
        marginTop: 25, // to escape notification center
        backgroundColor: '#f0f0f0',
        marginBottom: 10
    },
    centeredText: {
        textAlign: 'center'
    }
})