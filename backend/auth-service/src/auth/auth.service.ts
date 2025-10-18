import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Utilisateur } from 'src/utilisateur/utilisateur.entity/utilisateur.entity';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';


const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 12);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur) private readonly usersRepo: Repository<Utilisateur>,
    private readonly jwt: JwtService,
    private readonly mailerService: MailerService
  ) {}

  private async hash(s: string) {
    return bcrypt.hash(s, BCRYPT_ROUNDS);
  }
  private async compare(s: string, h: string) {
    return bcrypt.compare(s, h);
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Identifiants invalides');

    if (!user.emailConfirmed) {
      throw new ForbiddenException('Email non confirmé');
    }

    const ok = await this.compare(password, user.mdp_hash);
    if (!ok) throw new UnauthorizedException('Identifiants invalides');

    if (user.doit_changer_mdp) {
      throw new ForbiddenException('Changement de mot de passe requis');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      nom: user.nom,
      prenom: user.prenom,
    };
    const access_token = await this.jwt.signAsync(payload);

    return {
      success: true,
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
      },
      token: access_token,
    };
  }

  async changePassword(email: string, currentPassword: string, newPassword: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Utilisateur introuvable');

    const ok = await this.compare(currentPassword, user.mdp_hash);
    if (!ok) throw new UnauthorizedException('Mot de passe actuel incorrect');

    user.mdp_hash = await this.hash(newPassword);
    user.doit_changer_mdp = false;

    await this.usersRepo.save(user);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      nom: user.nom,
      prenom: user.prenom,
    };
    const access_token = await this.jwt.signAsync(payload);

    return {
      success: true,
      message: 'Mot de passe mis à jour',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
      },
      token: access_token,
    };
  }

  // Utilitaire pour import initial: mdp = hash(CIN) + forcer changement
  async setInitialPasswordFromCIN(userId: number, cin: string) {
    const mdpHash = await this.hash(cin);
    await this.usersRepo.update(userId, { mdp_hash: mdpHash, doit_changer_mdp: true });
  }
  
  async confirmEmail(email: string, token: string) {
    const user = await this.usersRepo.findOne({ where: { email, confirmationToken: token } });
    if (!user) throw new BadRequestException('Token invalide ou email incorrect');

    user.emailConfirmed = true;
    user.confirmationToken = null;
    console.log('Updating user:', user);
    await this.usersRepo.save(user);

    return { message: 'Email confirmé avec succès' };
  }


  async resendConfirmation(email: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Utilisateur introuvable');

    if (user.emailConfirmed) {
      throw new BadRequestException('Email déjà confirmé');
    }

    const token = randomBytes(32).toString('hex');
    user.confirmationToken = token;
    await this.usersRepo.save(user);
    
  await this.mailerService.sendMail({
        to: email,
        subject: 'Confirmation de votre email',
        text: `Cliquez ici pour confirmer votre email : http://localhost:3000/auth/confirm-email?email=${email}&token=${token}`,
      });

    // TODO: Send email with confirmation link
    // Example: http://localhost:3000/auth/confirm-email?email=...&token=...

    return { message: 'Lien de confirmation renvoyé' };
  }
   
}