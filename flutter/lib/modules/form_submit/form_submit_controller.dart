import 'package:flutter/material.dart';
import 'package:flutter_test_seru/modules/form/form_controller.dart';
import 'package:flutter_test_seru/modules/form_image/controllers/form_image_controller.dart';
import 'package:flutter_test_seru/routes/app_route.dart';
import 'package:get/get.dart';

import '../../dto/form_submit_dto.dart';

class FormSubmitController extends GetxController {
  var formDto = Rxn<FormSubmitDto>(null);

  @override
  void onReady() {
    getData();
    super.onReady();
  }

  void getData() {
    var formController = Get.find<FormController>();
    var formImageController = Get.find<FormImageController>();

    formDto.value = FormSubmitDto(
      firstName: formController.firstName.text,
      lastName: formController.lastName.text,
      bioData: formController.bioData.text,
      province: formController.province.text,
      regency: formController.regency.text,
      district: formController.district.text,
      villages: formController.village.text,
      idCardNumber: formImageController.cardNumber.text,
      idCard: formImageController.idCardImage.value,
      selfie: formImageController.selfieImage.value,
      freeStyle: formImageController.freeStyleImage.value,
    );
  }

  void submit() {
    ScaffoldMessenger.of(Get.context!).showSnackBar(
      const SnackBar(
        content: Text("Data Submitted"),
      ),
    );
    Future.delayed(const Duration(seconds: 1), () {
      Get.offAllNamed(AppRoutes.splash);
    });
  }
}
