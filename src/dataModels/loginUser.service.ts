export class LoginUser {
   constructor(private username: string,
      private password: string) {
   }

   public get userNameValue() {
      return this.username;
   }

   public set userNameValue(val: string) {
      this.username = val;
   }

   public get userPassValue() {
      return this.password;
   }

   public set userPassValue(val: string) {
      this.password = val;
   }
}
