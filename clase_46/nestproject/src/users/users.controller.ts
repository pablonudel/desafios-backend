import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CartsService } from '../carts/carts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCartDto} from '../carts/dto/create-cart.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/utils/bcrypt';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly cartService: CartsService) {}

  @Post()
  async create(@Body() createUser: CreateUserDto, createCart: CreateCartDto) {
    if(!createUser.name || !createUser.lastname || !createUser.email || !createUser.password)
      throw new HttpException('Valores incompletos', HttpStatus.BAD_REQUEST)

      const userCart =  await this.cartService.create(createCart)
      const cart = userCart._id.toString()
      
      const password = await hashPassword(createUser.password)
      return await this.usersService.create({...createUser, password, cart});
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {status:"Success", users}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.findOne(id)
    const userCart = user.cart
    await this.cartService.remove(userCart.toString())
    return this.usersService.remove(id);
  }
}
