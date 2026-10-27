"use server";

import connectDB from "@/database";
import RegisterUser from "@/database/user.modal";
import { emailValidationSchema, subscriptionSchema } from "@/lib/data.validation";
import { cookies } from "next/headers";


export async function registerUser(formData: FormData) {
    const username = formData.get("name") as string;
    const useremail = formData.get("email") as string;

    // CHECK FOR NULL
    if(!useremail || !username) {
        return {
            success: false,
            message: "Name and email are required"
        }
    }

    // VALIDATE DATA WITH ZOD
    const rawData = {
        name: username,
        email: useremail
    }
    const validationResult = subscriptionSchema.safeParse(rawData);
    if(!validationResult.success) {
        return {
          success: false,
          message:
            validationResult.error!.issues[0].message ||
            "Data validation pattern fails.",
        };
    }

    // STORE DATA TO DATABASE
    const {name, email} = validationResult.data;
    try {

        await connectDB();
        const userResponse = await RegisterUser.create({
            name: name,
            email: email
        });



        if(!userResponse) {
            return {
                success: false,
                message: "Database internal error"
            }
        }

        (await cookies()).set("user_session", JSON.stringify({name: userResponse.name, email: userResponse.email}), {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });

        return {
          success: true,
          message: "User created successfully.",
        };

    } catch(error: any) {
        if(error.code === 11000) {
            return {
                success: false,
                message: "This email already registered!"
            }
        }
        return {
            success: false,
            message: "Internal error! " + error.message
        }
    }

}

export async function validateCurrentUser(formData: FormData) {
  const useremail = formData.get("email");

  if (!useremail) {
    return {
      success: false,
      message: "Name and email are required",
    };
  }

  // VALIDATE DATA WITH ZOD
  const validationResult = emailValidationSchema.safeParse(useremail);
  if (!validationResult.success) {
    return {
      success: false,
      message:
        validationResult.error!.issues[0].message ||
        "Data validation pattern fails.",
    };
  }

  // STORE DATA TO DATABASE
  const email = validationResult.data;
  try {
    await connectDB();
    const userResponse = await RegisterUser.findByEmail(email);
    if (!userResponse) {
      return {
        success: false,
        message: "user not found! subscribe first please.",
      };
    }

    (await cookies()).set(
      "user_session",
      JSON.stringify({ name: userResponse.name, email: userResponse.email }),
      {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      },
    );

    return {
      success: true,
      message: "User created successfully.",
    };
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        success: false,
        message: "This email already registered!",
      };
    }
    return {
      success: false,
      message: "Internal error! " + error.message,
    };
  }
}

