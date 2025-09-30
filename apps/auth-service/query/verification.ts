import type { Resolvers } from "../graphql/resolver-types";

export default {
  sendEmailVerification: (parent, args, context, info) => {
    return {
      success: true,
      message: "Email sent successfully",
      expiresAt: "",
    };
  },
  verifyEmail: (parent, args, context, info) => {
    // verify email via context

    return {
      success: true,
      message: "Email verified succesfully",
      redirect: true,
      url: "/dashboard",
    };
  },
} as Resolvers["Mutation"];
