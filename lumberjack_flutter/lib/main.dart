import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:test_boogie/FlutterJack.dart';
import 'package:test_boogie/Login.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FluttaJack',
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: MyHomePage(title: 'FlutterJack'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

enum AuthState {
  UnAuthenticated,
  Authenticated
}

enum AppState { Logging, Browsing }

class _MyHomePageState extends State<MyHomePage> {

  AuthState authState = AuthState.UnAuthenticated;
  AppState appState = AppState.Logging;
  
  String jWT = '';
  int _selectedIndex = 0;

  void _onItemTapped(int idx) {
    setState(() {
      _selectedIndex = idx;

      switch (_selectedIndex) {
        case 0:
          setState(() {
            appState = AppState.Logging;
          });
          break;
        case 1:
          setState(() {
            appState = AppState.Browsing;
          });
          break;
        default:
      }
    });
  }

  loginCallback(String token) {
    setState(() {
      jWT = token;
      authState = AuthState.Authenticated;
    });
  }

  Widget mainContent () {
    if (authState == AuthState.Authenticated) {
      return FlutterJack(jWT, appState);
    }
    else {
      return Login(loginCallback);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: GradientAppBar(
    title: Text('Flutter'),
    gradient: LinearGradient(colors: [Colors.orange[300], Colors.orange[700]])
  ),
      body: Center(
        child: mainContent()
      ),
      bottomNavigationBar: BottomNavigationBar(
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(FontAwesomeIcons.book),
          title: Text('Logging'),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.list),
          title: Text('Timeline'),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person_pin),
          title: Text('Profile'),
        )
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.amber[800],
      onTap: _onItemTapped,
    ),
    );
  }
}
