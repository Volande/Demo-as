export class UserRole {
  constructor(private roleId: String,
              private roleName: String) {
  }

  public get roleIdValue(): String {
    return this.roleId;
  }

  public set roleIdValue(val: String) {
    this.roleId = val;
  }

  public get roleNameValue(): String {
    return this.roleName;
  }

  public set roleNameValue(val: String) {
    this.roleName = val;
  }
}
