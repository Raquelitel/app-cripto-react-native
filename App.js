import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
import Cotizacion from './components/Cotizacion';
import Formulario from './components/Formulario';
import Header from './components/Header';

const App = () => {

  const [coin, guardarCoin] = useState("")
  const [cripto, guardarCripto] = useState("")
  const [consultarAPI, guardarConsultarAPI] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false)

  useEffect(() => {
    const cotizarCripto = () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto},ETH&tsyms=${coin}`

        const options = { method: 'GET' };

        fetch(url, options)
          .then(response => response.json())
          .then(response => guardarResultado(response.DISPLAY[cripto][coin]))
          .catch(err => console.error(err));

        guardarConsultarAPI(false)

      }
    }

    cotizarCripto()


  }, [consultarAPI])

  return (
    <>
      <ScrollView>
        <Header />

        <Image
          style={styles.image}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.content}>
          <Formulario
            coin={coin}
            guardarCoin={guardarCoin}
            cripto={cripto}
            guardarCripto={guardarCripto}
            guardarConsultarAPI={guardarConsultarAPI}
          />

        </View>
        <Cotizacion
          resultado={resultado} />

      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%"
  },
  content: {
    marginHorizontal: "2.5%"
  }
})

export default App;
