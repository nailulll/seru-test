import 'package:flutter/material.dart';
import 'package:flutter_test_seru/modules/form_submit/form_submit_controller.dart';
import 'package:get/get.dart';

class FormSubmitScreen extends StatelessWidget {
  const FormSubmitScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder(
      builder: (FormSubmitController controller) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Kirim Data'),
          ),
          body: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Data yang akan dikirim",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 20),
                Obx(() {
                  if (controller.formDto.value == null) {
                    return const CircularProgressIndicator();
                  }
                  return Text(
                    controller.formDto.value!.toJson().toString(),
                    style: const TextStyle(
                      fontSize: 20,
                      height: 2,
                    ),
                  );
                }),
                const SizedBox(height: 30),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    onPressed: () => controller.submit(),
                    child: const Text("Kirim"),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
