import { number, string } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class UpdateRegisterPatientDto {
    
    @IsString()
    @ApiProperty({
        type: String,
        description: "Patien's Name",
    })
    patient_id: string;
    
    @IsString()
    @ApiProperty({
        type: String,
        description: "Patien's Name",
    })
    name: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: "Patien's Address",
    })
    address: string;
    
    @IsString()
    @ApiProperty({
        type: String,
        description: "Patien's Id documents",
    })
    id_document: string;


    @IsString()
    @ApiProperty({
        type: String,
        description: "Patien's Constact Emergencies",
    })
    contact_emergencies: string;
    
    
    @IsString()
    @ApiProperty({
        type: string,
        description: "Patien's Institution",
    })
    institution: string;
    
    @IsString()
    @ApiProperty({
        type: string,
        description: "User's allergies",
    })
    allergies: string;
    
    @IsString()
    @ApiProperty({
        type: string,
        description: "User's blood type",
    })
    blood_type: string;

    @IsString()
    @ApiProperty({
        type: string,
        description: "User's medications",
    })
    medication: string;

    @IsString()
    @ApiProperty({
        type: string,
        description: "User's diseases",
    })
    diseases: string;
    

}
