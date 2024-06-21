export abstract class ICommand<TInput, TOutput> {
  abstract execute(dto: TInput): Promise<TOutput>;
}
