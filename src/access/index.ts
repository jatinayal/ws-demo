import type { Access, FieldAccess } from 'payload';

export type Role =
  | 'super_admin'
  | 'content_manager'
  | 'volunteer_manager'
  | 'partnership_manager'
  | 'viewer';

export const checkRole = (allRoles: Role[], user: unknown = null): boolean => {
  const u = user as { roles?: string[] } | null;
  if (u?.roles) {
    return allRoles.some((role) => u.roles?.includes(role));
  }
  return false;
};

// Admins have access to everything
export const isAdmin: Access = ({ req: { user } }) => checkRole(['super_admin'], user);
export const isAdminField: FieldAccess = ({ req: { user } }) => checkRole(['super_admin'], user);

// Access for general reading (viewers + specific roles)
export const isAdminOrHasRole = (roles: Role[]): Access => {
  return ({ req: { user } }) => {
    if (!user) return false;
    if (checkRole(['super_admin'], user)) return true;
    return checkRole(roles, user);
  };
};

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false;
  if (checkRole(['super_admin'], user)) return true;
  if (user.id === id) return true;
  return false;
};

export const isAdminOrSelfField: FieldAccess = ({ req: { user }, id }) => {
  if (!user) return false;
  if (checkRole(['super_admin'], user)) return true;
  if (user.id === id) return true;
  return false;
};

// Access patterns for specific areas
export const isContentManager = isAdminOrHasRole(['content_manager']);
export const isVolunteerManager = isAdminOrHasRole(['volunteer_manager']);
export const isPartnershipManager = isAdminOrHasRole(['partnership_manager']);

export const anyAuthenticatedUser: Access = ({ req: { user } }) => {
  return Boolean(user);
};

// Anyone can read public content (like published pages)
export const publicReadAccess: Access = () => true;

// Custom rule for public reads but restricted creates/updates
export const contentManagerOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(['super_admin', 'content_manager'], user)) {
    return true;
  }
  return {
    _status: {
      equals: 'published',
    },
  };
};
