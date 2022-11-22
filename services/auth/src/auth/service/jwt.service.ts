import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtService {
  @InjectRepository(Auth)
  private readonly repository: Repository<Auth>;

  private readonly jwt: Jwt;

  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  // Encode Users password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  // validate password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Generate JWT token
  public generateToken(auth: Auth): string {
    return this.jwt.sign({ id: auth.id, email: auth.email });
  }

  // validate JWT token
  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (error) {
      // handle error for error scenario
    }
  }

  // Decode the JWT token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<Auth> {
    return this.repository.findOne({ where: { id: decoded.id } });
  }
}
