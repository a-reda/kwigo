import React, {Component} from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, TextInput, View, Button, DatePickerAndroid} from 'react-native';

import colors from "../styling/colors";

class SearchComponent extends React.Component {

  state = {
    departure: '',
    arrival: '',
    date: new Date()
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  handleSubmit = () => {
    if (this.state.departure == '' || this.state.arrival == '') {
      Alert.alert("Please fill origin and destination")
    } else {
      this.props.onPressSearch(this.state)
    }

  }

  addZero(n) {
    return ((n<10) ? "0" : "") + n.toString();
  }

  getDepartureDate() {
    const d = this.state.date;
    return `${this.addZero(d.getDate())}/${this.addZero(d.getMonth()+1)}/${d.getFullYear()}`
  }

  async datePickerModal () {
    const {action,year,month,day}  = await DatePickerAndroid.open({date: this.state.date, minDate: (new Date())});
    if (action != DatePickerAndroid.dismissedAction) {
      this.setState({date: new Date(year,month,day)})
    }
  }



  //  onSubmitEditing={this.props.onPressSearch}
  render() {
    return (
      <View style={styles.container}>
        <TextInput
            placeholder="Origin"
            style={styles.textinputo}
            onSubmitEditing={() => this.refs.destination.focus()}
            onChangeText={val => this.onChangeText('departure', val)}
        />
        <TextInput
            placeholder="Destination"
            style={styles.textinputd}
            ref="destination"
            onChangeText={val => this.onChangeText('arrival', val)}
        />
        <TouchableOpacity onPress={this.datePickerModal.bind(this)} style={styles.dateContainer}>
          <Text style={styles.dateText}>{this.getDepartureDate()}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
                title="Go!"
                onPress={this.handleSubmit}
                color={colors.blue}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     width: "80%",
     justifyContent: "space-around"
   },
  textinputo: {
    fontSize: 25,
    borderBottomWidth: 3,
    borderBottomColor: colors.orange,
    marginBottom: 20,
    color: colors.blue
  },
  textinputd: {
    fontSize: 25,
    borderBottomColor: colors.orange,
    borderBottomWidth: 3,
    color: colors.blue
  },
  dateText: {
    fontSize: 25,
    borderBottomColor: colors.orange,
    borderBottomWidth: 3,
    color: colors.blue,
    paddingBottom: 10
  },
  dateContainer: {
    paddingTop: 30,
  },
  buttonContainer: {
    paddingTop: 20
  }
});

export default SearchComponent;
