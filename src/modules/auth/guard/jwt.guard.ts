import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common";

export class JwtGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const can = await super.canActivate(context);
        if (!can) return false;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || (!user.sub && !user.id)) {
            throw new ForbiddenException('Token inválido ou incompleto');
        }

        return true;
    }
}
