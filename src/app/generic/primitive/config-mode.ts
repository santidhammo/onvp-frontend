export enum ConfigMode {
  MEMBERS,
  WORKGROUPS,
  ROLES,
  PAGES,
  IMAGES,
  MUSICAL_INSTRUMENTS,
}

export namespace ConfigMode {
  export function getTitle(mode: ConfigMode) {
    switch (mode) {
      case ConfigMode.MEMBERS:
        return $localize`Members`;
      case ConfigMode.WORKGROUPS:
        return $localize`Work Groups`;
      case ConfigMode.ROLES:
        return $localize`Roles`;
      case ConfigMode.PAGES:
        return $localize`Pages`;
      case ConfigMode.IMAGES:
        return $localize`Images`;
      case ConfigMode.MUSICAL_INSTRUMENTS:
        return $localize`Musical Instruments`;
    }
  }
}
