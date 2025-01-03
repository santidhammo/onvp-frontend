export enum MailRecipientType {
  MEMBER = 'MEMBER',
  WORKGROUP = 'WORKGROUP',
  MUSICAL_INSTRUMENT = 'MUSICAL_INSTRUMENT',
}

export namespace MailRecipientType {
  export function getName(mailRecipientType: MailRecipientType) {
    switch (mailRecipientType) {
      case MailRecipientType.MEMBER:
        return $localize`Member`;
      case MailRecipientType.WORKGROUP:
        return $localize`Work group`;
      case MailRecipientType.MUSICAL_INSTRUMENT:
        return $localize`Musical instrument`;
    }
  }
}
