"use server"
import { revalidatePath } from "next/cache"
import { dbConnect } from "../libs/dbconnect"
import UserModel from "../models/user.model"
import { redirect } from "next/navigation"
import { User } from "../types"
import * as bcrypt from "bcryptjs";

export const registerForUser = async(form:User)=>{

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(form.password, salt)
    const user = {
        firstname: form.firstname,
        lastname:form.lastname,
        email:form.email,
        password:hashedPassword

    }

    await dbConnect()
    await UserModel.create(user)

    console.log("I am working")
    
    revalidatePath("/allusers")
    redirect("/allusers")


}