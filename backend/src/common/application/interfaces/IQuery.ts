export abstract class IQuery<TInput, TOutput> {
  abstract execute(dto: TInput): Promise<TOutput>;
}
