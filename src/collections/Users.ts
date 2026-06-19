import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminField, isAdminOrSelf, anyAuthenticatedUser } from '../access';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'System Settings',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'status'],
  },
  auth: {
    // Only active users can log in. This needs to be implemented in a custom strategy if possible, but payload handles simple auth.
    // We can use the login operation hook or access control. For Payload v3, access read works as a start.
  },
  access: {
    read: anyAuthenticatedUser, // Admins can see all, regular users can see to link relationships, though we might want to restrict this later.
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    // Note: Admin panel access is governed by the user role
    admin: ({ req: { user } }) => Boolean(user), // Must be logged in to access admin
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['viewer'],
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Content Manager', value: 'content_manager' },
        { label: 'Volunteer Manager', value: 'volunteer_manager' },
        { label: 'Partnership Manager', value: 'partnership_manager' },
        { label: 'Viewer', value: 'viewer' },
      ],
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      required: true,
      admin: {
        description:
          'Super Admins have full access. Content Managers manage website content. Volunteer/Partnership Managers handle engagement leads. Viewers can only read.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      access: {
        update: isAdminField,
      },
      admin: {
        description: 'Inactive users cannot perform operations they normally would.',
      },
    },
  ],
};
