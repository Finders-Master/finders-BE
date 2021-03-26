import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider'

@Injectable()
export class CloudinaryService {
  private v2: any
  constructor(
     @Inject(Cloudinary)
     private cloudinary
  ){
     this.cloudinary.v2.config({
       cloud_name: process.env.CLOUD_NAME ,
       api_key: process.env.API_KEY,
       api_secret: process.env.API_SECRET
     })
    this.v2 = cloudinary.v2
  }
  async upload(file:any){
    return await this.v2.uploader.upload(file)
  }
}