import { Uuid } from '@/@Shared/@Utils/Uuid';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';

export class ProductDtoFactory {
  public static newEmpty(defaultColumnIdx: number): ProductDto {
    return {
      uuid: Uuid.newRandom(),
      name: null,
      reference: null,
      rank: null,
      rankPts: null,
      defaultColumnIdx
    };
  }
}
