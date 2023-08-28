import 'package:flutter/material.dart';

class Structure extends StatefulWidget {
  const Structure({super.key});

  @override
  State<Structure> createState() => _StructureState();
}

class _StructureState extends State<Structure> {
  
  int _selectedIndex = 0;

  static final List<Widget>_widgetOptions = <Widget>[
    const Text("Home"),
    const Text("View_Note"),
    const Text("Create_Note"),
    const Text("Your_Note"),
    const Text("Profile")
  ];
  
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex=index;
    });
    print('Tapped index is $_selectedIndex');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions[_selectedIndex],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        elevation: 10,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        selectedItemColor: Colors.blueGrey,
        unselectedItemColor: const Color(0xFF526480),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: "View_Note"),
          BottomNavigationBarItem(icon: Icon(Icons.add), label: "Create_Note"),
          BottomNavigationBarItem(icon: Icon(Icons.update), label: "Your_Note"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile")
        ],
      ),
      
    );
  }
}
