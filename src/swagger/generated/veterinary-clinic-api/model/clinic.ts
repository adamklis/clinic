/**
 * VeterinaryClinic
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { IRating } from './rating';
import { IAddress } from './address';


export interface IClinic { 
    uuid?: string | null;
    name: string;
    address: IAddress;
    rating: IRating;
    description: string;
}

