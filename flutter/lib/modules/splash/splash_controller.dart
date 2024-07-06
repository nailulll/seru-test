import 'package:flutter_test_seru/routes/app_route.dart';
import 'package:get/get.dart';

class SplashController extends GetxController {
  @override
  void onReady() {
    Future.delayed(const Duration(seconds: 1), () {
      Get.offAllNamed(AppRoutes.form);
    });
    super.onReady();
  }
}
