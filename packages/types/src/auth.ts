import { z } from 'zod';

export const authSchema = z
  .object({
    firstname: z
      .string({
        required_error: 'ⓘ Le prénom est requis.',
        invalid_type_error: 'ⓘ Le prénom doit être une chaîne de caractères.',
      })
      .trim()
      .min(3, { message: 'ⓘ Le prénom est requis.' })
      .max(255, {
        message: 'ⓘ Le prénom doit comporter moins de 255 caractères.',
      }),
    lastname: z
      .string({
        required_error: 'ⓘ Le nom est requis.',
        invalid_type_error: 'ⓘ Le nom doit être une chaîne de caractères.',
      })
      .trim()
      .min(3, { message: 'ⓘ Le nom est requis.' })
      .max(255, {
        message: 'ⓘ Le nom doit comporter moins de 255 caractères.',
      }),
    country: z
      .string({
        required_error: 'ⓘ Le pays est requis.',
        invalid_type_error: 'ⓘ Le pays doit être une chaîne de caractères.',
      })
      .trim()
      .min(3, { message: 'ⓘ Le pays est requis.' })
      .max(255, {
        message: 'ⓘ Le pays doit comporter moins de 255 caractères.',
      }),
    birthdate: z.preprocess((val) => new Date(String(val)), z.date()),
    gender: z.enum(['male', 'femele', 'other']),
    email: z
      .string({
        required_error: "ⓘ L'email est requis.",
        invalid_type_error: "ⓘ L'email doit être une chaîne de caractères.",
      })
      .trim()
      .email({ message: "ⓘ L'email doit être un email valide." })
      .max(255, {
        message: "ⓘ L'email doit comporter moins de 255 caractères.",
      }),
    password: z
      .string({
        required_error: 'ⓘ Le mot de passe est requis.',
        invalid_type_error:
          'ⓘ Le mot de passe doit être une chaîne de caractères.',
      })
      .trim()
      .min(8, {
        message: 'ⓘ Le mot de passe doit comporter plus de 8 caractères.',
      })
      .max(255, {
        message: 'ⓘ Le mot de passe doit comporter moins de 255 caractères.',
      }),
    activate_at: z.date({
      required_error: "ⓘ La date d'activation est requise.",
    }),
  })
  .strict()
  .strip();

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
});

export type AuthBody = z.infer<typeof loginSchema>;

export const registrationSchema = authSchema.pick({
  firstname: true,
  lastname: true,
  birthdate: true,
  gender: true,
  country: true,
  email: true,
  password: true,
});

export type RegisterBody = z.infer<typeof registrationSchema>;
