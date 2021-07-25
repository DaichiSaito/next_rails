interface Profile {
  name: string;
  nickname: string;
  introduction: string;
}
export interface User {
  uid: string;
  token: string;
  profile: Profile
}