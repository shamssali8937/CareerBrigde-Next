import nodemailer from "nodemailer"

export const sendMail=async(to,subject,message)=>{
    try{

        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL,
                pass:process.env.PASS_CODE
            }
        });

        await transporter.sendMail({
            from:process.env.MAIL,
            to,
            subject,
            text:message,
            html:`<p>${message}</p>`
        });

          return { success: true, message: "Email sent!" };

    }catch(err){
        return {success:false,err}
    }
}