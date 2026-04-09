import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  name?: string;

  @IsEmail({}, { message: 'Email precisa ser um email válido' })
  @IsNotEmpty({ message: 'Email não pode estar vazio' })
  email?: string;

  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  password?: string;
}
