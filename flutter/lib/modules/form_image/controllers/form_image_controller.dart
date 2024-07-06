import 'package:camera/camera.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_test_seru/models/type_model.dart';
import 'package:flutter_test_seru/routes/app_route.dart';
import 'package:get/get.dart';

class FormImageController extends GetxController {
  final cardNumber = TextEditingController();
  Rxn<XFile?> selfieImage = Rxn();
  Rxn<XFile?> idCardImage = Rxn();
  Rxn<XFile?> freeStyleImage = Rxn();

  void pickImage(Type type) async {
    var res = await Get.toNamed(
      AppRoutes.formPickImage,
      arguments: type,
    );

    if (res != null && res is TypeModel) {
      switch (res.type) {
        case Type.selfie:
          selfieImage.value = res.data;
          break;
        case Type.idCard:
          idCardImage.value = res.data;
          break;
        case Type.freeStyle:
          freeStyleImage.value = res.data;
          break;
      }
    }
  }

  void submit() {
    Get.toNamed(AppRoutes.formSubmit);
  }
}
