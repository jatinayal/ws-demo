import * as migration_20260624_084257_add_cloudinary from './20260624_084257_add_cloudinary';

export const migrations = [
  {
    up: migration_20260624_084257_add_cloudinary.up,
    down: migration_20260624_084257_add_cloudinary.down,
    name: '20260624_084257_add_cloudinary',
  },
];
