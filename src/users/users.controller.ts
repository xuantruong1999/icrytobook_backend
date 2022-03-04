import { Get, Post, Put, Delete, Controller, Param, Render, Body, Res, HttpException, ValidationError, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Response } from 'express';
import { Result } from './dtos/result.dto';
import { validate, validateOrReject } from 'class-validator';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    //ex: /
    @Get()
    async findAll(@Res() res: Response) {
        var users = await this.userService.findAll();
        return res.render(
            'users/index',
            { message: 'Hello world!', users },
        )
    }

    @Get('new')
    create(@Res() res:Response) {
        return res.render('users/create');
    }

    @Post('new')
    createUser(@Res() res: Response, @Body() createDto: CreateUserDto): any {
        this.userService.create(createDto);
        return res.render('users', { message: "create new user success" })
            
    }

    //ex: users?id=621dd3054fbacbc17103b4d3
    //users/621dd3054fbacbc17103b4d3
    @Get('/:id')
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.findById(id);
    }
}
