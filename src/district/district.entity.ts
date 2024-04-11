import mongoose, { Schema, Document } from 'mongoose';

export interface District {
  countryCode: string;
  postalCode?: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
}

export interface DistrictDocument extends District, Document {}

export const DistrictSchema = new Schema<DistrictDocument>({
  countryCode: { type: String, required: true },
  postalCode: { type: String, required: true },
  name: { type: String, required: true },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  accuracy: { type: Number, default: null },
});

export const DistrictModel = mongoose.model<DistrictDocument>(
  'District',
  DistrictSchema,
);
