import { Module } from '@nestjs/common';
import { RegisterPatientService } from './register-patient.service';
import { RegisterPatientController } from './register-patient.controller';
import { UserModule } from '../database/user/user.module'
import { TypeuserModule } from '../database/typeuser/typeuser.module';
import { AuthModule } from '../auth/auth.module';
import { InstitutionsModule } from '../database/institutions/institutions.module'
import { UserguardModule } from '../database/userguard/userguard.module'
import { HealthModuleDB } from '../database/health/health.module'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'
@Module({
  imports:[UserModule, TypeuserModule, AuthModule, InstitutionsModule, UserguardModule,HealthModuleDB, CloudinaryModule],
  controllers: [RegisterPatientController],
  providers: [RegisterPatientService],
  exports: [RegisterPatientService]
})
export class RegisterPatientModule {}
