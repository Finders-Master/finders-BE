import { number } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class UpdateRegisterPatientDto {
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
        description: "Patien's Pictures",
    })
    pictures: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: "Patien's Constact Emergencies",
    })
    contact_emergencies: string;
    
    
    @IsInt()
    @ApiProperty({
        type: number,
        description: "Patien's Institution",
    })
    institutions_id: number;

    
    
    /* @IsInt()
    @ApiProperty({
        type: number,
        description: "User's allergies",
    })
    allergies: number;
    
    @IsInt()
    @ApiProperty({
        type: number,
        description: "User's blood type",
    })
    blood_type: number;

    @IsInt()
    @ApiProperty({
        type: number,
        description: "User's medications",
    })
    medication: number;

    @IsInt()
    @ApiProperty({
        type: number,
        description: "User's diseases",
    })
    diseases: number; */


}
