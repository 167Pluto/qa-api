import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RegisterResponseData } from "../auth/interface/auth.interfaces";
import { User } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";
import { UtilService } from "../util/util.service";
import { IsNull, Repository, TypeORMError, UpdateResult } from "typeorm";
import { LoginDto } from "../auth/dto/login.dto";
import { AuthService } from "../auth/auth.service";

let findAllCounter = 1;
let findByIdCounter = 1;
@Injectable()
export class UsersService {
  constructor(
    private readonly utilService: UtilService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async register(createUserData: CreateUserDto): Promise<User> {
    const { email, password } = createUserData;

    //Register without checking existing email
    await this.userRepository.findOneBy({ email });

    createUserData.password = this.utilService.hashPassword(password);

    return await this.userRepository.save(createUserData);
  }

  findAll() {
    if (findAllCounter % 3 === 0 && findAllCounter < 10) {
      findAllCounter += 1;
      throw new InternalServerErrorException('Something went wrong');
    }
    findAllCounter += 1;
    return this.userRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  findOne(id: number) {
    if (findByIdCounter % 2 === 0 && findByIdCounter < 10) {
      findByIdCounter += 1;
      throw new TypeORMError('Invalid database connection');
    }
    findByIdCounter += 1;

    return this.userRepository.findOneBy({ id, deletedAt: IsNull() });
  }

  async update(id: number, updateUserData: UpdateUserDto): Promise<User> {
    const { currentPassword, password } = updateUserData;

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    if (currentPassword && password) {
      const userDataPassword = user.password;
      const currPassword = this.utilService.hashPassword(currentPassword);

      if (userDataPassword !== currPassword) {
        throw new BadRequestException('Invalid current password !');
      }

      const newPassword = this.utilService.hashPassword(password);

      if (userDataPassword === newPassword) {
        throw new BadRequestException(
          'New password must be different from the old one. Please choose another.',
        );
      }

      updateUserData.password = newPassword;

      delete updateUserData.currentPassword;
    }

    const updateResponse: UpdateResult = await this.userRepository
      .createQueryBuilder()
      .update()
      .set(updateUserData)
      .where('id = :userId', { userId: user.id })
      .returning('*')
      .execute();

    const updatedUser = { ...updateResponse.raw[0] };

    if (!updatedUser) {
      throw new BadRequestException(
        'The user with the specified id does not exist!',
      );
    }

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    const updateResponse: UpdateResult = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({
        deletedAt: new Date().getTime(),
      })
      .where('id = :userId', { userId: user.id })
      .returning('*')
      .execute();

    return updateResponse.raw[0];
  }

  public async login(logInData: LoginDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: logInData.email,
        password: this.utilService.hashPassword(logInData.password),
        deletedAt: IsNull(),
      },
    });

    if (!existingUser) {
      throw new UnprocessableEntityException('Invalid credentials.');
    }

    await this.authService.login(logInData);
  }
}
