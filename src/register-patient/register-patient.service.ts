import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateRegisterPatientDto } from './dto/create-register-patient.dto';
import { UpdateRegisterPatientDto } from './dto/update-register-patient.dto'
import { UserService } from './../database/user/user.service'
import { TypeuserService } from '../database/typeuser/typeuser.service';
import { InstitutionsService } from '../database/institutions/institutions.service';
import { UserguardService } from '../database/userguard/userguard.service'
import { HealthServiceDB } from '../database/health/health.service'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { async } from 'rxjs';


@Injectable()
export class RegisterPatientService {

  constructor(
    private patientRepository: UserService,
    private typeUserRepository: TypeuserService,
    private InstitutionsService: InstitutionsService,
    private UserGuardRepository: UserguardService,
    private HealthRepository: HealthServiceDB,
    @Inject(CloudinaryService)
    private readonly _cloudinaryServiceService: CloudinaryService
  ) {}
  

  getPatienIdDocument = async (id_document: string) => {
    return await this.patientRepository.getUserByDocument(id_document)
  }

  lowerCaseWord = (word: string) => {
    return word.toLowerCase();
  };

  uploadFile = async (file: any) => {
    return await this._cloudinaryServiceService.upload(file)
  }

  createPatient = async (createRegisterPatientDto: CreateRegisterPatientDto ,media: boolean, files: any) => {
    createRegisterPatientDto.id_document = this.lowerCaseWord(createRegisterPatientDto.id_document)
    
    const idDocumentExist = await this.getPatienIdDocument(createRegisterPatientDto.id_document)

    if(idDocumentExist) throw new HttpException('patient already register', 400);

    const healthInfo = {
      allergies: createRegisterPatientDto.allergies,
      blood_type: createRegisterPatientDto.blood_type,
      medication: createRegisterPatientDto.medication,
      diseases: createRegisterPatientDto.diseases,
    }

    const registerHealth: any = await this.HealthRepository.createhHealthInfo(healthInfo)

    let cloudLinkPic: any
    let cloudLinkQr: any
    
    if(files.picture){
      cloudLinkPic = await this.uploadFile(files.picture[0].path)
    }

    if(files.qr){
      cloudLinkQr = await this.uploadFile(files.qr[0].path)
    }
  

    const patientInfo = {
      name: createRegisterPatientDto.name,
      address: createRegisterPatientDto.address,
      id_document: createRegisterPatientDto.id_document,
      pictures: cloudLinkPic.secure_url,
      contact_emergencies: createRegisterPatientDto.contact_emergencies,
      institution: createRegisterPatientDto.institution,
      type_user_id: 21,
      userguard_id: parseInt(createRegisterPatientDto.userguard_id),
      health_id : registerHealth.id,
      code_qr: cloudLinkQr.secure_url
    }



    const registerPatient: any = await this.patientRepository.createUser(patientInfo);

    const { ...res } = registerPatient
    res.type_user_id = await this.typeUserRepository.getTypeById(res.type_user_id);
    res.userguard_id = await this.UserGuardRepository.getById(res.userguard_id)
    res.health_id = await this.HealthRepository.geInfo(res.health_id)
    

    return res; 

  }

  getPatients = async() => {
    const patients = await this.patientRepository.getAll()

    for (const i in patients){
      patients[i].type_user_id = await this.typeUserRepository.getTypeById(patients[i].type_user_id)
      patients[i].userguard_id = await this.UserGuardRepository.getById(patients[i].userguard_id)
      patients[i].health_id = await this.HealthRepository.geInfo(patients[i].health_id)
    }

    return patients
  }

  updatePatient = async(updatePatientDto: UpdateRegisterPatientDto, files) => {
    const patient: any = await this.patientRepository.getUserById(parseInt(updatePatientDto.patient_id))
    if(patient === undefined) throw new HttpException('Patient does not exits', 400)
    
    
   const healthInfo = {
      allergies: updatePatientDto.allergies,
      blood_type: updatePatientDto.blood_type,
      medication: updatePatientDto.medication,
      diseases: updatePatientDto.diseases,
      
    }

    const updateHealth: any = await this.HealthRepository.updateHealth(patient.health_id, healthInfo)
  
    
    let cloudLinkPic: any
    let cloudLinkQr: any
    
    if(files.picture){
      cloudLinkPic = await this.uploadFile(files.picture[0].path)
    }
    
    if(files.qr){
      cloudLinkQr = await this.uploadFile(files.qr[0].path)
    }
    
    const patientInfo = {
      name: updatePatientDto.name,
      address: updatePatientDto.address,
      id_document: updatePatientDto.id_document,
      pictures: cloudLinkPic.secure_url,
      contact_emergencies: updatePatientDto.contact_emergencies,
      institution: updatePatientDto.institution,
      type_user_id: 21,
      userguard_id: patient.userguard_id,
      health_id : patient.health_id,
      code_qr: cloudLinkQr.secure_url
    }

    const updatePatient: any = await this.patientRepository.updatePatient(patient.id, patientInfo) 
    
    return this.getPatient(patient.id)

  
    }
    
  getPatient =  async (patientID: string) => {
    const patient: any = await this.patientRepository.getUserById(parseInt(patientID))
    if(patient === undefined) throw new HttpException('Patient does not exits', 400)

   
    const { ...res } = patient
    res.type_user_id = await this.typeUserRepository.getTypeById(res.type_user_id);
    res.userguard_id = await this.UserGuardRepository.getById(res.userguard_id)
    res.health_id = await this.HealthRepository.geInfo(res.health_id)
    
    return res

  }

 

  remove(id: number) {
    return `This action removes a #${id} registerPatient`;
  }
}
