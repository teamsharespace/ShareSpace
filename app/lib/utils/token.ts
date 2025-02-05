import jwt from 'jsonwebtoken';

export const generateVerificationToken = (email: string) => {
return jwt.sign({email},process.env.NEXTAUTH_SECRET || " ",{expiresIn: '1d'});
}
