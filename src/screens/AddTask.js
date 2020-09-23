import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity, Platform
} from 'react-native';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';
const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {
    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask);
        this.setState({ ...initialState })
    }

    getDateTimePicker = () => {
        let datePicker = <DateTimePicker
            value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />

        const dateString = moment(this.state.date).format('dddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={style.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        } else {

        }

        return datePicker;
    }

    render() {
        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='fade'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={style.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={style.container}>
                    <Text style={style.header}>Nova tarefa</Text>
                    <TextInput style={style.input}
                        placeholder="Informe a descrição..."
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })} />
                    {this.getDateTimePicker()}
                    <View style={style.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={style.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={style.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={style.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: 'white'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 18,
        marginLeft: 15
    }
})