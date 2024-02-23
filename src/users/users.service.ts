import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	private users: Array<User> = [];
	private id = 0;

  create(createUserDto: CreateUserDto) {
    this.users.push({
      id: ++this.id, ...createUserDto, date_joined: new Date(),
      last_joined: null
    });
  }

  findAll() {
    return [...this.users];
  }

  findOne(id: number) {
		const found: User = this.users.find((u) => u.id == id);
		if(!found) throw new NotFoundException(); // return 404 Not Found;
    return found;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const found = this.findOne(id);
    this.remove(id);
    this.users.push({ ...found, ...updateUserDto, last_joined: new Date()});
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
}
}