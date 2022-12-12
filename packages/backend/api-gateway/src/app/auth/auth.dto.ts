import { WalletLoginData } from '@sharedto/auth-service';
import { IsNotEmpty } from 'class-validator';

export class WalletLoginInput implements WalletLoginData {
  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  signature!: string;
}
