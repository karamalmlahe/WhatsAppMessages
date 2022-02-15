import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View,I18nManager, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import * as Localization from 'expo-localization';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
const loadFonts = () => {
  return Font.loadAsync({
    'Cairo-Black': require('./assets/fonts/Cairo-Black.ttf'),
    'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
    'Cairo-ExtraBold': require('./assets/fonts/Cairo-ExtraBold.ttf'),
    'Cairo-ExtraLight': require('./assets/fonts/Cairo-ExtraLight.ttf'),
    'Cairo-Light': require('./assets/fonts/Cairo-Light.ttf'),
    'Cairo-Medium': require('./assets/fonts/Cairo-Medium.ttf'),
    'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
    'Cairo-SemiBold': require('./assets/fonts/Cairo-SemiBold.ttf')
  });
}



export default function App() {
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [Title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [AlertMessage, setAlertMessage] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [btnText, setBtnText] = useState('');
  const phoneInput = useRef(null);
  const [value, setValue] = useState("");//input only
  const [formattedValue, setFormattedValue] = useState("");//code+input


  const getIpLookup = async () => {
    setLoading(true)
    const response = await fetch('https://ipinfo.io/json', {
      method: 'GET',
    });
    const res = await response.json();
    setCountry(res.country)
    setLoading(false)
  }
  useEffect(() => {
    getIpLookup();
    if ((Localization.locale).slice(0, 2) == 'ar') {
      setTitle('رسالة واتس اب 📩')
      setText('تطبيق بسيط لإرسال رسالة إلى أي شخص دون إضافتهم إلى جهة الاتصال')
      setPlaceholder('رقم الهاتف')
      setAlertMessage('هذا الرقم غير صالح')
      setBtnText('ارسل رسالة')
    }
    else if ((Localization.locale).slice(0, 2) == 'he') {
      setTitle('הודעת וואטסאפ 📩')
      setText('אפליקציה פשוטה לשלוח הודעה לכל אחד מבלי להוסיף אותו לאנשי קשר')
      setPlaceholder('מספר טלפון')
      setAlertMessage('המספר הזה אינו חוקי')
      setBtnText('שלח הודעה')
    }
    else {
      setTitle('Whatsapp Message 📩')
      setText('Simple app to send a message to anyone without adding them to contact')
      setPlaceholder('Phone Number')
      setAlertMessage('This number is invalid')
      setBtnText('Send Message')
    }
    setLanguage((Localization.locale).slice(0, 2))
  }, [])
  if (!isFontLoading) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsFontLoading(true)}
        onError={console.log()} />
    )
  }


  const GoToWhatsApp = () => {
    console.log(value);
    if (phoneInput.current?.isValidNumber(value)) {
      const link = `https://api.whatsapp.com/send/?phone=${formattedValue}`
      Linking.openURL(link);
    }
    else {
      alert(AlertMessage)
    }

  }

  const convertLanguage = (language) => {
    switch (language) {
      case 'HE':
        setLanguage('he')
        setTitle('הודעת וואטסאפ 📩')
        setText('אפליקציה פשוטה לשלוח הודעה לכל אחד מבלי להוסיף אותו לאנשי קשר')
        setPlaceholder('מספר טלפון')
        setAlertMessage('המספר הזה אינו חוקי')
        setBtnText('שלח הודעה')
        break;
      case 'EN':
        setLanguage('en')
        setTitle('Whatsapp Message 📩')
        setText('Simple app to send a message to anyone without adding them to contact')
        setPlaceholder('Phone Number')
        setAlertMessage('This number is invalid')
        setBtnText('Send Message')
        break;
      case 'AR':
        setLanguage('ar')
        setTitle(' رسالة واتس اب 📩')
        setText('تطبيق بسيط لإرسال رسالة إلى أي شخص دون إضافتهم إلى جهة الاتصال')
        setPlaceholder('رقم الهاتف')
        setAlertMessage('هذا الرقم غير صالح')
        setBtnText('ارسل رسالة')
        break;

      default:
        break;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {
    loading ? (<ActivityIndicator color="black" size="large"/>):(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.CenterView}>
          <View style={styles.ImgView}>
            <Image
              style={styles.Img}
              source={require('./assets/images/Whatsapp-Icon.png')}
              resizeMode='cover'
            />
          </View>
          <View style={styles.languages}>
            <View style={styles.languageView}>
              <TouchableOpacity onPress={() => convertLanguage('EN')} disabled={language=='en'}>
                <Text style={[styles.languageText,language=='en'?{color:'black'}:{color:'blue'}]} >EN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.languageView}>
              <TouchableOpacity onPress={() => convertLanguage('HE')} disabled={language=='he'}>
                <Text style={[styles.languageText,language=='he'?{color:'black'}:{color:'blue'}]}>HE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.languageView}>
              <TouchableOpacity onPress={() => convertLanguage('AR')} disabled={language=='ar'}>
                <Text style={[styles.languageText,language=='ar'?{color:'black'}:{color:'blue'}]}>AR</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.tileText}>{Title}</Text>
          </View>
          <View style={styles.TextView}>
            <Text style={styles.Text}>{text}</Text>
          </View>
          <View style={styles.PhoneInput}>
            <PhoneInput
              ref={phoneInput}
              placeholder={placeholder}
              defaultCode={country}
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              codeTextStyle={{ display: 'none' }}
              withShadow
            />
          </View>
          <View style={styles.BtnView}>
            <TouchableOpacity style={styles.Btn} onPress={GoToWhatsApp}>
              <Text style={styles.BtnText}>{btnText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.madeByView}>
            <Text style={styles.madeByText}>Made With 💖 By </Text>
            <TouchableOpacity style={styles.madeByBtn} onPress={()=>Linking.openURL('https://www.instagram.com/karam_almlahe/')}><Image style={styles.madeByImg} source={require('./assets/images/MadeBy.png')} resizeMode='contain' /></TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>)}
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CenterView: {
    width: '90%',
    height: '90%',
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
  },
  ImgView: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
  },
  Img: {
    height: '100%',
    width: '85%',
  },
  languages: {
    height: '10%',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 30,
    textDecorationLine: 'underline',
    color:'blue'
  },
  titleView: {
    width: '100%',
    height: '12%',
    alignItems: 'center',
  },
  tileText: {
    fontFamily: 'Cairo-ExtraLight',
    fontSize: 32,
  },
  TextView: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
  },
  Text: {
    fontFamily: 'Cairo-Light',
    fontSize: 18,
    lineHeight: 38,
    textAlign: 'center',
  },
  PhoneInput: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnView: {
    height: '18%',
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  Btn: {
    backgroundColor: '#119822',
    width: '90%',
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 16.00,

    elevation: 24,
  },
  BtnText: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 24,
    color: 'white',
  },
  madeByView:{
    height:'5%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  },
  madeByText:{
    fontFamily: 'Cairo-Medium',
    fontSize: 16,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  },
  madeByBtn:{
    height: '100%',
    width:'8%',
  },
  madeByImg:{
    height: '100%',
    width:'100%',
  },
});
