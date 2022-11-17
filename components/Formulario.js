import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native'


const Formulario = ({coin, guardarCoin, cripto, guardarCripto, guardarConsultarAPI}) => {

    const [criptos, guardarCriptos] = useState([])

    useEffect(() => {
        const handleAPI = () => {
            const options = { method: 'GET' };

            fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD', options)
                .then(response => response.json())
                .then(response => guardarCriptos(response.Data))
                .catch(err => console.error(err));
        }
        handleAPI()
    }, [])

    const getCoin = coin => {
        guardarCoin(coin)
    }
    const getCripto = cripto => {
        guardarCripto(cripto)
    }

    const cotizarPrecio = () => {
        if(coin.trim() === '' || cripto.trim() === '') {
            getAlert();
            return
        }
        guardarConsultarAPI(true)
    }

    const getAlert = () => {
        Alert.alert(
            "Error...",
            "Todos los campos son obligatorios",
            [{text: "Ok"}]
        )
    }
     return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={coin}
                onValueChange={coin => getCoin(coin)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label='--Seleccionar--' value='' />
                <Picker.Item label='--Dolar de EEUU--' value='USD' />
                <Picker.Item label='--Peso Mexicano--' value='MXN' />
                <Picker.Item label='--Euro--' value='EUR' />
                <Picker.Item label='--Libra Esterlina--' value='GBP' />
            </Picker>
            <Text style={styles.label}>Criptomonedas</Text>
            <Picker
                selectedValue={cripto}
                onValueChange={cripto => getCripto(cripto)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label='--Seleccionar--' value='' />
                {criptos.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>
            <TouchableHighlight 
            style={styles.btnCotizar}
            onPress={() => {cotizarPrecio()}}
            >
                <Text style={styles.textCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: "Lato-Black",
        textTransform: "uppercase",
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: "#5E49E2",
        padding: 10,
        marginTop: 20
    },
    textCotizar: {
        color: "#FFF",
        fontSize: 18,
        fontFamily: "Lato-Black",
        textTransform: "uppercase",
        textAlign: "center"

    }
})

export default Formulario