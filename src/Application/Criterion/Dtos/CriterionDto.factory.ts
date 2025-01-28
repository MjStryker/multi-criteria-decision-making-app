import { Uuid } from '@/@Shared/@Utils/Uuid';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';

export class CriterionDtoFactory {
  public static newEmpty(defaultRowIdx: number): CriterionDto {
    return {
      uuid: Uuid.newRandom(),
      name: null,
      weight: 1,
      normalizedWeight: null,
      unit: null,
      beneficial: true,
      defaultRowIdx
    };
  }
}
