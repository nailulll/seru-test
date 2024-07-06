import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Express.Request>();
    const user = request['user'].is_admin;
    return user === "TRUE";
  }
}
