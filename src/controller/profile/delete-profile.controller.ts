// import { Response, Request } from "express";
// import { prisma } from "../../utils/prisma";
 
// export const deleteProfile = async (req: Request, res: Response) => {
//   try {
//     const {profileId } = req.params;
 
//     if (!profileId) {
//       res.status(400).json({ message: "userId" });
//       return;
//     }
 
//     const user = await prisma.user.findUnique({
//       where: {
//         profileId,
//       },
//     });

 
//     if (!user) {
//       res.status(400).json({ message: "User not found." });
//       return;
//     }
 
//     if (!user?.profileId) {
//       res.status(400).json({ message: "User profile not found." });
//       return;
//     }
 
//     const userProfile = await prisma.profile.findUnique({
//       where: {
//         id: Number(user?.profileId),
//       },
//     });
 
//     res.status(200).json({ });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//   }
// }; 