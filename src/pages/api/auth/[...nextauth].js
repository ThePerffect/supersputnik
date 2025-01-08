import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import {router} from "next/client";

export default NextAuth({
    secret: "secret",
    providers: [
        CredentialsProvider({
            id: "user",
            name: "user",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && (await bcrypt.compare(credentials.password, user.password_hash))) {
                    return {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        middleName: user.middleName || null,
                        birthDate: user.birthDate,
                        unique_code: user.unique_code,
                        type: "user",

                    };
                }

                return null;
            },
        }),

        CredentialsProvider({
            id: "clinic",
            name: "clinic",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "clinic@example.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const clinic = await prisma.hospital.findUnique({
                    where: { email: credentials.email },
                });

                if (clinic && (await bcrypt.compare(credentials.password, clinic.password_hash))) {
                    return {
                        id: clinic.id,
                        email: clinic.email,
                        name: clinic.name,
                        address: clinic.address,
                        ctype: clinic.type,
                        licens: clinic.licens,
                        coord: clinic.cord_address,
                        phone: clinic.phone,
                        time: clinic.time,
                        type: "clinic",
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                if (token.type === "user") {
                    token.firstName = session.firstName;
                    token.lastName = session.lastName;
                    token.middleName = session.middleName;
                    token.email = session.email;
                    token.birthDate = session.birthDate;
                }else if (token.type === "clinic"){
                    token.name = session.name;
                    token.address = session.address;
                    token.email = session.email;
                    token.ctype = session.ctype
                    token.cord_address = session.coord
                    token.phone = session.phone
                    token.time = session.time
                }
            }

            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.type = user.type;

                if (user.type === "user") {
                    token.firstName = user.firstName;
                    token.lastName = user.lastName;
                    token.middleName = user.middleName;
                    token.birthDate = user.birthDate;
                    token.unique_code = user.unique_code
                } else if (user.type === "clinic") {
                    token.name = user.name;
                    token.address = user.address;
                    token.ctype = user.ctype
                    token.licens = user.licens
                    token.coord = user.coord
                    token.phone = user.phone
                    token.time = user.time
                }
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.type = token.type;

            if (token.type === "user") {
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.middleName = token.middleName;
                session.user.birthDate = token.birthDate;
                session.user.unique_code = token.unique_code
            }
            else if (token.type === "clinic") {
                session.user.name = token.name;
                session.user.licens = token.licens
                session.user.address = token.address;
                session.user.ctype = token.ctype
                session.user.coord = token.coord
                session.user.phone = token.phone
                session.user.time = token.time
            }

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        newUser: "/register",
    },
});
