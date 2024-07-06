import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Not, Repository } from "typeorm";
import { UpdateUserDto } from "./dto";
import { UserQueryDto } from "./dto/user-query.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }


  async getAll(dto: UserQueryDto) {
    const query = this.userRepository.createQueryBuilder("users");

    if (dto.is_admin) {
      query.where("is_admin = :is_admin", { is_admin: dto.is_admin });
    }

    if (dto.q) {
      query.andWhere("name LIKE :q", { q: `%${dto.q}%` });
    }

    const users = query.orderBy("id", "DESC")
      .take(dto.limit)
      .skip((dto.page - 1) * dto.limit)
      .select(["users.id", "users.name", "users.email", "users.isAdmin"]);

    const data = await users.getMany();
    const length = await users.getCount();
    const totalPage = Math.ceil(length / dto.limit)

    return {
      total: length,
      totalPage,
      currentPage: dto.page,
      currentTotal: data.length,
      data
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({
      id
    });

    if (!user) {
      throw new HttpException("User not found", 404);
    }
    delete user.password;
    return user;
  }

  async update(dto: UpdateUserDto, id: number) {
    const emailExist = await this.userRepository.findOne({
      where: {
        email: dto.email,
        id: Not(id)
      }
    });

    if (emailExist && emailExist.id !== id) {
      throw new HttpException("Email already exists", 400);
    }

    await this.userRepository.update(id, dto);

    return { msg: "ok" };
  }

  async destroy(id: number) {
    await this.userRepository.delete(id);
    return { msg: "ok" };
  }

}
