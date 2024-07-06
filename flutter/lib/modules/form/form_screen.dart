import 'package:flutter/material.dart';
import 'package:flutter_test_seru/models/province_model.dart';
import 'package:flutter_test_seru/modules/form/form_controller.dart';
import 'package:get/get.dart';

import '../../models/district_model.dart';
import '../../models/regency_model.dart';
import '../../models/villages_model.dart';

class FormScreen extends StatelessWidget {
  const FormScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder(
      builder: (FormController controller) {
        return Scaffold(
          appBar: AppBar(
            title: const Text("Form Input"),
          ),
          body: GestureDetector(
            onTap: () => FocusScope.of(context).unfocus(),
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    TextField(
                      controller: controller.firstName,
                      decoration: const InputDecoration(
                        labelText: "First Name",
                      ),
                    ),
                    const SizedBox(height: 10),
                    TextField(
                      controller: controller.lastName,
                      decoration: const InputDecoration(
                        labelText: "Last Name",
                      ),
                    ),
                    const SizedBox(height: 10),
                    TextField(
                      controller: controller.bioData,
                      decoration: const InputDecoration(
                        labelText: "Bio Data",
                      ),
                      maxLines: 5,
                    ),
                    const SizedBox(height: 20),
                    Obx(() {
                      return DropdownMenu<ProvinceModel>(
                        width: Get.width - 40,
                        controller: controller.province,
                        hintText: "Pilih Provinsi",
                        requestFocusOnTap: true,
                        enableFilter: true,
                        dropdownMenuEntries: controller.provinces.map((data) {
                          return DropdownMenuEntry(
                            value: data,
                            label: data.name ?? "-",
                          );
                        }).toList(),
                        onSelected: (data) {
                          controller.getRegency(data!.id!);
                        },
                      );
                    }),
                    const SizedBox(height: 10),
                    Obx(() {
                      return DropdownMenu<RegencyModel>(
                        width: Get.width - 40,
                        controller: controller.regency,
                        hintText: "Pilih Kecamatan",
                        requestFocusOnTap: true,
                        enableFilter: true,
                        dropdownMenuEntries: controller.regencies.map((data) {
                          return DropdownMenuEntry(
                            value: data,
                            label: data.name ?? "-",
                          );
                        }).toList(),
                        onSelected: (data) {
                          controller.getDistrict(data!.id!);
                        },
                      );
                    }),
                    const SizedBox(height: 10),
                    Obx(() {
                      return DropdownMenu<DistrictModel>(
                        width: Get.width - 40,
                        controller: controller.district,
                        hintText: "Pilih Kelurahan",
                        requestFocusOnTap: true,
                        enableFilter: true,
                        dropdownMenuEntries: controller.districts.map((data) {
                          return DropdownMenuEntry(
                            value: data,
                            label: data.name ?? "-",
                          );
                        }).toList(),
                        onSelected: (data) {
                          controller.getWard(data!.id!);
                        },
                      );
                    }),
                    const SizedBox(height: 10),
                    Obx(() {
                      return DropdownMenu<VillagesModel>(
                        width: Get.width - 40,
                        controller: controller.village,
                        hintText: "Pilih Kelurahan",
                        requestFocusOnTap: true,
                        enableFilter: true,
                        dropdownMenuEntries: controller.villages.map((data) {
                          return DropdownMenuEntry(
                            value: data,
                            label: data.name ?? "-",
                          );
                        }).toList(),
                      );
                    }),
                    const SizedBox(height: 30),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: () => controller.submit(),
                        child: const Text("Selanjutnya"),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
