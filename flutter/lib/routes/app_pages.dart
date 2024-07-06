import 'package:flutter_test_seru/modules/form/form_controller.dart';
import 'package:flutter_test_seru/modules/form/form_screen.dart';
import 'package:flutter_test_seru/modules/form_image/controllers/form_image_controller.dart';
import 'package:flutter_test_seru/modules/form_image/controllers/form_pick_image_controller.dart';
import 'package:flutter_test_seru/modules/form_image/screens/form_image_screen.dart';
import 'package:flutter_test_seru/modules/form_image/screens/form_pick_image_screen.dart';
import 'package:flutter_test_seru/modules/form_submit/form_submit_controller.dart';
import 'package:flutter_test_seru/modules/form_submit/form_submit_screen.dart';
import 'package:flutter_test_seru/modules/splash/splash_controller.dart';
import 'package:flutter_test_seru/modules/splash/splash_screen.dart';
import 'package:flutter_test_seru/routes/app_route.dart';
import 'package:get/get.dart';

abstract class AppPages {
  static final List<GetPage> pages = [
    GetPage(
      name: AppRoutes.splash,
      page: () => const SplashScreen(),
      binding: BindingsBuilder(() {
        Get.lazyPut(() => SplashController());
      }),
    ),
    GetPage(
      name: AppRoutes.form,
      page: () => const FormScreen(),
      binding: BindingsBuilder(() {
        Get.lazyPut(() => FormController());
      }),
    ),
    GetPage(
      name: AppRoutes.formImage,
      page: () => const FormImageScreen(),
      binding: BindingsBuilder(() {
        Get.lazyPut(() => FormImageController());
      }),
    ),
    GetPage(
      name: AppRoutes.formPickImage,
      page: () => const FormPickImageScreen(),
      binding: BindingsBuilder(() {
        Get.lazyPut(() => FormPickImageController());
        Get.lazyPut(() => FormImageController());
      }),
    ),
    GetPage(
      name: AppRoutes.formSubmit,
      page: () => const FormSubmitScreen(),
      binding: BindingsBuilder(() {
        Get.lazyPut(() => FormImageController());
        Get.lazyPut(() => FormController());
        Get.lazyPut(() => FormSubmitController());
      }),
    ),
  ];
}
