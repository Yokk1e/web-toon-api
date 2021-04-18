import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Catagory } from './catagory.entity';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtUser } from '../../auths/jwts/jwt.strategy';
import { UpdateCatagoryDto } from './dto/update-catagory.dto'
@Injectable()
export class CatagoriesService {
  constructor(
    @InjectRepository(Catagory)
    private readonly catagoryRepository: Repository<Catagory>,
  ) {}
  async create(createContentDto: CreateCatagoryDto): Promise<Catagory> {
    const catagoryName = await this.catagoryRepository.find({
      where: { name: createContentDto.name },
    });
    if (catagoryName.length) {
      throw new HttpException('This name is used', HttpStatus.BAD_REQUEST);
    }
    return this.catagoryRepository.save({ ...createContentDto });
  }

  async findOne(id: number) {
    const cat = await this.catagoryRepository.findOneOrFail(id, {
      
    });
    if(!cat.name.length){
        throw new HttpException('No catagory found', HttpStatus.BAD_REQUEST);
    }
    return cat
  }

  async findAll() {
    const cat = await this.catagoryRepository.find({});
    return cat
  }

  async deleteOne(catId: number, user: JwtUser) {
    const cat = await this.catagoryRepository.findOneOrFail(catId);

    cat.deletedBy = user.userId;
    cat.deletedUser = user.userName;
    return this.catagoryRepository.softDelete(catId);
  }

  async updateOne(
    catId: number,
    updateCatagoryDto: UpdateCatagoryDto,
  ): Promise<Catagory> {
    const content = await this.catagoryRepository.findOneOrFail(catId);

    return this.catagoryRepository.save({ ...content, ...updateCatagoryDto });
  }
}
