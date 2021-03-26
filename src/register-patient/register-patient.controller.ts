import { 
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Request,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  UploadedFiles
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateRegisterPatientDto } from './dto/create-register-patient.dto';
import { UpdateRegisterPatientDto } from './dto/update-register-patient.dto'
import { RegisterPatientService } from './register-patient.service';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid'
import path = require('path')
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';

export const storage = {
  storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`)
      }
  })

}

@Controller('patient')
export class RegisterPatientController {
  constructor(
    private registerPatientService: RegisterPatientService,
    private authService: AuthService,
    ){}
  
   
  
  @Post('/register-patient')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'picture', maxCount: 1},
    {name: 'qr', maxCount: 1}
  ], storage))
  async create(@Res() res: any ,@Body() body : CreateRegisterPatientDto, @UploadedFiles() files) {
    const patient = await this.registerPatientService.createPatient(body, false, files)
    return res.status(HttpStatus.OK).json({ patient })
  }

  @Put('/update-patient')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'picture', maxCount: 1},
    {name: 'qr', maxCount: 1}
  ], storage))
  async update(@Res() res: any,@Body() body: UpdateRegisterPatientDto, @UploadedFiles() files){
    const patient = await this.registerPatientService.updatePatient( body, files)
    return res.status(HttpStatus.OK).json({ patient })
  }

  @Get('/')
  async getAllPatient(@Res() res: any) {
    const data = await this.registerPatientService.getPatients();
    return res.status(HttpStatus.OK).json({ data })
  }

  @Get('/:userID')
  async getPatient(@Res() res:any ,@Param('userID') userID: any) {
    const user = await this.registerPatientService.getPatient(userID);
    return res.status(HttpStatus.OK).json({user})
  }
  
}
