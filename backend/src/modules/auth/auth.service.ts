import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto, RegisterDto } from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      email: dto.email
    });

    if (!user) {
      throw new HttpException("Wrong credentials", 400);
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new HttpException("Wrong credentials", 400);
    }

    const token = await this.jwtService.signAsync({ sub: user.id, is_admin: user.isAdmin });

    return { token };
  }

  async register(dto: RegisterDto) {
    const user = await this.userRepository.findOneBy({
      email: dto.email
    });

    if (user) {
      throw new HttpException("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword
    });

    await this.userRepository.save(newUser);

    delete newUser.password;
    return newUser;
  }
}
