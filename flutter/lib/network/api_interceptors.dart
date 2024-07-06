import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide Response;

class ApiInterceptors extends Interceptor {
  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    log("--> ${options.method.toUpperCase()} ${"${options.baseUrl}${options.path}"}");
    log("Headers:");
    options.headers.forEach((k, v) => log('$k: $v'));

    log("queryParameters:");
    options.queryParameters.forEach((k, v) => log('$k: $v'));

    if (options.data != null) {
      log("Body: ${options.data}");
    }
    log("--> END ${options.method.toUpperCase()}");

    return handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    log("${err.response != null ? err.response?.data : 'Unknown Error'}");
    log("<-- End error");
    bool reFetch = false;
    if (err.response?.statusCode == 500) {
      reFetch = await callSnackBar("Server Error");
    } else if (err.response?.statusCode == 502) {
      reFetch = await callSnackBar("Bad Gateway");
    } else if (err.response?.statusCode == 503) {
      reFetch = await callSnackBar("Service Unavailable");
    } else if (err.response?.statusCode == 429) {
      reFetch = await callSnackBar("Too Many Requests");
    } else if (err.type == DioExceptionType.connectionTimeout) {
      reFetch = await callSnackBar("Connection Timeout");
    } else if (err.type == DioExceptionType.receiveTimeout) {
      reFetch = await callSnackBar("Receive Timeout");
    } else if (err.type == DioExceptionType.sendTimeout) {
      reFetch = await callSnackBar("Send Timeout");
    }
    if (reFetch) {
      Dio dio = Dio();
      return handler.resolve(await dio.fetch(err.requestOptions));
    }
    return handler.next(err);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    log("Headers:");
    response.headers.forEach((k, v) => log('$k: $v'));
    log("Response: ${response.data}");
    log("<-- END HTTP");
    return handler.next(response);
  }

  Future<bool> callSnackBar(String msg) {
    bool reFetch = false;
    ScaffoldMessenger.of(Get.context!).showSnackBar(
      SnackBar(
        content: Text(msg),
        action: SnackBarAction(
          label: "Urungkan",
          onPressed: () {
            reFetch = true;
          },
        ),
        duration: const Duration(seconds: 5),
      ),
    );
    return Future.delayed(const Duration(seconds: 5), () {
      return reFetch;
    });
  }
}
