import {Component} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    marginBottom: 20,
    color: '#656565',
    textAlign: 'center',
  },
  conteneur: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  fluxDroite: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  requeteEntree: {
    height: 36,

    padding: 4,

    marginRight: 5,

    flexGrow: 1,

    fontSize: 18,

    borderWidth: 1,

    borderColor: '#48AAEC',

    borderRadius: 8,

    color: '#48AAEC',
  },
  image: {
    width: 220,
    height: 140,
  },
});
const urlPourRequete = valeur => {
  return 'https://restcountries.com/v3.1/name/' + valeur;
};
export default class PageDeRecherche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requeteDeRecherche: 'morocco',
      estEnChargement: false,
      message: '',
    };
  }
  _auChangementDeLaRecherche = event => {
    console.log('_auChangementDeLaRecherche');

    this.setState({requeteDeRecherche: event.nativeEvent.text});

    // console.log(
    //   'Current: ' +
    //     this.state.requeteDeRecherche +
    //     ', Next: ' +
    //     event.nativeEvent.text,
    // );
  };
  _executerRequete = requete => {
    console.log(requete);

    this.setState({estEnChargement: true});
    fetch(requete)
      .then(reponse => reponse.json())

      .then(json => this._gererLaReponse(json))

      .catch(error =>
        this.setState({
          estEnChargement: false,

          message: 'Oups! Une erreur' + error,
        }),
      );
  };
  _gererLaReponse = reponse => {
    this.props.navigation.navigate('Resultats', {listings: reponse});
    this.setState({
      estEnChargement: false,
      message: 'Nombre de pays trouvés :' + reponse.length,
    });
  };
  _auDemarrageDeLaRecherche = () => {
    const requete = urlPourRequete(this.state.requeteDeRecherche);

    this._executerRequete(requete);
  };

  render() {
    const indicateurDeChargement = this.state.estEnChargement ? (
      <ActivityIndicator size="large" color="ooooff" />
    ) : null;
    return (
      <View style={styles.conteneur}>
        <Text style={styles.description}>Rechercher des pays à explorer</Text>
        <Text style={styles.description}>Rechercher par nom</Text>
        <View style={styles.fluxDroite}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.requeteEntree}
            value={this.state.requeteDeRecherche}
            onChange={this._auChangementDeLaRecherche}
            placeholder="Rechercher par nom de pays"
          />
          <Button
            onPress={this._auDemarrageDeLaRecherche}
            color="#48AAEC"
            title="Démarrer"></Button>
        </View>
        {indicateurDeChargement}
        <Text style={styles.description}>{this.state.message}</Text>
        <Image
          source={require('./Ressources/pays.png')}
          style={styles.image}></Image>
      </View>
    );
  }
}
