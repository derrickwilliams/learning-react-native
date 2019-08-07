import React, { useState } from 'react';
import { PickerIOS } from 'react-native';
import { Container, Button as NBButton, Text, Grid, Col, Row } from 'native-base';
import tts from 'react-native-tts';

const Button = ({ txt, style = {}, onPress, ...props }) => {
    const buttonStyle = { ...style };

    return (
        <NBButton style={{ width: '75%', justifyContent: 'center' }} onPress={onPress} {...props}>
            <Text>{txt}</Text>
        </NBButton>
    );
};

const combosState = {
    1: 'one two slip',
    2: 'two three',
    3: 'three seven',
    4: 'four five',
    5: 'five six',
    6: 'six six slip',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten'
};

tts.addEventListener('tts-start', (event) => ({}));
tts.addEventListener('tts-finish', (event) => ({}));
tts.addEventListener('tts-cancel', (event) => ({}));

const App = () => {
    const [currentCombo, setCurrentCombo] = useState(0);
    const [currentRunInterval, setCurrentRunInterval] = useState(undefined);
    const [currentComboText, setCurrentComboText] = useState('--');

    const play = () => {
        const shuffledCombos = shuffle(Object.keys(combosState));
        console.log('shuffledCombos', shuffledCombos);
        const playInterval = setInterval(() => {
            let next = null;

            setCurrentCombo((v) => {
                next = (v >= shuffledCombos.length - 1 ? 0 : v) + 1;
                tts.speak(combosState[shuffledCombos[next]] || 'missing');
                return next;
            });

            setCurrentComboText((shuffledCombos[next] || next).toString());
        }, 2000);

        setCurrentRunInterval(playInterval);
    };

    const stop = () => {
        if (currentRunInterval) {
            clearInterval(currentRunInterval);
            setCurrentRunInterval(undefined);
            setCurrentCombo(0);
            setCurrentComboText('--');
        }
    };

    return (
        <Container>
            <Grid>
                <Row size={2} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 112 }}>{currentComboText}</Text>
                </Row>

                <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <PickerIOS
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) =>
                            console.log('pickerIPickerIOS value', itemValue, itemIndex)
                        }
                    >
                        <PickerIOS.Item label="2 seconds" value="2000" />
                        <PickerIOS.Item label="3 seconds" value="3000" />
                    </PickerIOS>
                </Row>

                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Col style={{ alignItems: 'center' }}>
                        <Button txt="Start" disabled={Boolean(currentRunInterval)} onPress={play} />
                    </Col>
                    <Col style={{ alignItems: 'center' }}>
                        <Button
                            txt="Stop"
                            danger
                            disabled={!Boolean(currentRunInterval)}
                            onPress={stop}
                        />
                    </Col>
                </Row>
            </Grid>
        </Container>
    );
};

var shuffle = function(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

export default App;
