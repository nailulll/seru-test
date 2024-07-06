import 'package:flutter/material.dart';
import 'package:flutter_test_seru/routes/app_pages.dart';
import 'package:flutter_test_seru/routes/app_route.dart';
import 'package:get/get.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: AppRoutes.splash,
      defaultTransition: Transition.cupertino,
      getPages: AppPages.pages,
    );
  }
}
