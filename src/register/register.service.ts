import { HttpException, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/createRegister.dto';
import { UserguardService } from '../database/userguard/userguard.service';
import * as bcrypt from 'bcryptjs';
import { TypeuserService } from '../database/typeuser/typeuser.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RegisterService {
  constructor(
    private registerRepository: UserguardService,
    private typeUserRepository: TypeuserService,
    private authService: AuthService,
  ) {}

  newUser = async (passwordTxt: string) => {
    const salt = bcrypt.genSaltSync(10);
    const password = JSON.stringify(passwordTxt);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  };

  validateEmail = (email: string) => {
    const aRCheck = /^[a-z0-9+_.-]+@[a-z0-9.-]+[.]{1}[a-z]+$/g;
    const returnWord = 'email';
    console.log(email.match(aRCheck));
    if (email.match(aRCheck) === null) return returnWord;
    return false;
  };

  validatePasswordString = (password: any) => {
    const returnWord = 'password';
    const stringCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/g;
    console.log(password.match(stringCheck));
    if (password.match(stringCheck) === null) return returnWord;
    return false;
  };

  validateLength = (password: string) => {
    const min = 6;
    if (password.length < min) return 'len';
    return false;
  };

  getUserEmailToValidation = async (email: string) => {
    return await this.registerRepository.getOneUserByEmail(email);
  };

  getUserNameToValidation = async (name: string) => {
    return await this.registerRepository.getOneUserByName(name);
  };

  lowerCaseWord = (word: string) => {
    return word.toLowerCase();
  }

  createRegister = async (createRegisterDto: CreateRegisterDto) => {
    createRegisterDto.email = this.lowerCaseWord(createRegisterDto.email)
    if (this.validateEmail(createRegisterDto.email) === 'email')
      throw new HttpException('Email is not valid', 400);
    if (this.validatePasswordString(createRegisterDto.password) === 'password')
      throw new HttpException('Password shall be alfa numeric', 400);
    if (this.validateLength(createRegisterDto.password) === 'len')
      throw new HttpException('Password shall be more than 6 characters', 400);

    const userExist = await this.getUserNameToValidation(
      createRegisterDto.name,
    );
    const emailExist = await this.getUserEmailToValidation(
      createRegisterDto.email,
    );
    if (userExist || emailExist) throw new HttpException('user exist', 400);

    createRegisterDto.password = await this.newUser(createRegisterDto.password);
    const register: any = await this.registerRepository.createUser(
      createRegisterDto,
    );

    const { password, ...res } = register;
    res.type_user_id = await this.typeUserRepository.getTypeById(
      res.type_user_id,
    );
    return res;
  };

  loginUser = async (user: any) => {
    return user;
  };

  getUsers = async () => {
    const users = await this.registerRepository.getAll();
    for (const element in users) {
      users[element].type_user_id = await this.typeUserRepository.getTypeById(
        users[element].type_user_id,
      );
    }
    return users;
  };

  getUser = async (userID: string) => {
    const user: any = await this.registerRepository.getById(parseInt(userID));
    if (user === undefined) throw new HttpException('User does not exist', 404);
    const { password, ...res } = user;
    res.type_user_id = await this.typeUserRepository.getTypeById(
      res.type_user_id,
    );
    return res;
  };
}
