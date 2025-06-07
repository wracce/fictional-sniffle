import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoggerService } from 'src/logger/logger.service';
import { jwtConstants } from 'src/auth/constants';
import { RentScooterDto } from './dto/rent.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly loggerService: LoggerService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async register(createUserDto: CreateUserDto): Promise<RegisterResponseDto> {
    const user = await this.create(createUserDto);
    this.loggerService.sendMessageToQueue("Зарегистрирован новый пользователь "+ user.firstname);
    return { success: true, message: 'User registered successfully', user };
  }
  
  async rentScooter(userId: string, scooterId: string, token: string,endDate): Promise<RentScooterDto> {
    const startDate = new Date();
    const endDateDate = new Date(endDate);
    const days = Math.ceil((endDateDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));


    const scoterResponse = await fetch(`${process.env.GATEWAY_API}/api/scooters/${scooterId}`,{
      method: 'GET',
      headers: {
        'Authorization': token,
      }})
    if(scoterResponse.status !== 200){
      throw new Error('Scooter not found');
    }

    const scooter = await scoterResponse.json();
    if (scooter.isRented) {
      throw new Error('Scooter is already rented');
    }

    const scoterRentResponse = await fetch(`http://scooters-scooter-service:3002/api/scooters/${scooterId}/rent`,{
      method: 'POST',
      headers: {
        'Authorization': token,
      }})
    if(scoterRentResponse.status !== 200){
      throw new Error('Scooter cant be rented');
    }

    const price = scooter.dailyRentalPrice * days;

    return {
      startDate: startDate.toISOString(),
      endDate: endDateDate.toISOString(),
      count: days,
      price: price,
      carId: scooterId,
      userId: userId
    } as RentScooterDto; 
  }

  async createRequest(text:string) {
    await this.loggerService.sendMessageToQueue("Анонимный донос: " + text);
  }
}
