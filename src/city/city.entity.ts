import mongoose, { Schema, Document } from 'mongoose';
import { District, DistrictSchema } from '../district/district.entity';

export interface City {
  stateId: string | number;
  countryCode: string;
  postalCodes: string[];
  cityId: number;
  name: string;
  districts: District[] | null | undefined;
}

export interface CityDocument extends City, Document {}

export const CitySchema = new Schema<CityDocument>({
  stateId: { type: Schema.Types.Mixed, required: true },
  countryCode: { type: String, required: true },
  postalCodes: { type: [String], required: true },
  cityId: { type: Number, required: true },
  name: { type: String, required: true },
  districts: { type: [DistrictSchema], default: null },
});

export const CityModel = mongoose.model<CityDocument>('City', CitySchema);
