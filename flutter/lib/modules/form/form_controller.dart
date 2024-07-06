import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_test_seru/models/district_model.dart';
import 'package:flutter_test_seru/models/province_model.dart';
import 'package:flutter_test_seru/models/regency_model.dart';
import 'package:flutter_test_seru/models/villages_model.dart';
import 'package:flutter_test_seru/routes/app_route.dart';
import 'package:get/get.dart';

import '../../network/api_client.dart';

class FormController extends GetxController {
  Dio? dio;

  final firstName = TextEditingController();
  final lastName = TextEditingController();
  final bioData = TextEditingController();

  final province = TextEditingController();
  final regency = TextEditingController();
  final district = TextEditingController();
  final village = TextEditingController();

  var provinces = <ProvinceModel>[].obs;
  var regencies = <RegencyModel>[].obs;
  var districts = <DistrictModel>[].obs;
  var villages = <VillagesModel>[].obs;

  @override
  void onInit() {
    var client = ApiClient();
    dio = client.init();
    super.onInit();
  }

  @override
  void onReady() {
    getProvince();
    super.onReady();
  }

  void submit() {
    var validated = true;

    if (firstName.text.isEmpty) {
      validated = false;
    }

    if (lastName.text.isEmpty) {
      validated = false;
    }

    if (bioData.text.isEmpty) {
      validated = false;
    }

    if (province.text.isEmpty) {
      validated = false;
    }

    if (regency.text.isEmpty) {
      validated = false;
    }

    if (district.text.isEmpty) {
      validated = false;
    }

    if (village.text.isEmpty) {
      validated = false;
    }

    if (validated) {
      Get.toNamed(AppRoutes.formImage);
    } else {
      Get.snackbar("Error", "Pastikan mengisi semua form");
    }
  }

  void getProvince() async {
    try {
      var res = await dio?.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
      );

      if (res != null) {
        provinces.value =
            (res.data as List).map((e) => ProvinceModel.fromJson(e)).toList();
      }
    } on DioException catch (e) {
      log(e.toString());
      throw Exception(e.message);
    }
  }

  void getRegency(String id) async {
    regency.text = "";
    district.text = "";
    village.text = "";
    try {
      var res = await dio?.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/$id.json",
      );

      if (res != null) {
        regencies.value =
            (res.data as List).map((e) => RegencyModel.fromJson(e)).toList();
      }
    } on DioException catch (e) {
      log(e.toString());
      throw Exception(e.message);
    }
  }

  void getDistrict(String id) async {
    district.text = "";
    village.text = "";
    try {
      var res = await dio?.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/districts/$id.json",
      );

      if (res != null) {
        districts.value =
            (res.data as List).map((e) => DistrictModel.fromJson(e)).toList();
      }
    } on DioException catch (e) {
      log(e.toString());
      throw Exception(e.message);
    }
  }

  void getWard(String id) async {
    village.text = "";
    try {
      var res = await dio?.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/villages/$id.json",
      );
      if (res != null) {
        villages.value =
            (res.data as List).map((e) => VillagesModel.fromJson(e)).toList();
      }
    } on DioException catch (e) {
      log(e.toString());
      throw Exception(e.message);
    }
  }
}
