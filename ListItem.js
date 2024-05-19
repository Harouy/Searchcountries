import {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }
  _itemAppuye = () => {
    this.props.onPressItem(this.props.index);
  };
  render() {
    return (
      <TouchableHighlight onPress={this._itemAppuye} underlayColor="#eedddd">
        <View>
          <View style={styles.conteneurLigne}>
            <View style={styles.conteneurTexte}>
              <Text style={styles.nomOfficiel}>
                {this.state.item.name.official}
              </Text>
              <Text style={styles.autre}>{this.state.item.region}</Text>
              <Text style={styles.autre}>{this.state.item.subregion}</Text>
              <Text style={styles.autre}>{this.state.item.capital}</Text>
              <Text style={styles.autre}>{this.state.item.population}</Text>
            </View>
          </View>
          <View style={styles.separateur} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  conteneurTexte: {
    flex: 1,
  },

  separateur: {
    height: 1,

    backgroundColor: '#eedded',
  },

  nomOfficiel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#58BEEC',
  },

  autre: {
    fontSize: 20,
    color: '#656565',
  },

  conteneurLigne: {
    flexDirection: 'row',

    padding: 10,
  },
});
