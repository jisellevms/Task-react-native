import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import 'moment/locale/pt-br'

export default props => {
    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {};

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')
    return (
        <View style={style.container}>
            <View style={style.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text style={[style.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={style.date}>{formattedDate}</Text>
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={style.done}>
                <Icon name="check" size={20} color="#FFF" />
            </View>
        );
    } else {
        return (
            <View style={style.pending}>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.colors.secondary,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subtext,
        fontSize: 12
    }
})