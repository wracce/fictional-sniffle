import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class GalleryDto {
  @Expose() id: string;

  @Expose() title: string;
  @Expose() originalUrl: string;
  @Expose() colorizedUrl: string;
  @Expose() dimensions: string;
  @Expose() fileSize: number;
  @Expose() processingTime: number;
  @Expose() rating: number;
  @Expose() public: boolean;
  @Expose() uuid: string;

  @Expose()
  @Type(() => UserDto)
  author: UserDto;
}
