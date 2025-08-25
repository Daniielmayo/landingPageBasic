import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      lastname: string;
      email: string;
      country: string;
      city: string;
      phone: number;
      image: string;
      uid: string;
      token: string;
      description: string;
      message: string;
    };
  }
}
