import {CommandHandler} from '@nestjs/cqrs';
import {Inject, BadRequestException} from '@nestjs/common';
import {IsMemberOfCompagny} from 'src/Domain/User/IsMemberOfCompagny';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {User} from 'src/Domain/User/User.entity';
import {CreateInputCommand} from './CreateInputCommand';
import {IInputRepository} from 'src/Domain/Input/Repository/IInputRepository';
import {Input} from 'src/Domain/Input/Input.entity';
import {InputView} from '../View/InputView';
import {UsernameView} from 'src/Application/User/View/UsernameView';

@CommandHandler(CreateInputCommand)
export class CreateInputCommandHandler {
  constructor(
    @Inject('IInputRepository')
    private readonly repository: IInputRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isMemberOfCompagny: IsMemberOfCompagny
  ) {}

  public execute = async (command: CreateInputCommand): Promise<InputView> => {
    const {user, type, authorId} = command;
    const compagny = user.currentCompagny;

    const author = await this.userRepository.findOneById(authorId);
    if (!(author instanceof User)) {
      throw new BadRequestException('user.errors.notFound');
    }

    if (
      false === (await this.isMemberOfCompagny.isSatisfiedBy(author, compagny))
    ) {
      throw new BadRequestException('user.errors.notMember');
    }

    if (author.id === user.id) {
      throw new BadRequestException(`input.errors.auto.${type}`);
    }

    if (false === (await this.repository.canUserAddInput(author, user, type))) {
      throw new BadRequestException('input.errors.rateLimit');
    }

    const input = await this.repository.save(
      new Input({
        type,
        author,
        compagny,
        addedBy: user
      })
    );

    return new InputView(
      input.id,
      type,
      input.createdAt,
      new UsernameView(author.firstName, author.lastName)
    );
  };
}
