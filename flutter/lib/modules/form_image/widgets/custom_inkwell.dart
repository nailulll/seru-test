import 'package:flutter/material.dart';

class CustomInkWell extends StatelessWidget {
  final VoidCallback? onTap;
  final BorderRadius? borderRadius;
  final Color? backgroundColor;
  final Widget? child;

  const CustomInkWell(
      {this.onTap,
      this.borderRadius,
      this.backgroundColor,
      this.child,
      super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      borderRadius: borderRadius,
      color: backgroundColor,
      child: InkWell(
        borderRadius: borderRadius,
        onTap: onTap,
        splashFactory: InkSplash.splashFactory,
        child: child,
      ),
    );
  }
}
