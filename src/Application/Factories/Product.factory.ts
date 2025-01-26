import { Uuid } from "@/@Shared/@Utils/Uuid";
import { ProductDto } from "../Dtos/Product.dto";

export class ProductFactory {
  public static newEmpty(defaultColumnIdx: number): ProductDto {
    return {
      uuid: Uuid.newRandom(),
      name: null,
      reference: null,
      rank: null,
      rankPts: null,
      defaultColumnIdx,
    };
  }
}
