'use strict';

import { z } from "zod";

export const addressSchema = z.object({
  city: z.string(),
  street: z.string(),
  suite: z.string(),
  zipcode: z.string()
});

export const companySchema = z.object({
  bs: z.string(),
  catchPhrase: z.string(),
  name: z.string(),
});

export const UserSchema = z.object({
    id: z.number(), 
    name: z.string(), 
    username: z.string(), 
    email: z.string(), 
    phone: z.string(), 
    website: z.string(), 
    address: addressSchema, 
    company: companySchema
});

export const UserSchemaValidation = z.object({
    id: z.coerce.number(), 
    name: z.coerce.string().min(1), 
    username: z.coerce.string(), 
    email: z.coerce.string().email(), 
    phone: z.coerce.string(), 
    website: z.coerce.string().min(1), 
    address: z.object({ 
        street: z.coerce.string(), 
        suite: z.coerce.string(), 
        city: z.coerce.string(), 
        zipcode: z.coerce.string() 
    }), 
    company: z.object({ 
        name: z.coerce.string().min(1), 
        catchPhrase: z.coerce.string(), 
        bs: z.coerce.string() 
    })
});