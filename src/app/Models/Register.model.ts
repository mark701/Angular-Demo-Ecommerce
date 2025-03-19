export interface Register{
  userID:number;
    username: string;
    email: string;
    password: string;
    profileImage?: File | null;
  }