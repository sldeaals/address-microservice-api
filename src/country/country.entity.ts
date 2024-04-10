import mongoose, { Schema, Document } from 'mongoose';

interface Currency {
  [code: string]: {
    name: string;
    symbol: string;
  };
}

interface NativeName {
  [key: string]: {
    common: string;
    official: string;
  };
}

export interface CountryDocument extends Document {
  name: {
    common: string;
    official: string;
    nativeName: NativeName;
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currency;
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
}

export const CountrySchema = new Schema<CountryDocument>({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true },
    nativeName: { type: Schema.Types.Mixed, required: true },
  },
  tld: { type: [String], required: true },
  cca2: { type: String, required: true },
  ccn3: { type: String, required: true },
  cca3: { type: String, required: true },
  cioc: { type: String, required: true },
  independent: { type: Boolean, required: true },
  status: { type: String, required: true },
  unMember: { type: Boolean, required: true },
  currencies: { type: Schema.Types.Mixed, required: true },
  idd: {
    root: { type: String, required: true },
    suffixes: { type: [String], required: true },
  },
  capital: { type: [String], required: true },
});

export const CountryModel = mongoose.model<CountryDocument>(
  'Country',
  CountrySchema,
);
