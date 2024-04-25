import mongoose, { Schema, Document } from 'mongoose';
import { City, CitySchema } from '../city/city.entity';

export interface State {
  countryCode: string;
  stateCode: string | number;
  name: string;
  cities: City[] | null | undefined;
}

export interface StateDocument extends State, Document {}

export const StateSchema = new Schema<StateDocument>({
  countryCode: { type: String, required: true },
  stateCode: { type: Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  cities: { type: [CitySchema], default: null },
});

export const StateModel = mongoose.model<StateDocument>('State', StateSchema);
